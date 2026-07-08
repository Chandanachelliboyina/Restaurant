import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { b as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as motion } from "../_libs/motion.mjs";
import { Q as ArrowLeft } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/BackButton-aBIfVsBs.js
var import_jsx_runtime = require_jsx_runtime();
function BackButton() {
	const router = useRouter();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
		type: "button",
		initial: {
			opacity: 0,
			x: -12
		},
		animate: {
			opacity: 1,
			x: 0
		},
		transition: {
			duration: .4,
			ease: [
				.16,
				1,
				.3,
				1
			]
		},
		onClick: () => {
			if (typeof window !== "undefined" && window.history.length > 1) router.history.back();
			else router.navigate({ to: "/" });
		},
		"aria-label": "Go back",
		className: "group inline-flex items-center gap-2 rounded-full border border-primary/40 bg-background/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-foreground/90 backdrop-blur-md transition hover:border-primary hover:bg-primary/10 hover:text-primary",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4 transition group-hover:-translate-x-0.5" }), "Back"]
	});
}
//#endregion
export { BackButton as t };
