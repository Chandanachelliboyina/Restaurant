import { o as __toESM } from "./_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "./_libs/react+tanstack__react-query.mjs";
import { t as motion } from "./_libs/motion.mjs";
import { A as Mail, C as Phone, D as MessageCircleMore, I as Facebook, N as Instagram, k as MapPin, p as Sparkles, s as Twitter, v as Send, z as Clock } from "./_libs/lucide-react.mjs";
import { t as BG_IMAGES } from "./_ssr/images-Cg6hgnkg.mjs";
import { t as BackButton } from "./_ssr/BackButton-aBIfVsBs.mjs";
import { n as toast } from "./_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_authenticated.contact-BodLE_GQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ContactPage() {
	const [form, setForm] = (0, import_react.useState)({
		name: "",
		email: "",
		subject: "",
		message: ""
	});
	const [chatOpen, setChatOpen] = (0, import_react.useState)(false);
	const [chatInput, setChatInput] = (0, import_react.useState)("");
	const [chatMessages, setChatMessages] = (0, import_react.useState)([{
		role: "assistant",
		content: "Hi! I can help with reservations, menu questions, payments, and service issues. What do you need today?"
	}]);
	const handleChatSubmit = (e) => {
		e.preventDefault();
		const userMessage = chatInput.trim();
		if (!userMessage) return;
		const reply = getChatReply(userMessage);
		setChatMessages((prev) => [
			...prev,
			{
				role: "user",
				content: userMessage
			},
			{
				role: "assistant",
				content: reply
			}
		]);
		setChatInput("");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative overflow-hidden py-24 text-center md:py-32",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute inset-0 -z-10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: BG_IMAGES.contact,
							alt: "",
							className: "h-full w-full object-cover object-bottom",
							loading: "lazy"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-black/75" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-b from-background/40 via-background/30 to-background" })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "container-luxe text-left",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackButton, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "container-luxe mt-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "divider-gold justify-center",
						children: "Contact"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "mx-auto mt-5 max-w-3xl font-display text-5xl leading-tight md:text-7xl",
						children: ["Let's ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "gold-text italic",
							children: "talk."
						})]
					})]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "section-pad pt-0",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-luxe grid gap-8 lg:grid-cols-[1.1fr_1fr]",
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
					onSubmit: (e) => {
						e.preventDefault();
						toast.success("Message sent — we'll reply shortly");
						setForm({
							name: "",
							email: "",
							subject: "",
							message: ""
						});
					},
					className: "glass-strong rounded-3xl p-6 shadow-luxe md:p-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-3xl",
						children: "Send us a note"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 grid gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								label: "Name",
								value: form.name,
								onChange: (v) => setForm({
									...form,
									name: v
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								label: "Email",
								type: "email",
								value: form.email,
								onChange: (v) => setForm({
									...form,
									email: v
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								label: "Subject",
								value: form.subject,
								onChange: (v) => setForm({
									...form,
									subject: v
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mb-1.5 block text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground",
									children: "Message"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									rows: 5,
									value: form.message,
									onChange: (e) => setForm({
										...form,
										message: e.target.value
									}),
									className: "w-full rounded-2xl border border-border bg-background/40 px-4 py-3 text-sm outline-none transition focus:border-primary/60 focus:ring-2 focus:ring-primary/30"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "submit",
								className: "rounded-2xl bg-primary px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.25em] text-primary-foreground shadow-glow transition hover:shadow-luxe",
								children: "Send Message"
							})
						]
					})]
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
					className: "space-y-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-3xl border border-primary/25 bg-card p-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "divider-gold",
									children: "Helpline & AI Chat"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-sm text-muted-foreground",
									children: "Need help with reservations, menu ideas, or any concern? Our support assistant is ready to guide you instantly."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setChatOpen((prev) => !prev),
									className: "mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircleMore, { className: "h-4 w-4" }), chatOpen ? "Hide chat" : "Chat with us"]
								}),
								chatOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-4 rounded-2xl border border-border bg-background/70 p-4 shadow-inner",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2 text-sm font-semibold text-primary",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4" }), "Spice Garden Assistant"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mt-3 max-h-56 space-y-2 overflow-auto",
											children: chatMessages.map((msg, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: `max-w-[90%] rounded-2xl px-3 py-2 text-sm ${msg.role === "assistant" ? "bg-primary/10 text-foreground" : "ml-auto bg-primary text-primary-foreground"}`,
												children: msg.content
											}, `${msg.role}-${index}`))
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
											onSubmit: handleChatSubmit,
											className: "mt-3 flex gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												value: chatInput,
												onChange: (e) => setChatInput(e.target.value),
												placeholder: "Ask about a reservation or issue",
												className: "flex-1 rounded-full border border-border bg-background/80 px-3 py-2 text-sm outline-none focus:border-primary/60"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "submit",
												className: "grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground",
												"aria-label": "Send message",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-4 w-4" })
											})]
										})
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
							icon: MapPin,
							title: "Address",
							text: "HITEC City, Hyderabad"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
							icon: Phone,
							title: "Phone",
							text: "+91 98765 43210"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
							icon: Mail,
							title: "Email",
							text: "spicegarden106@gmail.com"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
							icon: Clock,
							title: "Hours",
							text: "MON - SUN · Morning 11 to Night 12"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-3xl border border-border bg-card p-7",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "divider-gold",
								children: "Follow"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-4 flex gap-3",
								children: [
									Instagram,
									Facebook,
									Twitter
								].map((Icon, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#",
									className: "grid h-11 w-11 place-items-center rounded-full border border-primary/30 text-foreground/80 transition hover:bg-primary/10 hover:text-primary",
									"aria-label": "Social",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" })
								}, i))
							})]
						})
					]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "container-luxe pb-24",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-hidden rounded-3xl border border-primary/30 shadow-luxe",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
					title: "Spice Garden location",
					src: "https://www.openstreetmap.org/export/embed.html?bbox=78.3745%2C17.4478%2C78.3883%2C17.4551&layer=mapnik",
					className: "h-[420px] w-full grayscale-[40%]",
					loading: "lazy"
				})
			})
		})
	] });
}
function getChatReply(message) {
	const lower = message.toLowerCase().trim();
	if (!lower) return "Hello! I can help with reservations, menu suggestions, timing, location, and support issues.";
	const intentMatches = [];
	if (/(hi|hello|hey|good morning|good evening|help)/.test(lower)) intentMatches.push("Hello! I’m Spice Garden’s support assistant.");
	if (/(reservation|table|book|booking|reserve|seat|seats)/.test(lower)) intentMatches.push("We can help you reserve a table. Please share your preferred date, time, and guest count.");
	if (/(menu|dish|soup|food|allergy|vegetarian|vegan|recommend|special|taste|what do you serve)/.test(lower)) intentMatches.push("We offer a wide range of dishes, including soups, vegetarian favorites, and signature mains.");
	if (/(timing|time|open|close|hours|morning|night|sun|mon|today)/.test(lower)) intentMatches.push("We are open every day from 11:00 AM to 12:00 AM.");
	if (/(location|address|where|hitec|hyderabad|map|nearby)/.test(lower)) intentMatches.push("We’re located in HITEC City, Hyderabad, and the map on this page shows the area.");
	if (/(payment|bill|refund|charge|card|cash|price|cost)/.test(lower)) intentMatches.push("We can assist with billing or payment concerns. Share the concern and amount so we can help.");
	if (/(delay|late|order|delivery|wait|service|problem|issue|bad|angry|complaint)/.test(lower)) intentMatches.push("Sorry for the inconvenience. Tell us what happened so we can help resolve it.");
	if (/(phone|email|contact|number|reach)/.test(lower)) intentMatches.push("You can reach us at +91 98765 43210 or spicegarden106@gmail.com.");
	if (intentMatches.length > 0) return intentMatches.join(" ");
	return "I’m sorry, I couldn’t understand your request clearly. Please contact our restaurant support at +91 98765 43210 or spicegarden106@gmail.com for further help.";
}
function Input({ label, value, onChange, type = "text" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
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
function Info({ icon: Icon, title, text }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-start gap-4 rounded-3xl border border-border bg-card p-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary/15 text-primary ring-1 ring-primary/30",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs uppercase tracking-[0.3em] text-muted-foreground",
				children: title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-base font-medium",
				children: text
			})]
		})]
	});
}
//#endregion
export { ContactPage as component };
