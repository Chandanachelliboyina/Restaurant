import { o as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-4hMyJYfy.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as AnimatePresence } from "../_libs/framer-motion.mjs";
import { t as motion } from "../_libs/motion.mjs";
import { A as Mail, V as CircleCheck } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as AuthInput, r as AuthShell, t as AuthButton } from "./AuthShell-B_UybzZr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/forgot-password-DhOOBd_J.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ForgotPage() {
	const [email, setEmail] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [sent, setSent] = (0, import_react.useState)(false);
	async function submit(e) {
		e.preventDefault();
		setLoading(true);
		const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), { redirectTo: `${window.location.origin}/reset-password` });
		setLoading(false);
		if (error) {
			console.error("[reset] failed:", error);
			toast.error(error.message || "Couldn't send reset link. Please try again.");
			return;
		}
		setSent(true);
		toast.success("Reset link sent — check your email.");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthShell, {
		title: sent ? "Check your email" : "Forgot password?",
		subtitle: sent ? `We sent a password reset link to ${email}.` : "Tell us your email and we'll send a reset link.",
		footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
			"Remembered it?",
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/login",
				className: "text-primary hover:underline",
				children: "Back to login"
			})
		] }),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
			mode: "wait",
			children: !sent ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.form, {
				initial: {
					opacity: 0,
					y: 10
				},
				animate: {
					opacity: 1,
					y: 0
				},
				exit: {
					opacity: 0,
					y: -10
				},
				onSubmit: submit,
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthInput, {
					label: "Email",
					type: "email",
					required: true,
					value: email,
					onChange: (e) => setEmail(e.target.value)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthButton, {
					loading,
					type: "submit",
					children: "Send reset link"
				})]
			}, "email") : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					opacity: 0,
					scale: .92
				},
				animate: {
					opacity: 1,
					scale: 1
				},
				className: "flex flex-col items-center gap-4 py-4 text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid h-20 w-20 place-items-center rounded-full bg-success/20 text-success",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-10 w-10" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "inline h-3.5 w-3.5" }), " Click the link in the email to set a new password."]
				})]
			}, "done")
		})
	});
}
//#endregion
export { ForgotPage as component };
