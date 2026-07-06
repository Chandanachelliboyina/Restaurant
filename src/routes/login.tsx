import { createFileRoute, Link, useNavigate, useRouter } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { z } from "zod";
import { UserPlus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { AuthShell, AuthInput, AuthButton } from "@/components/AuthShell";
import { toast } from "sonner";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const schema = z.object({
  email: z.string().trim().regex(emailRegex, "Enter a valid email (e.g. name@gmail.com)"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign In — Spice Garden" },
      { name: "description", content: "Sign in to your Spice Garden account." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const router = useRouter();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "", remember: true });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState<{ email?: boolean; password?: boolean }>({});

  const validation = useMemo(() => schema.safeParse(form), [form]);
  const isValid = validation.success;

  const liveErrors: Record<string, string> = {};
  if (!validation.success) {
    for (const issue of validation.error.issues) {
      liveErrors[issue.path[0] as string] = issue.message;
    }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched({ email: true, password: true });
    if (!validation.success) {
      setErrors(liveErrors);
      return;
    }
    setErrors({});
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: validation.data.email.trim(),
      password: validation.data.password,
    });
    setLoading(false);
    if (error) {
      console.error("[login] failed:", error);
      if (/confirm/i.test(error.message)) {
        toast.error("Please verify your email before signing in.");
        navigate({
          to: "/signup",
          search: {
            email: validation.data.email.trim(),
            step: "otp",
          },
        });
        return;
      }
      toast.error(
        /credentials/i.test(error.message)
          ? "Incorrect email or password."
          : error.message || "Unable to sign in. Please try again.",
      );
      return;
    }
    toast.success("Welcome back");
    router.invalidate();
    navigate({ to: "/" });
  }

  return (
    <AuthShell
      title="WELCOME"
      emphasizeTitle
      footer={
        <span className="text-muted-foreground">
          Signed in already? Enjoy your reserved table.
        </span>
      }
    >
      <div className="mb-6 rounded-2xl border border-primary/25 bg-primary/5 p-4 text-center">
        <p className="text-xs leading-relaxed text-foreground/80">
          Please create an account before signing in. Only registered users can access the Sign In page.
        </p>
        <Link
          to="/signup"
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full border border-primary/50 bg-primary/10 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.25em] text-primary transition hover:bg-primary hover:text-primary-foreground hover:shadow-glow"
        >
          <UserPlus className="h-4 w-4" />
          Create Account
        </Link>
      </div>

      <form onSubmit={onSubmit} noValidate className="space-y-4">
        <AuthInput
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="name@gmail.com"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          onBlur={() => setTouched((t) => ({ ...t, email: true }))}
          error={(touched.email && (errors.email || liveErrors.email)) || undefined}
        />
        <AuthInput
          label="Password"
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          onBlur={() => setTouched((t) => ({ ...t, password: true }))}
          error={(touched.password && (errors.password || liveErrors.password)) || undefined}
        />
        <div className="flex items-center justify-between text-xs">
          <label className="flex items-center gap-2 text-muted-foreground">
            <input
              type="checkbox"
              checked={form.remember}
              onChange={(e) => setForm({ ...form, remember: e.target.checked })}
              className="h-4 w-4 accent-primary"
            />
            Remember me
          </label>
          <Link to="/forgot-password" className="text-primary hover:underline">
            Forgot password?
          </Link>
        </div>
        <AuthButton type="submit" loading={loading} disabled={!isValid}>
          Sign in
        </AuthButton>
      </form>
    </AuthShell>
  );
}
