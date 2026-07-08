import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/theme-ClJ4up73.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ThemeContext = (0, import_react.createContext)(null);
var STORAGE_KEY = "spice-garden-theme";
function applyTheme(t) {
	if (typeof document === "undefined") return;
	const root = document.documentElement;
	root.classList.remove("light", "dark");
	root.classList.add(t);
	root.style.colorScheme = t;
}
function ThemeProvider({ children }) {
	const [theme, setThemeState] = (0, import_react.useState)("dark");
	(0, import_react.useEffect)(() => {
		const stored = typeof window !== "undefined" && localStorage.getItem(STORAGE_KEY);
		const initial = stored === "light" || stored === "dark" ? stored : "dark";
		setThemeState(initial);
		applyTheme(initial);
	}, []);
	const setTheme = (t) => {
		setThemeState(t);
		applyTheme(t);
		try {
			localStorage.setItem(STORAGE_KEY, t);
		} catch {}
	};
	const toggle = () => setTheme(theme === "dark" ? "light" : "dark");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeContext.Provider, {
		value: {
			theme,
			toggle,
			setTheme
		},
		children
	});
}
function useTheme() {
	const ctx = (0, import_react.useContext)(ThemeContext);
	if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
	return ctx;
}
//#endregion
export { useTheme as n, ThemeProvider as t };
