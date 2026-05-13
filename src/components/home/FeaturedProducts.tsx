'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
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
  bg?: 'light' | 'white';
}

export default function FeaturedProducts({
  title,
  subtitle,
  category,
  orderBy,
  limit = 8,
  viewMoreHref = '/products',
  bg = 'light',
}: FeaturedProductsProps) {
  const filters = category ? { item_group: category } : undefined;
  const { data, isLoading, error } = useProducts(filters, limit, orderBy);
  const products = data?.data || [];

  const sectionId = `section-${title.replace(/\s+/g, '-')}`;

  return (
    <section
      className={`${styles.section} ${bg === 'white' ? styles.sectionWhite : ''}`}
      aria-labelledby={sectionId}
    >
      <div className={styles.container}>
        <motion.div
          className={styles.sectionHead}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          <div className={styles.headingGroup}>
            {subtitle && <span className={styles.eyebrow}>{subtitle}</span>}
            <h2 id={sectionId} className={styles.heading}>{title}</h2>
            <div className={styles.headingLine} />
          </div>
          <Link href={viewMoreHref} className={styles.viewAll}>
            View All →
          </Link>
        </motion.div>

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
                image={product.image}
                price={product.valuation_rate || null}
                brand={product.brand}
                category={product.item_group}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
