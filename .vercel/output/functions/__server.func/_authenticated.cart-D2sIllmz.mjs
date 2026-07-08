import { o as __toESM } from "./_runtime.mjs";
import { t as supabase } from "./_ssr/client-4hMyJYfy.mjs";
import { n as require_jsx_runtime, r as require_react } from "./_libs/react+tanstack__react-query.mjs";
import { n as useAuth } from "./_ssr/auth-BU19OWwl.mjs";
import { n as useCart } from "./_ssr/cart-CwxFwYtG.mjs";
import { n as formatCurrency } from "./_ssr/utils-Dz0d21t-.mjs";
import { g as Link, v as useNavigate } from "./_libs/@tanstack/react-router+[...].mjs";
import { t as motion } from "./_libs/motion.mjs";
import { E as Minus, R as CreditCard, S as Plus, l as Trash2, m as ShoppingBag, n as Wallet } from "./_libs/lucide-react.mjs";
import { t as BackButton } from "./_ssr/BackButton-aBIfVsBs.mjs";
import { n as toast } from "./_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_authenticated.cart-D2sIllmz.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function generateOrderNumber() {
	return `SG-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}
async function processOnlinePayment(option) {
	await new Promise((resolve) => setTimeout(resolve, 900));
	return {
		success: true,
		methodLabel: option
	};
}
function CartPage() {
	const { items, totals, setQuantity, remove, clear } = useCart();
	const { user, loading: authLoading } = useAuth();
	const navigate = useNavigate();
	const [placing, setPlacing] = (0, import_react.useState)(false);
	const [checkoutStep, setCheckoutStep] = (0, import_react.useState)("cart");
	const [paymentMethod, setPaymentMethod] = (0, import_react.useState)("");
	const [paymentError, setPaymentError] = (0, import_react.useState)(null);
	const [onlineOption, setOnlineOption] = (0, import_react.useState)("");
	const [upiId, setUpiId] = (0, import_react.useState)("");
	const selectPaymentMethod = (method) => {
		setPaymentMethod(method);
		setPaymentError(null);
		if (method === "cod") {
			setOnlineOption("");
			setUpiId("");
		}
	};
	const startPayment = () => {
		if (items.length === 0) return;
		setPaymentError(null);
		setPaymentMethod("");
		setOnlineOption("");
		setUpiId("");
		setCheckoutStep("payment");
	};
	const createOrder = async (paymentLabel, paymentStatus) => {
		if (authLoading) throw new Error("Please wait while your account is loading.");
		if (items.length === 0) throw new Error("Your cart is empty.");
		let authUserId = user?.id ?? null;
		let deliveryAddress = user?.deliveryAddress ?? "";
		if (!authUserId) {
			const { data: userData, error: userError } = await supabase.auth.getUser();
			if (userError) throw new Error(userError.message || "Unable to verify your account.");
			authUserId = userData?.user?.id ?? null;
			deliveryAddress = userData?.user?.user_metadata?.delivery_address ?? deliveryAddress;
		}
		if (!authUserId) throw new Error("Sign in to place an order.");
		const orderPayload = {
			user_id: authUserId,
			order_number: generateOrderNumber(),
			subtotal: totals.subtotal,
			tax: totals.tax,
			delivery_fee: totals.delivery,
			discount: totals.discount,
			total: totals.total,
			address: deliveryAddress,
			order_status: "confirmed",
			payment_status: paymentStatus,
			fulfillment: "delivery",
			notes: `Payment: ${paymentLabel}`
		};
		const { data, error: orderError } = await supabase.from("orders").insert([orderPayload]).select("id").single();
		if (orderError) {
			console.error("Order creation failed", orderError);
			throw new Error(orderError.message || "Failed to create order.");
		}
		if (!data?.id) {
			console.error("Order creation returned no id", data);
			throw new Error("Failed to create order record.");
		}
		const rows = items.map((i) => ({
			order_id: data.id,
			dish_id: i.id,
			name: i.name,
			image: i.image,
			price: i.price,
			quantity: i.quantity,
			veg: i.veg
		}));
		const { error: itemsErr } = await supabase.from("order_items").insert(rows);
		if (itemsErr) {
			console.error("Order items insertion failed", itemsErr);
			throw new Error(itemsErr.message || "Failed to save order items.");
		}
		clear();
		toast.success("Order placed successfully!");
		navigate({ to: "/orders" });
	};
	const confirmCashOnDelivery = async () => {
		setPaymentError(null);
		setPlacing(true);
		try {
			await createOrder("Cash on Delivery", "pending");
		} catch (error) {
			toast.error(error?.message || "Couldn't confirm order. Please try again.");
		} finally {
			setPlacing(false);
		}
	};
	const handleConfirmOrder = async () => {
		if (placing) return;
		if (!paymentMethod) {
			setPaymentError("Please select a payment method before confirming your order.");
			return;
		}
		if (paymentMethod === "cod") {
			await confirmCashOnDelivery();
			return;
		}
		if (paymentMethod === "online") {
			setPaymentError(null);
			setCheckoutStep("gateway");
		}
	};
	const confirmOnlinePayment = async () => {
		if (placing) return;
		if (!onlineOption) {
			setPaymentError("Please choose an online payment option.");
			return;
		}
		if (onlineOption === "UPI ID" && !upiId.trim()) {
			setPaymentError("Please enter your UPI ID to continue.");
			return;
		}
		setPaymentError(null);
		setPlacing(true);
		try {
			if (!(await processOnlinePayment(onlineOption)).success) throw new Error("Payment was not completed. Please try again.");
			const paymentLabel = onlineOption === "UPI ID" ? `UPI (${upiId})` : onlineOption;
			await createOrder(paymentLabel, "paid");
		} catch (error) {
			toast.error(error?.message || "Payment failed. Please try again.");
		} finally {
			setPlacing(false);
		}
	};
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
					children: "Your Cart"
				}),
				items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-10 rounded-3xl border border-border bg-card p-12 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "mx-auto h-10 w-10 text-primary" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-muted-foreground",
							children: "Your cart is empty."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/menu",
							className: "mt-6 inline-block rounded-full bg-primary px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.25em] text-primary-foreground",
							children: "Browse Menu"
						})
					]
				}) : checkoutStep === "cart" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 grid gap-8 lg:grid-cols-[1fr_360px]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-3",
						children: items.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-4 rounded-3xl border border-border bg-card p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: i.image,
								alt: "",
								className: "h-24 w-24 rounded-2xl object-cover"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-1 flex-col justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-display text-lg",
										children: i.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-muted-foreground",
										children: [formatCurrency(i.price), " each"]
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => remove(i.id),
										"aria-label": "Remove",
										className: "text-muted-foreground hover:text-destructive",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "inline-flex items-center rounded-full border border-border",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => setQuantity(i.id, i.quantity - 1),
												className: "grid h-8 w-8 place-items-center",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "h-3 w-3" })
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "w-8 text-center text-sm",
												children: i.quantity
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => setQuantity(i.id, i.quantity + 1),
												className: "grid h-8 w-8 place-items-center",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3 w-3" })
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-medium text-primary",
										children: formatCurrency(i.price * i.quantity)
									})]
								})]
							})]
						}, i.id))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
						className: "h-fit rounded-3xl border border-border bg-card p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-xl",
								children: "Summary"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
								className: "mt-4 space-y-2 text-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
										l: "Subtotal",
										v: totals.subtotal
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
										l: "Tax (8%)",
										v: totals.tax
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
										l: "Delivery",
										v: totals.delivery
									}),
									totals.discount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
										l: "Discount",
										v: -totals.discount,
										className: "text-success"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-2 border-t border-border pt-3 flex justify-between font-display text-lg",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Total" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-primary",
											children: formatCurrency(totals.total)
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: startPayment,
								disabled: placing,
								className: "mt-6 w-full rounded-full bg-primary px-6 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-primary-foreground disabled:opacity-60",
								children: "Proceed to Payment"
							})
						]
					})]
				}) : checkoutStep === "payment" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 grid gap-8 lg:grid-cols-[1fr_360px]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "overflow-hidden rounded-3xl border border-border bg-card p-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-display text-xl",
										children: "Select Payment Method"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-sm text-muted-foreground",
										children: "Choose your preferred method before confirming the order."
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setCheckoutStep("cart"),
										className: "rounded-full border border-border px-4 py-2 text-xs uppercase tracking-[0.2em] text-muted-foreground hover:border-primary",
										children: "Back to cart"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-6 grid gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaymentOption, {
										icon: Wallet,
										title: "Cash on Delivery",
										description: "Pay when you receive your order. Payment status stays Pending until delivery.",
										selected: paymentMethod === "cod",
										onSelect: () => selectPaymentMethod("cod")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaymentOption, {
										icon: CreditCard,
										title: "Online Payment",
										description: "Pay now using UPI, Credit Card, Debit Card or Net Banking. Status becomes Paid immediately.",
										selected: paymentMethod === "online",
										onSelect: () => selectPaymentMethod("online")
									})]
								}),
								paymentError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-4 text-sm text-destructive",
									children: paymentError
								}) : null
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-3xl border border-border bg-card p-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-xl",
									children: "Order review"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
									className: "mt-4 space-y-2 text-sm",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
											l: "Subtotal",
											v: totals.subtotal
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
											l: "Tax (8%)",
											v: totals.tax
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
											l: "Delivery",
											v: totals.delivery
										}),
										totals.discount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
											l: "Discount",
											v: -totals.discount,
											className: "text-success"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Payment method" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-medium",
												children: paymentMethod === "cod" ? "Cash on Delivery" : paymentMethod === "online" ? "Online Payment" : "—"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-2 border-t border-border pt-3 flex justify-between font-display text-lg",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Total" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-primary",
												children: formatCurrency(totals.total)
											})]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: handleConfirmOrder,
									disabled: placing,
									className: "mt-6 w-full rounded-full bg-primary px-6 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-primary-foreground disabled:opacity-60",
									children: placing ? "Confirming…" : "Confirm Order"
								})
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
						className: "h-fit rounded-3xl border border-border bg-card p-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-xl",
							children: "Quick summary"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "mt-4 space-y-2 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									l: "Subtotal",
									v: totals.subtotal
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									l: "Tax (8%)",
									v: totals.tax
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									l: "Delivery",
									v: totals.delivery
								}),
								totals.discount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									l: "Discount",
									v: -totals.discount,
									className: "text-success"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-2 border-t border-border pt-3 flex justify-between font-display text-lg",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Total" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-primary",
										children: formatCurrency(totals.total)
									})]
								})
							]
						})]
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 grid gap-8 lg:grid-cols-[1fr_360px]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "overflow-hidden rounded-3xl border border-border bg-card p-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-xl",
									children: "Complete Online Payment"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm text-muted-foreground",
									children: "Pick a payment option and complete the transaction to place your order."
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setCheckoutStep("payment"),
									className: "rounded-full border border-border px-4 py-2 text-xs uppercase tracking-[0.2em] text-muted-foreground hover:border-primary",
									children: "Back to payment"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-6 grid gap-3",
								children: [
									[
										"PhonePe",
										"Google Pay",
										"Paytm",
										"UPI ID",
										"Credit Card",
										"Debit Card",
										"Net Banking"
									].map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => setOnlineOption(option),
										className: `w-full rounded-3xl border p-4 text-left transition ${onlineOption === option ? "border-primary bg-primary/10" : "border-border bg-background hover:border-primary/60"}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-medium",
											children: option
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 text-sm text-muted-foreground",
											children: option === "UPI ID" ? "Pay with your UPI handle." : option === "Credit Card" || option === "Debit Card" ? "Enter your card details at checkout." : option === "Net Banking" ? "Pay using your preferred bank." : `Pay with ${option}.`
										})]
									}, option)),
									onlineOption === "UPI ID" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "block rounded-3xl border border-border bg-background p-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-sm text-muted-foreground",
											children: "Enter UPI ID"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "text",
											value: upiId,
											onChange: (event) => setUpiId(event.target.value),
											className: "mt-2 w-full rounded-2xl border border-border bg-transparent px-4 py-3 text-sm outline-none focus:border-primary",
											placeholder: "example@upi"
										})]
									}) : null,
									paymentError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-destructive",
										children: paymentError
									}) : null
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-3xl border border-border bg-card p-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-xl",
									children: "Payment summary"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-sm text-muted-foreground",
									children: "Once payment is successful, your order will be created and saved."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
									className: "mt-4 space-y-2 text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
										l: "Amount",
										v: totals.total
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Payment option" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-medium",
											children: onlineOption || "—"
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: confirmOnlinePayment,
									disabled: placing,
									className: "mt-6 w-full rounded-full bg-primary px-6 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-primary-foreground disabled:opacity-60",
									children: placing ? "Processing payment…" : "Pay & Confirm Order"
								})
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
						className: "h-fit rounded-3xl border border-border bg-card p-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-xl",
							children: "Order details"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "mt-4 space-y-2 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									l: "Subtotal",
									v: totals.subtotal
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									l: "Tax (8%)",
									v: totals.tax
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									l: "Delivery",
									v: totals.delivery
								}),
								totals.discount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									l: "Discount",
									v: -totals.discount,
									className: "text-success"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-2 border-t border-border pt-3 flex justify-between font-display text-lg",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Total" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-primary",
										children: formatCurrency(totals.total)
									})]
								})
							]
						})]
					})]
				})
			]
		})
	});
}
function Row({ l, v, className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `flex justify-between ${className}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-muted-foreground",
			children: l
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: formatCurrency(v) })]
	});
}
function PaymentOption({ icon: Icon, title, description, selected, onSelect }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: onSelect,
		className: `group flex w-full items-start gap-4 rounded-3xl border p-5 text-left transition ${selected ? "border-primary bg-primary/10" : "border-border bg-background hover:border-primary/60"}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: `grid h-12 w-12 place-items-center rounded-3xl ${selected ? "bg-primary text-primary-foreground" : "bg-background text-muted-foreground"}`,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-base",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted-foreground",
			children: description
		})] })]
	});
}
//#endregion
export { CartPage as component };
