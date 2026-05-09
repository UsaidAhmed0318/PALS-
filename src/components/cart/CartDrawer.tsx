'use client';

import {
  XMarkIcon,
  ShoppingBagIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useCart } from './CartContext';
import styles from './CartDrawer.module.css';

export default function CartDrawer() {
  const { items, count, total, removeItem, updateQty, closeCart, isOpen } =
    useCart();

  return (
    <>
      <div
        className={`${styles.overlay} ${isOpen ? styles.open : ''}`}
        onClick={closeCart}
        aria-hidden="true"
      />

      <aside
        className={`${styles.drawer} ${isOpen ? styles.open : ''}`}
        aria-label="Shopping cart"
        role="dialog"
      >
        <div className={styles.header}>
          <div className={styles.title}>
            <ShoppingBagIcon className={styles.titleIcon} />
            <span>My Cart ({count})</span>
          </div>
          <button
            className={styles.close}
            onClick={closeCart}
            aria-label="Close cart"
          >
            <XMarkIcon className={styles.closeIcon} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className={styles.empty}>
            <ShoppingBagIcon className={styles.emptyIcon} />
            <p className={styles.emptyText}>Your cart is empty</p>
            <p className={styles.emptySubtext}>
              Add items to get started
            </p>
            <Link href="/products" className={styles.shopBtn} onClick={closeCart}>
              Browse Products
            </Link>
          </div>
        ) : (
          <>
            <div className={styles.items}>
              {items.map((item) => (
                <div key={item.id} className={styles.item}>
                  <div className={styles.itemInfo}>
                    <p className={styles.itemName}>{item.name}</p>
                    <p className={styles.itemPrice}>
                      Rs. {(item.price * item.qty).toLocaleString()}
                    </p>
                    <p className={styles.itemUnit}>
                      Rs. {item.price} × {item.qty}
                    </p>
                  </div>

                  <div className={styles.itemActions}>
                    <div className={styles.qty}>
                      <button
                        onClick={() => updateQty(item.id, item.qty - 1)}
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span>{item.qty}</span>
                      <button
                        onClick={() => updateQty(item.id, item.qty + 1)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                    <button
                      className={styles.remove}
                      onClick={() => removeItem(item.id)}
                      aria-label="Remove item"
                    >
                      <TrashIcon className={styles.removeIcon} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.footer}>
              <div className={styles.subtotalRow}>
                <span>Subtotal</span>
                <span className={styles.subtotalAmount}>
                  Rs. {total.toLocaleString()}
                </span>
              </div>
              <p className={styles.shippingNote}>
                Shipping calculated at checkout
              </p>
              <Link
                href="/checkout"
                className={styles.checkoutBtn}
                onClick={closeCart}
              >
                Proceed to Checkout
              </Link>
              <Link
                href="/cart"
                className={styles.viewCartBtn}
                onClick={closeCart}
              >
                View Full Cart
              </Link>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
