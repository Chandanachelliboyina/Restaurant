import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Target, Eye, Sparkles, Award, Users, Building2, ChefHat, ArrowRight } from "lucide-react";
import chef from "@/assets/chef.jpg";
import interior from "@/assets/interior.jpg";
import aboutBg from "@/assets/bg-about.jpg";
import { BackButton } from "@/components/BackButton";
import { TIMELINE } from "@/lib/data";


export const Route = createFileRoute("/_authenticated/about")({
  head: () => ({
    meta: [
      { title: "About — Spice Garden" },
      { name: "description", content: "Our story, philosophy and the chefs behind Spice Garden." },
      { property: "og:title", content: "About — Spice Garden" },
      { property: "og:description", content: "A garden grown from one small table." },
      { property: "og:image", content: interior },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0">
          <img src={aboutBg} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-black/65" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/30 to-background" />
        </div>
        <div className="container-luxe relative">
          <BackButton />
        </div>
        <div className="container-luxe relative mt-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="divider-gold justify-center"
          >

            Our Story
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mx-auto mt-6 max-w-3xl font-display text-5xl leading-tight md:text-7xl"
          >
            Crafted with <span className="gold-text italic">restraint.</span> Served with{" "}
            <span className="gold-text italic">soul.</span>
          </motion.h1>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-luxe grid gap-8 md:grid-cols-3">
          {[
            { icon: Target, title: "Mission", text: "To make the most precise food in the world feel personal — never performative." },
            { icon: Eye, title: "Vision", text: "An evening at Spice Garden should be remembered like a piece of music." },
            { icon: Sparkles, title: "Philosophy", text: "Seasonality, restraint, generosity — in that order. Always in that order." },
          ].map((m, i) => (
            <motion.div
              key={m.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-3xl border border-border bg-card p-8"
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/15 text-primary ring-1 ring-primary/30">
                <m.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 font-display text-2xl">{m.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{m.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="section-pad bg-surface">
        <div className="container-luxe">
          <p className="divider-gold">Timeline</p>
          <h2 className="mt-3 max-w-2xl font-display text-4xl md:text-5xl">A quiet evolution</h2>
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {TIMELINE.map((t, i) => (
              <motion.div
                key={t.year}
                initial={{ opacity: 0, x: i % 2 ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="glass relative overflow-hidden rounded-3xl p-8"
              >
                <p className="font-display text-5xl gold-text">{t.year}</p>
                <h3 className="mt-3 font-display text-xl">{t.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{t.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-luxe grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <img
              src={chef}
              alt="Executive Chef"
              loading="lazy"
              className="aspect-[4/5] w-full rounded-[2.5rem] border border-primary/30 object-cover shadow-luxe"
            />
            <div className="glass absolute -bottom-6 -right-4 rounded-3xl px-7 py-5 shadow-luxe md:-right-10">
              <p className="font-display text-4xl gold-text">15+</p>
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                Years experience
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="divider-gold">Meet the Chef</p>
            <h2 className="mt-3 font-display text-4xl md:text-5xl">Marco Aurelio</h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Trained in Paris, Tokyo, San Sebastián and Copenhagen, Chef Marco has spent two
              decades distilling a single idea: the most luxurious thing on a plate is restraint.
              His signature lies not in what he adds, but in what he refuses to.
            </p>
            <p className="mt-6 font-display text-3xl italic gold-text">
              "Cook less. Cook better."
            </p>
            <p className="mt-4 text-xs uppercase tracking-[0.4em] text-muted-foreground">
              — Chef Marco Aurelio
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-pad bg-surface">
        <div className="container-luxe grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Users, n: "120k+", l: "Happy guests" },
            { icon: Award, n: "28", l: "International awards" },
            { icon: Building2, n: "4", l: "Branches worldwide" },
            { icon: ChefHat, n: "32", l: "Expert chefs" },
          ].map((s, i) => (
            <motion.div
              key={s.l}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-3xl border border-border bg-card p-7 text-center"
            >
              <s.icon className="mx-auto h-7 w-7 text-primary" />
              <p className="mt-4 font-display text-4xl gold-text">{s.n}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                {s.l}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="section-pad">
        <div className="container-luxe text-center">
          <h2 className="mx-auto max-w-2xl font-display text-4xl md:text-5xl">
            Come and be a guest at our table.
          </h2>
          <Link
            to="/reservations"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold uppercase tracking-[0.25em] text-primary-foreground shadow-glow"
          >
            Reserve <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
