import { o as __toESM } from "./_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "./_libs/react+tanstack__react-query.mjs";
import { g as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { t as motion } from "./_libs/motion.mjs";
import { P as Heart, Z as ArrowRight } from "./_libs/lucide-react.mjs";
import { n as DISHES } from "./_ssr/data-BjlbdR6k.mjs";
import { n as getFavoriteDishIds, r as subscribeToFavorites, t as DishCard } from "./_ssr/DishCard-Bcix8jdA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_authenticated.favourites-J1AWa2Jo.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function FavouritesPage() {
	const [favoriteIds, setFavoriteIds] = (0, import_react.useState)(() => getFavoriteDishIds());
	(0, import_react.useEffect)(() => {
		return subscribeToFavorites(() => setFavoriteIds(getFavoriteDishIds()));
	}, []);
	const favourites = (0, import_react.useMemo)(() => DISHES.filter((dish) => favoriteIds.includes(dish.id)), [favoriteIds]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "min-h-screen bg-background px-4 py-24 sm:px-6 lg:px-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "container-luxe",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "divider-gold",
						children: "Favourites"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-4 font-display text-4xl md:text-5xl",
						children: "Your saved favourites"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-2xl text-muted-foreground",
						children: "Revisit the dishes you loved most and add them to your cart whenever you are ready."
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/menu",
					className: "inline-flex items-center gap-2 rounded-full border border-primary/40 px-5 py-3 text-sm font-medium text-foreground transition hover:bg-primary/10 hover:text-primary",
					children: ["Explore the menu", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
				})]
			}), favourites.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					opacity: 0,
					y: 16
				},
				animate: {
					opacity: 1,
					y: 0
				},
				className: "rounded-3xl border border-dashed border-border bg-card/70 p-10 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-primary/10 text-primary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "h-6 w-6" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl",
						children: "No favourites yet"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-muted-foreground",
						children: "Tap the heart on any dish to pin it here for quick access."
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-6 md:grid-cols-2 xl:grid-cols-3",
				children: favourites.map((dish, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DishCard, {
					dish,
					index
				}, dish.id))
			})]
		})
	});
}
//#endregion
export { FavouritesPage as component };
