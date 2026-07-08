import { o as __toESM } from "./_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "./_libs/react+tanstack__react-query.mjs";
import { n as useAuth } from "./_ssr/auth-BU19OWwl.mjs";
import { n as useCart } from "./_ssr/cart-CwxFwYtG.mjs";
import { n as useTheme } from "./_ssr/theme-ClJ4up73.mjs";
import { t as photo_1571336350540_8b189c0779f4_default } from "./_ssr/photo-1571336350540-8b189c0779f4-CrbVpm3w.mjs";
import { t as cn } from "./_ssr/utils-Dz0d21t-.mjs";
import { f as Outlet, g as Link, l as useRouterState, v as useNavigate } from "./_libs/@tanstack/react-router+[...].mjs";
import { i as AnimatePresence } from "./_libs/framer-motion.mjs";
import { t as motion } from "./_libs/motion.mjs";
import { I as Facebook, N as Instagram, O as Menu, T as Moon, d as Sun, j as LogOut, m as ShoppingBag, r as UtensilsCrossed, s as Twitter, t as X } from "./_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_authenticated-BeXOaEE3.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ThemeToggle({ className = "" }) {
	const { theme, toggle } = useTheme();
	const isDark = theme === "dark";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		onClick: toggle,
		"aria-label": `Switch to ${isDark ? "light" : "dark"} mode`,
		title: `Switch to ${isDark ? "light" : "dark"} mode`,
		className: `relative grid h-10 w-10 place-items-center overflow-hidden rounded-full border border-primary/30 bg-background/40 text-primary transition hover:bg-primary/10 ${className}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
			mode: "wait",
			initial: false,
			children: isDark ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
				initial: {
					rotate: -90,
					opacity: 0,
					scale: .6
				},
				animate: {
					rotate: 0,
					opacity: 1,
					scale: 1
				},
				exit: {
					rotate: 90,
					opacity: 0,
					scale: .6
				},
				transition: { duration: .25 },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "h-4 w-4" })
			}, "moon") : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
				initial: {
					rotate: 90,
					opacity: 0,
					scale: .6
				},
				animate: {
					rotate: 0,
					opacity: 1,
					scale: 1
				},
				exit: {
					rotate: -90,
					opacity: 0,
					scale: .6
				},
				transition: { duration: .25 },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "h-4 w-4" })
			}, "sun")
		})
	});
}
var NAV = [
	{
		to: "/",
		label: "Home"
	},
	{
		to: "/menu",
		label: "Menu"
	},
	{
		to: "/favourites",
		label: "Favourites"
	},
	{
		to: "/gallery",
		label: "Gallery"
	},
	{
		to: "/reservations",
		label: "Reservations"
	},
	{
		to: "/orders",
		label: "Orders"
	},
	{
		to: "/account",
		label: "Account"
	},
	{
		to: "/contact",
		label: "Contact"
	}
];
function Navbar() {
	const [scrolled, setScrolled] = (0, import_react.useState)(false);
	const [open, setOpen] = (0, import_react.useState)(false);
	const { user, logout } = useAuth();
	const { totals } = useCart();
	const navigate = useNavigate();
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	(0, import_react.useEffect)(() => {
		const onScroll = () => setScrolled(window.scrollY > 30);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	(0, import_react.useEffect)(() => setOpen(false), [pathname]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: cn("fixed inset-x-0 top-0 z-50 transition-all duration-500", scrolled ? "py-2" : "py-4"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "container-luxe",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: cn("flex items-center justify-between rounded-full px-5 py-3 transition-all duration-500 md:px-7", scrolled ? "glass-strong shadow-luxe" : "border border-transparent bg-background/10 backdrop-blur-sm"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						className: "flex items-center gap-2 group",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid h-10 w-10 place-items-center rounded-full bg-primary/15 text-primary ring-1 ring-primary/40 transition group-hover:bg-primary/25",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UtensilsCrossed, { className: "h-5 w-5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-display text-lg leading-none",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block gold-text font-semibold",
								children: "Spice"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block text-[0.7rem] uppercase tracking-[0.4em] text-muted-foreground",
								children: "Garden"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: photo_1571336350540_8b189c0779f4_default,
						alt: "Menu",
						className: "hidden h-10 w-10 rounded-full border border-border object-cover lg:block"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "hidden items-center gap-1 lg:flex",
						children: NAV.map((n) => {
							const active = pathname === n.to;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: n.to,
								className: cn("relative rounded-full px-4 py-2 text-sm font-medium transition", active ? "text-primary" : "text-foreground/80 hover:text-primary"),
								children: [n.label, active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
									layoutId: "nav-active",
									className: "absolute inset-0 -z-10 rounded-full bg-primary/10 ring-1 ring-primary/30",
									transition: {
										type: "spring",
										stiffness: 380,
										damping: 32
									}
								})]
							}, n.to);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "hidden items-center gap-2 lg:flex",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeToggle, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/cart",
								"aria-label": "Cart",
								className: "relative grid h-10 w-10 place-items-center rounded-full border border-primary/40 text-foreground transition hover:bg-primary/10 hover:text-primary",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "h-4 w-4" }), totals.itemCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[0.65rem] font-bold text-primary-foreground",
									children: totals.itemCount
								})]
							}),
							user ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => {
									logout();
									navigate({ to: "/login" });
								},
								"aria-label": "Log out",
								className: "inline-flex items-center gap-2 rounded-full border border-primary/40 px-5 py-2 text-sm font-medium text-foreground transition hover:bg-primary/10 hover:text-primary",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-4 w-4" }), "Logout"]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/login",
								className: "rounded-full border border-primary/40 px-5 py-2 text-sm font-medium text-foreground transition hover:bg-primary/10",
								children: "Login"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 lg:hidden",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeToggle, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/cart",
								"aria-label": "Cart",
								className: "relative grid h-10 w-10 place-items-center rounded-full border border-primary/40 text-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "h-4 w-4" }), totals.itemCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[0.65rem] font-bold text-primary-foreground",
									children: totals.itemCount
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setOpen((v) => !v),
								className: "grid h-11 w-11 place-items-center rounded-full border border-primary/30 text-primary",
								"aria-label": "Toggle menu",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
									mode: "wait",
									children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
										initial: {
											rotate: -90,
											opacity: 0
										},
										animate: {
											rotate: 0,
											opacity: 1
										},
										exit: {
											rotate: 90,
											opacity: 0
										},
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
									}, "x") : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
										initial: {
											rotate: 90,
											opacity: 0
										},
										animate: {
											rotate: 0,
											opacity: 1
										},
										exit: {
											rotate: -90,
											opacity: 0
										},
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-5 w-5" })
									}, "m")
								})
							})
						]
					})
				]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			initial: {
				opacity: 0,
				y: -20
			},
			animate: {
				opacity: 1,
				y: 0
			},
			exit: {
				opacity: 0,
				y: -20
			},
			transition: { duration: .25 },
			className: "container-luxe mt-3 lg:hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass-strong rounded-3xl p-5 shadow-luxe",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "flex flex-col",
					children: NAV.map((n) => {
						const active = pathname === n.to;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: n.to,
							className: cn("rounded-2xl px-4 py-3 text-base font-medium transition", active ? "bg-primary/10 text-primary" : "text-foreground/85 hover:bg-white/5"),
							children: n.label
						}, n.to);
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 flex flex-col gap-2",
					children: user ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							logout();
							navigate({ to: "/login" });
						},
						className: "rounded-full border border-primary/40 px-5 py-3 text-center text-sm font-medium",
						children: "Logout"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/login",
						className: "rounded-full border border-primary/40 px-5 py-3 text-center text-sm font-medium",
						children: "Login"
					})
				})]
			})
		}) })]
	});
}
function Footer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "relative mt-24 overflow-hidden border-t border-border/70 bg-surface",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": true,
				className: "pointer-events-none absolute inset-x-0 -top-32 h-64 bg-[radial-gradient(ellipse_at_center,_color-mix(in_oklab,_var(--primary)_18%,_transparent),_transparent_70%)]"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-luxe relative flex flex-col items-center gap-6 py-14 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid h-12 w-12 place-items-center rounded-full bg-primary/15 text-primary ring-1 ring-primary/40",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UtensilsCrossed, { className: "h-5 w-5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-left",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-2xl gold-text",
								children: "Spice Garden"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs uppercase tracking-[0.4em] text-muted-foreground",
								children: "Fine Dining · Est. 2008"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "max-w-xl text-sm leading-relaxed text-muted-foreground",
						children: "A Michelin-inspired sanctuary where seasonal ingredients are coaxed into quiet theatre by hands that have spent a lifetime perfecting the craft."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex gap-3",
						children: [
							Instagram,
							Facebook,
							Twitter
						].map((Icon, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#",
							className: "grid h-10 w-10 place-items-center rounded-full border border-primary/30 text-foreground/80 transition hover:bg-primary/10 hover:text-primary",
							"aria-label": "Social link",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" })
						}, i))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-t border-border/60",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "container-luxe flex flex-col items-center justify-between gap-2 py-6 text-xs text-muted-foreground md:flex-row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"© ",
						(/* @__PURE__ */ new Date()).getFullYear(),
						" Spice Garden. All rights reserved."
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Crafted with care · Three Michelin Stars" })]
				})
			})
		]
	});
}
function AuthedLayout() {
	const { isAuthenticated, loading } = useAuth();
	const navigate = useNavigate();
	(0, import_react.useEffect)(() => {
		if (!loading && !isAuthenticated) navigate({
			to: "/login",
			replace: true
		});
	}, [
		isAuthenticated,
		loading,
		navigate
	]);
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid min-h-dvh place-items-center bg-background",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col items-center gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-10 w-10 animate-spin rounded-full border-2 border-primary border-t-transparent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs uppercase tracking-[0.4em] text-muted-foreground",
				children: "Preparing your table…"
			})]
		})
	});
	if (!isAuthenticated) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-dvh flex-col bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "flex-1 pt-24",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
//#endregion
export { AuthedLayout as component };
