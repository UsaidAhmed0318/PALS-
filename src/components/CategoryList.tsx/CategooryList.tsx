'use client';
import { useRef } from 'react';
import { useCategories } from '@/lib/hooks/useCategories';
import styles from './CategooryList.module.css';
import NavLink from '../NavLink/Navlink';

const SCROLL_AMOUNT = 300;

export default function CategoryList() {
  const { data, isLoading, error } = useCategories();
  const viewportRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    viewportRef.current?.scrollBy({ left: -SCROLL_AMOUNT, behavior: 'smooth' });
  };

  const scrollRight = () => {
    viewportRef.current?.scrollBy({ left: SCROLL_AMOUNT, behavior: 'smooth' });
  };

  if (isLoading) return <div className={styles.loading}>Loading...</div>;
  if (error)
    return <div className={styles.errorMsg}>Failed to load categories</div>;

  const categories = data?.data || [];

  return (
    <div className={styles.wrap}>
      {/* Left Arrow */}
      <button
        className={`${styles.arrow} ${styles.left}`}
        onClick={scrollLeft}
        aria-label="Scroll left">
        <svg
          className={styles.icon}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      {/* Viewport */}
      <div className={styles.catViewport} ref={viewportRef}>
        <ul className={styles.catPage}>
          {categories.map((category: any) => {
            const categoryHref = `/products/${encodeURIComponent(category.name)}`;

            return (
              <li key={category.name} className={styles.catItem}>
                <NavLink href={categoryHref} className={styles.catName}>
                  {category.name}
                </NavLink>
                {/* <Link
                  href={categoryHref}
                  style={{ textDecoration: 'none', color: 'inherit' }}>
                  <p className={styles.catName}>{category.name}</p>
                </Link> */}
              </li>
            );
          })}
        </ul>
      </div>

      {/* Right Arrow */}
      <button
        className={`${styles.arrow} ${styles.right}`}
        onClick={scrollRight}
        aria-label="Scroll right">
        <svg
          className={styles.icon}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
    </div>
  );
}
