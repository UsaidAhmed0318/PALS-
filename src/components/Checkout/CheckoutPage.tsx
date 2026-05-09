"use client";

import { useActionState, useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeftIcon,
  BanknotesIcon,
  CheckBadgeIcon,
  ChevronRightIcon,
  CreditCardIcon,
  CubeIcon,
  MapPinIcon,
  ShoppingBagIcon,
  TagIcon,
  TruckIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { CartItem, getCartItems, saveCartItems } from "@/lib/cart-storage";
import styles from "./CheckoutPage.module.css";
import { checkOutAction } from "@/lib/actions/checkOut.action";

export default function CheckoutPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState("");
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    area: "",
    notes: "",
  });

  const VALID_PROMO = "BACHAT10";
  const PROMO_DISCOUNT = 0.1;
  const DELIVERY_FEE = 99;

  useEffect(() => {
    const syncCart = () => {
      setItems(getCartItems());
    };

    syncCart();
    window.addEventListener("rbs-cart-updated", syncCart);

    return () => window.removeEventListener("rbs-cart-updated", syncCart);
  }, []);

  const updateQty = (id: string, delta: number) => {
    setItems((prev) => {
      const nextItems = prev
        .map((item) =>
          item.id === id ? { ...item, qty: item.qty + delta } : item,
        )
        .filter((item) => item.qty > 0);
      saveCartItems(nextItems);
      return nextItems;
    });
  };

  const removeItem = (id: string) => {
    setItems((prev) => {
      const nextItems = prev.filter((item) => item.id !== id);
      saveCartItems(nextItems);
      return nextItems;
    });
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const promoDiscount = promoApplied
    ? Math.round(subtotal * PROMO_DISCOUNT)
    : 0;
  const total = subtotal - promoDiscount + DELIVERY_FEE;

  const handlePromo = () => {
    if (promoCode.trim().toUpperCase() === VALID_PROMO) {
      setPromoApplied(true);
      setPromoError("");
    } else {
      setPromoError("Invalid promo code");
      setPromoApplied(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const [formState, action, isPending] = useActionState(checkOutAction, {
    // You can add form validation and error handling here
    errors: null,
    success: false,
  });

  return (
    <div className={styles.page}>
      <div className={styles.topStrip}>
        <Link href="/" className={styles.backBtn}>
          <ArrowLeftIcon className={styles.inlineIcon} />
          <span>Continue Shopping</span>
        </Link>

        <div className={styles.topContent}>
          <div className={styles.pageTitleWrap}>
            <p className={styles.eyebrow}>Secure Order Flow</p>
            <h1 className={styles.pageTitle}>Checkout</h1>
          </div>

          <div className={styles.steps}>
            <span className={`${styles.stepChip} ${styles.stepChipActive}`}>
              1. Cart
            </span>
            <ChevronRightIcon className={styles.stepDividerIcon} />
            <span className={`${styles.stepChip} ${styles.stepChipActive}`}>
              2. Delivery
            </span>
            <ChevronRightIcon className={styles.stepDividerIcon} />
            <span className={styles.stepChip}>3. Confirm</span>
          </div>
        </div>
      </div>

      <form className={styles.layout} action={action} noValidate>
        <div className={styles.left}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={styles.iconBadge}>
                <MapPinIcon className={styles.headerIcon} />
              </span>
              <h2 className={styles.cardTitle}>Delivery Address</h2>
            </div>

            <div className={styles.formGrid}>
              <div className={styles.inputGroup}>
                <label>Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Enter your full name"
                  value={form.fullName}
                  onChange={handleChange}
                  required
                />
                {formState.errors?.fullName && (
                  <p className={styles.errorText}>
                    *{formState.errors.fullName[0]}
                  </p>
                )}
              </div>

              <div className={styles.inputGroup}>
                <label>Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="03XX-XXXXXXX"
                  value={form.phone}
                  onChange={handleChange}
                  required
                />
                {formState.errors?.phone && (
                  <p className={styles.errorText}>
                    *{formState.errors.phone[0]}
                  </p>
                )}
              </div>

              <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="example@email.com"
                  value={form.email}
                  onChange={handleChange}
                />
                {formState.errors?.email && (
                  <p className={styles.errorText}>
                    *{formState.errors.email[0]}
                  </p>
                )}
              </div>

              <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                <label>Street Address *</label>
                <input
                  type="text"
                  name="address"
                  placeholder="House no, Street, Block"
                  value={form.address}
                  onChange={handleChange}
                  required
                />
                {formState.errors?.address && (
                  <p className={styles.errorText}>
                    *{formState.errors.address[0]}
                  </p>
                )}
              </div>

              <div className={styles.inputGroup}>
                <label>City *</label>
                <select
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select City</option>
                  <option>Karachi</option>
                  <option>Lahore</option>
                  <option>Islamabad</option>
                  <option>Rawalpindi</option>
                  <option>Faisalabad</option>
                  <option>Peshawar</option>
                  <option>Quetta</option>
                </select>
                {formState.errors?.city && (
                  <p className={styles.errorText}>
                    *{formState.errors.city[0]}
                  </p>
                )}
              </div>

              <div className={styles.inputGroup}>
                <label>Area / Town</label>
                <input
                  type="text"
                  name="area"
                  placeholder="Area or town name"
                  value={form.area}
                  onChange={handleChange}
                />
                {formState.errors?.area && (
                  <p className={styles.errorText}>
                    *{formState.errors.area[0]}
                  </p>
                )}
              </div>

              <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                <label>Order Notes</label>
                <textarea
                  name="orderNotes"
                  placeholder="Special instructions (optional)"
                  value={form.orderNotes}
                  onChange={handleChange}
                  rows={3}
                />
                {formState.errors?.orderNotes && (
                  <p className={styles.errorText}>
                    *{formState.errors.orderNotes[0]}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={styles.iconBadge}>
                <BanknotesIcon className={styles.headerIcon} />
              </span>
              <h2 className={styles.cardTitle}>Payment Method</h2>
            </div>

            <div className={styles.paymentOption}>
              <div className={styles.paymentRadio}>
                <input type="radio" id="cod" name="payment" defaultChecked />
                <label htmlFor="cod">
                  <div className={styles.paymentLabel}>
                    <span className={styles.paymentIconWrap}>
                      <CreditCardIcon className={styles.paymentIcon} />
                    </span>
                    <div>
                      <p className={styles.paymentName}>Cash on Delivery</p>
                      <p className={styles.paymentDesc}>
                        Pay when your order arrives at your door
                      </p>
                    </div>
                  </div>
                  <span className={styles.paymentBadge}>Available</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={styles.iconBadge}>
                <ShoppingBagIcon className={styles.headerIcon} />
              </span>
              <h2 className={styles.cardTitle}>
                Your Cart
                <span className={styles.cartCount}>{items.length}</span>
              </h2>
            </div>

            {items.length === 0 ? (
              <p className={styles.emptyCart}>Your cart is empty.</p>
            ) : (
              <div className={styles.cartList}>
                {items.map((item) => (
                  <div key={item.id} className={styles.cartItem}>
                    <div className={styles.cartItemImg}>
                      <CubeIcon className={styles.productIcon} />
                    </div>

                    <div className={styles.cartItemInfo}>
                      <p className={styles.cartItemName}>{item.name}</p>
                      {item.badge && (
                        <span className={styles.itemBadge}>{item.badge}</span>
                      )}
                      <div className={styles.cartItemPriceRow}>
                        <span className={styles.cartItemPrice}>
                          Rs. {item.price * item.qty}
                        </span>
                        <span className={styles.cartItemOriginal}>
                          Rs. {item.originalPrice * item.qty}
                        </span>
                      </div>
                    </div>

                    <div className={styles.cartItemActions}>
                      <div className={styles.qtyControl}>
                        <button
                          type="button"
                          onClick={() => updateQty(item.id, -1)}
                        >
                          -
                        </button>
                        <span>{item.qty}</span>
                        <button
                          type="button"
                          onClick={() => updateQty(item.id, 1)}
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        className={styles.removeBtn}
                        onClick={() => removeItem(item.id)}
                        aria-label="Remove item"
                      >
                        <TrashIcon className={styles.removeIcon} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={styles.iconBadge}>
                <TagIcon className={styles.headerIcon} />
              </span>
              <h2 className={styles.cardTitle}>Promo Code</h2>
            </div>

            <div className={styles.promoRow}>
              <input
                name="promocode"
                type="text"
                placeholder="Enter promo code"
                value={promoCode}
                onChange={(e) => {
                  setPromoCode(e.target.value);
                  setPromoError("");
                }}
                className={promoApplied ? styles.promoInputSuccess : ""}
              />
              {formState.errors?.promocode && (
                <p className={styles.errorText}>
                  *{formState.errors.promocode[0]}
                </p>
              )}
              <button
                type="button"
                className={styles.promoBtn}
                onClick={handlePromo}
                disabled={promoApplied}
              >
                {promoApplied ? "Applied" : "Apply"}
              </button>
            </div>
            {promoError && <p className={styles.promoError}>{promoError}</p>}
            {promoApplied && (
              <p className={styles.promoSuccess}>
                10% discount applied! (Code: BACHAT10)
              </p>
            )}
          </div>

          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={styles.iconBadge}>
                <ShoppingBagIcon className={styles.headerIcon} />
              </span>
              <h2 className={styles.cardTitle}>Order Summary</h2>
            </div>

            <div className={styles.summaryRows}>
              <div className={styles.summaryRow}>
                <span>Subtotal</span>
                <span>Rs. {subtotal}</span>
              </div>
              {promoApplied && (
                <div className={`${styles.summaryRow} ${styles.discountRow}`}>
                  <span>Promo Discount</span>
                  <span>- Rs. {promoDiscount}</span>
                </div>
              )}
              <div className={styles.summaryRow}>
                <span className={styles.rowLabel}>
                  <TruckIcon className={styles.rowIcon} />
                  Delivery Fee
                </span>
                <span>Rs. {DELIVERY_FEE}</span>
              </div>
              <div className={styles.summaryDivider} />
              <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                <span>Total</span>
                <span>Rs. {total}</span>
              </div>
            </div>

            <button type="submit" className={styles.placeOrderBtn}>
              Place Order - Rs. {total}
            </button>

            <p className={styles.secureNote}>
              <CheckBadgeIcon className={styles.inlineIcon} />
              <span>Secure checkout - your data is safe</span>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
