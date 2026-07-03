import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { CheckCircle2, ChefHat, Flame, Package, Truck } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { BackButton } from "@/components/BackButton";

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

type Order = {
  id: string;
  created_at: string;
  status: string;
  payment_status: string;
  subtotal: number;
  tax: number;
  delivery_fee: number;
  discount: number;
  total: number;
  order_items: { id: string; name: string; price: number; quantity: number; image: string }[];
};

function OrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const { data } = await supabase
        .from("orders")
        .select("*, order_items(*)")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      setOrders((data ?? []) as Order[]);
      setLoading(false);
    })();
  }, [user]);

  return (
    <section className="section-pad">
      <div className="container-luxe max-w-5xl">
        <BackButton />
        <motion.h1 initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="font-display text-4xl md:text-5xl">
          Your Orders
        </motion.h1>

        {loading ? (
          <p className="mt-10 text-muted-foreground">Loading orders…</p>
        ) : orders.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-border bg-card p-12 text-center">
            <p className="text-muted-foreground">You haven't placed any orders yet.</p>
            <Link to="/menu" className="mt-6 inline-block rounded-full bg-primary px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.25em] text-primary-foreground">
              Order Now
            </Link>
          </div>
        ) : (
          <ul className="mt-8 space-y-6">
            {orders.map((o) => {
              const activeIdx = Math.max(0, STAGES.findIndex((s) => s.id === o.status));
              return (
                <li key={o.id} className="rounded-3xl border border-border bg-card p-6">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                        Order #{o.id.slice(0, 8)}
                      </p>
                      <p className="text-sm text-muted-foreground">{new Date(o.created_at).toLocaleString()}</p>
                    </div>
                    <div className="flex gap-2">
                      <span className="rounded-full bg-primary/15 px-3 py-1 text-[0.65rem] uppercase tracking-[0.25em] text-primary">
                        {o.status}
                      </span>
                      <span className="rounded-full bg-success/15 px-3 py-1 text-[0.65rem] uppercase tracking-[0.25em] text-success">
                        {o.payment_status}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center gap-2 overflow-x-auto">
                    {STAGES.map((s, i) => {
                      const done = i <= activeIdx;
                      const Icon = s.icon;
                      return (
                        <div key={s.id} className="flex flex-1 items-center gap-2 min-w-fit">
                          <div className={`grid h-9 w-9 place-items-center rounded-full border transition ${done ? "border-primary bg-primary/15 text-primary" : "border-border text-muted-foreground"}`}>
                            <Icon className="h-4 w-4" />
                          </div>
                          <span className={`text-xs whitespace-nowrap ${done ? "text-foreground" : "text-muted-foreground"}`}>{s.label}</span>
                          {i < STAGES.length - 1 && <div className={`h-px flex-1 ${i < activeIdx ? "bg-primary" : "bg-border"}`} />}
                        </div>
                      );
                    })}
                  </div>

                  <ul className="mt-6 divide-y divide-border/60">
                    {o.order_items.map((it) => (
                      <li key={it.id} className="flex items-center gap-4 py-3">
                        <img src={it.image} alt="" className="h-14 w-14 rounded-xl object-cover" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{it.name}</p>
                          <p className="text-xs text-muted-foreground">Qty: {it.quantity} · ${it.price.toFixed(2)}</p>
                        </div>
                        <p className="text-sm">${(it.price * it.quantity).toFixed(2)}</p>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 flex justify-end font-display text-lg">
                    Total <span className="ml-3 text-primary">${o.total.toFixed(2)}</span>
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
