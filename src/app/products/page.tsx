'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import { useProducts } from '@/lib/hooks/useProducts';
import { useCategories } from '@/lib/hooks/useCategories';
import ProductCard from '@/components/ui/ProductCard';
import { ProductCardSkeleton } from '@/components/ui/Skeleton';
import styles from './ProductsPage.module.css';

const SORT_OPTIONS = [
  { value: 'modified desc', label: 'Newest First' },
  { value: 'item_name asc', label: 'Name A–Z' },
  { value: 'item_name desc', label: 'Name Z–A' },
  { value: 'standard_rate asc', label: 'Price: Low to High' },
  { value: 'standard_rate desc', label: 'Price: High to Low' },
];

function ProductsContent() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category') || '';
  const search = searchParams.get('search') || '';

  const [sortBy, setSortBy] = useState('modified desc');
  const [showFilters, setShowFilters] = useState(false);

  const { data: catData } = useCategories();
  const categories = catData?.data || [];

  const filters: Record<string, unknown> = {};
  if (category) filters.item_group = category;
  if (search) filters.item_name = ['like', `%${search}%`];

  const { data, isLoading, error } = useProducts(filters, 40, sortBy);
  const products = data?.data || [];

  const pageTitle = search
    ? `Search: "${search}"`
    : category
      ? category
      : 'All Products';

  return (
    <div className={styles.page}>
      {/* Page header */}
      <div className={styles.pageHeader}>
        <div className={styles.pageHeaderInner}>
          <div>
            <nav className={styles.breadcrumb} aria-label="Breadcrumb">
              <a href="/">Home</a>
              <span>/</span>
              <span>Products</span>
              {category && (
                <>
                  <span>/</span>
                  <span>{category}</span>
                </>
              )}
            </nav>
            <h1 className={styles.pageTitle}>{pageTitle}</h1>
            {!isLoading && (
              <p className={styles.resultCount}>
                {products.length} product{products.length !== 1 ? 's' : ''} found
              </p>
            )}
          </div>

          <div className={styles.topControls}>
            <button
              className={styles.filterToggle}
              onClick={() => setShowFilters(!showFilters)}
            >
              <AdjustmentsHorizontalIcon className={styles.filterIcon} />
              Filters
            </button>

            <select
              className={styles.sortSelect}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort products"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className={styles.layout}>
        {/* Sidebar filters */}
        <aside
          className={`${styles.sidebar} ${showFilters ? styles.sidebarOpen : ''}`}
          aria-label="Filters"
        >
          <div className={styles.sidebarHeader}>
            <h2 className={styles.sidebarTitle}>Categories</h2>
          </div>

          <div className={styles.filterGroup}>
            <a
              href="/products"
              className={`${styles.filterCat} ${!category ? styles.filterCatActive : ''}`}
            >
              All Products
            </a>
            {(categories as any[]).map((cat) => (
              <a
                key={cat.name}
                href={`/products?category=${encodeURIComponent(cat.name)}`}
                className={`${styles.filterCat} ${category === cat.name ? styles.filterCatActive : ''}`}
              >
                {cat.name}
              </a>
            ))}
          </div>
        </aside>

        {/* Products grid */}
        <main className={styles.main}>
          {error ? (
            <div className={styles.errorState}>
              <p>Failed to load products. Please try again.</p>
              <button onClick={() => window.location.reload()}>Retry</button>
            </div>
          ) : (
            <div className={styles.grid}>
              {isLoading
                ? Array.from({ length: 12 }).map((_, i) => (
                    <ProductCardSkeleton key={i} />
                  ))
                : products.length === 0
                  ? (
                    <div className={styles.emptyState}>
                      <p className={styles.emptyTitle}>No products found</p>
                      <p className={styles.emptyDesc}>
                        Try adjusting your filters or{' '}
                        <a href="/products">browse all products</a>.
                      </p>
                    </div>
                  )
                  : (products as any[]).map((product) => (
                      <ProductCard
                        key={product.item_code}
                        itemCode={product.item_code}
                        itemName={product.item_name}
                        image={product.website_image || product.image}
                        price={product.standard_rate || null}
                        category={product.item_group}
                      />
                    ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense>
      <ProductsContent />
    </Suspense>
  );
}
