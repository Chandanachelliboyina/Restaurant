import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Twitter, UtensilsCrossed } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden border-t border-border/70 bg-surface">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-32 h-64 bg-[radial-gradient(ellipse_at_center,_color-mix(in_oklab,_var(--primary)_18%,_transparent),_transparent_70%)]"
      />
      <div className="container-luxe relative flex flex-col items-center gap-6 py-14 text-center">
        <Link to="/" className="flex items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-primary/15 text-primary ring-1 ring-primary/40">
            <UtensilsCrossed className="h-5 w-5" />
          </span>
          <div className="text-left">
            <p className="font-display text-2xl gold-text">Spice Garden</p>
            <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
              Fine Dining · Est. 2008
            </p>
          </div>
        </Link>

        <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
          A Michelin-inspired sanctuary where seasonal ingredients are coaxed into quiet theatre by
          hands that have spent a lifetime perfecting the craft.
        </p>

        <div className="flex gap-3">
          {[Instagram, Facebook, Twitter].map((Icon, i) => (
            <a
              key={i}
              href="#"
              className="grid h-10 w-10 place-items-center rounded-full border border-primary/30 text-foreground/80 transition hover:bg-primary/10 hover:text-primary"
              aria-label="Social link"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>

      <div className="border-t border-border/60">
        <div className="container-luxe flex flex-col items-center justify-between gap-2 py-6 text-xs text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} Spice Garden. All rights reserved.</p>
          <p>Crafted with care · Three Michelin Stars</p>
        </div>
      </div>
    </footer>
  );
}
