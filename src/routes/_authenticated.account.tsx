import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState } from "react";
import { LogOut, Mail, Phone, User2, ShieldCheck, ShieldAlert, Calendar } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { BackButton } from "@/components/BackButton";

export const Route = createFileRoute("/_authenticated/account")({
  head: () => ({ meta: [{ title: "Account — Spice Garden" }] }),
  component: AccountPage,
});

function AccountPage() {
  const { user, session, logout } = useAuth();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [changingPw, setChangingPw] = useState(false);
  const [saving, setSaving] = useState(false);
  const [firstName, setFirstName] = useState(user?.firstName ?? "");
  const [lastName, setLastName] = useState(user?.lastName ?? "");
  const [phone, setPhone] = useState(user?.phone ?? "");
  const [deliveryAddress, setDeliveryAddress] = useState(user?.deliveryAddress ?? "");
  const [avatarUrl, setAvatarUrl] = useState(user?.avatar ?? "");
  const [newPw, setNewPw] = useState("");
  const [uploading, setUploading] = useState(false);

  if (!user || !session) return null;
  const supaUser = session.user;
  const verified = !!supaUser.email_confirmed_at;
  const created = supaUser.created_at ? new Date(supaUser.created_at).toLocaleDateString() : "—";
  const initials = ((firstName[0] || user.email[0] || "G") + (lastName[0] || "")).toUpperCase();

  const saveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const { error } = await supabase.auth.updateUser({
      data: { first_name: firstName, last_name: lastName, phone, delivery_address: deliveryAddress, avatar_url: avatarUrl },
    });
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success("Profile updated");
    setEditing(false);
  };

  // Upload avatar image to Supabase Storage and update profile metadata
  const uploadAvatar = async (file: File | null) => {
    if (!file || !user) return;
    setUploading(true);
    try {
      const path = `avatars/${user.id}/avatar-${Date.now()}`;
      const { error: upErr } = await supabase.storage.from("avatars").upload(path, file, { upsert: true });
      if (upErr) throw upErr;
      const { data } = supabase.storage.from("avatars").getPublicUrl(path);
      const publicUrl = data.publicUrl;
      const { error: upd } = await supabase.auth.updateUser({ data: { avatar_url: publicUrl } });
      if (upd) throw upd;
      setAvatarUrl(publicUrl);
      toast.success("Profile photo updated");
    } catch (err: any) {
      console.error("[account] avatar upload failed:", err);
      toast.error(err?.message || "Failed to upload avatar");
    } finally {
      setUploading(false);
    }
  };

  const changePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPw.length < 8) return toast.error("Password must be at least 8 characters");
    const { error } = await supabase.auth.updateUser({ password: newPw });
    if (error) return toast.error(error.message);
    toast.success("Password changed");
    setNewPw("");
    setChangingPw(false);
  };

  return (
    <section className="section-pad">
      <div className="container-luxe max-w-3xl">
        <BackButton />
        <motion.h1 initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="font-display text-4xl md:text-5xl">
          Account
        </motion.h1>

        <div className="mt-8 rounded-3xl border border-border bg-card p-6 md:p-8">
          <div className="flex flex-wrap items-center gap-5">
            <div className="grid h-20 w-20 place-items-center rounded-full bg-primary/20 font-display text-2xl text-primary ring-1 ring-primary/40">
              {initials}
            </div>
            <div className="flex-1">
              <p className="font-display text-2xl">{firstName || "Guest"} {lastName}</p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              <span className={`mt-2 inline-flex items-center gap-1 rounded-full px-3 py-1 text-[0.65rem] uppercase tracking-[0.25em] ${verified ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive"}`}>
                {verified ? <ShieldCheck className="h-3 w-3" /> : <ShieldAlert className="h-3 w-3" />}
                {verified ? "Verified" : "Unverified"}
              </span>
            </div>
          </div>

          <dl className="mt-8 grid gap-4 sm:grid-cols-2">
            <Info icon={User2} l="Full Name" v={`${firstName || "—"} ${lastName}`.trim()} />
            <Info icon={Mail} l="Email" v={user.email} />
            <Info icon={Phone} l="Phone" v={phone || "—"} />
            <Info icon={Calendar} l="Delivery Address" v={deliveryAddress || "—"} />
            <Info icon={Calendar} l="Member Since" v={created} />
          </dl>

          <div className="mt-8 flex flex-wrap gap-3">
            <button onClick={() => setEditing((v) => !v)} className="rounded-full border border-primary/40 px-5 py-2 text-xs font-semibold uppercase tracking-[0.25em] hover:bg-primary/10">
              {editing ? "Cancel" : "Edit Profile"}
            </button>
            <button onClick={() => setChangingPw((v) => !v)} className="rounded-full border border-primary/40 px-5 py-2 text-xs font-semibold uppercase tracking-[0.25em] hover:bg-primary/10">
              {changingPw ? "Cancel" : "Change Password"}
            </button>
            <button
              onClick={async () => { await logout(); navigate({ to: "/login" }); }}
              className="inline-flex items-center gap-2 rounded-full bg-destructive/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-destructive hover:bg-destructive/20"
            >
              <LogOut className="h-3 w-3" /> Logout
            </button>
          </div>

          {editing && (
            <form onSubmit={saveProfile} className="mt-6 grid gap-4 border-t border-border pt-6 sm:grid-cols-2">
              <Field label="First name" value={firstName} onChange={setFirstName} />
              <Field label="Last name" value={lastName} onChange={setLastName} />
              <Field label="Phone" value={phone} onChange={setPhone} />
              <Field label="Delivery address" value={deliveryAddress} onChange={setDeliveryAddress} className="sm:col-span-2" />
              <label className="sm:col-span-2">
                <span className="mb-1.5 block text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">Profile photo</span>
                <div className="flex items-center gap-3">
                  <img src={avatarUrl || undefined} alt="avatar" className="h-12 w-12 rounded-full object-cover" />
                  <input type="file" accept="image/*" onChange={(e) => uploadAvatar(e.target.files?.[0] ?? null)} disabled={uploading} />
                </div>
              </label>
              <button disabled={saving} className="sm:col-span-2 rounded-full bg-primary px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.25em] text-primary-foreground disabled:opacity-60">
                {saving ? "Saving…" : "Save Changes"}
              </button>
            </form>
          )}

          {changingPw && (
            <form onSubmit={changePassword} className="mt-6 grid gap-4 border-t border-border pt-6">
              <Field label="New password" value={newPw} onChange={setNewPw} type="password" />
              <button className="rounded-full bg-primary px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.25em] text-primary-foreground">
                Update Password
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Info({ icon: Icon, l, v }: { icon: any; l: string; v: string }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-border/60 bg-background/30 p-4">
      <Icon className="mt-0.5 h-4 w-4 text-primary" />
      <div>
        <dt className="text-[0.65rem] uppercase tracking-[0.25em] text-muted-foreground">{l}</dt>
        <dd className="mt-1 text-sm">{v}</dd>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, type = "text", className = "" }: { label: string; value: string; onChange: (v: string) => void; type?: string; className?: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-border bg-background/40 px-4 py-3 text-sm outline-none transition focus:border-primary/60 focus:ring-2 focus:ring-primary/30"
      />
    </label>
  );
}
