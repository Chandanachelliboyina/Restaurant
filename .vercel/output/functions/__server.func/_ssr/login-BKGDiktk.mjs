import { o as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-4hMyJYfy.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { b as useRouter, g as Link, v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as UserPlus } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as AuthInput, r as AuthShell, t as AuthButton } from "./AuthShell-B_UybzZr.mjs";
import { i as stringType, r as objectType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-BKGDiktk.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var schema = objectType({
	email: stringType().trim().regex(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, "Enter a valid email (e.g. name@gmail.com)"),
	password: stringType().min(6, "Password must be at least 6 characters")
});
function LoginPage() {
	const router = useRouter();
	const navigate = useNavigate();
	const [form, setForm] = (0, import_react.useState)({
		email: "",
		password: "",
		remember: true
	});
	const [errors, setErrors] = (0, import_react.useState)({});
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [touched, setTouched] = (0, import_react.useState)({});
	const validation = (0, import_react.useMemo)(() => schema.safeParse(form), [form]);
	const isValid = validation.success;
	const liveErrors = {};
	if (!validation.success) for (const issue of validation.error.issues) liveErrors[issue.path[0]] = issue.message;
	async function onSubmit(e) {
		e.preventDefault();
		setTouched({
			email: true,
			password: true
		});
		if (!validation.success) {
			setErrors(liveErrors);
			return;
		}
		setErrors({});
		setLoading(true);
		const { error } = await supabase.auth.signInWithPassword({
			email: validation.data.email.trim(),
			password: validation.data.password
		});
		setLoading(false);
		if (error) {
			console.error("[login] failed:", error);
			if (/confirm/i.test(error.message)) {
				toast.error("Please verify your email before signing in.");
				navigate({
					to: "/signup",
					search: {
						email: validation.data.email.trim(),
						step: "otp"
					}
				});
				return;
			}
			toast.error(/credentials/i.test(error.message) ? "Incorrect email or password." : error.message || "Unable to sign in. Please try again.");
			return;
		}
		toast.success("Welcome back");
		router.invalidate();
		navigate({ to: "/" });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthShell, {
		title: "WELCOME",
		emphasizeTitle: true,
		footer: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-muted-foreground",
			children: "Signed in already? Enjoy your reserved table."
		}),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-6 rounded-2xl border border-primary/25 bg-primary/5 p-4 text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs leading-relaxed text-foreground/80",
				children: "Please create an account before signing in. Only registered users can access the Sign In page."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/signup",
				className: "mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full border border-primary/50 bg-primary/10 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.25em] text-primary transition hover:bg-primary hover:text-primary-foreground hover:shadow-glow",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "h-4 w-4" }), "Create Account"]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit,
			noValidate: true,
			className: "space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthInput, {
					label: "Email",
					type: "email",
					autoComplete: "email",
					placeholder: "name@gmail.com",
					value: form.email,
					onChange: (e) => setForm({
						...form,
						email: e.target.value
					}),
					onBlur: () => setTouched((t) => ({
						...t,
						email: true
					})),
					error: touched.email && (errors.email || liveErrors.email) || void 0
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthInput, {
					label: "Password",
					type: "password",
					autoComplete: "current-password",
					placeholder: "••••••••",
					value: form.password,
					onChange: (e) => setForm({
						...form,
						password: e.target.value
					}),
					onBlur: () => setTouched((t) => ({
						...t,
						password: true
					})),
					error: touched.password && (errors.password || liveErrors.password) || void 0
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex items-center gap-2 text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: form.remember,
							onChange: (e) => setForm({
								...form,
								remember: e.target.checked
							}),
							className: "h-4 w-4 accent-primary"
						}), "Remember me"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/forgot-password",
						className: "text-primary hover:underline",
						children: "Forgot password?"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthButton, {
					type: "submit",
					loading,
					disabled: !isValid,
					children: "Sign in"
				})
			]
		})]
	});
}
//#endregion
export { LoginPage as component };
