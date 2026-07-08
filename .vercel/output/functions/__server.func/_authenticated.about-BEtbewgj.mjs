import { n as require_jsx_runtime } from "./_libs/react+tanstack__react-query.mjs";
import { g as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { t as motion } from "./_libs/motion.mjs";
import { G as ChefHat, J as Building2, L as Eye, Y as Award, Z as ArrowRight, i as Users, p as Sparkles, u as Target } from "./_libs/lucide-react.mjs";
import { r as chef_default, t as BG_IMAGES } from "./_ssr/images-Cg6hgnkg.mjs";
import { t as BackButton } from "./_ssr/BackButton-aBIfVsBs.mjs";
import { a as TIMELINE } from "./_ssr/data-BjlbdR6k.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_authenticated.about-BEtbewgj.js
var import_jsx_runtime = require_jsx_runtime();
function AboutPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative overflow-hidden py-24 md:py-32",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute inset-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: BG_IMAGES.about,
							alt: "",
							className: "h-full w-full object-cover"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-black/65" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-b from-background/40 via-background/30 to-background" })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "container-luxe relative",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackButton, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "container-luxe relative mt-6 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
						initial: {
							opacity: 0,
							y: 20
						},
						animate: {
							opacity: 1,
							y: 0
						},
						className: "divider-gold justify-center",
						children: "Our Story"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.h1, {
						initial: {
							opacity: 0,
							y: 30
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: { delay: .15 },
						className: "mx-auto mt-6 max-w-3xl font-display text-5xl leading-tight md:text-7xl",
						children: [
							"Crafted with ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "gold-text italic",
								children: "restraint."
							}),
							" Served with",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "gold-text italic",
								children: "soul."
							})
						]
					})]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "section-pad",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "container-luxe grid gap-8 md:grid-cols-3",
				children: [
					{
						icon: Target,
						title: "Mission",
						text: "To make the most precise food in the world feel personal — never performative."
					},
					{
						icon: Eye,
						title: "Vision",
						text: "An evening at Spice Garden should be remembered like a piece of music."
					},
					{
						icon: Sparkles,
						title: "Philosophy",
						text: "Seasonality, restraint, generosity — in that order. Always in that order."
					}
				].map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						y: 30
					},
					whileInView: {
						opacity: 1,
						y: 0
					},
					viewport: { once: true },
					transition: { delay: i * .1 },
					className: "rounded-3xl border border-border bg-card p-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid h-12 w-12 place-items-center rounded-2xl bg-primary/15 text-primary ring-1 ring-primary/30",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(m.icon, { className: "h-5 w-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-5 font-display text-2xl",
							children: m.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm leading-relaxed text-muted-foreground",
							children: m.text
						})
					]
				}, m.title))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "section-pad bg-surface",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-luxe",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "divider-gold",
						children: "Timeline"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-3 max-w-2xl font-display text-4xl md:text-5xl",
						children: "A quiet evolution"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-14 grid gap-6 md:grid-cols-2",
						children: TIMELINE.map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								x: i % 2 ? 30 : -30
							},
							whileInView: {
								opacity: 1,
								x: 0
							},
							viewport: { once: true },
							transition: { duration: .6 },
							className: "glass relative overflow-hidden rounded-3xl p-8",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-5xl gold-text",
									children: t.year
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mt-3 font-display text-xl",
									children: t.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm text-muted-foreground",
									children: t.text
								})
							]
						}, t.year))
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "section-pad",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-luxe grid items-center gap-12 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						x: -30
					},
					whileInView: {
						opacity: 1,
						x: 0
					},
					viewport: { once: true },
					className: "relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: chef_default,
						alt: "Executive Chef",
						loading: "lazy",
						className: "aspect-[4/5] w-full rounded-[2.5rem] border border-primary/30 object-cover shadow-luxe"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "glass absolute -bottom-6 -right-4 rounded-3xl px-7 py-5 shadow-luxe md:-right-10",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-4xl gold-text",
							children: "15+"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs uppercase tracking-[0.3em] text-muted-foreground",
							children: "Years experience"
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						x: 30
					},
					whileInView: {
						opacity: 1,
						x: 0
					},
					viewport: { once: true },
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "divider-gold",
							children: "Meet the Chef"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-3 font-display text-4xl md:text-5xl",
							children: "Marco Aurelio"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-5 text-muted-foreground leading-relaxed",
							children: "Trained in Paris, Tokyo, San Sebastián and Copenhagen, Chef Marco has spent two decades distilling a single idea: the most luxurious thing on a plate is restraint. His signature lies not in what he adds, but in what he refuses to."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 font-display text-3xl italic gold-text",
							children: "\"Cook less. Cook better.\""
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-xs uppercase tracking-[0.4em] text-muted-foreground",
							children: "— Chef Marco Aurelio"
						})
					]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "section-pad bg-surface",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "container-luxe grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
				children: [
					{
						icon: Users,
						n: "120k+",
						l: "Happy guests"
					},
					{
						icon: Award,
						n: "28",
						l: "International awards"
					},
					{
						icon: Building2,
						n: "4",
						l: "Branches worldwide"
					},
					{
						icon: ChefHat,
						n: "32",
						l: "Expert chefs"
					}
				].map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						y: 20
					},
					whileInView: {
						opacity: 1,
						y: 0
					},
					viewport: { once: true },
					transition: { delay: i * .08 },
					className: "rounded-3xl border border-border bg-card p-7 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(s.icon, { className: "mx-auto h-7 w-7 text-primary" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 font-display text-4xl gold-text",
							children: s.n
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-xs uppercase tracking-[0.3em] text-muted-foreground",
							children: s.l
						})
					]
				}, s.l))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "section-pad",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-luxe text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mx-auto max-w-2xl font-display text-4xl md:text-5xl",
					children: "Come and be a guest at our table."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/reservations",
					className: "mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold uppercase tracking-[0.25em] text-primary-foreground shadow-glow",
					children: ["Reserve ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
				})]
			})
		})
	] });
}
//#endregion
export { AboutPage as component };
