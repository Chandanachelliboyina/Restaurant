import { o as __toESM } from "./_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "./_libs/react+tanstack__react-query.mjs";
import { i as AnimatePresence } from "./_libs/framer-motion.mjs";
import { t as motion } from "./_libs/motion.mjs";
import { H as ChevronRight, U as ChevronLeft, t as X } from "./_libs/lucide-react.mjs";
import { n as GALLERY_IMAGES, t as BG_IMAGES } from "./_ssr/images-Cg6hgnkg.mjs";
import { t as BackButton } from "./_ssr/BackButton-aBIfVsBs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_authenticated.gallery-D4gXZ1j5.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ITEMS = [
	...GALLERY_IMAGES.restaurant.map((img) => ({
		src: img.src,
		cat: "Restaurant"
	})),
	...GALLERY_IMAGES.food.map((img) => ({
		src: img.src,
		cat: "Food"
	})),
	...GALLERY_IMAGES.chef.map((img) => ({
		src: img.src,
		cat: "Chef"
	})),
	...GALLERY_IMAGES.events.map((img) => ({
		src: img.src,
		cat: "Events"
	})),
	...GALLERY_IMAGES.kitchen.map((img) => ({
		src: img.src,
		cat: "Kitchen"
	}))
];
function GalleryPage() {
	const [cat, setCat] = (0, import_react.useState)("All");
	const [openIdx, setOpenIdx] = (0, import_react.useState)(null);
	const items = (0, import_react.useMemo)(() => cat === "All" ? ITEMS : ITEMS.filter((i) => i.cat === cat), [cat]);
	const next = (0, import_react.useCallback)(() => setOpenIdx((i) => i === null ? null : (i + 1) % items.length), [items.length]);
	const prev = (0, import_react.useCallback)(() => setOpenIdx((i) => i === null ? null : (i - 1 + items.length) % items.length), [items.length]);
	(0, import_react.useEffect)(() => {
		if (openIdx === null) return;
		const onKey = (e) => {
			if (e.key === "Escape") setOpenIdx(null);
			if (e.key === "ArrowRight") next();
			if (e.key === "ArrowLeft") prev();
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [
		openIdx,
		next,
		prev
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative overflow-hidden py-24 text-center md:py-32",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute inset-0 -z-10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: BG_IMAGES.gallery,
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
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "divider-gold justify-center",
						children: "Gallery"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "mx-auto mt-5 max-w-3xl font-display text-5xl leading-tight md:text-7xl",
						children: ["A house of ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "gold-text italic",
							children: "moments."
						})]
					})]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "container-luxe",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap justify-center gap-2",
				children: [
					"All",
					"Restaurant",
					"Food",
					"Chef",
					"Events",
					"Kitchen"
				].map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setCat(c),
					className: `rounded-full border px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition ${cat === c ? "border-primary bg-primary text-primary-foreground shadow-glow" : "border-border text-foreground/80 hover:border-primary/40 hover:text-primary"}`,
					children: c
				}, c))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "section-pad",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "container-luxe",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					layout: true,
					className: "columns-1 gap-4 sm:columns-2 lg:columns-3 [column-fill:_balance]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: items.map((it, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.button, {
						layout: true,
						initial: {
							opacity: 0,
							scale: .9
						},
						animate: {
							opacity: 1,
							scale: 1
						},
						exit: {
							opacity: 0,
							scale: .9
						},
						transition: {
							duration: .5,
							delay: i % 6 * .04
						},
						onClick: () => setOpenIdx(i),
						className: "group mb-4 block w-full overflow-hidden rounded-3xl border border-border bg-card",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: it.src,
							alt: "",
							loading: "lazy",
							className: "w-full object-cover transition duration-[1.4s] group-hover:scale-110"
						})
					}, it.src + i)) })
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: openIdx !== null && items[openIdx] && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: { opacity: 0 },
			animate: { opacity: 1 },
			exit: { opacity: 0 },
			onClick: () => setOpenIdx(null),
			className: "fixed inset-0 z-[80] grid place-items-center bg-background/90 p-6 backdrop-blur-xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.img, {
					initial: {
						scale: .95,
						opacity: 0
					},
					animate: {
						scale: 1,
						opacity: 1
					},
					exit: {
						scale: .95,
						opacity: 0
					},
					src: items[openIdx].src,
					alt: "",
					onClick: (e) => e.stopPropagation(),
					className: "max-h-[85vh] max-w-[90vw] rounded-3xl border border-primary/30 object-contain shadow-luxe"
				}, items[openIdx].src),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: (e) => {
						e.stopPropagation();
						setOpenIdx(null);
					},
					"aria-label": "Close",
					className: "absolute right-6 top-6 grid h-12 w-12 place-items-center rounded-full border border-primary/40 bg-background/60 text-primary backdrop-blur-md hover:bg-primary hover:text-primary-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: (e) => {
						e.stopPropagation();
						prev();
					},
					"aria-label": "Previous image",
					className: "absolute left-4 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-primary/40 bg-background/60 text-primary backdrop-blur-md hover:bg-primary hover:text-primary-foreground md:left-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-6 w-6" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: (e) => {
						e.stopPropagation();
						next();
					},
					"aria-label": "Next image",
					className: "absolute right-4 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-primary/40 bg-background/60 text-primary backdrop-blur-md hover:bg-primary hover:text-primary-foreground md:right-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-6 w-6" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-background/60 px-4 py-1.5 text-xs text-foreground/80 backdrop-blur-md",
					children: [
						openIdx + 1,
						" / ",
						items.length
					]
				})
			]
		}) })
	] });
}
//#endregion
export { GalleryPage as component };
