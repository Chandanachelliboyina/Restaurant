import { o as __toESM } from "./_runtime.mjs";
import { t as supabase } from "./_ssr/client-4hMyJYfy.mjs";
import { n as require_jsx_runtime, r as require_react } from "./_libs/react+tanstack__react-query.mjs";
import { n as useAuth } from "./_ssr/auth-BU19OWwl.mjs";
import { v as useNavigate } from "./_libs/@tanstack/react-router+[...].mjs";
import { i as AnimatePresence } from "./_libs/framer-motion.mjs";
import { t as motion } from "./_libs/motion.mjs";
import { V as CircleCheck, i as Users, p as Sparkles, q as CalendarDays, z as Clock } from "./_libs/lucide-react.mjs";
import { t as BG_IMAGES } from "./_ssr/images-Cg6hgnkg.mjs";
import { t as BackButton } from "./_ssr/BackButton-aBIfVsBs.mjs";
import { r as FAQS } from "./_ssr/data-BjlbdR6k.mjs";
import { n as toast } from "./_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_authenticated.reservations-BPXLhx0G.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function buildTimes() {
	const out = [];
	for (let h = 9; h <= 23; h++) {
		out.push(`${String(h).padStart(2, "0")}:00`);
		if (h < 23) out.push(`${String(h).padStart(2, "0")}:30`);
	}
	return out;
}
var ALL_TIMES = buildTimes();
var todayStr = () => {
	const d = /* @__PURE__ */ new Date();
	return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};
