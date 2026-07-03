import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter } from "lucide-react";
import { toast } from "sonner";
import { BackButton } from "@/components/BackButton";
import contactBg from "@/assets/bg-contact.jpg";


export const Route = createFileRoute("/_authenticated/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Spice Garden" },
      { name: "description", content: "Get in touch with the Spice Garden team." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  return (
    <>
      <section className="relative overflow-hidden py-24 text-center md:py-32">
        <div className="absolute inset-0 -z-10">
          <img
            src={contactBg}
            alt=""
            className="h-full w-full object-cover object-bottom"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/75" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/30 to-background" />
        </div>
        <div className="container-luxe text-left">
          <BackButton />
        </div>
        <div className="container-luxe mt-6">
          <p className="divider-gold justify-center">Contact</p>
          <h1 className="mx-auto mt-5 max-w-3xl font-display text-5xl leading-tight md:text-7xl">
            Let's <span className="gold-text italic">talk.</span>
          </h1>
        </div>
      </section>


      <section className="section-pad pt-0">
        <div className="container-luxe grid gap-8 lg:grid-cols-[1.1fr_1fr]">
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={(e) => {
              e.preventDefault();
              toast.success("Message sent — we'll reply shortly");
              setForm({ name: "", email: "", subject: "", message: "" });
            }}
            className="glass-strong rounded-3xl p-6 shadow-luxe md:p-10"
          >
            <h2 className="font-display text-3xl">Send us a note</h2>
            <div className="mt-6 grid gap-4">
              <Input label="Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
              <Input label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
              <Input label="Subject" value={form.subject} onChange={(v) => setForm({ ...form, subject: v })} />
              <label className="block">
                <span className="mb-1.5 block text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                  Message
                </span>
                <textarea
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full rounded-2xl border border-border bg-background/40 px-4 py-3 text-sm outline-none transition focus:border-primary/60 focus:ring-2 focus:ring-primary/30"
                />
              </label>
              <button
                type="submit"
                className="rounded-2xl bg-primary px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.25em] text-primary-foreground shadow-glow transition hover:shadow-luxe"
              >
                Send Message
              </button>
            </div>
          </motion.form>

          <motion.aside
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-5"
          >
            <Info icon={MapPin} title="Address" text="12 Garden Court, Mayfair, London W1K 5AB" />
            <Info icon={Phone} title="Phone" text="+44 20 7946 0188" />
            <Info icon={Mail} title="Email" text="reserve@spicegarden.co" />
            <Info icon={Clock} title="Hours" text="Tue – Sun · From 17:30" />
            <div className="rounded-3xl border border-border bg-card p-7">
              <p className="divider-gold">Follow</p>
              <div className="mt-4 flex gap-3">
                {[Instagram, Facebook, Twitter].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="grid h-11 w-11 place-items-center rounded-full border border-primary/30 text-foreground/80 transition hover:bg-primary/10 hover:text-primary"
                    aria-label="Social"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </motion.aside>
        </div>
      </section>

      <section className="container-luxe pb-24">
        <div className="overflow-hidden rounded-3xl border border-primary/30 shadow-luxe">
          <iframe
            title="Spice Garden location"
            src="https://www.openstreetmap.org/export/embed.html?bbox=-0.1530%2C51.5070%2C-0.1430%2C51.5130&layer=mapnik"
            className="h-[420px] w-full grayscale-[40%]"
            loading="lazy"
          />
        </div>
      </section>
    </>
  );
}

function Input({
  label, value, onChange, type = "text",
}: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-border bg-background/40 px-4 py-3 text-sm outline-none transition focus:border-primary/60 focus:ring-2 focus:ring-primary/30"
      />
    </label>
  );
}

function Info({ icon: Icon, title, text }: { icon: any; title: string; text: string }) {
  return (
    <div className="flex items-start gap-4 rounded-3xl border border-border bg-card p-6">
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary/15 text-primary ring-1 ring-primary/30">
        <Icon className="h-5 w-5" />
      </span>
      <div className="min-w-0">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{title}</p>
        <p className="mt-1 text-base font-medium">{text}</p>
      </div>
    </div>
  );
}
