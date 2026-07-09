import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Heart, ArrowRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { DISHES } from "@/lib/data";
import { DishCard } from "@/components/DishCard";
import { getFavoriteDishIds, subscribeToFavorites } from "@/lib/favorites";

export const Route = createFileRoute("/_authenticated/favourites")({
  component: FavouritesPage,
});

function FavouritesPage() {
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => getFavoriteDishIds());

  useEffect(() => {
    const unsubscribe = subscribeToFavorites(() => setFavoriteIds(getFavoriteDishIds()));
    return unsubscribe;
  }, []);

  const favourites = useMemo(
    () => DISHES.filter((dish) => favoriteIds.includes(dish.id)),
    [favoriteIds],
  );

  return (
    <main className="min-h-screen bg-background px-4 py-24 sm:px-6 lg:px-8">
      <section className="container-luxe">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="divider-gold">Favourites</p>
            <h1 className="mt-4 font-display text-4xl md:text-5xl">Your saved favourites</h1>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Revisit the dishes you loved most and add them to your cart whenever you are ready.
            </p>
          </div>
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 rounded-full border border-primary/40 px-5 py-3 text-sm font-medium text-foreground transition hover:bg-primary/10 hover:text-primary"
          >
            Explore the menu
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {favourites.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl border border-dashed border-border bg-card/70 p-10 text-center"
          >
            <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-primary/10 text-primary">
              <Heart className="h-6 w-6" />
            </div>
            <h2 className="font-display text-2xl">No favourites yet</h2>
            <p className="mt-2 text-muted-foreground">
              Tap the heart on any dish to pin it here for quick access.
            </p>
          </motion.div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {favourites.map((dish, index) => (
              <DishCard key={dish.id} dish={dish} index={index} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
