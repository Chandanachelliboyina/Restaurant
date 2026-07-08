import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react, t as QueryClientProvider } from "../_libs/react+tanstack__react-query.mjs";
import { t as AuthProvider } from "./auth-BU19OWwl.mjs";
import { t as CartProvider } from "./cart-CwxFwYtG.mjs";
import { n as useTheme, t as ThemeProvider } from "./theme-ClJ4up73.mjs";
import { b as useRouter, c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, m as createFileRoute, p as lazyRouteComponent, s as Scripts } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as AnimatePresence } from "../_libs/framer-motion.mjs";
import { t as motion } from "../_libs/motion.mjs";
import { X as ArrowUp } from "../_libs/lucide-react.mjs";
import { t as hero_restaurant_default } from "./hero-restaurant-BDZG_w2W.mjs";
import { t as interior_default } from "./interior-BnrtO9R9.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { t as Route$17 } from "./signup-Behz8hE3.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-DeaG5CaU.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-D8xDW8WZ.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
}
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
function BackToTop() {
	const [visible, setVisible] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const onScroll = () => setVisible(window.scrollY > 400);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: visible && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.button, {
		initial: {
			opacity: 0,
			y: 30,
			scale: .8
		},
		animate: {
			opacity: 1,
			y: 0,
			scale: 1
		},
		exit: {
			opacity: 0,
			y: 30,
			scale: .8
		},
		transition: {
			duration: .25,
			ease: [
				.16,
				1,
				.3,
				1
			]
		},
		onClick: () => window.scrollTo({
			top: 0,
			behavior: "smooth"
		}),
		"aria-label": "Back to top",
		className: "fixed bottom-6 right-6 z-[70] grid h-12 w-12 place-items-center rounded-full bg-primary text-primary-foreground shadow-glow ring-1 ring-primary/40 backdrop-blur transition hover:scale-105 md:h-14 md:w-14",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUp, { className: "h-5 w-5" })
	}) });
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "radial-spot flex min-h-screen items-center justify-center px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "divider-gold justify-center",
					children: "404 — Lost in the garden"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-6 font-display text-6xl gold-text",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-muted-foreground",
					children: "The page you are looking for has been served to another table."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "mt-8 inline-flex items-center justify-center rounded-full bg-primary px-7 py-3 text-sm font-medium uppercase tracking-[0.2em] text-primary-foreground transition hover:shadow-glow",
					children: "Return Home"
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "radial-spot flex min-h-screen items-center justify-center px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "glass max-w-md rounded-3xl p-10 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl gold-text",
					children: "A moment, please"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-muted-foreground",
					children: "Something interrupted service. Refresh, or return to the entrance."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "rounded-full bg-primary px-6 py-2.5 text-xs font-medium uppercase tracking-[0.2em] text-primary-foreground",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "rounded-full border border-primary/50 px-6 py-2.5 text-xs font-medium uppercase tracking-[0.2em] text-foreground",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$16 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Spice Garden — Luxury Fine Dining" },
			{
				name: "description",
				content: "Spice Garden — a Michelin-inspired fine dining experience crafted by world-class chefs using rare, seasonal ingredients."
			},
			{
				name: "author",
				content: "Spice Garden"
			},
			{
				name: "theme-color",
				content: "#0F0F0F"
			},
			{
				property: "og:title",
				content: "Spice Garden — Luxury Fine Dining"
			},
			{
				property: "og:description",
				content: "A premium restaurant website offering an immersive digital fine dining experience with interactive elements."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:title",
				content: "Spice Garden — Luxury Fine Dining"
			},
			{
				name: "description",
				content: "A premium restaurant website offering an immersive digital fine dining experience with interactive elements."
			},
			{
				name: "twitter:description",
				content: "A premium restaurant website offering an immersive digital fine dining experience with interactive elements."
			},
			{
				property: "og:image",
				content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/ab78ffb8-2b42-416c-87fe-ae55a6d2da3c/id-preview-e143db40--de1d7a42-c157-45c5-8afe-a4fcce37c5e3.lovable.app-1782974120670.png"
			},
			{
				name: "twitter:image",
				content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/ab78ffb8-2b42-416c-87fe-ae55a6d2da3c/id-preview-e143db40--de1d7a42-c157-45c5-8afe-a4fcce37c5e3.lovable.app-1782974120670.png"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700;800&family=Poppins:wght@300;400;500;600&family=Inter:wght@400;500;600;700&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$16.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CartProvider, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackToTop, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemedToaster, {})
		] }) }) })
	});
}
function ThemedToaster() {
	const { theme } = useTheme();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {
		theme,
		position: "top-right"
	});
}
var $$splitComponentImporter$15 = () => import("./reset-password-BpCPSZBM.mjs");
var Route$15 = createFileRoute("/reset-password")({
	head: () => ({ meta: [{ title: "Set New Password — Spice Garden" }, {
		name: "description",
		content: "Choose a new password for your Spice Garden account."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$15, "component")
});
var $$splitComponentImporter$14 = () => import("./login-BKGDiktk.mjs");
var Route$14 = createFileRoute("/login")({
	head: () => ({ meta: [{ title: "Sign In — Spice Garden" }, {
		name: "description",
		content: "Sign in to your Spice Garden account."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$14, "component")
});
var $$splitComponentImporter$13 = () => import("./forgot-password-DhOOBd_J.mjs");
var Route$13 = createFileRoute("/forgot-password")({
	head: () => ({ meta: [{ title: "Reset Password — Spice Garden" }, {
		name: "description",
		content: "Recover access to your Spice Garden account."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var $$splitComponentImporter$12 = () => import("../_authenticated-BeXOaEE3.mjs");
var Route$12 = createFileRoute("/_authenticated")({ component: lazyRouteComponent($$splitComponentImporter$12, "component") });
var $$splitComponentImporter$11 = () => import("../_authenticated.index-Cd-2vE_N.mjs");
var Route$11 = createFileRoute("/_authenticated/")({
	head: () => ({ meta: [
		{ title: "Spice Garden — Good Food, Good Mood" },
		{
			name: "description",
			content: "A Michelin-inspired fine dining sanctuary. Reserve your table at Spice Garden today."
		},
		{
			property: "og:title",
			content: "Spice Garden — Good Food, Good Mood"
		},
		{
			property: "og:description",
			content: "Cinematic fine dining crafted by world-class chefs."
		},
		{
			property: "og:image",
			content: hero_restaurant_default
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("../_orderId-DsQqibUi.mjs");
var Route$10 = createFileRoute("/track/$orderId")({
	head: () => ({ meta: [{ title: "Track Order — Spice Garden" }] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("../_authenticated.reservations-BPXLhx0G.mjs");
var Route$9 = createFileRoute("/_authenticated/reservations")({
	head: () => ({ meta: [{ title: "Reservations — Spice Garden" }, {
		name: "description",
		content: "Book your table at Spice Garden."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("../_authenticated.profile-DppbAvse.mjs");
var Route$8 = createFileRoute("/_authenticated/profile")({
	head: () => ({ meta: [{ title: "Profile — Spice Garden" }, {
		name: "description",
		content: "Manage your reservations, wishlist and account."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("../_authenticated.orders-fXwHWnca.mjs");
var Route$7 = createFileRoute("/_authenticated/orders")({
	head: () => ({ meta: [{ title: "Orders — Spice Garden" }] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("../_authenticated.menu-WwstO3Xe.mjs");
var Route$6 = createFileRoute("/_authenticated/menu")({
	head: () => ({ meta: [{ title: "Menu — Spice Garden" }, {
		name: "description",
		content: "Seasonal tasting plates, signature mains and desserts."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("../_authenticated.gallery-D4gXZ1j5.mjs");
var Route$5 = createFileRoute("/_authenticated/gallery")({
	head: () => ({ meta: [{ title: "Gallery — Spice Garden" }, {
		name: "description",
		content: "A visual journey through the kitchen, the room and the plates."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("../_authenticated.favourites-J1AWa2Jo.mjs");
var Route$4 = createFileRoute("/_authenticated/favourites")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("../_authenticated.contact-BodLE_GQ.mjs");
var Route$3 = createFileRoute("/_authenticated/contact")({
	head: () => ({ meta: [{ title: "Contact — Spice Garden" }, {
		name: "description",
		content: "Get in touch with the Spice Garden team."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("../_authenticated.cart-D2sIllmz.mjs");
var Route$2 = createFileRoute("/_authenticated/cart")({
	head: () => ({ meta: [{ title: "Cart — Spice Garden" }] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("../_authenticated.account-DPZagmSq.mjs");
var Route$1 = createFileRoute("/_authenticated/account")({
	head: () => ({ meta: [{ title: "Account — Spice Garden" }] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("../_authenticated.about-BEtbewgj.mjs");
var Route = createFileRoute("/_authenticated/about")({
	head: () => ({ meta: [
		{ title: "About — Spice Garden" },
		{
			name: "description",
			content: "Our story, philosophy and the chefs behind Spice Garden."
		},
		{
			property: "og:title",
			content: "About — Spice Garden"
		},
		{
			property: "og:description",
			content: "A garden grown from one small table."
		},
		{
			property: "og:image",
			content: interior_default
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var SignupRoute = Route$17.update({
	id: "/signup",
	path: "/signup",
	getParentRoute: () => Route$16
});
var ResetPasswordRoute = Route$15.update({
	id: "/reset-password",
	path: "/reset-password",
	getParentRoute: () => Route$16
});
var LoginRoute = Route$14.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$16
});
var ForgotPasswordRoute = Route$13.update({
	id: "/forgot-password",
	path: "/forgot-password",
	getParentRoute: () => Route$16
});
var AuthenticatedRoute = Route$12.update({
	id: "/_authenticated",
	getParentRoute: () => Route$16
});
var AuthenticatedIndexRoute = Route$11.update({
	id: "/",
	path: "/",
	getParentRoute: () => AuthenticatedRoute
});
var TrackOrderIdRoute = Route$10.update({
	id: "/track/$orderId",
	path: "/track/$orderId",
	getParentRoute: () => Route$16
});
var AuthenticatedReservationsRoute = Route$9.update({
	id: "/reservations",
	path: "/reservations",
	getParentRoute: () => AuthenticatedRoute
});
var AuthenticatedProfileRoute = Route$8.update({
	id: "/profile",
	path: "/profile",
	getParentRoute: () => AuthenticatedRoute
});
var AuthenticatedOrdersRoute = Route$7.update({
	id: "/orders",
	path: "/orders",
	getParentRoute: () => AuthenticatedRoute
});
var AuthenticatedMenuRoute = Route$6.update({
	id: "/menu",
	path: "/menu",
	getParentRoute: () => AuthenticatedRoute
});
var AuthenticatedGalleryRoute = Route$5.update({
	id: "/gallery",
	path: "/gallery",
	getParentRoute: () => AuthenticatedRoute
});
var AuthenticatedFavouritesRoute = Route$4.update({
	id: "/favourites",
	path: "/favourites",
	getParentRoute: () => AuthenticatedRoute
});
var AuthenticatedContactRoute = Route$3.update({
	id: "/contact",
	path: "/contact",
	getParentRoute: () => AuthenticatedRoute
});
var AuthenticatedCartRoute = Route$2.update({
	id: "/cart",
	path: "/cart",
	getParentRoute: () => AuthenticatedRoute
});
var AuthenticatedAccountRoute = Route$1.update({
	id: "/account",
	path: "/account",
	getParentRoute: () => AuthenticatedRoute
});
var AuthenticatedRouteChildren = {
	AuthenticatedAboutRoute: Route.update({
		id: "/about",
		path: "/about",
		getParentRoute: () => AuthenticatedRoute
	}),
	AuthenticatedAccountRoute,
	AuthenticatedCartRoute,
	AuthenticatedContactRoute,
	AuthenticatedFavouritesRoute,
	AuthenticatedGalleryRoute,
	AuthenticatedMenuRoute,
	AuthenticatedOrdersRoute,
	AuthenticatedProfileRoute,
	AuthenticatedReservationsRoute,
	AuthenticatedIndexRoute
};
var rootRouteChildren = {
	AuthenticatedRoute: AuthenticatedRoute._addFileChildren(AuthenticatedRouteChildren),
	ForgotPasswordRoute,
	LoginRoute,
	ResetPasswordRoute,
	SignupRoute,
	TrackOrderIdRoute
};
var routeTree = Route$16._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
