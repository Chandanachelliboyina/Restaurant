import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { n as useAuth } from "./auth-BU19OWwl.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cart-CwxFwYtG.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var CartContext = (0, import_react.createContext)(null);
var STORAGE_KEY = (userId) => `spice-garden.cart.${userId ?? "guest"}`;
function CartProvider({ children }) {
	const { user } = useAuth();
	const key = STORAGE_KEY(user?.id ?? null);
	const [items, setItems] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		if (typeof window === "undefined") return;
		try {
			const raw = window.localStorage.getItem(key);
			setItems(raw ? JSON.parse(raw) : []);
		} catch {
			setItems([]);
		}
	}, [key]);
	(0, import_react.useEffect)(() => {
		if (typeof window === "undefined") return;
		window.localStorage.setItem(key, JSON.stringify(items));
	}, [key, items]);
	const value = (0, import_react.useMemo)(() => {
		const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
		const tax = +(subtotal * .08).toFixed(2);
		const delivery = subtotal > 0 && subtotal < 40 ? 4.99 : 0;
		const discount = subtotal >= 60 ? +(subtotal * .1).toFixed(2) : 0;
		const total = +(subtotal + tax + delivery - discount).toFixed(2);
		const itemCount = items.reduce((s, i) => s + i.quantity, 0);
		return {
			items,
			totals: {
				subtotal: +subtotal.toFixed(2),
				tax,
				delivery,
				discount,
				total,
				itemCount
			},
			add: (dish, qty = 1) => setItems((prev) => {
				if (prev.find((p) => p.id === dish.id)) return prev.map((p) => p.id === dish.id ? {
					...p,
					quantity: p.quantity + qty
				} : p);
				return [...prev, {
					id: dish.id,
					name: dish.name,
					image: dish.image,
					price: dish.price,
					veg: dish.veg,
					quantity: qty
				}];
			}),
			setQuantity: (id, qty) => setItems((prev) => qty <= 0 ? prev.filter((p) => p.id !== id) : prev.map((p) => p.id === id ? {
				...p,
				quantity: qty
			} : p)),
			remove: (id) => setItems((prev) => prev.filter((p) => p.id !== id)),
			clear: () => setItems([])
		};
	}, [items]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartContext.Provider, {
		value,
		children
	});
}
function useCart() {
	const ctx = (0, import_react.useContext)(CartContext);
	if (!ctx) throw new Error("useCart must be used within CartProvider");
	return ctx;
}
//#endregion
export { useCart as n, CartProvider as t };
