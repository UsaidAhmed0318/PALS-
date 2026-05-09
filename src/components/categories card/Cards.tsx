import styles from './Cards.module.css';
import { useCategories } from '@/lib/hooks/useCategories';

// Placeholder for categories that don't have an image in ERPNext yet
import DefaultPlaceholder from '../../assets/Eori Cart/categories card img/Baby Care.avif';
import Image from 'next/image';
import NavLink from '../NavLink/Navlink';

// const categories = [
//   {
//     id: 1,
//     name: 'Baby Care',
//     image: BabyCareImage,
//     href: '/babycare',
//   },
// ];

export default function Cards() {
  const { data, isLoading, error } = useCategories();

  const ERPNEXT_URL = process.env.NEXT_PUBLIC_ERPNEXT_URL || '';

  if (isLoading) return <div className={styles.loading}>Loading...</div>;
  if (error)
    return <div className={styles.error}>Failed to load categories</div>;

  const categories = data?.data || [];

  // Note: If using ERPNext local paths, prefix with your VPS URL

  return (
    <section className={styles.section}>
      <h1 className={styles.heading}>Categories</h1>
      <div className={styles.cardsWrapper}>
        {categories.map((category: any) => {
          const categoryHref = `/products/${encodeURIComponent(category.name)}`;
          const imageSrc = category.image
            ? `${ERPNEXT_URL}${category.image}`
            : DefaultPlaceholder;
          return (
            <NavLink
              key={category.name}
              href={categoryHref}
              className={styles.cardLink}>
              <article className={styles.card}>
                <div className={styles.imageWrapper}>
                  <Image
                    src={imageSrc}
                    alt={category.name}
                    width={100}
                    height={100}
                    style={{ objectFit: 'contain' }}
                  />
                </div>
                <p className={styles.cardName}>{category.name}</p>
              </article>
            </NavLink>
          );
        })}
      </div>
    </section>
  );
}
