'use client';

import Link from 'next/link';
import { useProducts } from '@/lib/hooks/useProducts';
import ProductCard from '@/components/ui/ProductCard';
import { ProductCardSkeleton } from '@/components/ui/Skeleton';
import styles from './FeaturedProducts.module.css';

interface FeaturedProductsProps {
  title: string;
  subtitle?: string;
  category?: string;
  orderBy?: string;
  limit?: number;
  viewMoreHref?: string;
}

export default function FeaturedProducts({
  title,
  subtitle,
  category,
  orderBy,
  limit = 8,
  viewMoreHref = '/products',
}: FeaturedProductsProps) {
  const filters = category ? { item_group: category } : undefined;
  const { data, isLoading, error } = useProducts(filters, limit, orderBy);
  const products = data?.data || [];

  return (
    <section className={styles.section} aria-labelledby={`section-${title.replace(/\s/g, '-')}`}>
      <div className={styles.container}>
        <div className={styles.sectionHead}>
          <div className={styles.headingGroup}>
            {subtitle && <span className={styles.eyebrow}>{subtitle}</span>}
            <h2 id={`section-${title.replace(/\s/g, '-')}`} className={styles.heading}>
              {title}
            </h2>
          </div>
          <Link href={viewMoreHref} className={styles.viewAll}>
            View All
          </Link>
        </div>

        <div className={styles.grid}>
          {isLoading ? (
            Array.from({ length: Math.min(limit, 4) }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))
          ) : error ? (
            <div className={styles.errorState}>
              <p>Could not load products. Please check your connection.</p>
              <button onClick={() => window.location.reload()}>Retry</button>
            </div>
          ) : products.length === 0 ? (
            <div className={styles.emptyState}>
              <p>No products found.</p>
              <Link href="/products">Browse all products</Link>
            </div>
          ) : (
            (products as any[]).slice(0, limit).map((product) => (
              <ProductCard
                key={product.item_code}
                itemCode={product.item_code}
                itemName={product.item_name}
                image={product.website_image || product.image}
                price={product.standard_rate || null}
                category={product.item_group}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
