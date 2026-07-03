import { motion } from "motion/react";
import { Link } from "@tanstack/react-router";
import { UtensilsCrossed } from "lucide-react";
import hero from "@/assets/hero-restaurant.jpg";
import type { ReactNode } from "react";

export function AuthShell({
  title,
  subtitle,
  emphasizeTitle,
  children,
  footer,
}: {
  title: string;
  subtitle?: string;
  emphasizeTitle?: boolean;
  children: ReactNode;
  footer?: ReactNode;
}) {

  return (
    <main className="relative min-h-dvh overflow-hidden bg-background">
      {/* Animated background */}
      <div className="absolute inset-0">
        <img
          src={hero}
          alt=""
          className="h-full w-full object-cover opacity-40"
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/70 to-background" />
        <motion.div
          aria-hidden
          className="absolute -left-32 top-1/4 h-[28rem] w-[28rem] rounded-full bg-primary/15 blur-[120px]"
          animate={{ x: [0, 60, 0], y: [0, -30, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="absolute -right-40 bottom-0 h-[26rem] w-[26rem] rounded-full bg-accent/40 blur-[140px]"
          animate={{ x: [0, -50, 0], y: [0, 40, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 mx-auto flex min-h-dvh max-w-md flex-col justify-center px-5 py-10">
        <Link to="/" className="mb-8 flex items-center justify-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-primary/15 text-primary ring-1 ring-primary/40">
            <UtensilsCrossed className="h-5 w-5" />
          </span>
          <span className="font-display text-2xl gold-text">Spice Garden</span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="glass-strong rounded-3xl p-8 shadow-luxe md:p-10"
        >
          {emphasizeTitle ? (
            <div className="text-center">
              <p className="divider-gold justify-center">Members Only</p>
              <h1 className="mt-4 font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-6xl">
                <span className="gold-text">{title}</span>
              </h1>
              {subtitle && (
                <p className="mx-auto mt-3 max-w-xs text-sm text-muted-foreground">{subtitle}</p>
              )}
            </div>
          ) : (
            <>
              <p className="divider-gold">Welcome</p>
              <h1 className="mt-3 font-display text-3xl leading-tight md:text-4xl">{title}</h1>
              {subtitle && <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>}
            </>
          )}
          <div className="mt-7">{children}</div>
        </motion.div>


        {footer && <div className="mt-6 text-center text-sm text-muted-foreground">{footer}</div>}
      </div>
    </main>
  );
}

export function AuthInput({
  label,
  error,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </span>
      <input
        {...props}
        className="w-full rounded-2xl border border-border bg-background/40 px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/60 focus:border-primary/60 focus:ring-2 focus:ring-primary/30"
      />
      {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
    </label>
  );
}

export function AuthButton({
  loading,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { loading?: boolean }) {
  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className="group relative w-full overflow-hidden rounded-2xl bg-primary px-5 py-3.5 text-sm font-semibold uppercase tracking-[0.2em] text-primary-foreground shadow-glow transition disabled:opacity-70"
    >
      <span className="relative z-10 inline-flex items-center justify-center gap-2">
        {loading && (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
        )}
        {children}
      </span>
      <span className="absolute inset-0 -z-0 translate-y-full bg-primary-glow transition duration-500 group-hover:translate-y-0" />
    </button>
  );
}

export function OAuthRow({ onProvider }: { onProvider: (p: "google" | "apple") => void }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <button
        type="button"
        onClick={() => onProvider("google")}
        className="flex items-center justify-center gap-2 rounded-2xl border border-border bg-background/40 px-4 py-3 text-sm font-medium transition hover:border-primary/40 hover:bg-primary/5"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4">
          <path fill="#EA4335" d="M12 11v3.2h5.3c-.2 1.3-1.7 3.9-5.3 3.9-3.2 0-5.8-2.7-5.8-6s2.6-6 5.8-6c1.8 0 3 .8 3.7 1.5l2.5-2.4C16.5 3.6 14.5 2.7 12 2.7 6.9 2.7 2.8 6.8 2.8 12s4.1 9.3 9.2 9.3c5.3 0 8.8-3.7 8.8-9 0-.6-.1-1-.1-1.5H12z"/>
        </svg>
        Google
      </button>
      <button
        type="button"
        onClick={() => onProvider("apple")}
        className="flex items-center justify-center gap-2 rounded-2xl border border-border bg-background/40 px-4 py-3 text-sm font-medium transition hover:border-primary/40 hover:bg-primary/5"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
          <path d="M16.5 12.3c0-2.3 1.9-3.4 2-3.4-1.1-1.6-2.8-1.8-3.4-1.9-1.5-.1-2.8.8-3.6.8-.7 0-1.9-.8-3.1-.8C7 7 5.3 8 4.4 9.6c-1.8 3.2-.5 7.9 1.3 10.5.9 1.3 2 2.8 3.4 2.7 1.3-.1 1.9-.9 3.6-.9 1.7 0 2.2.9 3.6.8 1.5 0 2.4-1.3 3.3-2.6 1-1.5 1.4-3 1.5-3.1-.1-.1-2.7-1-2.6-3.7zM14.3 4.8C15 4 15.5 2.9 15.3 1.8c-1 0-2.2.7-2.9 1.5-.7.7-1.2 1.9-1 2.9 1.1.1 2.2-.6 2.9-1.4z"/>
        </svg>
        Apple
      </button>
    </div>
  );
}

export function Divider({ label = "or" }: { label?: string }) {
  return (
    <div className="my-5 flex items-center gap-3 text-[0.65rem] uppercase tracking-[0.4em] text-muted-foreground">
      <span className="h-px flex-1 bg-border" />
      {label}
      <span className="h-px flex-1 bg-border" />
    </div>
  );
}
