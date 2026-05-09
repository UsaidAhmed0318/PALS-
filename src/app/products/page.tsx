'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense, useState, useMemo } from 'react';
import { AdjustmentsHorizontalIcon, XMarkIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useProducts } from '@/lib/hooks/useProducts';
import { useCategories, useSubCategories } from '@/lib/hooks/useCategories';
import ProductCard from '@/components/ui/ProductCard';
import { ProductCardSkeleton } from '@/components/ui/Skeleton';
import styles from './ProductsPage.module.css';

const SORT_OPTIONS = [
  { value: 'item_name asc',      label: 'Name A–Z' },
  { value: 'item_name desc',     label: 'Name Z–A' },
  { value: 'valuation_rate asc', label: 'Price: Low to High' },
  { value: 'valuation_rate desc',label: 'Price: High to Low' },
  { value: 'modified desc',      label: 'Newest First' },
];

function ProductsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const category = searchParams.get('category') || '';
  const searchQ   = searchParams.get('search')   || '';

  const [sortBy, setSortBy]         = useState('item_name asc');
  const [showFilters, setShowFilters] = useState(false);
  const [searchInput, setSearchInput] = useState(searchQ);

  /* ── categories for sidebar ── */
  const { data: catData } = useCategories();
  const categories = catData?.data || [];

  /* ── sub-categories for selected top-level category ── */
  const { data: subData, isLoading: subLoading } = useSubCategories(category || null);
  const subGroups = useMemo(
    () => subData?.data?.map((s) => s.name) ?? [],
    [subData],
  );

  /* ── build item filters ── */
  const itemFilters = useMemo(() => {
    const f: Record<string, unknown> = {};
    if (searchQ) f.item_name = ['like', `%${searchQ}%`];
    if (category) {
      if (subGroups.length > 0) {
        f.item_group = ['in', subGroups];
      } else if (!subLoading) {
        f.item_group = category;   // direct match fallback
      }
    }
    return f;
  }, [searchQ, category, subGroups, subLoading]);

  const productsEnabled = !category || !subLoading;

  const { data, isLoading: prodLoading, error } = useProducts(
    itemFilters,
    200,     // fetch all published products
    sortBy,
    productsEnabled,
  );

  const isLoading = prodLoading || (!!category && subLoading);
  const products = data?.data || [];

  const pageTitle = searchQ
    ? `Results for "${searchQ}"`
    : category || 'All Products';

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchInput.trim();
    if (q) router.push(`/products?search=${encodeURIComponent(q)}`);
    else router.push('/products');
  };

  const clearSearch = () => {
    setSearchInput('');
    router.push('/products');
  };

  return (
    <div className={styles.page}>
      {/* Page header */}
      <div className={styles.pageHeader}>
        <div className={styles.pageHeaderInner}>
          <div>
            <nav className={styles.breadcrumb} aria-label="Breadcrumb">
              <a href="/">Home</a>
              <span>/</span>
              <a href="/products">Products</a>
              {category && (
                <>
                  <span>/</span>
                  <span>{category}</span>
                </>
              )}
              {searchQ && (
                <>
                  <span>/</span>
                  <span>Search</span>
                </>
              )}
            </nav>
            <h1 className={styles.pageTitle}>{pageTitle}</h1>
            {!isLoading && (
              <p className={styles.resultCount}>
                {products.length} product{products.length !== 1 ? 's' : ''}
                {category ? ` in ${category}` : ''}
              </p>
            )}
          </div>

          <div className={styles.topControls}>
            {/* inline search */}
            <form className={styles.inlineSearch} onSubmit={handleSearch}>
              <MagnifyingGlassIcon className={styles.inlineSearchIcon} />
              <input
                type="search"
                className={styles.inlineSearchInput}
                placeholder="Search products..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              {searchQ && (
                <button type="button" className={styles.inlineSearchClear} onClick={clearSearch}>
                  <XMarkIcon style={{ width: 16, height: 16 }} />
                </button>
              )}
            </form>

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

      {/* Active filters chips */}
      {(category || searchQ) && (
        <div className={styles.activeFilters}>
          <div className={styles.activeFiltersInner}>
            <span className={styles.filterLabel}>Active:</span>
            {category && (
              <a href="/products" className={styles.chip}>
                {category} <XMarkIcon style={{ width: 12, height: 12 }} />
              </a>
            )}
            {searchQ && (
              <button className={styles.chip} onClick={clearSearch} type="button">
                &quot;{searchQ}&quot; <XMarkIcon style={{ width: 12, height: 12 }} />
              </button>
            )}
          </div>
        </div>
      )}

      <div className={styles.layout}>
        {/* Sidebar */}
        <aside
          className={`${styles.sidebar} ${showFilters ? styles.sidebarOpen : ''}`}
          aria-label="Category filters"
        >
          <div className={styles.sidebarHeader}>
            <h2 className={styles.sidebarTitle}>Categories</h2>
            <button
              className={styles.sidebarClose}
              onClick={() => setShowFilters(false)}
            >
              <XMarkIcon style={{ width: 18, height: 18 }} />
            </button>
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
                onClick={() => setShowFilters(false)}
              >
                {cat.name}
              </a>
            ))}
          </div>
        </aside>

        {/* Overlay for mobile */}
        {showFilters && (
          <div
            className={styles.overlay}
            onClick={() => setShowFilters(false)}
            aria-hidden="true"
          />
        )}

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
                      <div className={styles.emptyIcon}>
                        <MagnifyingGlassIcon style={{ width: 40, height: 40 }} />
                      </div>
                      <p className={styles.emptyTitle}>No products found</p>
                      <p className={styles.emptyDesc}>
                        Try a different category or{' '}
                        <a href="/products">browse all products</a>.
                      </p>
                    </div>
                  )
                  : (products as any[]).map((product) => (
                      <ProductCard
                        key={product.item_code}
                        itemCode={product.item_code}
                        itemName={product.item_name}
                        image={product.image}
                        price={product.valuation_rate || null}
                        brand={product.brand}
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
