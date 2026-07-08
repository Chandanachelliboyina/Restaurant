import { o as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-4hMyJYfy.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link, v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as AnimatePresence } from "../_libs/framer-motion.mjs";
import { t as motion } from "../_libs/motion.mjs";
import { V as CircleCheck } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as AuthInput, r as AuthShell, t as AuthButton } from "./AuthShell-B_UybzZr.mjs";
import { i as stringType, n as literalType, r as objectType } from "../_libs/zod.mjs";
import { t as Route } from "./signup-Behz8hE3.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/signup-BFlXomJh.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var schema = objectType({
	firstName: stringType().trim().min(1, "Required").max(60),
	lastName: stringType().trim().min(1, "Required").max(60),
	email: stringType().trim().email("Enter a valid email"),
	phone: stringType().trim().min(6, "Invalid phone").max(20),
	password: stringType().min(8, "Min 8 characters"),
	confirm: stringType(),
	terms: literalType(true, { message: "Accept the terms to continue" })
}).refine((d) => d.password === d.confirm, {
	path: ["confirm"],
	message: "Passwords do not match"
});
var RESEND_COOLDOWN_SECONDS = 60;
function SignupPage() {
	const navigate = useNavigate();
	const search = Route.useSearch();
	const [form, setForm] = (0, import_react.useState)({
		firstName: "",
		lastName: "",
		email: search.email || "",
		phone: "",
		password: "",
		confirm: "",
		terms: false
	});
	const [errors, setErrors] = (0, import_react.useState)({});
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [step, setStep] = (0, import_react.useState)(search.step || "form");
	const [otp, setOtp] = (0, import_react.useState)("");
	const [cooldown, setCooldown] = (0, import_react.useState)(0);
	const [otpExpiresAt, setOtpExpiresAt] = (0, import_react.useState)(() => {
		return search.step === "otp" ? Date.now() + 600 * 1e3 : null;
	});
	const [timeLeft, setTimeLeft] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		if (cooldown <= 0) return;
		const t = setTimeout(() => setCooldown((c) => c - 1), 1e3);
		return () => clearTimeout(t);
	}, [cooldown]);
	(0, import_react.useEffect)(() => {
		if (!otpExpiresAt) return;
		const interval = setInterval(() => {
			const remaining = Math.max(0, Math.ceil((otpExpiresAt - Date.now()) / 1e3));
			setTimeLeft(remaining);
			if (remaining <= 0) clearInterval(interval);
		}, 1e3);
		setTimeLeft(Math.max(0, Math.ceil((otpExpiresAt - Date.now()) / 1e3)));
		return () => clearInterval(interval);
	}, [otpExpiresAt]);
	async function sendSignup() {
		try {
			const { data: existingProfile, error: profileErr } = await supabase.from("profiles").select("id, first_name").eq("email", form.email.trim()).maybeSingle();
			if (profileErr) console.error("[signup] error querying profile:", profileErr);
			if (existingProfile && existingProfile.first_name) {
				toast.error("This email is already registered. Please sign in instead.");
				return false;
			}
		} catch (e) {
			console.error("[signup] check profile failed:", e);
		}
		const { error } = await supabase.auth.signInWithOtp({
			email: form.email.trim(),
			options: { shouldCreateUser: true }
		});
		if (error) {
			console.error("[signup] send OTP failed:", error);
			toast.error(error.message || "We couldn't send the verification code. Please try again.");
			return false;
		}
		setOtpExpiresAt(Date.now() + 600 * 1e3);
		return true;
	}
	async function onSubmit(e) {
		e.preventDefault();
		const parsed = schema.safeParse(form);
		if (!parsed.success) {
			setErrors(Object.fromEntries(parsed.error.issues.map((i) => [i.path[0], i.message])));
			return;
		}
		setErrors({});
		setLoading(true);
		const ok = await sendSignup();
		setLoading(false);
		if (!ok) return;
		setStep("otp");
		setCooldown(RESEND_COOLDOWN_SECONDS);
		toast.success(`Verification code sent to ${form.email}`);
	}
	async function resend() {
		if (cooldown > 0 || loading) return;
		setLoading(true);
		const { error } = await supabase.auth.signInWithOtp({ email: form.email.trim() });
		setLoading(false);
		if (error) {
			console.error("[signup] resend failed:", error);
			toast.error(error.message || "Couldn't resend the code. Please try again.");
			return;
		}
		setCooldown(RESEND_COOLDOWN_SECONDS);
		setOtpExpiresAt(Date.now() + 600 * 1e3);
		toast.success("A new code has been sent to your email.");
	}
	async function verify() {
		if (otp.length !== 6) {
			toast.error("Enter the 6-digit code from your email");
			return;
		}
		setLoading(true);
		const { data, error } = await supabase.auth.verifyOtp({
			email: form.email.trim(),
			token: otp,
			type: "email"
		});
		if (error) {
			setLoading(false);
			console.error("[signup] verify failed:", error);
			const msg = /expired/i.test(error.message) ? "That code has expired. Tap Resend to get a new one." : /invalid|incorrect|token/i.test(error.message) ? "That code is incorrect. Please check your email and try again." : error.message;
			toast.error(msg);
			return;
		}
		const { error: updateError } = await supabase.auth.updateUser({
			password: form.password,
			data: {
				first_name: form.firstName.trim(),
				last_name: form.lastName.trim(),
				phone: form.phone.trim()
			}
		});
		if (updateError) {
			setLoading(false);
			console.error("[signup] update user metadata/password failed:", updateError);
			toast.error("Account verified, but failed to set password. Please use Forgot Password to set it.");
			return;
		}
		const userId = data.user?.id;
		if (userId) {
			const { error: profileError } = await supabase.from("profiles").update({
				first_name: form.firstName.trim(),
				last_name: form.lastName.trim(),
				phone: form.phone.trim()
			}).eq("id", userId);
			if (profileError) console.error("[signup] update profile table failed:", profileError);
		}
		setLoading(false);
		setStep("done");
		toast.success("Account verified — welcome!");
		try {
			await supabase.auth.getSession();
		} catch (e) {
			console.error("[signup] getSession after verify failed:", e);
		}
		setTimeout(() => navigate({ to: "/" }), 1200);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthShell, {
		title: step === "done" ? "You're in" : step === "otp" ? "Verify your email" : "Create your account",
		subtitle: step === "done" ? "Welcome to the table." : step === "otp" ? `Enter the 6-digit code we sent to ${form.email}.` : "Reserve, save dishes, and unlock seasonal chef's events.",
		footer: step === "form" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
			"Already have an account?",
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/login",
				className: "text-primary hover:underline",
				children: "Sign in"
			})
		] }),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AnimatePresence, {
			mode: "wait",
			children: [
				step === "form" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.form, {
					initial: {
						opacity: 0,
						x: 12
					},
					animate: {
						opacity: 1,
						x: 0
					},
					exit: {
						opacity: 0,
						x: -12
					},
					onSubmit,
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthInput, {
								label: "First name",
								value: form.firstName,
								onChange: (e) => setForm({
									...form,
									firstName: e.target.value
								}),
								error: errors.firstName
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthInput, {
								label: "Last name",
								value: form.lastName,
								onChange: (e) => setForm({
									...form,
									lastName: e.target.value
								}),
								error: errors.lastName
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthInput, {
							label: "Email",
							type: "email",
							autoComplete: "email",
							value: form.email,
							onChange: (e) => setForm({
								...form,
								email: e.target.value
							}),
							error: errors.email
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthInput, {
							label: "Phone",
							type: "tel",
							autoComplete: "tel",
							value: form.phone,
							onChange: (e) => setForm({
								...form,
								phone: e.target.value
							}),
							error: errors.phone
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthInput, {
								label: "Password",
								type: "password",
								autoComplete: "new-password",
								value: form.password,
								onChange: (e) => setForm({
									...form,
									password: e.target.value
								}),
								error: errors.password
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthInput, {
								label: "Confirm",
								type: "password",
								autoComplete: "new-password",
								value: form.confirm,
								onChange: (e) => setForm({
									...form,
									confirm: e.target.value
								}),
								error: errors.confirm
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex items-start gap-2 text-xs text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									checked: form.terms,
									onChange: (e) => setForm({
										...form,
										terms: e.target.checked
									}),
									className: "mt-0.5 h-4 w-4 accent-primary"
								}),
								"I accept the ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-primary",
									children: "Terms"
								}),
								" and",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-primary",
									children: "Privacy Policy"
								}),
								"."
							]
						}),
						errors.terms && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-destructive",
							children: errors.terms
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthButton, {
							type: "submit",
							loading,
							children: loading ? "Sending code…" : "Send verification code"
						})
					]
				}, "form"),
				step === "otp" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						x: 12
					},
					animate: {
						opacity: 1,
						x: 0
					},
					exit: {
						opacity: 0,
						x: -12
					},
					className: "space-y-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							autoFocus: true,
							maxLength: 6,
							value: otp,
							onChange: (e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6)),
							className: "w-full rounded-2xl border border-border bg-background/40 px-4 py-4 text-center font-display text-3xl tracking-[0.6em] outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/30",
							placeholder: "••••••",
							inputMode: "numeric",
							autoComplete: "one-time-code"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthButton, {
							onClick: verify,
							loading,
							disabled: otp.length !== 6,
							children: "Verify & create account"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setStep("form"),
								className: "uppercase tracking-[0.3em] text-muted-foreground hover:text-primary",
								children: "← Edit details"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [otpExpiresAt && timeLeft > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-muted-foreground",
									children: [
										"Expires in ",
										timeLeft,
										"s"
									]
								}) : otpExpiresAt ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-destructive font-medium",
									children: "Code expired"
								}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: resend,
									disabled: cooldown > 0 || loading,
									className: "uppercase tracking-[0.3em] text-primary disabled:text-muted-foreground disabled:cursor-not-allowed",
									children: cooldown > 0 ? `Resend in ${cooldown}s` : "Resend code"
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-center text-[0.7rem] text-muted-foreground",
							children: "The code expires in about 5–10 minutes. Check your spam folder if it hasn't arrived."
						})
					]
				}, "otp"),
				step === "done" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						scale: .92
					},
					animate: {
						opacity: 1,
						scale: 1
					},
					className: "flex flex-col items-center gap-4 py-6 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						initial: { scale: 0 },
						animate: { scale: 1 },
						transition: {
							type: "spring",
							stiffness: 200,
							damping: 14
						},
						className: "grid h-20 w-20 place-items-center rounded-full bg-success/20 text-success",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-10 w-10" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "Redirecting you to the dining room…"
					})]
				}, "done")
			]
		})
	});
}
//#endregion
export { SignupPage as component };
