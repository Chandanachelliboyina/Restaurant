import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { CATEGORIES, DISHES, type Category } from "@/lib/data";
import { DishCard } from "@/components/DishCard";
import { BackButton } from "@/components/BackButton";
import { BG_IMAGES } from "@/lib/images";


export const Route = createFileRoute("/_authenticated/menu")({
  head: () => ({
    meta: [
      { title: "Menu — Spice Garden" },
      { name: "description", content: "Seasonal tasting plates, signature mains and desserts." },
    ],
  }),
  component: MenuPage,
});

function MenuPage() {
  const [active, setActive] = useState<Category | "All">("All");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return DISHES.filter((d) => {
      const catMatch = active === "All" || d.category === active;
      if (!catMatch) return false;
      if (!query) return true;
      return (
        d.name.toLowerCase().includes(query) ||
        d.description.toLowerCase().includes(query) ||
        d.category.toLowerCase().includes(query)
      );
    });
  }, [active, q]);

  return (
    <>
      <section className="relative overflow-hidden py-24 text-center md:py-32">
        <div className="absolute inset-0 -z-10">
          <img src={BG_IMAGES.menu} alt="" className="h-full w-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-black/70" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/30 to-background" />
        </div>
        <div className="container-luxe text-left">
          <BackButton />
        </div>
        <div className="container-luxe mt-6">
          <p className="divider-gold justify-center">The Menu</p>
          <h1 className="mx-auto mt-5 max-w-3xl font-display text-5xl leading-tight md:text-7xl">
            Plates we are quietly <span className="gold-text italic">proud</span> of.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
            Our menu rotates with the season. Below is a glimpse — your tasting on the night is
            chosen by the chef.
          </p>
        </div>
      </section>


      <section className="container-luxe">
        <div className="glass-strong sticky top-24 z-30 flex flex-col gap-4 rounded-3xl p-4 md:flex-row md:items-center">
          <div className="flex items-center gap-2 rounded-2xl border border-border bg-background/40 px-4 py-2.5 md:w-72">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search dishes, ingredients…"
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground/70"
            />
            {q && (
              <button
                onClick={() => setQ("")}
                aria-label="Clear search"
                className="text-muted-foreground hover:text-primary"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <div className="-mx-1 flex flex-1 gap-2 overflow-x-auto px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {(["All", ...CATEGORIES] as const).map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`relative shrink-0 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition ${
                  active === c
                    ? "text-primary-foreground"
                    : "text-foreground/70 hover:text-primary"
                }`}
              >
                {active === c && (
                  <motion.span
                    layoutId="cat-active"
                    className="absolute inset-0 -z-10 rounded-full bg-primary"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-luxe">
          <AnimatePresence mode="popLayout">
            {filtered.length === 0 ? (
              <motion.p
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-20 text-center text-muted-foreground"
              >
                No items found — try another search or category.
              </motion.p>
            ) : (
              <motion.div
                key={active + q}
                layout
                className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
              >
                {filtered.map((d, i) => (
                  <DishCard key={d.id} dish={d} index={i} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}
