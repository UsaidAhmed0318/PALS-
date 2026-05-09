'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCartIcon, HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';
import { useCart } from '@/components/cart/CartContext';
import styles from './ProductCard.module.css';

const ERPNEXT_URL = process.env.NEXT_PUBLIC_ERPNEXT_URL || '';

interface ProductCardProps {
  itemCode: string;
  itemName: string;
  image?: string | null;
  price?: number | null;
  originalPrice?: number | null;
  badge?: string | null;
  category?: string;
  brand?: string | null;
}

function buildImageUrl(path?: string | null): string | null {
  if (!path) return null;
  if (path.startsWith('http')) return path;
  return `${ERPNEXT_URL}${path}`;
}

export default function ProductCard({
  itemCode,
  itemName,
  image,
  price,
  originalPrice,
  badge,
  category,
  brand,
}: ProductCardProps) {
  const { addItem, openCart } = useCart();
  const [added, setAdded] = useState(false);
  const [wished, setWished] = useState(false);

  const imageUrl = buildImageUrl(image);
  const discount =
    price && originalPrice && originalPrice > price
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : null;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      id: itemCode,
      name: itemName,
      price: price || 0,
      originalPrice: originalPrice || price || 0,
      qty: 1,
      badge: badge || undefined,
    });
    setAdded(true);
    openCart();
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <article className={styles.card}>
      <Link href={`/products/${encodeURIComponent(itemCode)}`} className={styles.cardLink}>
        <div className={styles.imageWrapper}>
          {(badge || discount) && (
            <span className={styles.badge}>{badge || `${discount}% off`}</span>
          )}

          <button
            className={`${styles.wishBtn} ${wished ? styles.wishBtnActive : ''}`}
            onClick={(e) => {
              e.preventDefault();
              setWished((w) => !w);
            }}
            aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            {wished ? (
              <HeartSolid className={styles.wishIcon} />
            ) : (
              <HeartIcon className={styles.wishIcon} />
            )}
          </button>

          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={itemName}
              fill
              sizes="(max-width: 480px) 50vw, (max-width: 768px) 33vw, 25vw"
              className={styles.image}
            />
          ) : (
            <div className={styles.imagePlaceholder}>
              <ShoppingCartIcon className={styles.placeholderIcon} />
            </div>
          )}
        </div>

        <div className={styles.body}>
          <span className={styles.category}>{brand || category || 'EoriCart'}</span>
          <h3 className={styles.name}>{itemName}</h3>

          <div className={styles.priceRow}>
            {price ? (
              <>
                <span className={styles.price}>Rs. {price.toLocaleString()}</span>
                {originalPrice && originalPrice > price && (
                  <span className={styles.originalPrice}>
                    Rs. {originalPrice.toLocaleString()}
                  </span>
                )}
              </>
            ) : (
              <span className={styles.noPrice}>View Price</span>
            )}
          </div>
        </div>
      </Link>

      <div className={styles.actions}>
        <button
          className={`${styles.addBtn} ${added ? styles.addedBtn : ''}`}
          onClick={handleAddToCart}
          aria-label={`Add ${itemName} to cart`}
        >
          <ShoppingCartIcon className={styles.addIcon} />
          <span>{added ? 'Added!' : 'Add to Cart'}</span>
        </button>
      </div>
    </article>
  );
}
