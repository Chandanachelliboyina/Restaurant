import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState } from "react";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { BackButton } from "@/components/BackButton";

export const Route = createFileRoute("/_authenticated/cart")({
  head: () => ({ meta: [{ title: "Cart — Spice Garden" }] }),
  component: CartPage,
});

function CartPage() {
  const { items, totals, setQuantity, remove, clear } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [placing, setPlacing] = useState(false);

  const checkout = async () => {
    if (!user || items.length === 0 || placing) return;
    setPlacing(true);
    try {
      const { data: order, error } = await supabase
        .from("orders")
        .insert({
          user_id: user.id,
          subtotal: totals.subtotal,
          tax: totals.tax,
          delivery_fee: totals.delivery,
          discount: totals.discount,
          total: totals.total,
          status: "confirmed",
          payment_status: "paid",
        })
        .select()
        .single();
      if (error) throw error;
      const rows = items.map((i) => ({
        order_id: order.id,
        dish_id: i.id,
        name: i.name,
        image: i.image,
        price: i.price,
        quantity: i.quantity,
      }));
      const { error: itemsErr } = await supabase.from("order_items").insert(rows);
      if (itemsErr) throw itemsErr;
      clear();
      toast.success("Order placed successfully!");
      navigate({ to: "/orders" });
    } catch (e: any) {
      toast.error(e.message ?? "Could not place order");
    } finally {
      setPlacing(false);
    }
  };

  return (
    <section className="section-pad">
      <div className="container-luxe max-w-5xl">
        <BackButton />
        <motion.h1 initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="font-display text-4xl md:text-5xl">
          Your Cart
        </motion.h1>
        {items.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-border bg-card p-12 text-center">
            <ShoppingBag className="mx-auto h-10 w-10 text-primary" />
            <p className="mt-4 text-muted-foreground">Your cart is empty.</p>
            <Link to="/menu" className="mt-6 inline-block rounded-full bg-primary px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.25em] text-primary-foreground">
              Browse Menu
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
            <ul className="space-y-3">
              {items.map((i) => (
                <li key={i.id} className="flex gap-4 rounded-3xl border border-border bg-card p-4">
                  <img src={i.image} alt="" className="h-24 w-24 rounded-2xl object-cover" />
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-display text-lg">{i.name}</p>
                        <p className="text-xs text-muted-foreground">${i.price.toFixed(2)} each</p>
                      </div>
                      <button onClick={() => remove(i.id)} aria-label="Remove" className="text-muted-foreground hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="inline-flex items-center rounded-full border border-border">
                        <button onClick={() => setQuantity(i.id, i.quantity - 1)} className="grid h-8 w-8 place-items-center"><Minus className="h-3 w-3" /></button>
                        <span className="w-8 text-center text-sm">{i.quantity}</span>
                        <button onClick={() => setQuantity(i.id, i.quantity + 1)} className="grid h-8 w-8 place-items-center"><Plus className="h-3 w-3" /></button>
                      </div>
                      <p className="font-medium text-primary">${(i.price * i.quantity).toFixed(2)}</p>
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
                {totals.discount > 0 && <Row l="Discount" v={-totals.discount} className="text-success" />}
                <div className="mt-2 border-t border-border pt-3 flex justify-between font-display text-lg">
                  <span>Total</span><span className="text-primary">${totals.total.toFixed(2)}</span>
                </div>
              </dl>
              <button
                onClick={checkout}
                disabled={placing}
                className="mt-6 w-full rounded-full bg-primary px-6 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-primary-foreground disabled:opacity-60"
              >
                {placing ? "Placing…" : "Checkout"}
              </button>
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
      <dd>${v.toFixed(2)}</dd>
    </div>
  );
}
