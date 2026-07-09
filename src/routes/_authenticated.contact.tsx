import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Instagram,
  Facebook,
  Twitter,
  MessageCircleMore,
  Send,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { BackButton } from "@/components/BackButton";
import { BG_IMAGES } from "@/lib/images";

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
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<
    { role: "assistant" | "user"; content: string }[]
  >([
    {
      role: "assistant" as const,
      content:
        "Hi! I can help with reservations, menu questions, payments, and service issues. What do you need today?",
    },
  ]);

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userMessage = chatInput.trim();
    if (!userMessage) return;

    const reply = getChatReply(userMessage);
    setChatMessages((prev) => [
      ...prev,
      { role: "user", content: userMessage },
      { role: "assistant", content: reply },
    ]);
    setChatInput("");
  };

  return (
    <>
      <section className="relative overflow-hidden py-24 text-center md:py-32">
        <div className="absolute inset-0 -z-10">
          <img
            src={BG_IMAGES.contact}
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
              <Input
                label="Name"
                value={form.name}
                onChange={(v) => setForm({ ...form, name: v })}
              />
              <Input
                label="Email"
                type="email"
                value={form.email}
                onChange={(v) => setForm({ ...form, email: v })}
              />
              <Input
                label="Subject"
                value={form.subject}
                onChange={(v) => setForm({ ...form, subject: v })}
              />
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
            <div className="rounded-3xl border border-primary/25 bg-card p-6">
              <p className="divider-gold">Helpline & AI Chat</p>
              <p className="mt-3 text-sm text-muted-foreground">
                Need help with reservations, menu ideas, or any concern? Our support assistant is
                ready to guide you instantly.
              </p>
              <button
                type="button"
                onClick={() => setChatOpen((prev) => !prev)}
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
              >
                <MessageCircleMore className="h-4 w-4" />
                {chatOpen ? "Hide chat" : "Chat with us"}
              </button>
              {chatOpen && (
                <div className="mt-4 rounded-2xl border border-border bg-background/70 p-4 shadow-inner">
                  <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                    <Sparkles className="h-4 w-4" />
                    Spice Garden Assistant
                  </div>
                  <div className="mt-3 max-h-56 space-y-2 overflow-auto">
                    {chatMessages.map((msg, index) => (
                      <div
                        key={`${msg.role}-${index}`}
                        className={`max-w-[90%] rounded-2xl px-3 py-2 text-sm ${msg.role === "assistant" ? "bg-primary/10 text-foreground" : "ml-auto bg-primary text-primary-foreground"}`}
                      >
                        {msg.content}
                      </div>
                    ))}
                  </div>
                  <form onSubmit={handleChatSubmit} className="mt-3 flex gap-2">
                    <input
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="Ask about a reservation or issue"
                      className="flex-1 rounded-full border border-border bg-background/80 px-3 py-2 text-sm outline-none focus:border-primary/60"
                    />
                    <button
                      type="submit"
                      className="grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground"
                      aria-label="Send message"
                    >
                      <Send className="h-4 w-4" />
                    </button>
                  </form>
                </div>
              )}
            </div>
            <Info icon={MapPin} title="Address" text="HITEC City, Hyderabad" />
            <Info icon={Phone} title="Phone" text="+91 98765 43210" />
            <Info icon={Mail} title="Email" text="spicegarden106@gmail.com" />
            <Info icon={Clock} title="Hours" text="MON - SUN · Morning 11 to Night 12" />
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
            src="https://www.openstreetmap.org/export/embed.html?bbox=78.3745%2C17.4478%2C78.3883%2C17.4551&layer=mapnik"
            className="h-[420px] w-full grayscale-[40%]"
            loading="lazy"
          />
        </div>
      </section>
    </>
  );
}

function getChatReply(message: string) {
  const lower = message.toLowerCase().trim();

  if (!lower) {
    return "Hello! I can help with reservations, menu suggestions, timing, location, and support issues.";
  }

  const intentMatches: string[] = [];

  if (/(hi|hello|hey|good morning|good evening|help)/.test(lower)) {
    intentMatches.push("Hello! I’m Spice Garden’s support assistant.");
  }

  if (/(reservation|table|book|booking|reserve|seat|seats)/.test(lower)) {
    intentMatches.push(
      "We can help you reserve a table. Please share your preferred date, time, and guest count.",
    );
  }

  if (
    /(menu|dish|soup|food|allergy|vegetarian|vegan|recommend|special|taste|what do you serve)/.test(
      lower,
    )
  ) {
    intentMatches.push(
      "We offer a wide range of dishes, including soups, vegetarian favorites, and signature mains.",
    );
  }

  if (/(timing|time|open|close|hours|morning|night|sun|mon|today)/.test(lower)) {
    intentMatches.push("We are open every day from 11:00 AM to 12:00 AM.");
  }

  if (/(location|address|where|hitec|hyderabad|map|nearby)/.test(lower)) {
    intentMatches.push(
      "We’re located in HITEC City, Hyderabad, and the map on this page shows the area.",
    );
  }

  if (/(payment|bill|refund|charge|card|cash|price|cost)/.test(lower)) {
    intentMatches.push(
      "We can assist with billing or payment concerns. Share the concern and amount so we can help.",
    );
  }

  if (/(delay|late|order|delivery|wait|service|problem|issue|bad|angry|complaint)/.test(lower)) {
    intentMatches.push(
      "Sorry for the inconvenience. Tell us what happened so we can help resolve it.",
    );
  }

  if (/(phone|email|contact|number|reach)/.test(lower)) {
    intentMatches.push("You can reach us at +91 98765 43210 or spicegarden106@gmail.com.");
  }

  if (intentMatches.length > 0) {
    return intentMatches.join(" ");
  }

  return "I’m sorry, I couldn’t understand your request clearly. Please contact our restaurant support at +91 98765 43210 or spicegarden106@gmail.com for further help.";
}

function Input({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
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
