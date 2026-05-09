"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  ChevronDownIcon,
  ShoppingCartIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { CartItem, getCartItems, saveCartItems } from "@/lib/cart-storage";
import styles from "./ItemDropdown.module.css";

type ItemDropdownProps = {
  activeItem: string;
  badgeCount?: number;
  isOpen: boolean;
  items: string[];
  showItemIcons?: boolean;
  showTriggerIcon?: boolean;
  checkoutHref?: string;
  triggerLabel?: string;
  triggerVariant?: "default" | "cart";
  onSelectItem: (item: string) => void;
  onToggle: () => void;
};

export default function ItemDropdown({
  isOpen,
  items,
  showItemIcons = true,
  showTriggerIcon = false,
  checkoutHref,
  triggerLabel = "Items",
  triggerVariant = "default",
  activeItem,
  onSelectItem,
  onToggle,
}: ItemDropdownProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (triggerVariant !== "cart") return;

    const syncCart = () => {
      setCartItems(getCartItems());
    };

    syncCart();
    window.addEventListener("rbs-cart-updated", syncCart);
    return () => window.removeEventListener("rbs-cart-updated", syncCart);
  }, [triggerVariant]);

  useEffect(() => {
    if (!isOpen) return;

    const handleOutsideClick = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        onToggle();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onToggle();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onToggle]);

  const cartSubtotal = useMemo(
    () =>
      cartItems.reduce((sum, item) => {
        return sum + item.price * item.qty;
      }, 0),
    [cartItems],
  );
  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.qty, 0),
    [cartItems],
  );

  const freeDeliveryTarget = 2500;
  const freeDeliveryRemaining = Math.max(freeDeliveryTarget - cartSubtotal, 0);
  const freeDeliveryProgress = Math.min(
    (cartSubtotal / freeDeliveryTarget) * 100,
    100,
  );

  const updateCartQty = (id: string, delta: number) => {
    const updatedItems = cartItems
      .map((item) =>
        item.id === id ? { ...item, qty: Math.max(0, item.qty + delta) } : item,
      )
      .filter((item) => item.qty > 0);

    setCartItems(updatedItems);
    saveCartItems(updatedItems);
  };

  const clearCart = () => {
    setCartItems([]);
    saveCartItems([]);
  };

  return (
    <div
      ref={wrapperRef}
      className={`${styles.wrapper} ${triggerVariant === "cart" ? styles.cartWrapper : ""}`}
    >
      <button
        type="button"
        className={`${styles.trigger} ${triggerVariant === "cart" ? styles.cartTrigger : ""} ${isOpen ? styles.triggerActive : ""}`}
        onClick={onToggle}
        aria-label={triggerVariant === "cart" ? "Cart" : triggerLabel}
      >
        {showTriggerIcon && <ShoppingCartIcon className={styles.cartIcon} />}
        {triggerVariant === "cart" ? (
          <>
            <span className={styles.cartTriggerIcon}>
              <ShoppingCartIcon className={styles.cartIcon} />
            </span>
            <span className={styles.cartTriggerLabel}>Cart</span>
            {cartCount > 0 && <span className={styles.cartBadge}>{cartCount}</span>}
          </>
        ) : (
          <>
            <span>{triggerLabel}</span>
            <ChevronDownIcon
              className={`${styles.chevron} ${isOpen ? styles.chevronUp : ""}`}
            />
          </>
        )}
      </button>

      {isOpen && triggerVariant === "cart" && (
        <div className={`${styles.panel} ${styles.cartPanel}`}>
          <div className={styles.cartHeader}>
            <div>
              <h3>Cart</h3>
              {cartItems.length > 0 && (
                <button
                  type="button"
                  className={styles.clearCartButton}
                  onClick={clearCart}
                >
                  Clear cart
                </button>
              )}
            </div>
            <button
              type="button"
              className={styles.closeCartButton}
              onClick={onToggle}
              aria-label="Close cart"
            >
              <XMarkIcon className={styles.closeIcon} />
            </button>
          </div>

          <p className={styles.cartMeta}>{cartCount} items</p>

          <div className={styles.cartDrawerBody}>
            {cartItems.length === 0 ? (
              <p className={styles.emptyCartMessage}>Your cart is empty.</p>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className={styles.cartRow}>
                  <div className={styles.cartThumb}>{item.name.slice(0, 2)}</div>

                  <div className={styles.cartInfo}>
                    <p className={styles.cartName}>{item.name}</p>
                    {item.badge && (
                      <span className={styles.cartTag}>{item.badge}</span>
                    )}
                    <strong className={styles.cartPrice}>
                      Rs. {item.price * item.qty}
                    </strong>
                  </div>

                  <div className={styles.cartActions}>
                    <div className={styles.qtyPill}>
                      <button
                        type="button"
                        onClick={() => updateCartQty(item.id, -1)}
                      >
                        -
                      </button>
                      <span>{item.qty}</span>
                      <button
                        type="button"
                        onClick={() => updateCartQty(item.id, 1)}
                      >
                        +
                      </button>
                    </div>

                    <button
                      type="button"
                      className={styles.deleteRowButton}
                      onClick={() => updateCartQty(item.id, -item.qty)}
                      aria-label="Remove item"
                    >
                      <TrashIcon className={styles.deleteIcon} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className={styles.cartFooter}>
            <div className={styles.freeDeliveryBar}>
              <div
                className={styles.freeDeliveryFill}
                style={{ width: `${freeDeliveryProgress}%` }}
              />
              <span>
                {freeDeliveryRemaining > 0
                  ? `You are Rs. ${freeDeliveryRemaining} away from free delivery`
                  : "You unlocked free delivery"}
              </span>
            </div>

            <div className={styles.totalRow}>
              <span>Total amount</span>
              <strong>Rs. {cartSubtotal}</strong>
            </div>

            {checkoutHref && cartItems.length > 0 && (
              <Link href={checkoutHref} className={styles.checkoutButton}>
                Checkout
              </Link>
            )}
          </div>
        </div>
      )}

      {isOpen && triggerVariant !== "cart" && (
        <div className={styles.panel}>
          {items.map((item) => (
            <button
              type="button"
              key={item}
              className={`${styles.itemButton} ${activeItem === item ? styles.itemButtonActive : ""}`}
              onClick={() => onSelectItem(item)}
            >
              {showItemIcons && <ShoppingCartIcon className={styles.cartIcon} />}
              <span>{item}</span>
            </button>
          ))}

          {checkoutHref && (
            <Link href={checkoutHref} className={styles.checkoutButton}>
              Checkout
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
