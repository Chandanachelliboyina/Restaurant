import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { BackButton } from "@/components/BackButton";
import { BG_IMAGES, GALLERY_IMAGES } from "@/lib/images";

export const Route = createFileRoute("/_authenticated/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Spice Garden" },
      {
        name: "description",
        content: "A visual journey through the kitchen, the room and the plates.",
      },
    ],
  }),
  component: GalleryPage,
});

type Cat = "All" | "Restaurant" | "Food" | "Chef" | "Events" | "Kitchen";

const ITEMS: { src: string; cat: Exclude<Cat, "All"> }[] = [
  // Restaurant
  ...GALLERY_IMAGES.restaurant.map((img) => ({ src: img.src, cat: "Restaurant" as const })),
  // Food
  ...GALLERY_IMAGES.food.map((img) => ({ src: img.src, cat: "Food" as const })),
  // Chef
  ...GALLERY_IMAGES.chef.map((img) => ({ src: img.src, cat: "Chef" as const })),
  // Events
  ...GALLERY_IMAGES.events.map((img) => ({ src: img.src, cat: "Events" as const })),
  // Kitchen
  ...GALLERY_IMAGES.kitchen.map((img) => ({ src: img.src, cat: "Kitchen" as const })),
];

function GalleryPage() {
  const [cat, setCat] = useState<Cat>("All");
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const items = useMemo(() => (cat === "All" ? ITEMS : ITEMS.filter((i) => i.cat === cat)), [cat]);

  const next = useCallback(
    () => setOpenIdx((i) => (i === null ? null : (i + 1) % items.length)),
    [items.length],
  );
  const prev = useCallback(
    () => setOpenIdx((i) => (i === null ? null : (i - 1 + items.length) % items.length)),
    [items.length],
  );

  useEffect(() => {
    if (openIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIdx(null);
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIdx, next, prev]);

  return (
    <>
      <section className="relative overflow-hidden py-24 text-center md:py-32">
        <div className="absolute inset-0 -z-10">
          <img
            src={BG_IMAGES.gallery}
            alt=""
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/70" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/30 to-background" />
        </div>
        <div className="container-luxe text-left">
          <BackButton />
        </div>
        <div className="container-luxe mt-6">
          <p className="divider-gold justify-center">Gallery</p>
          <h1 className="mx-auto mt-5 max-w-3xl font-display text-5xl leading-tight md:text-7xl">
            A house of <span className="gold-text italic">moments.</span>
          </h1>
        </div>
      </section>

      <section className="container-luxe">
        <div className="flex flex-wrap justify-center gap-2">
          {(["All", "Restaurant", "Food", "Chef", "Events", "Kitchen"] as Cat[]).map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`rounded-full border px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition ${
                cat === c
                  ? "border-primary bg-primary text-primary-foreground shadow-glow"
                  : "border-border text-foreground/80 hover:border-primary/40 hover:text-primary"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      <section className="section-pad">
        <div className="container-luxe">
          <motion.div
            layout
            className="columns-1 gap-4 sm:columns-2 lg:columns-3 [column-fill:_balance]"
          >
            <AnimatePresence>
              {items.map((it, i) => (
                <motion.button
                  layout
                  key={it.src + i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: (i % 6) * 0.04 }}
                  onClick={() => setOpenIdx(i)}
                  className="group mb-4 block w-full overflow-hidden rounded-3xl border border-border bg-card"
                >
                  <img
                    src={it.src}
                    alt=""
                    loading="lazy"
                    className="w-full object-cover transition duration-[1.4s] group-hover:scale-110"
                  />
                </motion.button>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {openIdx !== null && items[openIdx] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenIdx(null)}
            className="fixed inset-0 z-[80] grid place-items-center bg-background/90 p-6 backdrop-blur-xl"
          >
            <motion.img
              key={items[openIdx].src}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              src={items[openIdx].src}
              alt=""
              onClick={(e) => e.stopPropagation()}
              className="max-h-[85vh] max-w-[90vw] rounded-3xl border border-primary/30 object-contain shadow-luxe"
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                setOpenIdx(null);
              }}
              aria-label="Close"
              className="absolute right-6 top-6 grid h-12 w-12 place-items-center rounded-full border border-primary/40 bg-background/60 text-primary backdrop-blur-md hover:bg-primary hover:text-primary-foreground"
            >
              <X className="h-5 w-5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Previous image"
              className="absolute left-4 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-primary/40 bg-background/60 text-primary backdrop-blur-md hover:bg-primary hover:text-primary-foreground md:left-8"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Next image"
              className="absolute right-4 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-primary/40 bg-background/60 text-primary backdrop-blur-md hover:bg-primary hover:text-primary-foreground md:right-8"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-background/60 px-4 py-1.5 text-xs text-foreground/80 backdrop-blur-md">
              {openIdx + 1} / {items.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
