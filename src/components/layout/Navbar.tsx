import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { Menu, X, UtensilsCrossed, LogOut, ShoppingBag } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ThemeToggle";


import navImage from "@/assets/photo-1571336350540-8b189c0779f4.avif";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/favourites", label: "Favourites" },
  { to: "/gallery", label: "Gallery" },
  { to: "/reservations", label: "Reservations" },
  { to: "/orders", label: "Orders" },
  { to: "/account", label: "Account" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const { totals } = useCart();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "py-2" : "py-4"
      )}
    >
      <div className="container-luxe">
        <div
          className={cn(
            "flex items-center justify-between rounded-full px-5 py-3 transition-all duration-500 md:px-7",
            scrolled
              ? "glass-strong shadow-luxe"
              : "border border-transparent bg-background/10 backdrop-blur-sm"
          )}
        >
          <Link to="/" className="flex items-center gap-2 group">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-primary/15 text-primary ring-1 ring-primary/40 transition group-hover:bg-primary/25">
              <UtensilsCrossed className="h-5 w-5" />
            </span>
            <span className="font-display text-lg leading-none">
              <span className="block gold-text font-semibold">Spice</span>
              <span className="block text-[0.7rem] uppercase tracking-[0.4em] text-muted-foreground">
                Garden
              </span>
            </span>
          </Link>

          <img src={navImage} alt="Menu" className="hidden h-10 w-10 rounded-full border border-border object-cover lg:block" />

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV.map((n) => {
              const active = pathname === n.to;
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-sm font-medium transition",
                    active ? "text-primary" : "text-foreground/80 hover:text-primary"
                  )}
                >
                  {n.label}
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-full bg-primary/10 ring-1 ring-primary/30"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <ThemeToggle />
            <Link
              to="/cart"
              aria-label="Cart"
              className="relative grid h-10 w-10 place-items-center rounded-full border border-primary/40 text-foreground transition hover:bg-primary/10 hover:text-primary"
            >
              <ShoppingBag className="h-4 w-4" />
              {totals.itemCount > 0 && (
                <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[0.65rem] font-bold text-primary-foreground">
                  {totals.itemCount}
                </span>
              )}
            </Link>
            {user ? (
              <button
                onClick={() => {
                  logout();
                  navigate({ to: "/login" });
                }}
                aria-label="Log out"
                className="inline-flex items-center gap-2 rounded-full border border-primary/40 px-5 py-2 text-sm font-medium text-foreground transition hover:bg-primary/10 hover:text-primary"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="rounded-full border border-primary/40 px-5 py-2 text-sm font-medium text-foreground transition hover:bg-primary/10"
              >
                Login
              </Link>
            )}
          </div>


          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <Link
              to="/cart"
              aria-label="Cart"
              className="relative grid h-10 w-10 place-items-center rounded-full border border-primary/40 text-foreground"
            >
              <ShoppingBag className="h-4 w-4" />
              {totals.itemCount > 0 && (
                <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[0.65rem] font-bold text-primary-foreground">
                  {totals.itemCount}
                </span>
              )}
            </Link>
            <button
            onClick={() => setOpen((v) => !v)}
            className="grid h-11 w-11 place-items-center rounded-full border border-primary/30 text-primary"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {open ? (
                <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                  <X className="h-5 w-5" />
                </motion.span>
              ) : (
                <motion.span key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                  <Menu className="h-5 w-5" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
          </div>
        </div>
      </div>


      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="container-luxe mt-3 lg:hidden"
          >
            <div className="glass-strong rounded-3xl p-5 shadow-luxe">
              <nav className="flex flex-col">
                {NAV.map((n) => {
                  const active = pathname === n.to;
                  return (
                    <Link
                      key={n.to}
                      to={n.to}
                      className={cn(
                        "rounded-2xl px-4 py-3 text-base font-medium transition",
                        active ? "bg-primary/10 text-primary" : "text-foreground/85 hover:bg-white/5"
                      )}
                    >
                      {n.label}
                    </Link>
                  );
                })}
              </nav>
              <div className="mt-4 flex flex-col gap-2">
                {user ? (
                  <button
                    onClick={() => {
                      logout();
                      navigate({ to: "/login" });
                    }}
                    className="rounded-full border border-primary/40 px-5 py-3 text-center text-sm font-medium"
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    to="/login"
                    className="rounded-full border border-primary/40 px-5 py-3 text-center text-sm font-medium"
                  >
                    Login
                  </Link>
                )}
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
