import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState } from "react";
import { formatCurrency } from "@/lib/utils";
import { CalendarDays, Heart, Receipt, Settings2, LogOut, User2, Star } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { DISHES } from "@/lib/data";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/profile")({
  head: () => ({
    meta: [
      { title: "Profile — Spice Garden" },
      { name: "description", content: "Manage your reservations, wishlist and account." },
    ],
  }),
  component: ProfilePage,
});

const TABS = [
  { id: "overview", label: "Overview", icon: User2 },
  { id: "reservations", label: "Reservations", icon: CalendarDays },
  { id: "wishlist", label: "Wishlist", icon: Heart },
  { id: "orders", label: "Orders", icon: Receipt },
  { id: "settings", label: "Settings", icon: Settings2 },
] as const;
type TabId = (typeof TABS)[number]["id"];

function ProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<TabId>("overview");

  if (!user) return null;
  const firstName = user.firstName || user.email.split("@")[0] || "Guest";
  const lastName = user.lastName || "";
  const initials = ((firstName[0] || "G") + (lastName[0] || "")).toUpperCase();

  return (
    <section className="section-pad">
      <div className="container-luxe grid gap-8 lg:grid-cols-[260px_1fr]">
        <aside className="space-y-6">
          <div className="glass-strong rounded-3xl p-6 text-center">
            <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-primary/20 font-display text-2xl text-primary ring-1 ring-primary/40">
              {initials}
            </div>
            <p className="mt-4 font-display text-xl">
              {firstName} {lastName}
            </p>
            <p className="text-xs text-muted-foreground">{user.email}</p>
            <span className="mt-3 inline-block rounded-full bg-primary/15 px-3 py-1 text-[0.65rem] uppercase tracking-[0.3em] text-primary">
              Gold Member
            </span>
          </div>
          <nav className="rounded-3xl border border-border bg-card p-2">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm transition ${
                  tab === t.id
                    ? "bg-primary/15 text-primary"
                    : "text-foreground/80 hover:bg-white/5"
                }`}
              >
                <t.icon className="h-4 w-4" />
                {t.label}
              </button>
            ))}
            <button
              onClick={() => {
                logout();
                navigate({ to: "/login" });
              }}
              className="mt-2 flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm text-destructive hover:bg-destructive/10"
            >
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          </nav>
        </aside>

        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {tab === "overview" && (
            <>
              <div className="grid gap-4 sm:grid-cols-3">
                <Stat n="12" l="Visits" />
                <Stat n="8" l="Favourites" />
                <Stat n="3" l="Upcoming bookings" />
              </div>
              <div className="rounded-3xl border border-border bg-card p-7">
                <h3 className="font-display text-2xl">Recent activity</h3>
                <ul className="mt-5 divide-y divide-border/60">
                  {[
                    ["Reservation confirmed", "Sat · 19:30 · 2 guests"],
                    ["Saved to wishlist", "Saffron Grilled Chicken"],
                    ["Tasting menu added", "11-course chef's tasting"],
                  ].map(([t, s]) => (
                    <li key={t} className="flex items-center justify-between py-3 text-sm">
                      <span className="font-medium">{t}</span>
                      <span className="text-muted-foreground">{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}

          {tab === "reservations" && (
            <div className="space-y-3">
              {[
                { date: "Sat, 12 Oct · 19:30", guests: 2, status: "Confirmed" },
                { date: "Fri, 25 Oct · 20:00", guests: 4, status: "Pending" },
                { date: "Sun, 03 Nov · 13:00", guests: 6, status: "Confirmed" },
              ].map((r) => (
                <div
                  key={r.date}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-border bg-card p-6"
                >
                  <div>
                    <p className="font-display text-lg">{r.date}</p>
                    <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                      {r.guests} guests
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs uppercase tracking-[0.25em] ${
                      r.status === "Confirmed"
                        ? "bg-success/15 text-success"
                        : "bg-primary/15 text-primary"
                    }`}
                  >
                    {r.status}
                  </span>
                </div>
              ))}
            </div>
          )}

          {tab === "wishlist" && (
            <div className="grid gap-4 sm:grid-cols-2">
              {DISHES.slice(0, 4).map((d) => (
                <div key={d.id} className="flex gap-4 rounded-3xl border border-border bg-card p-4">
                  <img src={d.image} alt="" className="h-20 w-20 rounded-2xl object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="font-display text-lg">{d.name}</p>
                    <p className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Star className="h-3 w-3 fill-primary text-primary" /> {d.rating} ·{" "}
                      {formatCurrency(d.price)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === "orders" && (
            <div className="rounded-3xl border border-border bg-card p-7">
              <h3 className="font-display text-2xl">Past orders</h3>
              <p className="mt-3 text-sm text-muted-foreground">
                No orders yet. Plates ordered through our private dining app will appear here.
              </p>
            </div>
          )}

          {tab === "settings" && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                toast.success("Settings saved");
              }}
              className="rounded-3xl border border-border bg-card p-7"
            >
              <h3 className="font-display text-2xl">Account</h3>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <SettingField label="First name" defaultValue={firstName} />
                <SettingField label="Last name" defaultValue={lastName} />
                <SettingField label="Email" defaultValue={user.email} />
                <SettingField label="Phone" defaultValue={user.phone || ""} />
              </div>
              <button className="mt-6 rounded-full bg-primary px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.25em] text-primary-foreground">
                Save changes
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div className="rounded-3xl border border-border bg-card p-6 text-center">
      <p className="font-display text-4xl gold-text">{n}</p>
      <p className="mt-1 text-xs uppercase tracking-[0.3em] text-muted-foreground">{l}</p>
    </div>
  );
}

function SettingField({ label, defaultValue }: { label: string; defaultValue: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </span>
      <input
        defaultValue={defaultValue}
        className="w-full rounded-2xl border border-border bg-background/40 px-4 py-3 text-sm outline-none transition focus:border-primary/60 focus:ring-2 focus:ring-primary/30"
      />
    </label>
  );
}
