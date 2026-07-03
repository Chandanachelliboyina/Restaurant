import { motion } from "motion/react";
import { Heart, Star, Flame, Clock, Plus, Minus, ShoppingBag } from "lucide-react";
import { useState } from "react";
import type { Dish } from "@/lib/data";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useCart } from "@/lib/cart";

export function DishCard({ dish, index = 0 }: { dish: Dish; index?: number }) {
  const [fav, setFav] = useState(false);
  const [qty, setQty] = useState(1);
  const { add } = useCart();
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8 }}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card transition-shadow duration-500 hover:shadow-luxe"
    >
      <div className="relative aspect-[5/4] overflow-hidden">
        <img
          src={dish.image}
          alt={dish.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent opacity-90" />
        <button
          onClick={() => {
            setFav((v) => !v);
            toast.success(fav ? "Removed from favourites" : "Added to favourites");
          }}
          aria-label="Add to favourites"
          className={cn(
            "absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full backdrop-blur-md transition",
            fav ? "bg-primary text-primary-foreground" : "bg-background/60 text-foreground hover:bg-primary/30"
          )}
        >
          <Heart className={cn("h-4 w-4", fav && "fill-current")} />
        </button>
        <div className="absolute left-4 top-4 flex items-center gap-2">
          <span
            className={cn(
              "grid h-5 w-5 place-items-center rounded-sm border-2 bg-background/80 backdrop-blur",
              dish.veg ? "border-green-600" : "border-red-600",
            )}
            aria-label={dish.veg ? "Vegetarian" : "Non-vegetarian"}
            title={dish.veg ? "Vegetarian" : "Non-vegetarian"}
          >
            <span className={cn("h-2 w-2 rounded-full", dish.veg ? "bg-green-600" : "bg-red-600")} />
          </span>
          <span className="flex items-center gap-1 rounded-full bg-background/70 px-3 py-1 text-xs font-medium backdrop-blur-md">
            <Star className="h-3.5 w-3.5 fill-primary text-primary" />
            {dish.rating.toFixed(1)}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-xl leading-tight">{dish.name}</h3>
          <p className="font-display text-xl gold-text">${dish.price}</p>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">
          {dish.description}
        </p>
        <div className="mt-1 flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5"><Flame className="h-3.5 w-3.5 text-primary/80" />{dish.calories} kcal</span>
          <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-primary/80" />{dish.cookTime} min</span>
        </div>
        <div className="mt-4 flex items-center gap-2">
          <div className="flex items-center gap-1 rounded-full border border-border bg-background/40 px-1">
            <button
              type="button"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="grid h-8 w-8 place-items-center rounded-full text-foreground/80 transition hover:bg-primary/10 hover:text-primary"
              aria-label="Decrease quantity"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="w-6 text-center text-sm font-semibold tabular-nums">{qty}</span>
            <button
              type="button"
              onClick={() => setQty((q) => Math.min(20, q + 1))}
              className="grid h-8 w-8 place-items-center rounded-full text-foreground/80 transition hover:bg-primary/10 hover:text-primary"
              aria-label="Increase quantity"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>
          <button
            onClick={() => {
              add(dish, qty);
              toast.success(`${dish.name} × ${qty} added to cart`);
              setQty(1);
            }}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-full border border-primary/40 bg-primary/5 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary transition hover:bg-primary hover:text-primary-foreground hover:shadow-glow"
          >
            <ShoppingBag className="h-3.5 w-3.5" />
            Add to Cart
          </button>
        </div>
      </div>
    </motion.article>
  );
}
