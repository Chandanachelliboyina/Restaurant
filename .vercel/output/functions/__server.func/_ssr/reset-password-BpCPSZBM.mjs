import { o as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-4hMyJYfy.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link, v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as AuthInput, r as AuthShell, t as AuthButton } from "./AuthShell-B_UybzZr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/reset-password-BpCPSZBM.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ResetPasswordPage() {
	const navigate = useNavigate();
	const [pw, setPw] = (0, import_react.useState)("");
	const [confirm, setConfirm] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	async function submit(e) {
		e.preventDefault();
		if (pw.length < 8) return toast.error("Password must be at least 8 characters");
		if (pw !== confirm) return toast.error("Passwords do not match");
		setLoading(true);
		const { error } = await supabase.auth.updateUser({ password: pw });
		setLoading(false);
		if (error) {
			console.error("[reset-password] failed:", error);
			toast.error(error.message || "Couldn't update password. The link may have expired.");
			return;
		}
		toast.success("Password updated");
		navigate({ to: "/" });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthShell, {
		title: "Create a new password",
		subtitle: "Make it memorable, make it strong.",
		footer: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/login",
			className: "text-primary hover:underline",
			children: "Back to login"
		}) }),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: submit,
			className: "space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthInput, {
					label: "New password",
					type: "password",
					value: pw,
					onChange: (e) => setPw(e.target.value),
					autoComplete: "new-password"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthInput, {
					label: "Confirm password",
					type: "password",
					value: confirm,
					onChange: (e) => setConfirm(e.target.value),
					autoComplete: "new-password"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthButton, {
					type: "submit",
					loading,
					children: "Update password"
				})
			]
		})
	});
}
//#endregion
export { ResetPasswordPage as component };
