import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { n as useCart } from "./cart-CwxFwYtG.mjs";
import { n as formatCurrency, t as cn } from "./utils-Dz0d21t-.mjs";
import { t as motion } from "../_libs/motion.mjs";
import { E as Minus, F as Flame, P as Heart, S as Plus, f as Star, m as ShoppingBag, z as Clock } from "../_libs/lucide-react.mjs";
import { t as hero_restaurant_default } from "./hero-restaurant-BDZG_w2W.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/DishCard-Bcix8jdA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var FAVORITES_STORAGE_KEY = "spice-garden-favorites";
var FAVORITES_EVENT = "spice-garden:favorites-change";
function readFavorites() {
	if (typeof window === "undefined") return [];
	try {
		const raw = window.localStorage.getItem(FAVORITES_STORAGE_KEY);
		if (!raw) return [];
		const parsed = JSON.parse(raw);
		return Array.isArray(parsed) ? parsed.filter((item) => typeof item === "string") : [];
	} catch {
		return [];
	}
}
function writeFavorites(ids) {
	if (typeof window === "undefined") return;
	window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(ids));
}
function getFavoriteDishIds() {
	return readFavorites();
}
function isFavoriteDish(dishId) {
	return getFavoriteDishIds().includes(dishId);
}
function toggleFavoriteDish(dishId) {
	const current = getFavoriteDishIds();
	const exists = current.includes(dishId);
	writeFavorites(exists ? current.filter((id) => id !== dishId) : [...current, dishId]);
	if (typeof window !== "undefined") window.dispatchEvent(new Event(FAVORITES_EVENT));
	return !exists;
}
function subscribeToFavorites(callback) {
	if (typeof window === "undefined") return () => void 0;
	const handler = () => callback();
	window.addEventListener(FAVORITES_EVENT, handler);
	return () => window.removeEventListener(FAVORITES_EVENT, handler);
}
function DishCard({ dish, index = 0 }) {
	const [fav, setFav] = (0, import_react.useState)(() => isFavoriteDish(dish.id));
	const [qty, setQty] = (0, import_react.useState)(1);
	const { add } = useCart();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.article, {
		initial: {
			opacity: 0,
			y: 30
		},
		whileInView: {
			opacity: 1,
			y: 0
		},
		viewport: {
			once: true,
			margin: "-60px"
		},
		transition: {
			duration: .6,
			delay: index * .05,
			ease: [
				.16,
				1,
				.3,
				1
			]
		},
		whileHover: { y: -8 },
		className: "group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card transition-shadow duration-500 hover:shadow-luxe",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative aspect-[5/4] overflow-hidden",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: dish.image,
					alt: dish.name,
					loading: "lazy",
					className: "h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110",
					onError: (e) => {
						const target = e.currentTarget;
						if (target.src !== "/assets/hero-restaurant-TC2qkRFf.jpg") target.src = hero_restaurant_default;
					}
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent opacity-90" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => {
						const nextFav = toggleFavoriteDish(dish.id);
						setFav(nextFav);
						toast.success(nextFav ? "Added to favourites" : "Removed from favourites");
					},
					"aria-label": "Add to favourites",
					className: cn("absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full backdrop-blur-md transition", fav ? "bg-primary text-primary-foreground" : "bg-background/60 text-foreground hover:bg-primary/30"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: cn("h-4 w-4", fav && "fill-current") })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute left-4 top-4 flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("grid h-5 w-5 place-items-center rounded-sm border-2 bg-background/80 backdrop-blur", dish.veg ? "border-green-600" : "border-gray-600"),
						"aria-label": dish.veg ? "Vegetarian" : "Non-vegetarian",
						title: dish.veg ? "Vegetarian" : "Non-vegetarian",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("h-2 w-2 rounded-full", dish.veg ? "bg-green-600" : "bg-gray-600") })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1 rounded-full bg-background/70 px-3 py-1 text-xs font-medium backdrop-blur-md",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3.5 w-3.5 fill-primary text-primary" }), dish.rating.toFixed(1)]
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-1 flex-col gap-3 p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-xl leading-tight",
						children: dish.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-xl gold-text",
						children: formatCurrency(dish.price)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm leading-relaxed text-muted-foreground line-clamp-2",
					children: dish.description
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-1 flex items-center gap-4 text-xs text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "h-3.5 w-3.5 text-primary/80" }),
							dish.calories,
							" kcal"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-3.5 w-3.5 text-primary/80" }),
							dish.cookTime,
							" min"
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1 rounded-full border border-border bg-background/40 px-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setQty((q) => Math.max(1, q - 1)),
								className: "grid h-8 w-8 place-items-center rounded-full text-foreground/80 transition hover:bg-primary/10 hover:text-primary",
								"aria-label": "Decrease quantity",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "h-3.5 w-3.5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "w-6 text-center text-sm font-semibold tabular-nums",
								children: qty
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setQty((q) => Math.min(20, q + 1)),
								className: "grid h-8 w-8 place-items-center rounded-full text-foreground/80 transition hover:bg-primary/10 hover:text-primary",
								"aria-label": "Increase quantity",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3.5 w-3.5" })
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => {
							add(dish, qty);
							toast.success(`${dish.name} × ${qty} added to cart`);
							setQty(1);
						},
						className: "flex-1 inline-flex items-center justify-center gap-2 rounded-full border border-primary/40 bg-primary/5 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary transition hover:bg-primary hover:text-primary-foreground hover:shadow-glow",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "h-3.5 w-3.5" }), "Add to Cart"]
					})]
				})
			]
		})]
	});
}
//#endregion
export { getFavoriteDishIds as n, subscribeToFavorites as r, DishCard as t };
