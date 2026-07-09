import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState } from "react";
import { Minus, Plus, Trash2, ShoppingBag, CreditCard, Wallet, ArrowLeft } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useCart } from "@/lib/cart";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { BackButton } from "@/components/BackButton";
import { formatCurrency } from "@/lib/utils";

// Cart page with checkout flow.
// Supports item quantity updates, payment method selection, online payment simulation, and order creation.
// After placing an order, clears the cart and navigates the user to /orders.
export const Route = createFileRoute("/_authenticated/cart")({
  head: () => ({ meta: [{ title: "Cart — Spice Garden" }] }),
  component: CartPage,
});

function generateOrderNumber() {
  // Create a readable order number for the user and database.
  const timestamp = Date.now().toString(36).toUpperCase();
  const randomSuffix = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `SG-${timestamp}-${randomSuffix}`;
}

async function processOnlinePayment(option: string) {
  // Simulate an online payment gateway roundtrip.
  // Replace this with a real payment integration in production.
  await new Promise((resolve) => setTimeout(resolve, 900));
  return { success: true, methodLabel: option };
}

function CartPage() {
  const { items, totals, setQuantity, remove, clear } = useCart();
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [placing, setPlacing] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<"cart" | "payment" | "gateway">("cart");
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "online" | "">("");
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [onlineOption, setOnlineOption] = useState<
    | "PhonePe"
    | "Google Pay"
    | "Paytm"
    | "UPI ID"
    | "Credit Card"
    | "Debit Card"
    | "Net Banking"
    | ""
  >("");
  const [upiId, setUpiId] = useState("");

  const selectPaymentMethod = (method: "cod" | "online") => {
    setPaymentMethod(method);
    setPaymentError(null);
    if (method === "cod") {
      setOnlineOption("");
      setUpiId("");
    }
  };

  const startPayment = () => {
    if (items.length === 0) return;
    setPaymentError(null);
    setPaymentMethod("");
    setOnlineOption("");
    setUpiId("");
    setCheckoutStep("payment");
  };

  const createOrder = async (paymentLabel: string, paymentStatus: "paid" | "pending") => {
    // Validate user and cart state before creating the order record.
    if (authLoading) {
      throw new Error("Please wait while your account is loading.");
    }
    if (items.length === 0) {
      throw new Error("Your cart is empty.");
    }

    let authUserId = user?.id ?? null;
    let deliveryAddress = user?.deliveryAddress ?? "";

    if (!authUserId) {
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError) {
        throw new Error(userError.message || "Unable to verify your account.");
      }
      authUserId = userData?.user?.id ?? null;
      deliveryAddress =
        (userData?.user?.user_metadata?.delivery_address as string | undefined) ?? deliveryAddress;
    }

    if (!authUserId) {
      throw new Error("Sign in to place an order.");
    }

    // Build the order payload for the orders table.
    const orderPayload = {
      user_id: authUserId,
      order_number: generateOrderNumber(),
      subtotal: totals.subtotal,
      tax: totals.tax,
      delivery_fee: totals.delivery,
      discount: totals.discount,
      total: totals.total,
      address: deliveryAddress,
      order_status: "confirmed" as const,
      payment_status: paymentStatus,
      fulfillment: "delivery",
      notes: `Payment: ${paymentLabel}`,
    };

    const { data, error: orderError } = await supabase
      .from("orders")
      .insert([orderPayload])
      .select("id")
      .single();

    if (orderError) {
      console.error("Order creation failed", orderError);
      throw new Error(orderError.message || "Failed to create order.");
    }
    if (!data?.id) {
      console.error("Order creation returned no id", data);
      throw new Error("Failed to create order record.");
    }

    const rows = items.map((i) => ({
      order_id: data.id,
      dish_id: i.id,
      name: i.name,
      image: i.image,
      price: i.price,
      quantity: i.quantity,
      veg: i.veg,
    }));

    const { error: itemsErr } = await supabase.from("order_items").insert(rows);
    if (itemsErr) {
      console.error("Order items insertion failed", itemsErr);
      throw new Error(itemsErr.message || "Failed to save order items.");
    }

    clear();
    toast.success("Order placed successfully!");
    navigate({ to: "/orders" });
  };

  const confirmCashOnDelivery = async () => {
    setPaymentError(null);
    setPlacing(true);
    try {
      await createOrder("Cash on Delivery", "pending");
    } catch (error: any) {
      toast.error(error?.message || "Couldn't confirm order. Please try again.");
    } finally {
      setPlacing(false);
    }
  };

  const handleConfirmOrder = async () => {
    // Called when the user confirms the selected payment method.
    if (placing) return;
    if (!paymentMethod) {
      setPaymentError("Please select a payment method before confirming your order.");
      return;
    }

    if (paymentMethod === "cod") {
      await confirmCashOnDelivery();
      return;
    }

    if (paymentMethod === "online") {
      setPaymentError(null);
      setCheckoutStep("gateway");
    }
  };

  const confirmOnlinePayment = async () => {
    // Finalize the online payment and create the order record only after success.
    if (placing) return;
    if (!onlineOption) {
      setPaymentError("Please choose an online payment option.");
      return;
    }
    if (onlineOption === "UPI ID" && !upiId.trim()) {
      setPaymentError("Please enter your UPI ID to continue.");
      return;
    }

    setPaymentError(null);
    setPlacing(true);
    try {
      const paymentResult = await processOnlinePayment(onlineOption);
      if (!paymentResult.success) {
        throw new Error("Payment was not completed. Please try again.");
      }
      const paymentLabel = onlineOption === "UPI ID" ? `UPI (${upiId})` : onlineOption;
      await createOrder(paymentLabel, "paid");
    } catch (error: any) {
      toast.error(error?.message || "Payment failed. Please try again.");
    } finally {
      setPlacing(false);
    }
  };

  const onlineOptions = [
    "PhonePe",
    "Google Pay",
    "Paytm",
    "UPI ID",
    "Credit Card",
    "Debit Card",
    "Net Banking",
  ] as const;

  return (
    <section className="section-pad">
      <div className="container-luxe max-w-5xl">
        <BackButton />
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-4xl md:text-5xl"
        >
          Your Cart
        </motion.h1>
        {items.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-border bg-card p-12 text-center">
            <ShoppingBag className="mx-auto h-10 w-10 text-primary" />
            <p className="mt-4 text-muted-foreground">Your cart is empty.</p>
            <Link
              to="/menu"
              className="mt-6 inline-block rounded-full bg-primary px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.25em] text-primary-foreground"
            >
              Browse Menu
            </Link>
          </div>
        ) : checkoutStep === "cart" ? (
          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
            <ul className="space-y-3">
              {items.map((i) => (
                <li key={i.id} className="flex gap-4 rounded-3xl border border-border bg-card p-4">
                  <img src={i.image} alt="" className="h-24 w-24 rounded-2xl object-cover" />
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-display text-lg">{i.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatCurrency(i.price)} each
                        </p>
                      </div>
                      <button
                        onClick={() => remove(i.id)}
                        aria-label="Remove"
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="inline-flex items-center rounded-full border border-border">
                        <button
                          onClick={() => setQuantity(i.id, i.quantity - 1)}
                          className="grid h-8 w-8 place-items-center"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-8 text-center text-sm">{i.quantity}</span>
                        <button
                          onClick={() => setQuantity(i.id, i.quantity + 1)}
                          className="grid h-8 w-8 place-items-center"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <p className="font-medium text-primary">
                        {formatCurrency(i.price * i.quantity)}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <aside className="h-fit rounded-3xl border border-border bg-card p-6">
              <h3 className="font-display text-xl">Summary</h3>
              <dl className="mt-4 space-y-2 text-sm">
                <Row l="Subtotal" v={totals.subtotal} />
                <Row l="Tax (8%)" v={totals.tax} />
                <Row l="Delivery" v={totals.delivery} />
                {totals.discount > 0 && (
                  <Row l="Discount" v={-totals.discount} className="text-success" />
                )}
                <div className="mt-2 border-t border-border pt-3 flex justify-between font-display text-lg">
                  <span>Total</span>
                  <span className="text-primary">{formatCurrency(totals.total)}</span>
                </div>
              </dl>
              <button
                type="button"
                onClick={startPayment}
                disabled={placing}
                className="mt-6 w-full rounded-full bg-primary px-6 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-primary-foreground disabled:opacity-60"
              >
                Proceed to Payment
              </button>
            </aside>
          </div>
        ) : checkoutStep === "payment" ? (
          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
            <div className="space-y-6">
              <div className="overflow-hidden rounded-3xl border border-border bg-card p-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-display text-xl">Select Payment Method</p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Choose your preferred method before confirming the order.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setCheckoutStep("cart")}
                    className="rounded-full border border-border px-4 py-2 text-xs uppercase tracking-[0.2em] text-muted-foreground hover:border-primary"
                  >
                    Back to cart
                  </button>
                </div>

                <div className="mt-6 grid gap-4">
                  <PaymentOption
                    icon={Wallet}
                    title="Cash on Delivery"
                    description="Pay when you receive your order. Payment status stays Pending until delivery."
                    selected={paymentMethod === "cod"}
                    onSelect={() => selectPaymentMethod("cod")}
                  />
                  <PaymentOption
                    icon={CreditCard}
                    title="Online Payment"
                    description="Pay now using UPI, Credit Card, Debit Card or Net Banking. Status becomes Paid immediately."
                    selected={paymentMethod === "online"}
                    onSelect={() => selectPaymentMethod("online")}
                  />
                </div>

                {paymentError ? (
                  <p className="mt-4 text-sm text-destructive">{paymentError}</p>
                ) : null}
              </div>
              <div className="rounded-3xl border border-border bg-card p-6">
                <h3 className="font-display text-xl">Order review</h3>
                <dl className="mt-4 space-y-2 text-sm">
                  <Row l="Subtotal" v={totals.subtotal} />
                  <Row l="Tax (8%)" v={totals.tax} />
                  <Row l="Delivery" v={totals.delivery} />
                  {totals.discount > 0 && (
                    <Row l="Discount" v={-totals.discount} className="text-success" />
                  )}
                  <div className="flex justify-between">
                    <span>Payment method</span>
                    <span className="font-medium">
                      {paymentMethod === "cod"
                        ? "Cash on Delivery"
                        : paymentMethod === "online"
                          ? "Online Payment"
                          : "—"}
                    </span>
                  </div>
                  <div className="mt-2 border-t border-border pt-3 flex justify-between font-display text-lg">
                    <span>Total</span>
                    <span className="text-primary">{formatCurrency(totals.total)}</span>
                  </div>
                </dl>
                <button
                  type="button"
                  onClick={handleConfirmOrder}
                  disabled={placing}
                  className="mt-6 w-full rounded-full bg-primary px-6 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-primary-foreground disabled:opacity-60"
                >
                  {placing ? "Confirming…" : "Confirm Order"}
                </button>
              </div>
            </div>
            <aside className="h-fit rounded-3xl border border-border bg-card p-6">
              <h3 className="font-display text-xl">Quick summary</h3>
              <dl className="mt-4 space-y-2 text-sm">
                <Row l="Subtotal" v={totals.subtotal} />
                <Row l="Tax (8%)" v={totals.tax} />
                <Row l="Delivery" v={totals.delivery} />
                {totals.discount > 0 && (
                  <Row l="Discount" v={-totals.discount} className="text-success" />
                )}
                <div className="mt-2 border-t border-border pt-3 flex justify-between font-display text-lg">
                  <span>Total</span>
                  <span className="text-primary">{formatCurrency(totals.total)}</span>
                </div>
              </dl>
            </aside>
          </div>
        ) : (
          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
            <div className="space-y-6">
              <div className="overflow-hidden rounded-3xl border border-border bg-card p-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-display text-xl">Complete Online Payment</p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Pick a payment option and complete the transaction to place your order.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setCheckoutStep("payment")}
                    className="rounded-full border border-border px-4 py-2 text-xs uppercase tracking-[0.2em] text-muted-foreground hover:border-primary"
                  >
                    Back to payment
                  </button>
                </div>

                <div className="mt-6 grid gap-3">
                  {onlineOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setOnlineOption(option)}
                      className={`w-full rounded-3xl border p-4 text-left transition ${onlineOption === option ? "border-primary bg-primary/10" : "border-border bg-background hover:border-primary/60"}`}
                    >
                      <p className="font-medium">{option}</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {option === "UPI ID"
                          ? "Pay with your UPI handle."
                          : option === "Credit Card" || option === "Debit Card"
                            ? "Enter your card details at checkout."
                            : option === "Net Banking"
                              ? "Pay using your preferred bank."
                              : `Pay with ${option}.`}
                      </p>
                    </button>
                  ))}

                  {onlineOption === "UPI ID" ? (
                    <label className="block rounded-3xl border border-border bg-background p-4">
                      <span className="text-sm text-muted-foreground">Enter UPI ID</span>
                      <input
                        type="text"
                        value={upiId}
                        onChange={(event) => setUpiId(event.target.value)}
                        className="mt-2 w-full rounded-2xl border border-border bg-transparent px-4 py-3 text-sm outline-none focus:border-primary"
                        placeholder="example@upi"
                      />
                    </label>
                  ) : null}

                  {paymentError ? <p className="text-sm text-destructive">{paymentError}</p> : null}
                </div>
              </div>

              <div className="rounded-3xl border border-border bg-card p-6">
                <h3 className="font-display text-xl">Payment summary</h3>
                <p className="mt-3 text-sm text-muted-foreground">
                  Once payment is successful, your order will be created and saved.
                </p>
                <dl className="mt-4 space-y-2 text-sm">
                  <Row l="Amount" v={totals.total} />
                  <div className="flex justify-between">
                    <span>Payment option</span>
                    <span className="font-medium">{onlineOption || "—"}</span>
                  </div>
                </dl>
                <button
                  type="button"
                  onClick={confirmOnlinePayment}
                  disabled={placing}
                  className="mt-6 w-full rounded-full bg-primary px-6 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-primary-foreground disabled:opacity-60"
                >
                  {placing ? "Processing payment…" : "Pay & Confirm Order"}
                </button>
              </div>
            </div>
            <aside className="h-fit rounded-3xl border border-border bg-card p-6">
              <h3 className="font-display text-xl">Order details</h3>
              <dl className="mt-4 space-y-2 text-sm">
                <Row l="Subtotal" v={totals.subtotal} />
                <Row l="Tax (8%)" v={totals.tax} />
                <Row l="Delivery" v={totals.delivery} />
                {totals.discount > 0 && (
                  <Row l="Discount" v={-totals.discount} className="text-success" />
                )}
                <div className="mt-2 border-t border-border pt-3 flex justify-between font-display text-lg">
                  <span>Total</span>
                  <span className="text-primary">{formatCurrency(totals.total)}</span>
                </div>
              </dl>
            </aside>
          </div>
        )}
      </div>
    </section>
  );
}

function Row({ l, v, className = "" }: { l: string; v: number; className?: string }) {
  return (
    <div className={`flex justify-between ${className}`}>
      <dt className="text-muted-foreground">{l}</dt>
      <dd>{formatCurrency(v)}</dd>
    </div>
  );
}

function PaymentOption({
  icon: Icon,
  title,
  description,
  selected,
  onSelect,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`group flex w-full items-start gap-4 rounded-3xl border p-5 text-left transition ${selected ? "border-primary bg-primary/10" : "border-border bg-background hover:border-primary/60"}`}
    >
      <div
        className={`grid h-12 w-12 place-items-center rounded-3xl ${selected ? "bg-primary text-primary-foreground" : "bg-background text-muted-foreground"}`}
      >
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="font-display text-base">{title}</p>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
    </button>
  );
}
