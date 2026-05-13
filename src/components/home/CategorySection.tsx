'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useCategories } from '@/lib/hooks/useCategories';
import { CategoryCardSkeleton } from '@/components/ui/Skeleton';
import styles from './CategorySection.module.css';

const ERPNEXT_URL = process.env.NEXT_PUBLIC_ERPNEXT_URL || '';

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.055 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 22, scale: 0.94 },
  show:  { opacity: 1, y: 0,  scale: 1, transition: { duration: 0.38, ease: 'easeOut' } },
};

export default function CategorySection() {
  const { data, isLoading, error } = useCategories();
  const categories = data?.data || [];

  return (
    <section className={styles.section} aria-labelledby="categories-heading">
      <div className={styles.container}>
        <motion.div
          className={styles.sectionHead}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          <div className={styles.headingGroup}>
            <span className={styles.eyebrow}>Shop by Category</span>
            <h2 id="categories-heading" className={styles.heading}>
              Browse Categories
            </h2>
          </div>
          <Link href="/products" className={styles.viewAll}>
            View All
          </Link>
        </motion.div>

        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {isLoading
            ? Array.from({ length: 8 }).map((_, i) => (
                <CategoryCardSkeleton key={i} />
              ))
            : error
              ? <p className={styles.error}>Could not load categories</p>
              : (categories as any[]).map((cat) => {
                  const imgSrc = cat.image
                    ? cat.image.startsWith('http')
                      ? cat.image
                      : `${ERPNEXT_URL}${cat.image}`
                    : null;

                  return (
                    <motion.div key={cat.name} variants={itemVariants}>
                      <Link
                        href={`/products?category=${encodeURIComponent(cat.name)}`}
                        className={styles.catCard}
                      >
                        <div className={styles.catImgWrap}>
                          {imgSrc ? (
                            <Image
                              src={imgSrc}
                              alt={cat.name}
                              fill
                              sizes="96px"
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
                    </motion.div>
                  );
                })}
        </motion.div>
      </div>
    </section>
  );
}
