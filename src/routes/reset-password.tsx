import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AuthShell, AuthInput, AuthButton } from "@/components/AuthShell";
import { toast } from "sonner";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: "Set New Password — Spice Garden" },
      { name: "description", content: "Choose a new password for your Spice Garden account." },
    ],
  }),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [pw, setPw] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (pw.length < 8) return toast.error("Password must be at least 8 characters");
    if (pw !== confirm) return toast.error("Passwords do not match");
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password: pw });
    setLoading(false);
    if (error) {
      console.error("[reset-password] failed:", error);
      toast.error(error.message || "Couldn't update password. The link may have expired.");
      return;
    }
    toast.success("Password updated");
    navigate({ to: "/" });
  }

  return (
    <AuthShell
      title="Create a new password"
      subtitle="Make it memorable, make it strong."
      footer={
        <span>
          <Link to="/login" className="text-primary hover:underline">
            Back to login
          </Link>
        </span>
      }
    >
      <form onSubmit={submit} className="space-y-4">
        <AuthInput
          label="New password"
          type="password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          autoComplete="new-password"
        />
        <AuthInput
          label="Confirm password"
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          autoComplete="new-password"
        />
        <AuthButton type="submit" loading={loading}>
          Update password
        </AuthButton>
      </form>
    </AuthShell>
  );
}
