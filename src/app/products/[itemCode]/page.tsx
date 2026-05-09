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
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';
import { useProduct, useItemPrice, useProducts } from '@/lib/hooks/useProducts';
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
  const { data: priceData } = useItemPrice(decodedItemCode);
  const { addItem, openCart } = useCart();

  const price = priceData?.data?.[0];
  const imageUrl = buildImageUrl(
    (product as any)?.website_image || (product as any)?.image,
  );

  const [quantity, setQuantity] = useState(1);
  const [wished, setWished] = useState(false);
  const [added, setAdded] = useState(false);

  // Related products — same category
  const { data: relatedData } = useProducts(
    (product as any)?.item_group
      ? { item_group: (product as any).item_group }
      : undefined,
    5,
  );
  const related = (relatedData?.data || []).filter(
    (p: any) => p.item_code !== decodedItemCode,
  ).slice(0, 4);

  const handleAddToCart = () => {
    if (!product) return;
    const p = product as any;
    addItem({
      id: p.item_code,
      name: p.item_name,
      price: price?.price_list_rate || p.standard_rate || 0,
      originalPrice: price?.price_list_rate || p.standard_rate || 0,
      qty: quantity,
    });
    setAdded(true);
    openCart();
    setTimeout(() => setAdded(false), 2500);
  };

  if (isLoading) {
    return (
      <div className={styles.page}>
        <div className={styles.skeleton}>
          <div className={styles.skeletonImg} />
          <div className={styles.skeletonBody}>
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className={styles.skeletonLine} style={{ width: `${60 + i * 8}%` }} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className={styles.page}>
        <div className={styles.notFound}>
          <h1>Product Not Found</h1>
          <p>The product you&apos;re looking for doesn&apos;t exist or has been removed.</p>
          <Link href="/products" className={styles.backBtn}>
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  const p = product as any;
  const displayPrice = price?.price_list_rate || p.standard_rate;

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

      {/* Product detail */}
      <div className={styles.container}>
        <div className={styles.productGrid}>
          {/* Image gallery */}
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

          {/* Product info */}
          <div className={styles.info}>
            {p.item_group && (
              <Link
                href={`/products?category=${encodeURIComponent(p.item_group)}`}
                className={styles.category}
              >
                {p.item_group}
              </Link>
            )}

            <h1 className={styles.title}>{p.item_name}</h1>

            <div className={styles.meta}>
              <span className={styles.sku}>SKU: {p.item_code}</span>
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
              {price?.currency && (
                <span className={styles.currency}>{price.currency}</span>
              )}
            </div>

            {/* Description */}
            {p.description && (
              <div
                className={styles.description}
                dangerouslySetInnerHTML={{ __html: p.description }}
              />
            )}

            {/* Quantity */}
            <div className={styles.qtyBlock}>
              <span className={styles.qtyLabel}>Quantity</span>
              <div className={styles.qty}>
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
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

            {/* Actions */}
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

              <button className={styles.shareBtn} aria-label="Share product">
                <ShareIcon className={styles.shareIcon} />
              </button>
            </div>

            {/* Delivery info */}
            <div className={styles.deliveryInfo}>
              <div className={styles.deliveryItem}>
                <TruckIcon className={styles.deliveryIcon} />
                <span>Free delivery on orders above Rs. 2,000</span>
              </div>
              <div className={styles.deliveryItem}>
                <ShieldCheckIcon className={styles.deliveryIcon} />
                <span>100% authentic products · Cash on delivery</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <section className={styles.related} aria-labelledby="related-heading">
            <h2 id="related-heading" className={styles.relatedTitle}>
              Related Products
            </h2>
            <div className={styles.relatedGrid}>
              {(related as any[]).map((item) => (
                <ProductCard
                  key={item.item_code}
                  itemCode={item.item_code}
                  itemName={item.item_name}
                  image={item.website_image || item.image}
                  price={item.standard_rate || null}
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
