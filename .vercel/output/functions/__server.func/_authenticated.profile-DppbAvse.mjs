import { o as __toESM } from "./_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "./_libs/react+tanstack__react-query.mjs";
import { n as useAuth } from "./_ssr/auth-BU19OWwl.mjs";
import { n as formatCurrency } from "./_ssr/utils-Dz0d21t-.mjs";
import { v as useNavigate } from "./_libs/@tanstack/react-router+[...].mjs";
import { t as motion } from "./_libs/motion.mjs";
import { P as Heart, _ as Settings2, a as UserRound, b as Receipt, f as Star, j as LogOut, q as CalendarDays } from "./_libs/lucide-react.mjs";
import { n as DISHES } from "./_ssr/data-BjlbdR6k.mjs";
import { n as toast } from "./_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_authenticated.profile-DppbAvse.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var TABS = [
	{
		id: "overview",
		label: "Overview",
		icon: UserRound
	},
	{
		id: "reservations",
		label: "Reservations",
		icon: CalendarDays
	},
	{
		id: "wishlist",
		label: "Wishlist",
		icon: Heart
	},
	{
		id: "orders",
		label: "Orders",
		icon: Receipt
	},
	{
		id: "settings",
		label: "Settings",
		icon: Settings2
	}
];
function ProfilePage() {
	const { user, logout } = useAuth();
	const navigate = useNavigate();
	const [tab, setTab] = (0, import_react.useState)("overview");
	if (!user) return null;
	const firstName = user.firstName || user.email.split("@")[0] || "Guest";
	const lastName = user.lastName || "";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "section-pad",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-luxe grid gap-8 lg:grid-cols-[260px_1fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "space-y-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "glass-strong rounded-3xl p-6 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mx-auto grid h-20 w-20 place-items-center rounded-full bg-primary/20 font-display text-2xl text-primary ring-1 ring-primary/40",
							children: ((firstName[0] || "G") + (lastName[0] || "")).toUpperCase()
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-4 font-display text-xl",
							children: [
								firstName,
								" ",
								lastName
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: user.email
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-3 inline-block rounded-full bg-primary/15 px-3 py-1 text-[0.65rem] uppercase tracking-[0.3em] text-primary",
							children: "Gold Member"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "rounded-3xl border border-border bg-card p-2",
					children: [TABS.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setTab(t.id),
						className: `flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm transition ${tab === t.id ? "bg-primary/15 text-primary" : "text-foreground/80 hover:bg-white/5"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(t.icon, { className: "h-4 w-4" }), t.label]
					}, t.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => {
							logout();
							navigate({ to: "/login" });
						},
						className: "mt-2 flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm text-destructive hover:bg-destructive/10",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-4 w-4" }), " Sign out"]
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					opacity: 0,
					y: 10
				},
				animate: {
					opacity: 1,
					y: 0
				},
				className: "space-y-6",
				children: [
					tab === "overview" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								n: "12",
								l: "Visits"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								n: "8",
								l: "Favourites"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								n: "3",
								l: "Upcoming bookings"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-3xl border border-border bg-card p-7",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-2xl",
							children: "Recent activity"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-5 divide-y divide-border/60",
							children: [
								["Reservation confirmed", "Sat · 19:30 · 2 guests"],
								["Saved to wishlist", "Saffron Grilled Chicken"],
								["Tasting menu added", "11-course chef's tasting"]
							].map(([t, s]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-center justify-between py-3 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium",
									children: t
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: s
								})]
							}, t))
						})]
					})] }),
					tab === "reservations" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-3",
						children: [
							{
								date: "Sat, 12 Oct · 19:30",
								guests: 2,
								status: "Confirmed"
							},
							{
								date: "Fri, 25 Oct · 20:00",
								guests: 4,
								status: "Pending"
							},
							{
								date: "Sun, 03 Nov · 13:00",
								guests: 6,
								status: "Confirmed"
							}
						].map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-border bg-card p-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-lg",
								children: r.date
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs uppercase tracking-[0.3em] text-muted-foreground",
								children: [r.guests, " guests"]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `rounded-full px-3 py-1 text-xs uppercase tracking-[0.25em] ${r.status === "Confirmed" ? "bg-success/15 text-success" : "bg-primary/15 text-primary"}`,
								children: r.status
							})]
						}, r.date))
					}),
					tab === "wishlist" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: DISHES.slice(0, 4).map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-4 rounded-3xl border border-border bg-card p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: d.image,
								alt: "",
								className: "h-20 w-20 rounded-2xl object-cover"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-lg",
									children: d.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "flex items-center gap-1 text-xs text-muted-foreground",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3 w-3 fill-primary text-primary" }),
										" ",
										d.rating,
										" · ",
										formatCurrency(d.price)
									]
								})]
							})]
						}, d.id))
					}),
					tab === "orders" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-3xl border border-border bg-card p-7",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-2xl",
							children: "Past orders"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-muted-foreground",
							children: "No orders yet. Plates ordered through our private dining app will appear here."
						})]
					}),
					tab === "settings" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: (e) => {
							e.preventDefault();
							toast.success("Settings saved");
						},
						className: "rounded-3xl border border-border bg-card p-7",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-2xl",
								children: "Account"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-6 grid gap-4 sm:grid-cols-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingField, {
										label: "First name",
										defaultValue: firstName
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingField, {
										label: "Last name",
										defaultValue: lastName
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingField, {
										label: "Email",
										defaultValue: user.email
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingField, {
										label: "Phone",
										defaultValue: user.phone || ""
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "mt-6 rounded-full bg-primary px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.25em] text-primary-foreground",
								children: "Save changes"
							})
						]
					})
				]
			}, tab)]
		})
	});
}
function Stat({ n, l }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-3xl border border-border bg-card p-6 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-4xl gold-text",
			children: n
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-xs uppercase tracking-[0.3em] text-muted-foreground",
			children: l
		})]
	});
}
function SettingField({ label, defaultValue }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "mb-1.5 block text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			defaultValue,
			className: "w-full rounded-2xl border border-border bg-background/40 px-4 py-3 text-sm outline-none transition focus:border-primary/60 focus:ring-2 focus:ring-primary/30"
		})]
	});
}
//#endregion
export { ProfilePage as component };
