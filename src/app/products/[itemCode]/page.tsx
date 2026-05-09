'use client';

import { use, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ShoppingCartIcon,
  HeartIcon,
  ShareIcon,
  CheckIcon,
  TruckIcon,
  ShieldCheckIcon,
  TagIcon,
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';
import { useProduct, useProducts } from '@/lib/hooks/useProducts';
import { useCart } from '@/components/cart/CartContext';
import ProductCard from '@/components/ui/ProductCard';
import styles from './ProductDetail.module.css';

const ERPNEXT_URL = process.env.NEXT_PUBLIC_ERPNEXT_URL || '';

function buildImageUrl(path?: string | null): string | null {
  if (!path) return null;
  if (path.startsWith('http')) return path;
  return `${ERPNEXT_URL}${path}`;
}

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ itemCode: string }>;
}) {
  const { itemCode } = use(params);
  const decodedItemCode = decodeURIComponent(itemCode);

  const { data: product, isLoading, error } = useProduct(decodedItemCode);
  const { addItem, openCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [wished, setWished]     = useState(false);
  const [added, setAdded]       = useState(false);

  const p = product as any;
  const imageUrl = buildImageUrl(p?.image);
  const displayPrice: number | null = p?.valuation_rate || null;

  /* Related products — same sub-group */
  const { data: relatedData } = useProducts(
    p?.item_group ? { item_group: p.item_group } : undefined,
    6,
    'item_name asc',
    !!p?.item_group,
  );
  const related = (relatedData?.data || [])
    .filter((r: any) => r.item_code !== decodedItemCode)
    .slice(0, 4);

  const handleAddToCart = () => {
    if (!p) return;
    addItem({
      id: p.item_code,
      name: p.item_name,
      price: displayPrice || 0,
      originalPrice: displayPrice || 0,
      qty: quantity,
    });
    setAdded(true);
    openCart();
    setTimeout(() => setAdded(false), 2500);
  };

  /* ── Loading skeleton ── */
  if (isLoading) {
    return (
      <div className={styles.page}>
        <div className={styles.skeleton}>
          <div className={styles.skeletonImg} />
          <div className={styles.skeletonBody}>
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className={styles.skeletonLine}
                style={{ width: `${45 + i * 10}%`, height: i === 0 ? 28 : 16 }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ── Not found ── */
  if (error || !p) {
    return (
      <div className={styles.page}>
        <div className={styles.notFound}>
          <ShoppingCartIcon style={{ width: 56, height: 56, color: 'var(--clr-text-soft)', margin: '0 auto 16px' }} />
          <h1>Product Not Found</h1>
          <p>The product you&apos;re looking for doesn&apos;t exist or has been removed.</p>
          <Link href="/products" className={styles.backBtn}>Browse All Products</Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      {/* Breadcrumb */}
      <div className={styles.breadcrumbBar}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href="/products">Products</Link>
          {p.item_group && (
            <>
              <span>/</span>
              <Link href={`/products?category=${encodeURIComponent(p.item_group)}`}>
                {p.item_group}
              </Link>
            </>
          )}
          <span>/</span>
          <span aria-current="page">{p.item_name}</span>
        </nav>
      </div>

      {/* Main content */}
      <div className={styles.container}>
        <div className={styles.productGrid}>

          {/* ── Image panel ── */}
          <div className={styles.gallery}>
            <div className={styles.mainImageWrap}>
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={p.item_name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={styles.mainImage}
                  priority
                />
              ) : (
                <div className={styles.imagePlaceholder}>
                  <ShoppingCartIcon className={styles.placeholderIcon} />
                  <span>No Image Available</span>
                </div>
              )}
            </div>
          </div>

          {/* ── Info panel ── */}
          <div className={styles.info}>

            {/* Brand + category */}
            <div className={styles.topMeta}>
              {p.brand && <span className={styles.brand}>{p.brand}</span>}
              {p.item_group && (
                <Link
                  href={`/products?category=${encodeURIComponent(p.item_group)}`}
                  className={styles.category}
                >
                  {p.item_group}
                </Link>
              )}
            </div>

            <h1 className={styles.title}>{p.item_name}</h1>

            <div className={styles.meta}>
              <span className={styles.sku}>
                <TagIcon style={{ width: 13, height: 13 }} /> {p.item_code}
              </span>
              <span className={styles.dot}>·</span>
              <span className={styles.stock}>
                <CheckIcon className={styles.stockIcon} />
                In Stock
              </span>
            </div>

            {/* Price */}
            <div className={styles.priceBlock}>
              {displayPrice ? (
                <span className={styles.price}>
                  Rs. {displayPrice.toLocaleString()}
                </span>
              ) : (
                <span className={styles.contactPrice}>Contact for Price</span>
              )}
            </div>

            {/* Description */}
            {p.description && (
              <div
                className={styles.description}
                dangerouslySetInnerHTML={{ __html: p.description }}
              />
            )}

            {/* Quantity selector */}
            <div className={styles.qtyBlock}>
              <span className={styles.qtyLabel}>Quantity</span>
              <div className={styles.qty}>
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  disabled={quantity <= 1}
                >
                  −
                </button>
                <span>{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            {/* CTA buttons */}
            <div className={styles.actions}>
              <button
                className={`${styles.addBtn} ${added ? styles.addedBtn : ''}`}
                onClick={handleAddToCart}
              >
                <ShoppingCartIcon className={styles.addIcon} />
                {added ? 'Added to Cart!' : 'Add to Cart'}
              </button>

              <button
                className={`${styles.wishBtn} ${wished ? styles.wishBtnActive : ''}`}
                onClick={() => setWished((w) => !w)}
                aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                {wished ? (
                  <HeartSolid className={styles.wishIcon} />
                ) : (
                  <HeartIcon className={styles.wishIcon} />
                )}
              </button>

              <button
                className={styles.shareBtn}
                aria-label="Share product"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({ title: p.item_name, url: window.location.href });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                  }
                }}
              >
                <ShareIcon className={styles.shareIcon} />
              </button>
            </div>

            {/* Delivery trust badges */}
            <div className={styles.deliveryInfo}>
              <div className={styles.deliveryItem}>
                <TruckIcon className={styles.deliveryIcon} />
                <span>Free delivery on orders above Rs. 2,000</span>
              </div>
              <div className={styles.deliveryItem}>
                <ShieldCheckIcon className={styles.deliveryIcon} />
                <span>100% authentic products · Cash on delivery available</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <section className={styles.related} aria-labelledby="related-heading">
            <h2 id="related-heading" className={styles.relatedTitle}>
              You May Also Like
            </h2>
            <div className={styles.relatedGrid}>
              {(related as any[]).map((item) => (
                <ProductCard
                  key={item.item_code}
                  itemCode={item.item_code}
                  itemName={item.item_name}
                  image={item.image}
                  price={item.valuation_rate || null}
                  brand={item.brand}
                  category={item.item_group}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
