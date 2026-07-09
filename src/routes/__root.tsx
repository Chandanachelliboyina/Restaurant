import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { AuthProvider } from "../lib/auth";
import { CartProvider } from "../lib/cart";
import { ThemeProvider, useTheme } from "../lib/theme";
import { Toaster } from "@/components/ui/sonner";
import { BackToTop } from "@/components/BackToTop";

function NotFoundComponent() {
  return (
    <div className="radial-spot flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <p className="divider-gold justify-center">404 — Lost in the garden</p>
        <h1 className="mt-6 font-display text-6xl gold-text">Page not found</h1>
        <p className="mt-4 text-muted-foreground">
          The page you are looking for has been served to another table.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-primary px-7 py-3 text-sm font-medium uppercase tracking-[0.2em] text-primary-foreground transition hover:shadow-glow"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="radial-spot flex min-h-screen items-center justify-center px-4">
      <div className="glass max-w-md rounded-3xl p-10 text-center">
        <h1 className="font-display text-3xl gold-text">A moment, please</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Something interrupted service. Refresh, or return to the entrance.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="rounded-full bg-primary px-6 py-2.5 text-xs font-medium uppercase tracking-[0.2em] text-primary-foreground"
          >
            Try again
          </button>
          <a
            href="/"
            className="rounded-full border border-primary/50 px-6 py-2.5 text-xs font-medium uppercase tracking-[0.2em] text-foreground"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Spice Garden — Luxury Fine Dining" },
      {
        name: "description",
        content:
          "Spice Garden — a Michelin-inspired fine dining experience crafted by world-class chefs using rare, seasonal ingredients.",
      },
      { name: "author", content: "Spice Garden" },
      { name: "theme-color", content: "#0F0F0F" },
      { property: "og:title", content: "Spice Garden — Luxury Fine Dining" },
      {
        property: "og:description",
        content:
          "A premium restaurant website offering an immersive digital fine dining experience with interactive elements.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Spice Garden — Luxury Fine Dining" },
      {
        name: "description",
        content:
          "A premium restaurant website offering an immersive digital fine dining experience with interactive elements.",
      },
      {
        name: "twitter:description",
        content:
          "A premium restaurant website offering an immersive digital fine dining experience with interactive elements.",
      },
      {
        property: "og:image",
        content:
          "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/ab78ffb8-2b42-416c-87fe-ae55a6d2da3c/id-preview-e143db40--de1d7a42-c157-45c5-8afe-a4fcce37c5e3.lovable.app-1782974120670.png",
      },
      {
        name: "twitter:image",
        content:
          "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/ab78ffb8-2b42-416c-87fe-ae55a6d2da3c/id-preview-e143db40--de1d7a42-c157-45c5-8afe-a4fcce37c5e3.lovable.app-1782974120670.png",
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700;800&family=Poppins:wght@300;400;500;600&family=Inter:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <CartProvider>
            <Outlet />
            <BackToTop />
            <ThemedToaster />
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

function ThemedToaster() {
  const { theme } = useTheme();
  return <Toaster theme={theme} position="top-right" />;
}
