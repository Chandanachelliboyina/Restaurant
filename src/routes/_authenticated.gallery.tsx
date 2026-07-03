import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { BackButton } from "@/components/BackButton";
import galleryBg from "@/assets/bg-gallery.jpg";

export const Route = createFileRoute("/_authenticated/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Spice Garden" },
      { name: "description", content: "A visual journey through the kitchen, the room and the plates." },
    ],
  }),
  component: GalleryPage,
});

type Cat = "All" | "Restaurant" | "Food" | "Chef" | "Events" | "Kitchen";

const U = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1200&q=80`;

const ITEMS: { src: string; cat: Exclude<Cat, "All"> }[] = [
  // Restaurant
  { src: U("1517248135467-4c7edcad34c4"), cat: "Restaurant" },
  { src: U("1552566626-52f8b828add9"), cat: "Restaurant" },
  { src: U("1414235077428-338989a2e8c0"), cat: "Restaurant" },
  { src: U("1466978913421-dad2ebd01d17"), cat: "Restaurant" },
  { src: U("1590846406792-0adc7f938f1d"), cat: "Restaurant" },
  { src: U("1544148103-0773bf10d330"), cat: "Restaurant" },
  { src: U("1600891964599-f61ba0e24092"), cat: "Restaurant" },
  { src: U("1424847651672-bf20a4b0982b"), cat: "Restaurant" },
  { src: U("1555396273-367ea4eb4db5"), cat: "Restaurant" },
  { src: U("1559339352-11d035aa65de"), cat: "Restaurant" },
  // Food
  { src: U("1565958011703-44f9829ba187"), cat: "Food" },
  { src: U("1414235077428-338989a2e8c0"), cat: "Food" },
  { src: U("1546069901-ba9599a7e63c"), cat: "Food" },
  { src: U("1567620905732-2d1ec7ab7445"), cat: "Food" },
  { src: U("1504674900247-0877df9cc836"), cat: "Food" },
  { src: U("1540189549336-e6e99c3679fe"), cat: "Food" },
  { src: U("1476224203421-9ac39bcb3327"), cat: "Food" },
  { src: U("1565299624946-b28f40a0ae38"), cat: "Food" },
  { src: U("1551782450-a2132b4ba21d"), cat: "Food" },
  { src: U("1484723091739-30a097e8f929"), cat: "Food" },
  // Chef
  { src: U("1577219491135-ce391730fb2c"), cat: "Chef" },
  { src: U("1583394293214-28ded15ee548"), cat: "Chef" },
  { src: U("1622021142947-da7dedc7c39a"), cat: "Chef" },
  { src: U("1607631568010-a87245c0daf8"), cat: "Chef" },
  { src: U("1600565193348-f74bd3c7ccdf"), cat: "Chef" },
  { src: U("1414235077428-338989a2e8c0"), cat: "Chef" },
  { src: U("1466637574441-749b8f19452f"), cat: "Chef" },
  { src: U("1587574293340-e0011c4e8ecf"), cat: "Chef" },
  { src: U("1600891964092-4316c288032e"), cat: "Chef" },
  { src: U("1631898039108-eab5a19b9c5c"), cat: "Chef" },
  // Events
  { src: U("1519671482749-fd09be7ccebf"), cat: "Events" },
  { src: U("1530023367847-a683933f4172"), cat: "Events" },
  { src: U("1464366400600-7168b8af9bc3"), cat: "Events" },
  { src: U("1478147427282-58a87a120781"), cat: "Events" },
  { src: U("1519671845924-1fd18db430b8"), cat: "Events" },
  { src: U("1511795409834-ef04bbd61622"), cat: "Events" },
  { src: U("1470336346630-8fe32c1e0eae"), cat: "Events" },
  { src: U("1414235077428-338989a2e8c0"), cat: "Events" },
  { src: U("1533174072545-7a4b6ad7a6c3"), cat: "Events" },
  { src: U("1523580494863-6f3031224c94"), cat: "Events" },
  // Kitchen
  { src: U("1466637574441-749b8f19452f"), cat: "Kitchen" },
  { src: U("1631898039108-eab5a19b9c5c"), cat: "Kitchen" },
  { src: U("1556909114-f6e7ad7d3136"), cat: "Kitchen" },
  { src: U("1590846406792-0adc7f938f1d"), cat: "Kitchen" },
  { src: U("1556910633-5099dc3971e2"), cat: "Kitchen" },
  { src: U("1600891964092-4316c288032e"), cat: "Kitchen" },
  { src: U("1592180095948-38ff2b18e04d"), cat: "Kitchen" },
  { src: U("1607083206869-4c7672e72a8a"), cat: "Kitchen" },
  { src: U("1519708227418-c8fd9a32b7a2"), cat: "Kitchen" },
  { src: U("1596040033229-a9821ebd058d"), cat: "Kitchen" },
];

function GalleryPage() {
  const [cat, setCat] = useState<Cat>("All");
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const items = useMemo(() => (cat === "All" ? ITEMS : ITEMS.filter((i) => i.cat === cat)), [cat]);

  const next = useCallback(() => setOpenIdx((i) => (i === null ? null : (i + 1) % items.length)), [items.length]);
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
          <img src={galleryBg} alt="" className="h-full w-full object-cover" loading="lazy" />
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
          <motion.div layout className="columns-1 gap-4 sm:columns-2 lg:columns-3 [column-fill:_balance]">
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
