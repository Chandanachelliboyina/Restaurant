import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { useAuth } from "./auth";
import type { Dish } from "./data";

export interface CartItem {
  id: string;
  name: string;
  image: string;
  price: number;
  veg: boolean;
  quantity: number;
}

interface CartTotals {
  subtotal: number;
  tax: number;
  delivery: number;
  discount: number;
  total: number;
  itemCount: number;
}

interface CartContextValue {
  items: CartItem[];
  totals: CartTotals;
  add: (dish: Dish, qty?: number) => void;
  setQuantity: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = (userId: string | null) => `spice-garden.cart.${userId ?? "guest"}`;

export function CartProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const key = STORAGE_KEY(user?.id ?? null);
  const [items, setItems] = useState<CartItem[]>([]);

  // Load per-user cart on user change
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(key);
      setItems(raw ? (JSON.parse(raw) as CartItem[]) : []);
    } catch {
      setItems([]);
    }
  }, [key]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(key, JSON.stringify(items));
  }, [key, items]);

  const value: CartContextValue = useMemo(() => {
    const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
    const tax = +(subtotal * 0.08).toFixed(2);
    const delivery = subtotal > 0 && subtotal < 40 ? 4.99 : 0;
    const discount = subtotal >= 60 ? +(subtotal * 0.1).toFixed(2) : 0;
    const total = +(subtotal + tax + delivery - discount).toFixed(2);
    const itemCount = items.reduce((s, i) => s + i.quantity, 0);

    return {
      items,
      totals: { subtotal: +subtotal.toFixed(2), tax, delivery, discount, total, itemCount },
      add: (dish, qty = 1) =>
        setItems((prev) => {
          const existing = prev.find((p) => p.id === dish.id);
          if (existing) {
            return prev.map((p) => (p.id === dish.id ? { ...p, quantity: p.quantity + qty } : p));
          }
          return [
            ...prev,
            {
              id: dish.id,
              name: dish.name,
              image: dish.image,
              price: dish.price,
              veg: dish.veg,
              quantity: qty,
            },
          ];
        }),
      setQuantity: (id, qty) =>
        setItems((prev) =>
          qty <= 0
            ? prev.filter((p) => p.id !== id)
            : prev.map((p) => (p.id === id ? { ...p, quantity: qty } : p)),
        ),
      remove: (id) => setItems((prev) => prev.filter((p) => p.id !== id)),
      clear: () => setItems([]),
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
