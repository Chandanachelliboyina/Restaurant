import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/utils-Dz0d21t-.js
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function formatCurrency(amount) {
	return new Intl.NumberFormat("en-IN", {
		style: "currency",
		currency: "INR",
		maximumFractionDigits: 2
	}).format(amount);
}
//#endregion
export { formatCurrency as n, cn as t };
