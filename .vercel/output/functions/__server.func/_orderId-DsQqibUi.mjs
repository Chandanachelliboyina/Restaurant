import { o as __toESM } from "./_runtime.mjs";
import { t as supabase } from "./_ssr/client-4hMyJYfy.mjs";
import { n as require_jsx_runtime, r as require_react } from "./_libs/react+tanstack__react-query.mjs";
import { n as useAuth } from "./_ssr/auth-BU19OWwl.mjs";
import { n as formatCurrency } from "./_ssr/utils-Dz0d21t-.mjs";
import { g as Link, y as useParams } from "./_libs/@tanstack/react-router+[...].mjs";
import { t as motion } from "./_libs/motion.mjs";
import { B as CircleX, F as Flame, V as CircleCheck, c as Truck, w as Package } from "./_libs/lucide-react.mjs";
import { t as BackButton } from "./_ssr/BackButton-aBIfVsBs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_orderId-DsQqibUi.js
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
		icon: CircleCheck
	}
];
function TrackOrderPage() {
	const { user } = useAuth();
	const orderId = useParams().orderId;
	const [order, setOrder] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	const loadOrder = async () => {
		if (!user || !orderId) return;
		setLoading(true);
		setError(null);
		try {
			const { data, error } = await supabase.from("orders").select("*, order_items(*)").eq("id", orderId).single();
			if (error) throw error;
			setOrder(data);
		} catch (err) {
			console.error("Failed to load order", err);
			setError(err?.message ?? "Unable to load your order.");
		} finally {
			setLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		if (!user || !orderId) return;
		loadOrder();
		const channel = supabase.channel(`order:track:${orderId}`).on("postgres_changes", {
			event: "*",
			schema: "public",
			table: "orders",
			filter: `id=eq.${orderId}`
		}, () => {
			loadOrder();
		}).subscribe();
		return () => {
			try {
				supabase.removeChannel(channel);
			} catch {
				channel.unsubscribe();
			}
		};
	}, [orderId, user]);
	const activeStage = order ? STAGES.findIndex((stage) => stage.id === order.order_status) : 0;
	const eta = order ? new Date(new Date(order.created_at).getTime() + 2700 * 1e3) : null;
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
					children: "Track your order"
				}),
				!user ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-10 rounded-3xl border border-border bg-card p-12 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "mx-auto h-12 w-12 text-destructive" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-muted-foreground",
							children: "You need to sign in to view order tracking."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/login",
							className: "mt-6 inline-block rounded-full bg-primary px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.25em] text-primary-foreground",
							children: "Sign In"
						})
					]
				}) : loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-10 text-muted-foreground",
					children: "Loading order details…"
				}) : error ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-10 rounded-3xl border border-border bg-card p-12 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-destructive",
						children: error
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/orders",
						className: "mt-6 inline-block rounded-full border border-border px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.25em] text-foreground hover:border-primary hover:text-primary",
						children: "Back to orders"
					})]
				}) : !order ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-10 rounded-3xl border border-border bg-card p-12 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted-foreground",
						children: "Order not found or you don't have access to this order."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/orders",
						className: "mt-6 inline-block rounded-full border border-border px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.25em] text-foreground hover:border-primary hover:text-primary",
						children: "View orders"
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-10 space-y-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded-3xl border border-border bg-card p-6",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-4 md:flex-row md:items-center md:justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground",
										children: ["Order #", order.order_number]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-2 text-sm text-muted-foreground",
										children: ["Placed ", new Date(order.created_at).toLocaleString()]
									}),
									order.address && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1 text-sm text-muted-foreground",
										children: ["Delivering to ", order.address]
									})
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-2 sm:grid-cols-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-3xl border border-border bg-background p-4 text-sm",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-muted-foreground",
												children: "Payment"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-2 font-semibold",
												children: order.payment_method ?? (order.notes?.startsWith("Payment:") ? order.notes.replace(/^Payment:\s*/, "") : "Online Payment")
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-muted-foreground",
												children: order.payment_status
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-3xl border border-border bg-background p-4 text-sm",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-muted-foreground",
												children: "Estimated delivery"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-2 font-semibold",
												children: eta?.toLocaleTimeString()
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-muted-foreground",
												children: eta?.toLocaleDateString()
											})
										]
									})]
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-3xl border border-border bg-card p-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-display text-2xl",
									children: "Live order status"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm text-muted-foreground",
									children: "This timeline updates automatically when your order moves to the next stage."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-6 space-y-4",
									children: STAGES.map((stage, index) => {
										const completed = index < activeStage;
										const active = index === activeStage;
										const Icon = stage.icon;
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex gap-4 rounded-3xl border border-border bg-background p-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: `grid h-12 w-12 place-items-center rounded-3xl ${completed ? "bg-success/15 text-success" : active ? "bg-primary/15 text-primary" : "bg-muted-foreground/10 text-muted-foreground"}`,
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5" })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: `font-medium ${active ? "text-foreground" : "text-muted-foreground"}`,
													children: stage.label
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-xs text-muted-foreground",
													children: completed ? "Completed" : active ? "Current stage" : "Waiting"
												})]
											})]
										}, stage.id);
									})
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 md:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-3xl border border-border bg-background p-5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground",
									children: "Order items"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "mt-4 space-y-3",
									children: order.order_items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex items-center gap-4 rounded-3xl border border-border p-3",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
												src: item.image ?? "https://via.placeholder.com/80",
												alt: item.name,
												className: "h-16 w-16 rounded-2xl object-cover"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "font-medium",
													children: item.name
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "text-xs text-muted-foreground",
													children: ["Qty ", item.quantity]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-semibold",
												children: formatCurrency(item.price * item.quantity)
											})
										]
									}, item.id))
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-3xl border border-border bg-background p-5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground",
									children: "Order summary"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-4 space-y-3 text-sm text-muted-foreground",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Subtotal" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatCurrency(order.subtotal) })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Tax" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatCurrency(order.tax) })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Delivery fee" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatCurrency(order.delivery_fee) })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Discount" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["-", formatCurrency(order.discount)] })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "border-t border-border pt-3 font-semibold flex justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Total" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatCurrency(order.total) })]
										})
									]
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/orders",
								className: "rounded-full border border-border bg-background/80 px-5 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-foreground transition hover:border-primary hover:text-primary",
								children: "Back to my orders"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/menu",
								className: "rounded-full bg-primary px-5 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-primary-foreground transition hover:shadow-glow",
								children: "Continue browsing"
							})]
						})
					]
				})
			]
		})
	});
}
//#endregion
export { TrackOrderPage as component };
