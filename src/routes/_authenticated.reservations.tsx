import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { useMemo, useState } from "react";
import { CalendarDays, Clock, Users, Sparkles, CheckCircle2 } from "lucide-react";
import { FAQS } from "@/lib/data";
import { BackButton } from "@/components/BackButton";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { BG_IMAGES } from "@/lib/images";


export const Route = createFileRoute("/_authenticated/reservations")({
  head: () => ({
    meta: [
      { title: "Reservations — Spice Garden" },
      { name: "description", content: "Book your table at Spice Garden." },
    ],
  }),
  component: ReservationsPage,
});

// Every 30 min from 09:00 to 23:00 inclusive
function buildTimes(): string[] {
  const out: string[] = [];
  for (let h = 9; h <= 23; h++) {
    out.push(`${String(h).padStart(2, "0")}:00`);
    if (h < 23) out.push(`${String(h).padStart(2, "0")}:30`);
  }
  return out;
}
const ALL_TIMES = buildTimes();

const todayStr = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

function ReservationsPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: user ? `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim() : "",
    email: user?.email ?? "",
    phone: user?.phone ?? "",
    guests: "2",
    date: todayStr(),
    time: "19:30",
    occasion: "Dinner",
    request: "",
  });
  const [done, setDone] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [submitting, setSubmitting] = useState(false);

  // Filter unavailable / past times
  const availableTimes = useMemo(() => {
    if (!form.date) return ALL_TIMES;
    if (form.date !== todayStr()) return ALL_TIMES;
    const now = new Date();
    return ALL_TIMES.filter((t) => {
      const [h, m] = t.split(":").map(Number);
      return h > now.getHours() || (h === now.getHours() && m > now.getMinutes());
    });
  }, [form.date]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) {
      toast.error("Please sign in to book a table");
      navigate({ to: "/login" });
      return;
    }
    if (!availableTimes.includes(form.time)) {
      toast.error("Please pick an available time slot");
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("reservations").insert({
      user_id: user.id,
      name: form.name,
      email: form.email,
      phone: form.phone,
      guests: Number(form.guests),
      reservation_date: form.date,
      reservation_time: form.time,
      occasion: form.occasion,
      request: form.request || null,
      status: "pending",
    });
    setSubmitting(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    setDone(true);
  }

  return (
    <>
      <section className="relative overflow-hidden py-24 text-center md:py-32">
        <div className="absolute inset-0 -z-10">
          <img src={BG_IMAGES.reservations} alt="" className="h-full w-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-black/70" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/30 to-background" />
        </div>
        <div className="container-luxe text-left">
          <BackButton />
        </div>
        <div className="container-luxe mt-6">
          <p className="divider-gold justify-center">Reservations</p>
          <h1 className="mx-auto mt-5 max-w-3xl font-display text-5xl leading-tight md:text-7xl">
            Reserve your <span className="gold-text italic">table.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
            Tables are released eight weeks in advance. We confirm every reservation by hand.
          </p>
        </div>
      </section>


      <section className="section-pad pt-0">
        <div className="container-luxe grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="glass-strong rounded-3xl p-6 shadow-luxe md:p-10"
          >
            <h2 className="font-display text-3xl">Your details</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Field label="Full name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
              <Field label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} required />
              <Field label="Phone" type="tel" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} required />
              <Field
                label="Guests"
                type="number"
                value={form.guests}
                onChange={(v) => setForm({ ...form, guests: v })}
                icon={<Users className="h-4 w-4" />}
                min={1}
                max={20}
              />
              <Field
                label="Date"
                type="date"
                value={form.date}
                onChange={(v) => setForm({ ...form, date: v })}
                icon={<CalendarDays className="h-4 w-4" />}
                required
                min={todayStr()}
              />
              <SelectField
                label="Time"
                value={form.time}
                onChange={(v) => setForm({ ...form, time: v })}
                options={availableTimes.length ? availableTimes : ["No slots today"]}
                icon={<Clock className="h-4 w-4" />}
              />
              <SelectField
                label="Occasion"
                value={form.occasion}
                onChange={(v) => setForm({ ...form, occasion: v })}
                options={["Dinner", "Birthday", "Anniversary", "Business", "Date Night"]}
                icon={<Sparkles className="h-4 w-4" />}
              />
              <Field
                label="Special request"
                value={form.request}
                onChange={(v) => setForm({ ...form, request: v })}
                placeholder="Dietary notes, allergies…"
                className="sm:col-span-2"
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="group relative mt-6 w-full overflow-hidden rounded-2xl bg-primary px-6 py-4 text-sm font-semibold uppercase tracking-[0.25em] text-primary-foreground shadow-glow disabled:opacity-60"
            >
              <span className="relative z-10">{submitting ? "Booking…" : "Book Now"}</span>
              <span className="absolute inset-0 -z-0 translate-y-full bg-primary-glow transition duration-500 group-hover:translate-y-0" />
            </button>
          </motion.form>

          <motion.aside
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            <div className="rounded-3xl border border-primary/30 bg-card p-7">
              <p className="divider-gold">Summary</p>
              <dl className="mt-4 space-y-2 text-sm">
                <Row label="Guests" value={form.guests} />
                <Row label="Date" value={form.date || "—"} />
                <Row label="Time" value={form.time} />
                <Row label="Occasion" value={form.occasion} />
              </dl>
            </div>
            <div className="rounded-3xl border border-border bg-card p-7">
              <p className="divider-gold">Service hours</p>
              <ul className="mt-4 space-y-2 text-sm text-foreground/80">
                <li className="flex justify-between"><span>Tuesday — Thursday</span><span className="text-muted-foreground">18:00 – 22:30</span></li>
                <li className="flex justify-between"><span>Friday — Saturday</span><span className="text-muted-foreground">17:30 – 23:00</span></li>
                <li className="flex justify-between"><span>Sunday</span><span className="text-muted-foreground">12:00 – 21:00</span></li>
                <li className="flex justify-between"><span>Monday</span><span className="text-muted-foreground">Closed</span></li>
              </ul>
            </div>
            <div className="rounded-3xl border border-border bg-card p-7">
              <p className="divider-gold">Policy</p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                A card is required to confirm. Cancellations are complimentary up to 48 hours
                before service. Tasting menus require pre-payment.
              </p>
            </div>
          </motion.aside>
        </div>
      </section>

      <section className="section-pad bg-surface">
        <div className="container-luxe max-w-3xl">
          <p className="divider-gold">FAQs</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">Before you book</h2>
          <div className="mt-10 space-y-3">
            {FAQS.map((f, i) => (
              <div key={f.q} className="overflow-hidden rounded-2xl border border-border bg-card">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between px-6 py-5 text-left"
                >
                  <span className="font-display text-lg">{f.q}</span>
                  <span className="text-primary">{openFaq === i ? "−" : "+"}</span>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.p
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-6 pb-5 text-sm leading-relaxed text-muted-foreground"
                    >
                      {f.a}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {done && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] grid place-items-center bg-background/85 p-6 backdrop-blur-xl"
            onClick={() => setDone(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="glass-strong max-w-md rounded-3xl p-10 text-center shadow-luxe"
            >
              <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-success/20 text-success">
                <CheckCircle2 className="h-10 w-10" />
              </div>
              <h3 className="mt-5 font-display text-3xl gold-text">Reservation requested</h3>
              <p className="mt-3 text-sm text-muted-foreground">
                A note has been sent to your maître d'. We will confirm by phone within four hours.
              </p>
              <button
                onClick={() => setDone(false)}
                className="mt-6 rounded-full bg-primary px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.25em] text-primary-foreground"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Field({
  label, value, onChange, type = "text", required, placeholder, icon, className = "", min, max,
}: {
  label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean;
  placeholder?: string; icon?: React.ReactNode; className?: string; min?: number | string; max?: number | string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </span>
      <div className="flex items-center gap-2 rounded-2xl border border-border bg-background/40 px-4 transition focus-within:border-primary/60 focus-within:ring-2 focus-within:ring-primary/30">
        {icon && <span className="text-primary">{icon}</span>}
        <input
          type={type}
          required={required}
          value={value}
          min={min}
          max={max}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground/70 [color-scheme:dark]"
        />
      </div>
    </label>
  );
}

function SelectField({
  label, value, onChange, options, icon,
}: {
  label: string; value: string; onChange: (v: string) => void; options: string[]; icon?: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </span>
      <div className="flex items-center gap-2 rounded-2xl border border-border bg-background/40 px-4">
        {icon && <span className="text-primary">{icon}</span>}
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none bg-transparent py-3 text-sm outline-none"
        >
          {options.map((o) => (
            <option key={o} value={o} className="bg-background">
              {o}
            </option>
          ))}
        </select>
      </div>
    </label>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-border/70 py-2 last:border-0">
      <dt className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}</dt>
      <dd className="font-medium">{value}</dd>
    </div>
  );
}
