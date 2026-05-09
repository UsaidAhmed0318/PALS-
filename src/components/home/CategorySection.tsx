'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCategories } from '@/lib/hooks/useCategories';
import { CategoryCardSkeleton } from '@/components/ui/Skeleton';
import styles from './CategorySection.module.css';

const ERPNEXT_URL = process.env.NEXT_PUBLIC_ERPNEXT_URL || '';

export default function CategorySection() {
  const { data, isLoading, error } = useCategories();
  const categories = data?.data || [];

  return (
    <section className={styles.section} aria-labelledby="categories-heading">
      <div className={styles.container}>
        <div className={styles.sectionHead}>
          <div className={styles.headingGroup}>
            <span className={styles.eyebrow}>Shop by Category</span>
            <h2 id="categories-heading" className={styles.heading}>
              Browse Categories
            </h2>
          </div>
          <Link href="/products" className={styles.viewAll}>
            View All
          </Link>
        </div>

        <div className={styles.grid}>
          {isLoading
            ? Array.from({ length: 8 }).map((_, i) => (
                <CategoryCardSkeleton key={i} />
              ))
            : error
              ? (
                <p className={styles.error}>Could not load categories</p>
              )
              : (categories as any[]).map((cat) => {
                  const imgSrc = cat.image
                    ? cat.image.startsWith('http')
                      ? cat.image
                      : `${ERPNEXT_URL}${cat.image}`
                    : null;

                  return (
                    <Link
                      key={cat.name}
                      href={`/products?category=${encodeURIComponent(cat.name)}`}
                      className={styles.catCard}
                    >
                      <div className={styles.catImgWrap}>
                        {imgSrc ? (
                          <Image
                            src={imgSrc}
                            alt={cat.name}
                            fill
                            sizes="120px"
                            className={styles.catImg}
                          />
                        ) : (
                          <div className={styles.catImgFallback}>
                            {cat.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <span className={styles.catName}>{cat.name}</span>
                    </Link>
                  );
                })}
        </div>
      </div>
    </section>
  );
}
