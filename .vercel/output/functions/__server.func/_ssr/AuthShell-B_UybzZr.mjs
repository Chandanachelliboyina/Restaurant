import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as motion } from "../_libs/motion.mjs";
import { r as UtensilsCrossed } from "../_libs/lucide-react.mjs";
import { t as hero_restaurant_default } from "./hero-restaurant-BDZG_w2W.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/AuthShell-B_UybzZr.js
var import_jsx_runtime = require_jsx_runtime();
function AuthShell({ title, subtitle, emphasizeTitle, children, footer }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "relative min-h-dvh overflow-hidden bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "absolute inset-0",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: hero_restaurant_default,
					alt: "",
					className: "h-full w-full object-cover opacity-40",
					"aria-hidden": true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-br from-background via-background/70 to-background" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					"aria-hidden": true,
					className: "absolute -left-32 top-1/4 h-[28rem] w-[28rem] rounded-full bg-primary/15 blur-[120px]",
					animate: {
						x: [
							0,
							60,
							0
						],
						y: [
							0,
							-30,
							0
						]
					},
					transition: {
						duration: 16,
						repeat: Infinity,
						ease: "easeInOut"
					}
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					"aria-hidden": true,
					className: "absolute -right-40 bottom-0 h-[26rem] w-[26rem] rounded-full bg-accent/40 blur-[140px]",
					animate: {
						x: [
							0,
							-50,
							0
						],
						y: [
							0,
							40,
							0
						]
					},
					transition: {
						duration: 20,
						repeat: Infinity,
						ease: "easeInOut"
					}
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative z-10 mx-auto flex min-h-dvh max-w-md flex-col justify-center px-5 py-10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "mb-8 flex items-center justify-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid h-12 w-12 place-items-center rounded-full bg-primary/15 text-primary ring-1 ring-primary/40",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UtensilsCrossed, { className: "h-5 w-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-2xl gold-text",
						children: "Spice Garden"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						y: 30
					},
					animate: {
						opacity: 1,
						y: 0
					},
					transition: {
						duration: .7,
						ease: [
							.16,
							1,
							.3,
							1
						]
					},
					className: "glass-strong rounded-3xl p-8 shadow-luxe md:p-10",
					children: [emphasizeTitle ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "divider-gold justify-center",
								children: "Members Only"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "mt-4 font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-6xl",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "gold-text",
									children: title
								})
							}),
							subtitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mx-auto mt-3 max-w-xs text-sm text-muted-foreground",
								children: subtitle
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "divider-gold",
							children: "Welcome"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-3 font-display text-3xl leading-tight md:text-4xl",
							children: title
						}),
						subtitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: subtitle
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-7",
						children
					})]
				}),
				footer && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 text-center text-sm text-muted-foreground",
					children: footer
				})
			]
		})]
	});
}
function AuthInput({ label, error, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mb-1.5 block text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				...props,
				className: "w-full rounded-2xl border border-border bg-background/40 px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/60 focus:border-primary/60 focus:ring-2 focus:ring-primary/30"
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mt-1 block text-xs text-destructive",
				children: error
			})
		]
	});
}
function AuthButton({ loading, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		...props,
		disabled: loading || props.disabled,
		className: "group relative w-full overflow-hidden rounded-2xl bg-primary px-5 py-3.5 text-sm font-semibold uppercase tracking-[0.2em] text-primary-foreground shadow-glow transition disabled:opacity-70",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "relative z-10 inline-flex items-center justify-center gap-2",
			children: [loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" }), children]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-0 -z-0 translate-y-full bg-primary-glow transition duration-500 group-hover:translate-y-0" })]
	});
}
//#endregion
export { AuthInput as n, AuthShell as r, AuthButton as t };
