import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { CheckCircle2, Flame, Package, Truck, ArrowLeft, XCircle } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { BackButton } from "@/components/BackButton";
import { formatCurrency } from "@/lib/utils";

// Dedicated order tracking page for a single order ID.
// This page fetches one order by id and keeps it updated with Supabase realtime events.
export const Route = createFileRoute("/track/$orderId")({
  head: () => ({ meta: [{ title: "Track Order — Spice Garden" }] }),
  component: TrackOrderPage,
});

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

const STAGES = [
  { id: "confirmed", label: "Confirmed", icon: CheckCircle2 },
  { id: "preparing", label: "Preparing", icon: Package },
  { id: "cooking", label: "Cooking", icon: Flame },
  { id: "ready", label: "Ready / Out for Delivery", icon: Truck },
  { id: "delivered", label: "Delivered", icon: CheckCircle2 },
] as const;

function TrackOrderPage() {
  const { user } = useAuth();
  const params = Route.useParams();
  const orderId = params.orderId;
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadOrder = async () => {
    if (!user || !orderId) return;
    setLoading(true);
    setError(null);

    try {
      // Fetch a single order and its items for the route order ID.
      const { data, error } = await supabase
        .from("orders")
        .select("*, order_items(*)")
        .eq("id", orderId)
        .single();

      if (error) throw error;
      setOrder(data as Order);
    } catch (err: any) {
      console.error("Failed to load order", err);
      setError(err?.message ?? "Unable to load your order.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user || !orderId) return;
    loadOrder();

    // Subscribe to realtime updates for this single order.
    const channel = supabase
      .channel(`order:track:${orderId}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "orders", filter: `id=eq.${orderId}` },
        () => {
          loadOrder();
        },
      )
      .subscribe();

    return () => {
      // Remove realtime subscription when leaving the tracking page.
      try {
        supabase.removeChannel(channel);
      } catch {
        channel.unsubscribe();
      }
    };
  }, [orderId, user]);

  const activeStage = order ? STAGES.findIndex((stage) => stage.id === order.order_status) : 0;
  const eta = order ? new Date(new Date(order.created_at).getTime() + 45 * 60 * 1000) : null;

  return (
    <section className="section-pad">
      <div className="container-luxe max-w-5xl">
        <BackButton />
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-4xl md:text-5xl"
        >
          Track your order
        </motion.h1>

        {!user ? (
          <div className="mt-10 rounded-3xl border border-border bg-card p-12 text-center">
            <XCircle className="mx-auto h-12 w-12 text-destructive" />
            <p className="mt-4 text-muted-foreground">
              You need to sign in to view order tracking.
            </p>
            <Link
              to="/login"
              className="mt-6 inline-block rounded-full bg-primary px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.25em] text-primary-foreground"
            >
              Sign In
            </Link>
          </div>
        ) : loading ? (
          <p className="mt-10 text-muted-foreground">Loading order details…</p>
        ) : error ? (
          <div className="mt-10 rounded-3xl border border-border bg-card p-12 text-center">
            <p className="text-destructive">{error}</p>
            <Link
              to="/orders"
              className="mt-6 inline-block rounded-full border border-border px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.25em] text-foreground hover:border-primary hover:text-primary"
            >
              Back to orders
            </Link>
          </div>
        ) : !order ? (
          <div className="mt-10 rounded-3xl border border-border bg-card p-12 text-center">
            <p className="text-muted-foreground">
              Order not found or you don't have access to this order.
            </p>
            <Link
              to="/orders"
              className="mt-6 inline-block rounded-full border border-border px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.25em] text-foreground hover:border-primary hover:text-primary"
            >
              View orders
            </Link>
          </div>
        ) : (
          <div className="mt-10 space-y-6">
            <div className="rounded-3xl border border-border bg-card p-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    Order #{order.order_number}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Placed {new Date(order.created_at).toLocaleString()}
                  </p>
                  {order.address && (
                    <p className="mt-1 text-sm text-muted-foreground">
                      Delivering to {order.address}
                    </p>
                  )}
                </div>
                <div className="grid gap-2 sm:grid-cols-2">
                  <div className="rounded-3xl border border-border bg-background p-4 text-sm">
                    <p className="text-muted-foreground">Payment</p>
                    <p className="mt-2 font-semibold">
                      {order.payment_method ??
                        (order.notes?.startsWith("Payment:")
                          ? order.notes.replace(/^Payment:\s*/, "")
                          : "Online Payment")}
                    </p>
                    <p className="text-xs text-muted-foreground">{order.payment_status}</p>
                  </div>
                  <div className="rounded-3xl border border-border bg-background p-4 text-sm">
                    <p className="text-muted-foreground">Estimated delivery</p>
                    <p className="mt-2 font-semibold">{eta?.toLocaleTimeString()}</p>
                    <p className="text-xs text-muted-foreground">{eta?.toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-card p-6">
              <h2 className="font-display text-2xl">Live order status</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                This timeline updates automatically when your order moves to the next stage.
              </p>
              <div className="mt-6 space-y-4">
                {STAGES.map((stage, index) => {
                  const completed = index < activeStage;
                  const active = index === activeStage;
                  const Icon = stage.icon;
                  return (
                    <div
                      key={stage.id}
                      className="flex gap-4 rounded-3xl border border-border bg-background p-4"
                    >
                      <div
                        className={`grid h-12 w-12 place-items-center rounded-3xl ${completed ? "bg-success/15 text-success" : active ? "bg-primary/15 text-primary" : "bg-muted-foreground/10 text-muted-foreground"}`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <p
                          className={`font-medium ${active ? "text-foreground" : "text-muted-foreground"}`}
                        >
                          {stage.label}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {completed ? "Completed" : active ? "Current stage" : "Waiting"}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl border border-border bg-background p-5">
                <p className="text-sm text-muted-foreground">Order items</p>
                <ul className="mt-4 space-y-3">
                  {order.order_items.map((item) => (
                    <li
                      key={item.id}
                      className="flex items-center gap-4 rounded-3xl border border-border p-3"
                    >
                      <img
                        src={item.image ?? "https://via.placeholder.com/80"}
                        alt={item.name}
                        className="h-16 w-16 rounded-2xl object-cover"
                      />
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-xs text-muted-foreground">Qty {item.quantity}</p>
                      </div>
                      <p className="font-semibold">{formatCurrency(item.price * item.quantity)}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-3xl border border-border bg-background p-5">
                <p className="text-sm text-muted-foreground">Order summary</p>
                <div className="mt-4 space-y-3 text-sm text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{formatCurrency(order.subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>{formatCurrency(order.tax)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery fee</span>
                    <span>{formatCurrency(order.delivery_fee)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Discount</span>
                    <span>-{formatCurrency(order.discount)}</span>
                  </div>
                  <div className="border-t border-border pt-3 font-semibold flex justify-between">
                    <span>Total</span>
                    <span>{formatCurrency(order.total)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/orders"
                className="rounded-full border border-border bg-background/80 px-5 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-foreground transition hover:border-primary hover:text-primary"
              >
                Back to my orders
              </Link>
              <Link
                to="/menu"
                className="rounded-full bg-primary px-5 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-primary-foreground transition hover:shadow-glow"
              >
                Continue browsing
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
