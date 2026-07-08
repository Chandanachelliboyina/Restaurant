import { o as __toESM } from "./_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "./_libs/react+tanstack__react-query.mjs";
import { n as formatCurrency } from "./_ssr/utils-Dz0d21t-.mjs";
import { g as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { n as useScroll, t as useTransform } from "./_libs/framer-motion.mjs";
import { t as motion } from "./_libs/motion.mjs";
import { G as ChefHat, M as Leaf, N as Instagram, W as ChevronDown, Y as Award, Z as ArrowRight, f as Star, p as Sparkles, x as Quote } from "./_libs/lucide-react.mjs";
import { t as hero_restaurant_default } from "./_ssr/hero-restaurant-BDZG_w2W.mjs";
import { t as interior_default } from "./_ssr/interior-BnrtO9R9.mjs";
import { r as chef_default } from "./_ssr/images-Cg6hgnkg.mjs";
import { i as TESTIMONIALS, n as DISHES } from "./_ssr/data-BjlbdR6k.mjs";
import { t as DishCard } from "./_ssr/DishCard-Bcix8jdA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_authenticated.index-Cd-2vE_N.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function HomePage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhyChooseUs, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopularDishes, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChefSection, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Story, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TodaysSpecial, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Categories, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Testimonials, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InstagramFeed, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReservationCTA, {})
	] });
}
function Hero() {
	const ref = (0, import_react.useRef)(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start start", "end start"]
	});
	const y = useTransform(scrollYProgress, [0, 1], [0, 220]);
	const scale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
	const opacity = useTransform(scrollYProgress, [0, .8], [1, 0]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		ref,
		className: "relative -mt-24 flex min-h-[100svh] items-center overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				style: { scale },
				className: "absolute inset-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: hero_restaurant_default,
					alt: "",
					className: "h-full w-full object-cover"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-b from-background/70 via-background/40 to-background" })]
			}),
			[...Array(8)].map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
				"aria-hidden": true,
				className: "absolute h-1.5 w-1.5 rounded-full bg-primary/70 blur-[1px]",
				style: {
					left: `${10 + i * 11}%`,
					top: `${20 + i % 3 * 18}%`
				},
				animate: {
					y: [
						0,
						-30,
						0
					],
					opacity: [
						.3,
						.8,
						.3
					]
				},
				transition: {
					duration: 6 + i,
					repeat: Infinity,
					ease: "easeInOut",
					delay: i * .4
				}
			}, i)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				style: {
					y,
					opacity
				},
				className: "container-luxe relative z-10 grid place-items-center pt-32 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
						initial: {
							opacity: 0,
							y: 20
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: { delay: .2 },
						className: "divider-gold",
						children: "★★★ · Michelin Three Stars · Est. 2008"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.h1, {
						initial: {
							opacity: 0,
							y: 40
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: {
							duration: 1,
							delay: .3,
							ease: [
								.16,
								1,
								.3,
								1
							]
						},
						className: "mt-6 font-display text-[clamp(3rem,9vw,7.5rem)] font-semibold leading-[0.95]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block",
							children: "A different"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block gold-text italic",
							children: "kind of evening."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
						initial: {
							opacity: 0,
							y: 30
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: {
							duration: .9,
							delay: .55
						},
						className: "mt-8 max-w-xl text-base leading-relaxed text-foreground/80 md:text-lg",
						children: "Step into our warm, candlelit restaurant for handcrafted dishes, elegant service, and a memorable night of comfort, spice, and celebration."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							y: 30
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: {
							duration: .9,
							delay: .75
						},
						className: "mt-10 flex flex-wrap items-center justify-center gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/reservations",
							className: "group relative overflow-hidden rounded-full bg-primary px-8 py-4 text-sm font-semibold uppercase tracking-[0.25em] text-primary-foreground shadow-glow transition",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "relative z-10 inline-flex items-center gap-2",
								children: ["Book a Table ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4 transition group-hover:translate-x-1" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-0 -z-0 translate-y-full bg-primary-glow transition duration-500 group-hover:translate-y-0" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/menu",
							className: "rounded-full border border-primary/40 bg-background/40 px-8 py-4 text-sm font-semibold uppercase tracking-[0.25em] backdrop-blur-md transition hover:bg-primary/10",
							children: "Explore Menu"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				initial: { opacity: 0 },
				animate: { opacity: 1 },
				transition: { delay: 1.5 },
				className: "absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					animate: { y: [
						0,
						8,
						0
					] },
					transition: {
						duration: 2,
						repeat: Infinity
					},
					className: "flex flex-col items-center gap-2 text-xs uppercase tracking-[0.4em] text-foreground/60",
					children: ["Scroll", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4 text-primary" })]
				})
			})
		]
	});
}
function WhyChooseUs() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "section-pad",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-luxe",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
				eyebrow: "Why Spice Garden",
				title: "A different kind of evening"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4",
				children: [
					{
						icon: ChefHat,
						title: "Chef-led Dining",
						text: "Every plate is prepared with care by a team passionate about flavour, tradition and presentation."
					},
					{
						icon: Leaf,
						title: "Fresh Ingredients",
						text: "Seasonal produce and rich spices bring freshness and depth to our restaurant favourites."
					},
					{
						icon: Sparkles,
						title: "Warm Evening Atmosphere",
						text: "From intimate dinners to lively gatherings, our space is made for relaxed celebration."
					},
					{
						icon: Award,
						title: "Loved by Guests",
						text: "Guests return for our comfort dishes, thoughtful service and memorable dining experience."
					}
				].map((it, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						y: 30
					},
					whileInView: {
						opacity: 1,
						y: 0
					},
					viewport: {
						once: true,
						margin: "-60px"
					},
					transition: {
						duration: .6,
						delay: i * .08
					},
					whileHover: { y: -6 },
					className: "group relative overflow-hidden rounded-3xl border border-border bg-card p-7 transition hover:shadow-luxe",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl transition group-hover:bg-primary/20" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "relative grid h-14 w-14 place-items-center rounded-2xl bg-primary/15 text-primary ring-1 ring-primary/30",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(it.icon, { className: "h-6 w-6" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "relative mt-6 font-display text-xl",
							children: it.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "relative mt-3 text-sm leading-relaxed text-muted-foreground",
							children: it.text
						})
					]
				}, it.title))
			})]
		})
	});
}
function PopularDishes() {
	const featuredDishes = DISHES.filter((d) => d.popular || d.category === "Biryani" || d.category === "North Indian" || d.category === "Desserts").slice(0, 8);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "section-pad bg-surface",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-luxe",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
					eyebrow: "Popular Dishes",
					title: "Crowd favourites from our kitchen",
					action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/menu",
						className: "hidden items-center gap-2 text-sm font-medium text-primary hover:underline md:inline-flex",
						children: ["Explore the full menu ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground",
					children: "From biryanis to desserts, our menu brings together beloved classics and modern favourites for every kind of evening."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "-mx-4 mt-12 overflow-x-auto px-4 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex gap-6 md:grid md:grid-cols-2 lg:grid-cols-3",
						children: featuredDishes.map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-[300px] shrink-0 md:w-auto",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DishCard, {
								dish: d,
								index: i
							})
						}, d.id))
					})
				})
			]
		})
	});
}
function ChefSection() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "section-pad",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-luxe grid items-center gap-12 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					opacity: 0,
					x: -40
				},
				whileInView: {
					opacity: 1,
					x: 0
				},
				viewport: { once: true },
				transition: { duration: .8 },
				className: "relative",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative overflow-hidden rounded-[2.5rem] border border-primary/30 bg-card shadow-luxe",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: chef_default,
						alt: "Executive Chef Marco Aurelio",
						loading: "lazy",
						className: "aspect-[4/5] w-full object-cover"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						y: 20
					},
					whileInView: {
						opacity: 1,
						y: 0
					},
					viewport: { once: true },
					transition: { delay: .3 },
					className: "glass absolute -bottom-6 -right-4 rounded-3xl px-7 py-5 shadow-luxe md:-right-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-4xl gold-text",
						children: "15+"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs uppercase tracking-[0.3em] text-muted-foreground",
						children: "Years of mastery"
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					opacity: 0,
					x: 40
				},
				whileInView: {
					opacity: 1,
					x: 0
				},
				viewport: { once: true },
				transition: { duration: .8 },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "divider-gold",
						children: "Meet the Chef"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-4 font-display text-4xl leading-tight md:text-5xl",
						children: "Chef Marco Aurelio"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 text-base leading-relaxed text-muted-foreground",
						children: "With over 20 years of experience across Paris, Tokyo and Delhi, Chef Marco creates menus that balance elegance, comfort and bold spice. Every dish is shaped by technique, warmth and a deep respect for tradition."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 font-display text-2xl italic gold-text",
						children: "\"Cook less. Cook better.\""
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 grid grid-cols-3 gap-4",
						children: [
							["20+", "Years"],
							["15", "Awards"],
							["All", "Menu Dishes"]
						].map(([n, l]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl border border-border bg-card p-5 text-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-3xl gold-text",
								children: n
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs uppercase tracking-[0.3em] text-muted-foreground",
								children: l
							})]
						}, l))
					})
				]
			})]
		})
	});
}
function Story() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "section-pad bg-surface",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-luxe grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					opacity: 0,
					y: 30
				},
				whileInView: {
					opacity: 1,
					y: 0
				},
				viewport: { once: true },
				transition: { duration: .8 },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "divider-gold",
						children: "Our Story"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "mt-4 font-display text-4xl leading-tight md:text-5xl",
						children: ["A garden grown from ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "gold-text",
							children: "one small table"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 text-base leading-relaxed text-muted-foreground",
						children: "What began as an intimate dinner destination has grown into a restaurant known for warm hospitality, candlelit evenings and a menu filled with favourites from biryanis and curries to heartfelt desserts and refreshing beverages."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/about",
						className: "mt-7 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.3em] text-primary",
						children: ["Read our story ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				initial: {
					opacity: 0,
					scale: .95
				},
				whileInView: {
					opacity: 1,
					scale: 1
				},
				viewport: { once: true },
				transition: { duration: .8 },
				className: "relative overflow-hidden rounded-[2rem] border border-border shadow-luxe",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: interior_default,
					alt: "Spice Garden dining room",
					loading: "lazy",
					className: "aspect-[4/3] w-full object-cover transition duration-[1.5s] hover:scale-105"
				})
			})]
		})
	});
}
function TodaysSpecial() {
	const dish = DISHES[2];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "section-pad",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "container-luxe",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					opacity: 0,
					y: 30
				},
				whileInView: {
					opacity: 1,
					y: 0
				},
				viewport: { once: true },
				transition: { duration: .8 },
				className: "relative overflow-hidden rounded-[2.5rem] border border-primary/30 bg-gradient-to-br from-accent/40 via-card to-background p-8 shadow-luxe md:p-14",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary/15 blur-3xl" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid items-center gap-10 md:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "divider-gold",
							children: "Tonight's Special"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-4 font-display text-4xl md:text-5xl",
							children: dish.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 max-w-md text-muted-foreground",
							children: dish.description
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 flex flex-wrap items-center gap-6 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-4 w-4 fill-primary text-primary" }),
									" ",
									dish.rating
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-3xl gold-text",
								children: formatCurrency(dish.price)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/reservations",
							className: "mt-7 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-primary-foreground shadow-glow",
							children: ["Reserve to taste ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						animate: { y: [
							0,
							-10,
							0
						] },
						transition: {
							duration: 6,
							repeat: Infinity,
							ease: "easeInOut"
						},
						className: "relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-full border border-primary/40 shadow-luxe",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: dish.image,
							alt: dish.name,
							loading: "lazy",
							className: "h-full w-full object-cover"
						})
					})]
				})]
			})
		})
	});
}
function Categories() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "section-pad bg-surface",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-luxe",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
				eyebrow: "Menu Highlights",
				title: "All dishes available in our menu"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
				children: [
					"Biryani",
					"Chinese",
					"South Indian",
					"North Indian",
					"Desserts",
					"Beverages"
				].map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						y: 20
					},
					whileInView: {
						opacity: 1,
						y: 0
					},
					viewport: { once: true },
					transition: { delay: i * .06 },
					className: "group relative overflow-hidden rounded-3xl border border-border bg-card p-8 transition hover:border-primary/40 hover:shadow-luxe",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs uppercase tracking-[0.4em] text-muted-foreground",
							children: ["0", i + 1]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-3 font-display text-3xl transition group-hover:gold-text",
							children: c
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/menu",
							className: "mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-primary",
							children: ["Browse ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3.5 w-3.5" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl transition group-hover:bg-primary/25" })
					]
				}, c))
			})]
		})
	});
}
function Testimonials() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "section-pad",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-luxe",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
				eyebrow: "In Their Words",
				title: "Quietly celebrated"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-12 grid gap-6 md:grid-cols-3",
				children: TESTIMONIALS.map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.figure, {
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
					className: "glass relative rounded-3xl p-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Quote, { className: "h-8 w-8 text-primary/70" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("blockquote", {
							className: "mt-4 text-base leading-relaxed text-foreground/90",
							children: [
								"\"",
								t.quote,
								"\""
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figcaption", {
							className: "mt-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-lg",
								children: t.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs uppercase tracking-[0.3em] text-muted-foreground",
								children: t.role
							})]
						})
					]
				}, t.name))
			})]
		})
	});
}
function InstagramFeed() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "section-pad bg-surface",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-luxe",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
				eyebrow: "@spicegarden",
				title: "From our kitchen",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: "#",
					className: "hidden items-center gap-2 text-sm text-primary hover:underline md:inline-flex",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Instagram, { className: "h-4 w-4" }), " Follow"]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-12 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6",
				children: DISHES.map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.a, {
					href: "#",
					initial: {
						opacity: 0,
						scale: .9
					},
					whileInView: {
						opacity: 1,
						scale: 1
					},
					viewport: { once: true },
					transition: { delay: i * .05 },
					className: "group relative aspect-square overflow-hidden rounded-2xl border border-border",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: d.image,
							alt: d.name,
							loading: "lazy",
							className: "h-full w-full object-cover transition duration-[1.2s] group-hover:scale-110"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-background/0 transition group-hover:bg-background/50" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Instagram, { className: "absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 text-primary opacity-0 transition group-hover:opacity-100" })
					]
				}, d.id))
			})]
		})
	});
}
function ReservationCTA() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "section-pad",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "container-luxe",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					opacity: 0,
					y: 30
				},
				whileInView: {
					opacity: 1,
					y: 0
				},
				viewport: { once: true },
				transition: { duration: .8 },
				className: "relative overflow-hidden rounded-[2.5rem] border border-primary/40 bg-gradient-to-br from-accent via-card to-background px-8 py-16 text-center shadow-luxe md:py-24",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-x-0 -top-32 mx-auto h-72 w-72 rounded-full bg-primary/30 blur-[120px]" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "divider-gold justify-center",
						children: "Reserve"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "mt-4 font-display text-4xl leading-tight md:text-6xl",
						children: ["Your table is ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "gold-text italic",
							children: "waiting."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mx-auto mt-5 max-w-xl text-muted-foreground",
						children: "Book a table for a private chef's evening, a tasting menu, or a quiet two — service is always tailored to you."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/reservations",
						className: "mt-9 inline-flex items-center gap-2 rounded-full bg-primary px-9 py-4 text-sm font-semibold uppercase tracking-[0.25em] text-primary-foreground shadow-glow",
						children: ["Book Now ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
					})
				]
			})
		})
	});
}
function SectionHeader({ eyebrow, title, action }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-wrap items-end justify-between gap-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				opacity: 0,
				y: 20
			},
			whileInView: {
				opacity: 1,
				y: 0
			},
			viewport: { once: true },
			transition: { duration: .7 },
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "divider-gold",
				children: eyebrow
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-3 max-w-2xl font-display text-4xl leading-tight md:text-5xl",
				children: title
			})]
		}), action]
	});
}
//#endregion
export { HomePage as component };
