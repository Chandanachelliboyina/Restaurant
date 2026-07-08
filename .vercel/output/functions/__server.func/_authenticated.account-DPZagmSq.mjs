import { o as __toESM } from "./_runtime.mjs";
import { t as supabase } from "./_ssr/client-4hMyJYfy.mjs";
import { n as require_jsx_runtime, r as require_react } from "./_libs/react+tanstack__react-query.mjs";
import { n as useAuth } from "./_ssr/auth-BU19OWwl.mjs";
import { v as useNavigate } from "./_libs/@tanstack/react-router+[...].mjs";
import { t as motion } from "./_libs/motion.mjs";
import { A as Mail, C as Phone, K as Calendar, a as UserRound, g as ShieldAlert, h as ShieldCheck, j as LogOut } from "./_libs/lucide-react.mjs";
import { t as BackButton } from "./_ssr/BackButton-aBIfVsBs.mjs";
import { n as toast } from "./_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_authenticated.account-DPZagmSq.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AccountPage() {
	const { user, session, logout } = useAuth();
	const navigate = useNavigate();
	const [editing, setEditing] = (0, import_react.useState)(false);
	const [changingPw, setChangingPw] = (0, import_react.useState)(false);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [firstName, setFirstName] = (0, import_react.useState)(user?.firstName ?? "");
	const [lastName, setLastName] = (0, import_react.useState)(user?.lastName ?? "");
	const [phone, setPhone] = (0, import_react.useState)(user?.phone ?? "");
	const [deliveryAddress, setDeliveryAddress] = (0, import_react.useState)(user?.deliveryAddress ?? "");
	const [avatarUrl, setAvatarUrl] = (0, import_react.useState)(user?.avatar ?? "");
	const [newPw, setNewPw] = (0, import_react.useState)("");
	const [uploading, setUploading] = (0, import_react.useState)(false);
	if (!user || !session) return null;
	const supaUser = session.user;
	const verified = !!supaUser.email_confirmed_at;
	const created = supaUser.created_at ? new Date(supaUser.created_at).toLocaleDateString() : "—";
	const initials = ((firstName[0] || user.email[0] || "G") + (lastName[0] || "")).toUpperCase();
	const saveProfile = async (e) => {
		e.preventDefault();
		setSaving(true);
		const { error } = await supabase.auth.updateUser({ data: {
			first_name: firstName,
			last_name: lastName,
			phone,
			delivery_address: deliveryAddress,
			avatar_url: avatarUrl
		} });
		setSaving(false);
		if (error) return toast.error(error.message);
		toast.success("Profile updated");
		setEditing(false);
	};
	const uploadAvatar = async (file) => {
		if (!file || !user) return;
		setUploading(true);
		try {
			const path = `avatars/${user.id}/avatar-${Date.now()}`;
			const { error: upErr } = await supabase.storage.from("avatars").upload(path, file, { upsert: true });
			if (upErr) throw upErr;
			const { data } = supabase.storage.from("avatars").getPublicUrl(path);
			const publicUrl = data.publicUrl;
			const { error: upd } = await supabase.auth.updateUser({ data: { avatar_url: publicUrl } });
			if (upd) throw upd;
			setAvatarUrl(publicUrl);
			toast.success("Profile photo updated");
		} catch (err) {
			console.error("[account] avatar upload failed:", err);
			toast.error(err?.message || "Failed to upload avatar");
		} finally {
			setUploading(false);
		}
	};
	const changePassword = async (e) => {
		e.preventDefault();
		if (newPw.length < 8) return toast.error("Password must be at least 8 characters");
		const { error } = await supabase.auth.updateUser({ password: newPw });
		if (error) return toast.error(error.message);
		toast.success("Password changed");
		setNewPw("");
		setChangingPw(false);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "section-pad",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-luxe max-w-3xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackButton, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.h1, {
					initial: {
						opacity: 0,
						y: 8
					},
					animate: {
						opacity: 1,
						y: 0
					},
					className: "font-display text-4xl md:text-5xl",
					children: "Account"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 rounded-3xl border border-border bg-card p-6 md:p-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid h-20 w-20 place-items-center rounded-full bg-primary/20 font-display text-2xl text-primary ring-1 ring-primary/40",
								children: initials
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "font-display text-2xl",
										children: [
											firstName || "Guest",
											" ",
											lastName
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-muted-foreground",
										children: user.email
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: `mt-2 inline-flex items-center gap-1 rounded-full px-3 py-1 text-[0.65rem] uppercase tracking-[0.25em] ${verified ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive"}`,
										children: [verified ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-3 w-3" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "h-3 w-3" }), verified ? "Verified" : "Unverified"]
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "mt-8 grid gap-4 sm:grid-cols-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
									icon: UserRound,
									l: "Full Name",
									v: `${firstName || "—"} ${lastName}`.trim()
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
									icon: Mail,
									l: "Email",
									v: user.email
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
									icon: Phone,
									l: "Phone",
									v: phone || "—"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
									icon: Calendar,
									l: "Delivery Address",
									v: deliveryAddress || "—"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
									icon: Calendar,
									l: "Member Since",
									v: created
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 flex flex-wrap gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setEditing((v) => !v),
									className: "rounded-full border border-primary/40 px-5 py-2 text-xs font-semibold uppercase tracking-[0.25em] hover:bg-primary/10",
									children: editing ? "Cancel" : "Edit Profile"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setChangingPw((v) => !v),
									className: "rounded-full border border-primary/40 px-5 py-2 text-xs font-semibold uppercase tracking-[0.25em] hover:bg-primary/10",
									children: changingPw ? "Cancel" : "Change Password"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: async () => {
										await logout();
										navigate({ to: "/login" });
									},
									className: "inline-flex items-center gap-2 rounded-full bg-destructive/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-destructive hover:bg-destructive/20",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-3 w-3" }), " Logout"]
								})
							]
						}),
						editing && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: saveProfile,
							className: "mt-6 grid gap-4 border-t border-border pt-6 sm:grid-cols-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "First name",
									value: firstName,
									onChange: setFirstName
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Last name",
									value: lastName,
									onChange: setLastName
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Phone",
									value: phone,
									onChange: setPhone
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Delivery address",
									value: deliveryAddress,
									onChange: setDeliveryAddress,
									className: "sm:col-span-2"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "sm:col-span-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mb-1.5 block text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground",
										children: "Profile photo"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: avatarUrl || void 0,
											alt: "avatar",
											className: "h-12 w-12 rounded-full object-cover"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "file",
											accept: "image/*",
											onChange: (e) => uploadAvatar(e.target.files?.[0] ?? null),
											disabled: uploading
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									disabled: saving,
									className: "sm:col-span-2 rounded-full bg-primary px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.25em] text-primary-foreground disabled:opacity-60",
									children: saving ? "Saving…" : "Save Changes"
								})
							]
						}),
						changingPw && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: changePassword,
							className: "mt-6 grid gap-4 border-t border-border pt-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "New password",
								value: newPw,
								onChange: setNewPw,
								type: "password"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "rounded-full bg-primary px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.25em] text-primary-foreground",
								children: "Update Password"
							})]
						})
					]
				})
			]
		})
	});
}
function Info({ icon: Icon, l, v }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-start gap-3 rounded-2xl border border-border/60 bg-background/30 p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "mt-0.5 h-4 w-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-[0.65rem] uppercase tracking-[0.25em] text-muted-foreground",
			children: l
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "mt-1 text-sm",
			children: v
		})] })]
	});
}
function Field({ label, value, onChange, type = "text", className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: `block ${className}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "mb-1.5 block text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			type,
			value,
			onChange: (e) => onChange(e.target.value),
			className: "w-full rounded-2xl border border-border bg-background/40 px-4 py-3 text-sm outline-none transition focus:border-primary/60 focus:ring-2 focus:ring-primary/30"
		})]
	});
}
//#endregion
export { AccountPage as component };
