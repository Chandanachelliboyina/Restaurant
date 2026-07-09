import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { CheckCircle2, ChefHat, Flame, Package, Truck } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { BackButton } from "@/components/BackButton";
import { formatCurrency } from "@/lib/utils";

// Order history page with realtime refresh for status updates.
// Users can expand individual orders, review billing, and open the dedicated tracking page.
export const Route = createFileRoute("/_authenticated/orders")({
  head: () => ({ meta: [{ title: "Orders — Spice Garden" }] }),
  component: OrdersPage,
});

const STAGES = [
  { id: "confirmed", label: "Confirmed", icon: CheckCircle2 },
  { id: "preparing", label: "Preparing", icon: Package },
  { id: "cooking", label: "Cooking", icon: Flame },
  { id: "ready", label: "Ready / Out for Delivery", icon: Truck },
  { id: "delivered", label: "Delivered", icon: ChefHat },
];

type OrderItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string | null;
};

type Order = {
  id: string;
  order_number: string;
  created_at: string;
  order_status: string;
  payment_status: string;
  payment_method: string | null;
  notes: string | null;
  address: string | null;
  subtotal: number;
  tax: number;
  delivery_fee: number;
  discount: number;
  total: number;
  order_items: OrderItem[];
};

function OrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Load orders for the authenticated user and attach their order items.
  const loadOrders = async () => {
    if (!user) return;
    setLoading(true);
    setErrorMessage(null);

    try {
      const { data, error } = await supabase
        .from("orders")
        .select("*, order_items(*)")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setOrders((data ?? []) as Order[]);
    } catch (err: unknown) {
      console.error("Failed loading orders", err);
      setErrorMessage(err instanceof Error ? err.message : "Failed to load your orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) return;
    loadOrders();

    // Realtime subscription: refresh orders when they change for this user
    const channel = supabase
      .channel(`orders:user:${user.id}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "orders", filter: `user_id=eq.${user.id}` },
        () => {
          loadOrders();
        },
      )
      .subscribe();

    return () => {
      // cleanup subscription when component unmounts or user changes
      try {
        supabase.removeChannel(channel);
      } catch (e) {
        // fallback: unsubscribe if the client uses older API semantics
        channel.unsubscribe();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <section className="section-pad">
      <div className="container-luxe max-w-5xl">
        <BackButton />
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-4xl md:text-5xl"
        >
          Your Orders
        </motion.h1>

        {loading ? (
          <p className="mt-10 text-muted-foreground">Loading orders…</p>
        ) : errorMessage ? (
          <div className="mt-10 rounded-3xl border border-border bg-card p-12 text-center">
            <p className="text-destructive">{errorMessage}</p>
            <button
              type="button"
              onClick={loadOrders}
              className="mt-6 inline-flex rounded-full bg-primary px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.25em] text-primary-foreground"
            >
              Retry
            </button>
          </div>
        ) : orders.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-border bg-card p-12 text-center">
            <p className="text-muted-foreground">You haven't placed any orders yet.</p>
            <Link
              to="/menu"
              className="mt-6 inline-block rounded-full bg-primary px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.25em] text-primary-foreground"
            >
              Order Now
            </Link>
          </div>
        ) : (
          <ul className="mt-8 space-y-6">
            {orders.map((o) => {
              const activeIdx = Math.max(
                0,
                STAGES.findIndex((s) => s.id === o.order_status),
              );
              return (
                <li key={o.id} className="rounded-3xl border border-border bg-card p-6">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                        Order #{o.order_number}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(o.created_at).toLocaleString()}
                      </p>
                      {o.address && (
                        <p className="text-sm text-muted-foreground mt-1">{o.address}</p>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-primary/15 px-3 py-1 text-[0.65rem] uppercase tracking-[0.25em] text-primary">
                        {o.order_status}
                      </span>
                      <span className="rounded-full bg-success/15 px-3 py-1 text-[0.65rem] uppercase tracking-[0.25em] text-success">
                        {o.payment_status}
                      </span>
                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setExpandedOrderId(expandedOrderId === o.id ? null : o.id)}
                          className="rounded-full border border-primary/30 bg-primary/5 px-4 py-2 text-xs uppercase tracking-[0.2em] text-primary transition hover:bg-primary/10"
                        >
                          {expandedOrderId === o.id ? "Hide tracking" : "Track My Order"}
                        </button>
                        <Link
                          to="/track/$orderId"
                          params={{ orderId: o.id }}
                          className="rounded-full border border-border bg-background/80 px-4 py-2 text-xs uppercase tracking-[0.2em] text-foreground transition hover:border-primary hover:text-primary"
                        >
                          Open tracking page
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center gap-2 overflow-x-auto">
                    {STAGES.map((s, i) => {
                      const done = i <= activeIdx;
                      const Icon = s.icon;
                      return (
                        <div key={s.id} className="flex flex-1 items-center gap-2 min-w-fit">
                          <div
                            className={`grid h-9 w-9 place-items-center rounded-full border transition ${done ? "border-primary bg-primary/15 text-primary" : "border-border text-muted-foreground"}`}
                          >
                            <Icon className="h-4 w-4" />
                          </div>
                          <span
                            className={`text-xs whitespace-nowrap ${done ? "text-foreground" : "text-muted-foreground"}`}
                          >
                            {s.label}
                          </span>
                          {i < STAGES.length - 1 && (
                            <div
                              className={`h-px flex-1 ${i < activeIdx ? "bg-primary" : "bg-border"}`}
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <ul className="mt-6 divide-y divide-border/60">
                    {o.order_items.map((it) => (
                      <li key={it.id} className="flex items-center gap-4 py-3">
                        <img
                          src={it.image ?? "https://via.placeholder.com/80"}
                          alt={it.name}
                          className="h-14 w-14 rounded-xl object-cover"
                        />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{it.name}</p>
                          <p className="text-xs text-muted-foreground">
                            Qty: {it.quantity} · {formatCurrency(it.price)}
                          </p>
                        </div>
                        <p className="text-sm">{formatCurrency(it.price * it.quantity)}</p>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 flex flex-col gap-4">
                    <div className="grid gap-3 md:grid-cols-2">
                      <div className="rounded-3xl border border-border bg-background p-4 text-sm">
                        <p className="font-semibold">Billing</p>
                        <div className="mt-3 space-y-2 text-sm text-muted-foreground">
                          <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>{formatCurrency(o.subtotal)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Tax</span>
                            <span>{formatCurrency(o.tax)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Delivery</span>
                            <span>{formatCurrency(o.delivery_fee)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Discount</span>
                            <span>-{formatCurrency(o.discount)}</span>
                          </div>
                          <div className="flex justify-between font-semibold">
                            <span>Total</span>
                            <span>{formatCurrency(o.total)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="rounded-3xl border border-border bg-background p-4 text-sm">
                        <p className="font-semibold">Order summary</p>
                        <div className="mt-3 space-y-2 text-sm text-muted-foreground">
                          <div className="flex justify-between">
                            <span>Payment</span>
                            <span>{o.payment_status}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Payment method</span>
                            <span>
                              {o.payment_method ??
                                (o.notes?.startsWith("Payment:")
                                  ? o.notes.replace(/^Payment:\s*/, "")
                                  : "—")}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Delivery Address</span>
                            <span>{o.address ?? "—"}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Order number</span>
                            <span>{o.order_number}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Current stage</span>
                            <span>{o.order_status}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {expandedOrderId === o.id && (
                      <div className="rounded-3xl border border-border bg-card p-4">
                        <h3 className="font-display text-lg">Order tracking</h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                          Estimated delivery by{" "}
                          {new Date(
                            new Date(o.created_at).getTime() + 45 * 60 * 1000,
                          ).toLocaleTimeString()}
                        </p>
                        <div className="mt-4 space-y-4">
                          {STAGES.map((stage, index) => {
                            const statusIndex = STAGES.findIndex((s) => s.id === o.order_status);
                            const completed = index < statusIndex;
                            const active = index === statusIndex;
                            return (
                              <div key={stage.id} className="flex items-start gap-3">
                                <div
                                  className={`mt-1 grid h-9 w-9 place-items-center rounded-full border ${completed ? "border-success bg-success/15 text-success" : active ? "border-primary bg-primary/15 text-primary" : "border-border text-muted-foreground"}`}
                                >
                                  <stage.icon className="h-4 w-4" />
                                </div>
                                <div>
                                  <p
                                    className={`font-medium ${active ? "text-foreground" : "text-muted-foreground"}`}
                                  >
                                    {stage.label}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    {completed ? "Completed" : active ? "Current stage" : "Pending"}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        <div className="mt-6 rounded-3xl border border-border bg-background p-4 text-sm text-muted-foreground">
                          <p className="font-semibold">Ordered items</p>
                          <ul className="mt-3 space-y-3">
                            {o.order_items.map((it) => (
                              <li key={it.id} className="flex items-center justify-between gap-4">
                                <div className="flex items-center gap-3">
                                  <img
                                    src={it.image ?? ""}
                                    alt={it.name}
                                    className="h-12 w-12 rounded-xl object-cover"
                                  />
                                  <div>
                                    <p className="font-medium">{it.name}</p>
                                    <p className="text-xs text-muted-foreground">
                                      Qty {it.quantity}
                                    </p>
                                  </div>
                                </div>
                                <p>{formatCurrency(it.price * it.quantity)}</p>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