function ReservationsPage() {
	const { user } = useAuth();
	const navigate = useNavigate();
	const [form, setForm] = (0, import_react.useState)({
		name: user ? `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim() : "",
		email: user?.email ?? "",
		phone: user?.phone ?? "",
		guests: "2",
		date: todayStr(),
		time: "19:30",
		occasion: "Dinner",
		request: ""
	});
	const [done, setDone] = (0, import_react.useState)(false);
	const [openFaq, setOpenFaq] = (0, import_react.useState)(0);
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const availableTimes = (0, import_react.useMemo)(() => {
		if (!form.date) return ALL_TIMES;
		if (form.date !== todayStr()) return ALL_TIMES;
		const now = /* @__PURE__ */ new Date();
		return ALL_TIMES.filter((t) => {
			const [h, m] = t.split(":").map(Number);
			return h > now.getHours() || h === now.getHours() && m > now.getMinutes();
		});
	}, [form.date]);
	async function handleSubmit(e) {
		e.preventDefault();
		if (!user) {
			toast.error("Please sign in to book a table");
			navigate({ to: "/login" });
			return;
		}
		if (!availableTimes.includes(form.time)) {
			toast.error("Please pick an available time slot");
			return;
		}
		setSubmitting(true);
		const { error } = await supabase.from("reservations").insert({
			user_id: user.id,
			name: form.name,
			email: form.email,
			phone: form.phone,
			guests: Number(form.guests),
			reservation_date: form.date,
			reservation_time: form.time,
			occasion: form.occasion,
			request: form.request || null,
			status: "pending"
		});
		setSubmitting(false);
		if (error) {
			toast.error(error.message);
			return;
		}
		setDone(true);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative overflow-hidden py-24 text-center md:py-32",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute inset-0 -z-10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: BG_IMAGES.reservations,
							alt: "",
							className: "h-full w-full object-cover",
							loading: "lazy"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-black/70" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-b from-background/40 via-background/30 to-background" })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "container-luxe text-left",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackButton, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "container-luxe mt-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "divider-gold justify-center",
							children: "Reservations"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "mx-auto mt-5 max-w-3xl font-display text-5xl leading-tight md:text-7xl",
							children: ["Reserve your ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "gold-text italic",
								children: "table."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mx-auto mt-5 max-w-xl text-muted-foreground",
							children: "Tables are released eight weeks in advance. We confirm every reservation by hand."
						})
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "section-pad pt-0",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-luxe grid gap-8 lg:grid-cols-[1.4fr_1fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.form, {
					initial: {
						opacity: 0,
						y: 20
					},
					whileInView: {
						opacity: 1,
						y: 0
					},
					viewport: { once: true },
					onSubmit: handleSubmit,
					className: "glass-strong rounded-3xl p-6 shadow-luxe md:p-10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-3xl",
							children: "Your details"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 grid gap-4 sm:grid-cols-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Full name",
									value: form.name,
									onChange: (v) => setForm({
										...form,
										name: v
									}),
									required: true
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Email",
									type: "email",
									value: form.email,
									onChange: (v) => setForm({
										...form,
										email: v
									}),
									required: true
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Phone",
									type: "tel",
									value: form.phone,
									onChange: (v) => setForm({
										...form,
										phone: v
									}),
									required: true
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Guests",
									type: "number",
									value: form.guests,
									onChange: (v) => setForm({
										...form,
										guests: v
									}),
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-4 w-4" }),
									min: 1,
									max: 20
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Date",
									type: "date",
									value: form.date,
									onChange: (v) => setForm({
										...form,
										date: v
									}),
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, { className: "h-4 w-4" }),
									required: true,
									min: todayStr()
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectField, {
									label: "Time",
									value: form.time,
									onChange: (v) => setForm({
										...form,
										time: v
									}),
									options: availableTimes.length ? availableTimes : ["No slots today"],
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-4 w-4" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectField, {
									label: "Occasion",
									value: form.occasion,
									onChange: (v) => setForm({
										...form,
										occasion: v
									}),
									options: [
										"Dinner",
										"Birthday",
										"Anniversary",
										"Business",
										"Date Night"
									],
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Special request",
									value: form.request,
									onChange: (v) => setForm({
										...form,
										request: v
									}),
									placeholder: "Dietary notes, allergies…",
									className: "sm:col-span-2"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "submit",
							disabled: submitting,
							className: "group relative mt-6 w-full overflow-hidden rounded-2xl bg-primary px-6 py-4 text-sm font-semibold uppercase tracking-[0.25em] text-primary-foreground shadow-glow disabled:opacity-60",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "relative z-10",
								children: submitting ? "Booking…" : "Book Now"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-0 -z-0 translate-y-full bg-primary-glow transition duration-500 group-hover:translate-y-0" })]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.aside, {
					initial: {
						opacity: 0,
						y: 20
					},
					whileInView: {
						opacity: 1,
						y: 0
					},
					viewport: { once: true },
					transition: { delay: .1 },
					className: "space-y-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-3xl border border-primary/30 bg-card p-7",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "divider-gold",
								children: "Summary"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
								className: "mt-4 space-y-2 text-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
										label: "Guests",
										value: form.guests
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
										label: "Date",
										value: form.date || "—"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
										label: "Time",
										value: form.time
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
										label: "Occasion",
										value: form.occasion
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-3xl border border-border bg-card p-7",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "divider-gold",
								children: "Service hours"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
								className: "mt-4 space-y-2 text-sm text-foreground/80",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Tuesday — Thursday" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: "18:00 – 22:30"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Friday — Saturday" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: "17:30 – 23:00"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Sunday" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: "12:00 – 21:00"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Monday" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: "Closed"
										})]
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-3xl border border-border bg-card p-7",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "divider-gold",
								children: "Policy"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-sm leading-relaxed text-muted-foreground",
								children: "A card is required to confirm. Cancellations are complimentary up to 48 hours before service. Tasting menus require pre-payment."
							})]
						})
					]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "section-pad bg-surface",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-luxe max-w-3xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "divider-gold",
						children: "FAQs"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-3 font-display text-4xl md:text-5xl",
						children: "Before you book"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-10 space-y-3",
						children: FAQS.map((f, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "overflow-hidden rounded-2xl border border-border bg-card",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setOpenFaq(openFaq === i ? null : i),
								className: "flex w-full items-center justify-between px-6 py-5 text-left",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-display text-lg",
									children: f.q
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-primary",
									children: openFaq === i ? "−" : "+"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: openFaq === i && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
								initial: {
									height: 0,
									opacity: 0
								},
								animate: {
									height: "auto",
									opacity: 1
								},
								exit: {
									height: 0,
									opacity: 0
								},
								className: "px-6 pb-5 text-sm leading-relaxed text-muted-foreground",
								children: f.a
							}) })]
						}, f.q))
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: done && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			initial: { opacity: 0 },
			animate: { opacity: 1 },
			exit: { opacity: 0 },
			className: "fixed inset-0 z-[60] grid place-items-center bg-background/85 p-6 backdrop-blur-xl",
			onClick: () => setDone(false),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					scale: .9,
					y: 20
				},
				animate: {
					scale: 1,
					y: 0
				},
				exit: {
					scale: .9,
					y: 20
				},
				className: "glass-strong max-w-md rounded-3xl p-10 text-center shadow-luxe",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mx-auto grid h-20 w-20 place-items-center rounded-full bg-success/20 text-success",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-10 w-10" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mt-5 font-display text-3xl gold-text",
						children: "Reservation requested"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-muted-foreground",
						children: "A note has been sent to your maître d'. We will confirm by phone within four hours."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setDone(false),
						className: "mt-6 rounded-full bg-primary px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.25em] text-primary-foreground",
						children: "Close"
					})
				]
			})
		}) })
	] });
}
function Field({ label, value, onChange, type = "text", required, placeholder, icon, className = "", min, max }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: `block ${className}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "mb-1.5 block text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2 rounded-2xl border border-border bg-background/40 px-4 transition focus-within:border-primary/60 focus-within:ring-2 focus-within:ring-primary/30",
			children: [icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-primary",
				children: icon
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type,
				required,
				value,
				min,
				max,
				onChange: (e) => onChange(e.target.value),
				placeholder,
				className: "w-full bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground/70 [color-scheme:dark]"
			})]
		})]
	});
}
function SelectField({ label, value, onChange, options, icon }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "mb-1.5 block text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2 rounded-2xl border border-border bg-background/40 px-4",
			children: [icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-primary",
				children: icon
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
				value,
				onChange: (e) => onChange(e.target.value),
				className: "w-full appearance-none bg-transparent py-3 text-sm outline-none",
				children: options.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: o,
					className: "bg-background",
					children: o
				}, o))
			})]
		})]
	});
}
function Row({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex justify-between border-b border-border/70 py-2 last:border-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-xs uppercase tracking-[0.2em] text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "font-medium",
			children: value
		})]
	});
}
//#endregion
export { ReservationsPage as component };
