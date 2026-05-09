import styles from './Skeleton.module.css';

interface SkeletonProps {
  width?: string;
  height?: string;
  borderRadius?: string;
  className?: string;
}

export function Skeleton({
  width = '100%',
  height = '16px',
  borderRadius = '6px',
  className = '',
}: SkeletonProps) {
  return (
    <span
      className={`${styles.skeleton} ${className}`}
      style={{ width, height, borderRadius }}
      aria-hidden="true"
    />
  );
}

export function ProductCardSkeleton() {
  return (
    <div className={styles.cardSkeleton}>
      <div className={styles.imgSkeleton} />
      <div className={styles.bodySkeleton}>
        <Skeleton height="14px" width="80%" />
        <Skeleton height="12px" width="55%" />
        <Skeleton height="18px" width="40%" />
        <Skeleton height="34px" borderRadius="8px" />
      </div>
    </div>
  );
}

export function CategoryCardSkeleton() {
  return (
    <div className={styles.catCardSkeleton}>
      <div className={styles.catImgSkeleton} />
      <Skeleton height="13px" width="70%" />
    </div>
  );
}
