import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import {
  ArrowRight,
  Award,
  ChefHat,
  Leaf,
  Sparkles,
  Star,
  ChevronDown,
  Quote,
  Instagram,
} from "lucide-react";
import hero from "@/assets/hero-restaurant.jpg";
import chef from "@/assets/chef.jpg";
import interior from "@/assets/interior.jpg";
import { DISHES, TESTIMONIALS } from "@/lib/data";
import { DishCard } from "@/components/DishCard";

export const Route = createFileRoute("/_authenticated/")({
  head: () => ({
    meta: [
      { title: "Spice Garden — Good Food, Good Mood" },
      {
        name: "description",
        content:
          "A Michelin-inspired fine dining sanctuary. Reserve your table at Spice Garden today.",
      },
      { property: "og:title", content: "Spice Garden — Good Food, Good Mood" },
      { property: "og:description", content: "Cinematic fine dining crafted by world-class chefs." },
      { property: "og:image", content: hero },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <Hero />
      <WhyChooseUs />
      <PopularDishes />
      <ChefSection />
      <Story />
      <TodaysSpecial />
      <Categories />
      <Testimonials />
      <InstagramFeed />
      <ReservationCTA />
    </>
  );
}

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative -mt-24 flex min-h-[100svh] items-center overflow-hidden"
    >
      <motion.div style={{ scale }} className="absolute inset-0">
        <img src={hero} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/40 to-background" />
      </motion.div>

      {/* Floating spices */}
      {[...Array(8)].map((_, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="absolute h-1.5 w-1.5 rounded-full bg-primary/70 blur-[1px]"
          style={{ left: `${10 + i * 11}%`, top: `${20 + (i % 3) * 18}%` }}
          animate={{ y: [0, -30, 0], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
        />
      ))}

      <motion.div
        style={{ y, opacity }}
        className="container-luxe relative z-10 grid place-items-center pt-32 text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="divider-gold"
        >
          ★★★ · Michelin Three Stars · Est. 2008
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 font-display text-[clamp(3rem,9vw,7.5rem)] font-semibold leading-[0.95]"
        >
          <span className="block">Good Food.</span>
          <span className="block gold-text italic">Good Mood.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55 }}
          className="mt-8 max-w-xl text-base leading-relaxed text-foreground/80 md:text-lg"
        >
          Experience unforgettable dining crafted by world-class chefs using rare, seasonal
          ingredients from our private garden.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.75 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            to="/reservations"
            className="group relative overflow-hidden rounded-full bg-primary px-8 py-4 text-sm font-semibold uppercase tracking-[0.25em] text-primary-foreground shadow-glow transition"
          >
            <span className="relative z-10 inline-flex items-center gap-2">
              Book a Table <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </span>
            <span className="absolute inset-0 -z-0 translate-y-full bg-primary-glow transition duration-500 group-hover:translate-y-0" />
          </Link>
          <Link
            to="/menu"
            className="rounded-full border border-primary/40 bg-background/40 px-8 py-4 text-sm font-semibold uppercase tracking-[0.25em] backdrop-blur-md transition hover:bg-primary/10"
          >
            Explore Menu
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-center"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-xs uppercase tracking-[0.4em] text-foreground/60"
        >
          Scroll
          <ChevronDown className="h-4 w-4 text-primary" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function WhyChooseUs() {
  const items = [
    {
      icon: ChefHat,
      title: "World-class Chefs",
      text: "A brigade led by three-Michelin-star talent with decades on the world stage.",
    },
    {
      icon: Leaf,
      title: "Garden to Table",
      text: "Rare herbs and produce from our private chef's garden, picked the same day.",
    },
    {
      icon: Sparkles,
      title: "Cinematic Service",
      text: "Choreographed service rituals that feel less like dining and more like theatre.",
    },
    {
      icon: Award,
      title: "Award Winning",
      text: "Recognised among the world's fifty finest restaurants three years running.",
    },
  ];
  return (
    <section className="section-pad">
      <div className="container-luxe">
        <SectionHeader eyebrow="Why Spice Garden" title="A different kind of evening" />
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-3xl border border-border bg-card p-7 transition hover:shadow-luxe"
            >
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl transition group-hover:bg-primary/20" />
              <span className="relative grid h-14 w-14 place-items-center rounded-2xl bg-primary/15 text-primary ring-1 ring-primary/30">
                <it.icon className="h-6 w-6" />
              </span>
              <h3 className="relative mt-6 font-display text-xl">{it.title}</h3>
              <p className="relative mt-3 text-sm leading-relaxed text-muted-foreground">
                {it.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PopularDishes() {
  return (
    <section className="section-pad bg-surface">
      <div className="container-luxe">
        <SectionHeader
          eyebrow="Popular Dishes"
          title="Tonight's signature plates"
          action={
            <Link
              to="/menu"
              className="hidden items-center gap-2 text-sm font-medium text-primary hover:underline md:inline-flex"
            >
              View full menu <ArrowRight className="h-4 w-4" />
            </Link>
          }
        />
        <div className="-mx-4 mt-12 overflow-x-auto px-4 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex gap-6 md:grid md:grid-cols-2 lg:grid-cols-3">
            {DISHES.map((d, i) => (
              <div key={d.id} className="w-[300px] shrink-0 md:w-auto">
                <DishCard dish={d} index={i} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ChefSection() {
  return (
    <section className="section-pad">
      <div className="container-luxe grid items-center gap-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="relative overflow-hidden rounded-[2.5rem] border border-primary/30 bg-card shadow-luxe">
            <img
              src={chef}
              alt="Executive Chef Marco Aurelio"
              loading="lazy"
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="glass absolute -bottom-6 -right-4 rounded-3xl px-7 py-5 shadow-luxe md:-right-10"
          >
            <p className="font-display text-4xl gold-text">15+</p>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Years of mastery
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="divider-gold">Meet the Chef</p>
          <h2 className="mt-4 font-display text-4xl leading-tight md:text-5xl">
            Chef Marco Aurelio
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            Trained in the kitchens of Paris and Tokyo, Chef Marco built Spice Garden around a
            single belief — that the most luxurious thing on a plate is restraint. Every menu is a
            quiet conversation between season, soil and fire.
          </p>
          <p className="mt-4 font-display text-2xl italic gold-text">"Cook less. Cook better."</p>
          <div className="mt-8 grid grid-cols-3 gap-4">
            {[
              ["12k+", "Guests"],
              ["28", "Awards"],
              ["4", "Branches"],
            ].map(([n, l]) => (
              <div
                key={l}
                className="rounded-2xl border border-border bg-card p-5 text-center"
              >
                <p className="font-display text-3xl gold-text">{n}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  {l}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Story() {
  return (
    <section className="section-pad bg-surface">
      <div className="container-luxe grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="divider-gold">Our Story</p>
          <h2 className="mt-4 font-display text-4xl leading-tight md:text-5xl">
            A garden grown from <span className="gold-text">one small table</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            What began as a twelve-seat counter in a quiet Mayfair townhouse has grown into one of
            Europe's most considered fine dining houses — without losing the intimacy that made it
            ours.
          </p>
          <Link
            to="/about"
            className="mt-7 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.3em] text-primary"
          >
            Read our story <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-[2rem] border border-border shadow-luxe"
        >
          <img
            src={interior}
            alt="Spice Garden dining room"
            loading="lazy"
            className="aspect-[4/3] w-full object-cover transition duration-[1.5s] hover:scale-105"
          />
        </motion.div>
      </div>
    </section>
  );
}

function TodaysSpecial() {
  const dish = DISHES[2];
  return (
    <section className="section-pad">
      <div className="container-luxe">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-[2.5rem] border border-primary/30 bg-gradient-to-br from-accent/40 via-card to-background p-8 shadow-luxe md:p-14"
        >
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <p className="divider-gold">Tonight's Special</p>
              <h2 className="mt-4 font-display text-4xl md:text-5xl">{dish.name}</h2>
              <p className="mt-4 max-w-md text-muted-foreground">{dish.description}</p>
              <div className="mt-6 flex flex-wrap items-center gap-6 text-sm">
                <span className="flex items-center gap-2"><Star className="h-4 w-4 fill-primary text-primary" /> {dish.rating}</span>
                <span className="font-display text-3xl gold-text">${dish.price}</span>
              </div>
              <Link
                to="/reservations"
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-primary-foreground shadow-glow"
              >
                Reserve to taste <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-full border border-primary/40 shadow-luxe"
            >
              <img src={dish.image} alt={dish.name} loading="lazy" className="h-full w-full object-cover" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Categories() {
  const cats = ["Starters", "Pasta", "Chicken", "Seafood", "Desserts", "Drinks"];
  return (
    <section className="section-pad bg-surface">
      <div className="container-luxe">
        <SectionHeader eyebrow="Explore" title="By the course" />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cats.map((c, i) => (
            <motion.div
              key={c}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="group relative overflow-hidden rounded-3xl border border-border bg-card p-8 transition hover:border-primary/40 hover:shadow-luxe"
            >
              <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
                0{i + 1}
              </p>
              <h3 className="mt-3 font-display text-3xl transition group-hover:gold-text">{c}</h3>
              <Link
                to="/menu"
                className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-primary"
              >
                Browse <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <div className="pointer-events-none absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl transition group-hover:bg-primary/25" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="section-pad">
      <div className="container-luxe">
        <SectionHeader eyebrow="In Their Words" title="Quietly celebrated" />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass relative rounded-3xl p-8"
            >
              <Quote className="h-8 w-8 text-primary/70" />
              <blockquote className="mt-4 text-base leading-relaxed text-foreground/90">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-6">
                <p className="font-display text-lg">{t.name}</p>
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  {t.role}
                </p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function InstagramFeed() {
  return (
    <section className="section-pad bg-surface">
      <div className="container-luxe">
        <SectionHeader
          eyebrow="@spicegarden"
          title="From our kitchen"
          action={
            <a
              href="#"
              className="hidden items-center gap-2 text-sm text-primary hover:underline md:inline-flex"
            >
              <Instagram className="h-4 w-4" /> Follow
            </a>
          }
        />
        <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {DISHES.map((d, i) => (
            <motion.a
              key={d.id}
              href="#"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group relative aspect-square overflow-hidden rounded-2xl border border-border"
            >
              <img
                src={d.image}
                alt={d.name}
                loading="lazy"
                className="h-full w-full object-cover transition duration-[1.2s] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-background/0 transition group-hover:bg-background/50" />
              <Instagram className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 text-primary opacity-0 transition group-hover:opacity-100" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

function ReservationCTA() {
  return (
    <section className="section-pad">
      <div className="container-luxe">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-[2.5rem] border border-primary/40 bg-gradient-to-br from-accent via-card to-background px-8 py-16 text-center shadow-luxe md:py-24"
        >
          <div className="absolute inset-x-0 -top-32 mx-auto h-72 w-72 rounded-full bg-primary/30 blur-[120px]" />
          <p className="divider-gold justify-center">Reserve</p>
          <h2 className="mt-4 font-display text-4xl leading-tight md:text-6xl">
            Your table is <span className="gold-text italic">waiting.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
            Book a table for a private chef's evening, a tasting menu, or a quiet two — service is
            always tailored to you.
          </p>
          <Link
            to="/reservations"
            className="mt-9 inline-flex items-center gap-2 rounded-full bg-primary px-9 py-4 text-sm font-semibold uppercase tracking-[0.25em] text-primary-foreground shadow-glow"
          >
            Book Now <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function SectionHeader({
  eyebrow,
  title,
  action,
}: {
  eyebrow: string;
  title: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <p className="divider-gold">{eyebrow}</p>
        <h2 className="mt-3 max-w-2xl font-display text-4xl leading-tight md:text-5xl">
          {title}
        </h2>
      </motion.div>
      {action}
    </div>
  );
}
