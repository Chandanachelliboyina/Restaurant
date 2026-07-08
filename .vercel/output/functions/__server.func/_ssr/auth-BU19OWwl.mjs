import { o as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-4hMyJYfy.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-BU19OWwl.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var AuthContext = (0, import_react.createContext)(null);
function toAuthUser(u) {
	if (!u) return null;
	const meta = u.user_metadata ?? {};
	return {
		id: u.id,
		email: u.email ?? "",
		firstName: meta.first_name,
		lastName: meta.last_name,
		phone: meta.phone,
		avatar: meta.avatar_url,
		deliveryAddress: meta.delivery_address
	};
}
function AuthProvider({ children }) {
	const [session, setSession] = (0, import_react.useState)(null);
	const [user, setUser] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => {
			setSession(s);
			setUser(toAuthUser(s?.user));
		});
		supabase.auth.getSession().then(({ data }) => {
			setSession(data.session);
			setUser(toAuthUser(data.session?.user));
			setLoading(false);
		});
		return () => sub.subscription.unsubscribe();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthContext.Provider, {
		value: {
			user,
			session,
			isAuthenticated: !!session,
			loading,
			logout: async () => {
				await supabase.auth.signOut();
			}
		},
		children
	});
}
function useAuth() {
	const ctx = (0, import_react.useContext)(AuthContext);
	if (!ctx) throw new Error("useAuth must be used within AuthProvider");
	return ctx;
}
//#endregion
export { useAuth as n, AuthProvider as t };
