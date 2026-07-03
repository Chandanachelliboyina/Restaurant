import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { AuthShell, AuthInput, AuthButton } from "@/components/AuthShell";
import { toast } from "sonner";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({
    meta: [
      { title: "Reset Password — Spice Garden" },
      { name: "description", content: "Recover access to your Spice Garden account." },
    ],
  }),
  component: ForgotPage,
});

function ForgotPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setLoading(false);
    if (error) {
      console.error("[reset] failed:", error);
      toast.error(error.message || "Couldn't send reset link. Please try again.");
      return;
    }
    setSent(true);
    toast.success("Reset link sent — check your email.");
  }

  return (
    <AuthShell
      title={sent ? "Check your email" : "Forgot password?"}
      subtitle={
        sent
          ? `We sent a password reset link to ${email}.`
          : "Tell us your email and we'll send a reset link."
      }
      footer={
        <span>
          Remembered it?{" "}
          <Link to="/login" className="text-primary hover:underline">
            Back to login
          </Link>
        </span>
      }
    >
      <AnimatePresence mode="wait">
        {!sent ? (
          <motion.form
            key="email"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            onSubmit={submit}
            className="space-y-4"
          >
            <AuthInput
              label="Email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <AuthButton loading={loading} type="submit">
              Send reset link
            </AuthButton>
          </motion.form>
        ) : (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-4 py-4 text-center"
          >
            <div className="grid h-20 w-20 place-items-center rounded-full bg-success/20 text-success">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <p className="text-xs text-muted-foreground">
              <Mail className="inline h-3.5 w-3.5" /> Click the link in the email to set a new password.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </AuthShell>
  );
}
