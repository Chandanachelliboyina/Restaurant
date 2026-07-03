import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2 } from "lucide-react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { AuthShell, AuthInput, AuthButton } from "@/components/AuthShell";
import { toast } from "sonner";

const schema = z
  .object({
    firstName: z.string().trim().min(1, "Required").max(60),
    lastName: z.string().trim().min(1, "Required").max(60),
    email: z.string().trim().email("Enter a valid email"),
    phone: z.string().trim().min(6, "Invalid phone").max(20),
    password: z.string().min(8, "Min 8 characters"),
    confirm: z.string(),
    terms: z.literal(true, { message: "Accept the terms to continue" } as never),
  })
  .refine((d) => d.password === d.confirm, { path: ["confirm"], message: "Passwords do not match" });

const RESEND_COOLDOWN_SECONDS = 60;

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Create Account — Spice Garden" },
      { name: "description", content: "Join Spice Garden — reservations, tasting notes and private events." },
    ],
  }),
  component: SignupPage,
});

function SignupPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirm: "",
    terms: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"form" | "otp" | "done">("form");
  const [otp, setOtp] = useState("");
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  async function sendSignup(): Promise<boolean> {
    const { error } = await supabase.auth.signUp({
      email: form.email.trim(),
      password: form.password,
      options: {
        emailRedirectTo: `${window.location.origin}/`,
        data: {
          first_name: form.firstName.trim(),
          last_name: form.lastName.trim(),
          phone: form.phone.trim(),
        },
      },
    });
    if (error) {
      console.error("[signup] send failed:", error);
      const msg = /registered|already/i.test(error.message)
        ? "This email is already registered. Please sign in instead."
        : error.message || "We couldn't send the verification code. Please try again.";
      toast.error(msg);
      return false;
    }
    return true;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      setErrors(Object.fromEntries(parsed.error.issues.map((i) => [i.path[0] as string, i.message])));
      return;
    }
    setErrors({});
    setLoading(true);
    const ok = await sendSignup();
    setLoading(false);
    if (!ok) return;
    setStep("otp");
    setCooldown(RESEND_COOLDOWN_SECONDS);
    toast.success(`Verification code sent to ${form.email}`);
  }

  async function resend() {
    if (cooldown > 0 || loading) return;
    setLoading(true);
    const { error } = await supabase.auth.resend({
      type: "signup",
      email: form.email.trim(),
      options: { emailRedirectTo: `${window.location.origin}/` },
    });
    setLoading(false);
    if (error) {
      console.error("[signup] resend failed:", error);
      toast.error(error.message || "Couldn't resend the code. Please try again.");
      return;
    }
    setCooldown(RESEND_COOLDOWN_SECONDS);
    toast.success("A new code has been sent to your email.");
  }

  async function verify() {
    if (otp.length !== 6) {
      toast.error("Enter the 6-digit code from your email");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.verifyOtp({
      email: form.email.trim(),
      token: otp,
      type: "signup",
    });
    setLoading(false);
    if (error) {
      console.error("[signup] verify failed:", error);
      const msg = /expired/i.test(error.message)
        ? "That code has expired. Tap Resend to get a new one."
        : /invalid|incorrect|token/i.test(error.message)
          ? "That code is incorrect. Please check your email and try again."
          : error.message;
      toast.error(msg);
      return;
    }
    setStep("done");
    toast.success("Account verified — welcome!");
    setTimeout(() => navigate({ to: "/" }), 1200);
  }

  return (
    <AuthShell
      title={step === "done" ? "You're in" : step === "otp" ? "Verify your email" : "Create your account"}
      subtitle={
        step === "done"
          ? "Welcome to the table."
          : step === "otp"
            ? `Enter the 6-digit code we sent to ${form.email}.`
            : "Reserve, save dishes, and unlock seasonal chef's events."
      }
      footer={
        step === "form" && (
          <span>
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </span>
        )
      }
    >
      <AnimatePresence mode="wait">
        {step === "form" && (
          <motion.form
            key="form"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            onSubmit={onSubmit}
            className="space-y-4"
          >
            <div className="grid grid-cols-2 gap-3">
              <AuthInput
                label="First name"
                value={form.firstName}
                onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                error={errors.firstName}
              />
              <AuthInput
                label="Last name"
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                error={errors.lastName}
              />
            </div>
            <AuthInput
              label="Email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              error={errors.email}
            />
            <AuthInput
              label="Phone"
              type="tel"
              autoComplete="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              error={errors.phone}
            />
            <div className="grid grid-cols-2 gap-3">
              <AuthInput
                label="Password"
                type="password"
                autoComplete="new-password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                error={errors.password}
              />
              <AuthInput
                label="Confirm"
                type="password"
                autoComplete="new-password"
                value={form.confirm}
                onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                error={errors.confirm}
              />
            </div>
            <label className="flex items-start gap-2 text-xs text-muted-foreground">
              <input
                type="checkbox"
                checked={form.terms}
                onChange={(e) => setForm({ ...form, terms: e.target.checked })}
                className="mt-0.5 h-4 w-4 accent-primary"
              />
              I accept the <span className="text-primary">Terms</span> and{" "}
              <span className="text-primary">Privacy Policy</span>.
            </label>
            {errors.terms && <p className="text-xs text-destructive">{errors.terms}</p>}
            <AuthButton type="submit" loading={loading}>
              {loading ? "Sending code…" : "Send verification code"}
            </AuthButton>
          </motion.form>
        )}

        {step === "otp" && (
          <motion.div
            key="otp"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            className="space-y-5"
          >
            <input
              autoFocus
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
              className="w-full rounded-2xl border border-border bg-background/40 px-4 py-4 text-center font-display text-3xl tracking-[0.6em] outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/30"
              placeholder="••••••"
              inputMode="numeric"
              autoComplete="one-time-code"
            />
            <AuthButton onClick={verify} loading={loading} disabled={otp.length !== 6}>
              Verify & create account
            </AuthButton>
            <div className="flex items-center justify-between text-xs">
              <button
                type="button"
                onClick={() => setStep("form")}
                className="uppercase tracking-[0.3em] text-muted-foreground hover:text-primary"
              >
                ← Edit details
              </button>
              <button
                type="button"
                onClick={resend}
                disabled={cooldown > 0 || loading}
                className="uppercase tracking-[0.3em] text-primary disabled:text-muted-foreground disabled:cursor-not-allowed"
              >
                {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend code"}
              </button>
            </div>
            <p className="text-center text-[0.7rem] text-muted-foreground">
              The code expires in about an hour. Check your spam folder if it hasn't arrived.
            </p>
          </motion.div>
        )}

        {step === "done" && (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-4 py-6 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 14 }}
              className="grid h-20 w-20 place-items-center rounded-full bg-success/20 text-success"
            >
              <CheckCircle2 className="h-10 w-10" />
            </motion.div>
            <p className="text-sm text-muted-foreground">Redirecting you to the dining room…</p>
          </motion.div>
        )}
      </AnimatePresence>
    </AuthShell>
  );
}
