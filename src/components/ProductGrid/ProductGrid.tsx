'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useProducts } from '@/lib/hooks/useProducts';
import styles from './ProductGrid.module.css';

export function ProductGrid() {
  const { data, isLoading, error } = useProducts();

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner} />
        <p>Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.error}>
        <p>Failed to load products</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  const products = data?.data || [];

  return (
    <div className={styles.grid}>
      {products.map((product) => (
        <Link
          key={product.name}
          href={`/products/${product.item_code}`}
          className={styles.card}
        >
          <div className={styles.imageContainer}>
            {product.image ? (
              <Image
                src={product.image || ''}
                alt={product.item_name}
                className={styles.image}
              />
            ) : (
              <div className={styles.placeholder}>No Image</div>
            )}
          </div>
          
          <div className={styles.content}>
            <h3 className={styles.title}>{product.item_name}</h3>
            <p className={styles.code}>{product.item_code}</p>
            
            {product.description && (
              <p className={styles.description}>
                {product.description.substring(0, 100)}
                {product.description.length > 100 ? '...' : ''}
              </p>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}