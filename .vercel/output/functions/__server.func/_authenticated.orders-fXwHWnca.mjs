import { o as __toESM } from "./_runtime.mjs";
import { t as supabase } from "./_ssr/client-4hMyJYfy.mjs";
import { n as require_jsx_runtime, r as require_react } from "./_libs/react+tanstack__react-query.mjs";
import { n as useAuth } from "./_ssr/auth-BU19OWwl.mjs";
import { n as formatCurrency } from "./_ssr/utils-Dz0d21t-.mjs";
import { g as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { t as motion } from "./_libs/motion.mjs";
import { F as Flame, G as ChefHat, V as CircleCheck, c as Truck, w as Package } from "./_libs/lucide-react.mjs";
import { t as BackButton } from "./_ssr/BackButton-aBIfVsBs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_authenticated.orders-fXwHWnca.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STAGES = [
	{
		id: "confirmed",
		label: "Confirmed",
		icon: CircleCheck
	},
	{
		id: "preparing",
		label: "Preparing",
		icon: Package
	},
	{
		id: "cooking",
		label: "Cooking",
		icon: Flame
	},
	{
		id: "ready",
		label: "Ready / Out for Delivery",
		icon: Truck
	},
	{
		id: "delivered",
		label: "Delivered",
		icon: ChefHat
	}
];
function OrdersPage() {
	const { user } = useAuth();
	const [orders, setOrders] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [expandedOrderId, setExpandedOrderId] = (0, import_react.useState)(null);
	const [errorMessage, setErrorMessage] = (0, import_react.useState)(null);
	const loadOrders = async () => {
		if (!user) return;
		setLoading(true);
		setErrorMessage(null);
		try {
			const { data, error } = await supabase.from("orders").select("*, order_items(*)").eq("user_id", user.id).order("created_at", { ascending: false });
			if (error) throw error;
			setOrders(data ?? []);
		} catch (error) {
			console.error("Failed loading orders", error);
			setErrorMessage(error?.message ?? "Failed to load your orders.");
		} finally {
			setLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		if (!user) return;
		loadOrders();
		const channel = supabase.channel(`orders:user:${user.id}`).on("postgres_changes", {
			event: "*",
			schema: "public",
			table: "orders",
			filter: `user_id=eq.${user.id}`
		}, () => {
			loadOrders();
		}).subscribe();
		return () => {
			try {
				supabase.removeChannel(channel);
			} catch (e) {
				channel.unsubscribe();
			}
		};
	}, [user]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "section-pad",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-luxe max-w-5xl",
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
					children: "Your Orders"
				}),
				loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-10 text-muted-foreground",
					children: "Loading orders…"
				}) : errorMessage ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-10 rounded-3xl border border-border bg-card p-12 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-destructive",
						children: errorMessage
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: loadOrders,
						className: "mt-6 inline-flex rounded-full bg-primary px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.25em] text-primary-foreground",
						children: "Retry"
					})]
				}) : orders.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-10 rounded-3xl border border-border bg-card p-12 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted-foreground",
						children: "You haven't placed any orders yet."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/menu",
						className: "mt-6 inline-block rounded-full bg-primary px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.25em] text-primary-foreground",
						children: "Order Now"
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-8 space-y-6",
					children: orders.map((o) => {
						const activeIdx = Math.max(0, STAGES.findIndex((s) => s.id === o.order_status));
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "rounded-3xl border border-border bg-card p-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground",
											children: ["Order #", o.order_number]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm text-muted-foreground",
											children: new Date(o.created_at).toLocaleString()
										}),
										o.address && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm text-muted-foreground mt-1",
											children: o.address
										})
									] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap items-center gap-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "rounded-full bg-primary/15 px-3 py-1 text-[0.65rem] uppercase tracking-[0.25em] text-primary",
												children: o.order_status
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "rounded-full bg-success/15 px-3 py-1 text-[0.65rem] uppercase tracking-[0.25em] text-success",
												children: o.payment_status
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex flex-wrap items-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													onClick: () => setExpandedOrderId(expandedOrderId === o.id ? null : o.id),
													className: "rounded-full border border-primary/30 bg-primary/5 px-4 py-2 text-xs uppercase tracking-[0.2em] text-primary transition hover:bg-primary/10",
													children: expandedOrderId === o.id ? "Hide tracking" : "Track My Order"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
													to: `/track/${o.id}`,
													className: "rounded-full border border-border bg-background/80 px-4 py-2 text-xs uppercase tracking-[0.2em] text-foreground transition hover:border-primary hover:text-primary",
													children: "Open tracking page"
												})]
											})
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-6 flex items-center gap-2 overflow-x-auto",
									children: STAGES.map((s, i) => {
										const done = i <= activeIdx;
										const Icon = s.icon;
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-1 items-center gap-2 min-w-fit",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: `grid h-9 w-9 place-items-center rounded-full border transition ${done ? "border-primary bg-primary/15 text-primary" : "border-border text-muted-foreground"}`,
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" })
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: `text-xs whitespace-nowrap ${done ? "text-foreground" : "text-muted-foreground"}`,
													children: s.label
												}),
												i < STAGES.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `h-px flex-1 ${i < activeIdx ? "bg-primary" : "bg-border"}` })
											]
										}, s.id);
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "mt-6 divide-y divide-border/60",
									children: o.order_items.map((it) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex items-center gap-4 py-3",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
												src: it.image ?? "https://via.placeholder.com/80",
												alt: it.name,
												className: "h-14 w-14 rounded-xl object-cover"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-sm font-medium",
													children: it.name
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "text-xs text-muted-foreground",
													children: [
														"Qty: ",
														it.quantity,
														" · ",
														formatCurrency(it.price)
													]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-sm",
												children: formatCurrency(it.price * it.quantity)
											})
										]
									}, it.id))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-4 flex flex-col gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-3 md:grid-cols-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-3xl border border-border bg-background p-4 text-sm",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-semibold",
												children: "Billing"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "mt-3 space-y-2 text-sm text-muted-foreground",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex justify-between",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Subtotal" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatCurrency(o.subtotal) })]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex justify-between",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Tax" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatCurrency(o.tax) })]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex justify-between",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Delivery" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatCurrency(o.delivery_fee) })]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex justify-between",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Discount" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["-", formatCurrency(o.discount)] })]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex justify-between font-semibold",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Total" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatCurrency(o.total) })]
													})
												]
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-3xl border border-border bg-background p-4 text-sm",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-semibold",
												children: "Order summary"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "mt-3 space-y-2 text-sm text-muted-foreground",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex justify-between",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Payment" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: o.payment_status })]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex justify-between",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Payment method" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: o.payment_method ?? (o.notes?.startsWith("Payment:") ? o.notes.replace(/^Payment:\s*/, "") : "—") })]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex justify-between",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Delivery Address" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: o.address ?? "—" })]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex justify-between",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Order number" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: o.order_number })]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex justify-between",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Current stage" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: o.order_status })]
													})
												]
											})]
										})]
									}), expandedOrderId === o.id && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-3xl border border-border bg-card p-4",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
												className: "font-display text-lg",
												children: "Order tracking"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "mt-2 text-sm text-muted-foreground",
												children: ["Estimated delivery by ", new Date(new Date(o.created_at).getTime() + 2700 * 1e3).toLocaleTimeString()]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "mt-4 space-y-4",
												children: STAGES.map((stage, index) => {
													const statusIndex = STAGES.findIndex((s) => s.id === o.order_status);
													const completed = index < statusIndex;
													const active = index === statusIndex;
													return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-start gap-3",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: `mt-1 grid h-9 w-9 place-items-center rounded-full border ${completed ? "border-success bg-success/15 text-success" : active ? "border-primary bg-primary/15 text-primary" : "border-border text-muted-foreground"}`,
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(stage.icon, { className: "h-4 w-4" })
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
															className: `font-medium ${active ? "text-foreground" : "text-muted-foreground"}`,
															children: stage.label
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
															className: "text-xs text-muted-foreground",
															children: completed ? "Completed" : active ? "Current stage" : "Pending"
														})] })]
													}, stage.id);
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "mt-6 rounded-3xl border border-border bg-background p-4 text-sm text-muted-foreground",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "font-semibold",
													children: "Ordered items"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
													className: "mt-3 space-y-3",
													children: o.order_items.map((it) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
														className: "flex items-center justify-between gap-4",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "flex items-center gap-3",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
																src: it.image ?? "",
																alt: it.name,
																className: "h-12 w-12 rounded-xl object-cover"
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																className: "font-medium",
																children: it.name
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
																className: "text-xs text-muted-foreground",
																children: ["Qty ", it.quantity]
															})] })]
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: formatCurrency(it.price * it.quantity) })]
													}, it.id))
												})]
											})
										]
									})]
								})
							]
						}, o.id);
					})
				})
			]
		})
	});
}
//#endregion
export { OrdersPage as component };
