import { o as __toESM } from "./_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "./_libs/react+tanstack__react-query.mjs";
import { i as AnimatePresence } from "./_libs/framer-motion.mjs";
import { t as motion } from "./_libs/motion.mjs";
import { t as X, y as Search } from "./_libs/lucide-react.mjs";
import { t as BG_IMAGES } from "./_ssr/images-Cg6hgnkg.mjs";
import { t as BackButton } from "./_ssr/BackButton-aBIfVsBs.mjs";
import { n as DISHES, t as CATEGORIES } from "./_ssr/data-BjlbdR6k.mjs";
import { t as DishCard } from "./_ssr/DishCard-Bcix8jdA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_authenticated.menu-WwstO3Xe.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function MenuPage() {
	const [active, setActive] = (0, import_react.useState)("All");
	const [q, setQ] = (0, import_react.useState)("");
	const filtered = (0, import_react.useMemo)(() => {
		const query = q.trim().toLowerCase();
		return DISHES.filter((d) => {
			if (!(active === "All" || d.category === active)) return false;
			if (!query) return true;
			return d.name.toLowerCase().includes(query) || d.description.toLowerCase().includes(query) || d.category.toLowerCase().includes(query);
		});
	}, [active, q]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative overflow-hidden py-24 text-center md:py-32",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute inset-0 -z-10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: BG_IMAGES.menu,
							alt: "",
							className: "h-full w-full object-cover",
							loading: "lazy"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-black/70" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-b from-background/40 via-background/30 to-background" })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "container-luxe text-left",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackButton, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "container-luxe mt-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "divider-gold justify-center",
							children: "The Menu"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "mx-auto mt-5 max-w-3xl font-display text-5xl leading-tight md:text-7xl",
							children: [
								"Plates we are quietly ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "gold-text italic",
									children: "proud"
								}),
								" of."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mx-auto mt-5 max-w-xl text-muted-foreground",
							children: "Our menu rotates with the season. Below is a glimpse — your tasting on the night is chosen by the chef."
						})
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "container-luxe",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass-strong sticky top-24 z-30 flex flex-col gap-4 rounded-3xl p-4 md:flex-row md:items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 rounded-2xl border border-border bg-background/40 px-4 py-2.5 md:w-72",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-4 w-4 text-muted-foreground" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: q,
							onChange: (e) => setQ(e.target.value),
							placeholder: "Search dishes, ingredients…",
							className: "w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground/70"
						}),
						q && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setQ(""),
							"aria-label": "Clear search",
							className: "text-muted-foreground hover:text-primary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "-mx-1 flex flex-1 gap-2 overflow-x-auto px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
					children: ["All", ...CATEGORIES].map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setActive(c),
						className: `relative shrink-0 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition ${active === c ? "text-primary-foreground" : "text-foreground/70 hover:text-primary"}`,
						children: [active === c && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
							layoutId: "cat-active",
							className: "absolute inset-0 -z-10 rounded-full bg-primary",
							transition: {
								type: "spring",
								stiffness: 380,
								damping: 32
							}
						}), c]
					}, c))
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "section-pad",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "container-luxe",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
					mode: "popLayout",
					children: filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
						initial: { opacity: 0 },
						animate: { opacity: 1 },
						exit: { opacity: 0 },
						className: "py-20 text-center text-muted-foreground",
						children: "No items found — try another search or category."
					}, "empty") : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						layout: true,
						className: "grid gap-6 md:grid-cols-2 lg:grid-cols-3",
						children: filtered.map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DishCard, {
							dish: d,
							index: i
						}, d.id))
					}, active + q)
				})
			})
		})
	] });
}
//#endregion
export { MenuPage as component };
