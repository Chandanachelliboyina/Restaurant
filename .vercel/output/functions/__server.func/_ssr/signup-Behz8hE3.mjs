import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as stringType, r as objectType, t as enumType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/signup-Behz8hE3.js
var $$splitComponentImporter = () => import("./signup-BFlXomJh.mjs");
var signupSearchSchema = objectType({
	email: stringType().optional(),
	step: enumType([
		"form",
		"otp",
		"done"
	]).optional()
});
var Route = createFileRoute("/signup")({
	validateSearch: (search) => signupSearchSchema.parse(search),
	head: () => ({ meta: [{ title: "Create Account — Spice Garden" }, {
		name: "description",
		content: "Join Spice Garden — reservations, tasting notes and private events."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
