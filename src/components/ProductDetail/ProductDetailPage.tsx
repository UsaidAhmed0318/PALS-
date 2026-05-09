"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CheckCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ShieldCheckIcon,
  ShoppingBagIcon,
  SparklesIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";
import { addCartItem } from "@/lib/cart-storage";
import { featuredProduct } from "@/data/featuredProduct";
import styles from "./ProductDetailPage.module.css";

export default function ProductDetailPage() {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const activeImage = featuredProduct.gallery[activeImageIndex];

  const showPrevImage = () => {
    setActiveImageIndex((current) =>
      current === 0 ? featuredProduct.gallery.length - 1 : current - 1,
    );
  };

  const showNextImage = () => {
    setActiveImageIndex((current) =>
      current === featuredProduct.gallery.length - 1 ? 0 : current + 1,
    );
  };

  const handleAddToCart = () => {
    addCartItem({
      id: String(featuredProduct.id),
      name: featuredProduct.name,
      price: featuredProduct.price,
      originalPrice: featuredProduct.originalPrice,
      qty: quantity,
      badge: featuredProduct.badge,
    });

    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  };

  return (
    <section className={styles.page}>
      <div className={styles.container}>
        <div className={styles.breadcrumb}>
          <Link href="/">Home</Link>
          <ChevronRightIcon className={styles.breadcrumbIcon} />
          <Link href="/babycare">Baby Care</Link>
          <ChevronRightIcon className={styles.breadcrumbIcon} />
          <span>{featuredProduct.name}</span>
        </div>

        <div className={styles.hero}>
          <div className={styles.galleryCard}>
            <span className={styles.badge}>{featuredProduct.badge}</span>
            <div className={styles.imagePanel}>
              <button
                type="button"
                className={`${styles.galleryArrow} ${styles.galleryArrowLeft}`}
                onClick={showPrevImage}
                aria-label="Previous image"
              >
                <ChevronLeftIcon className={styles.galleryArrowIcon} />
              </button>

              <Image
                src={activeImage}
                alt={featuredProduct.name}
                width={420}
                height={420}
                className={styles.productImage}
                priority
                quality={100}
                sizes="(max-width: 640px) 80vw, (max-width: 980px) 60vw, 420px"
              />

              <button
                type="button"
                className={`${styles.galleryArrow} ${styles.galleryArrowRight}`}
                onClick={showNextImage}
                aria-label="Next image"
              >
                <ChevronRightIcon className={styles.galleryArrowIcon} />
              </button>
            </div>

            <div className={styles.thumbnailRow}>
              {featuredProduct.gallery.map((image, index) => (
                <button
                  key={`${featuredProduct.slug}-${index}`}
                  type="button"
                  className={`${styles.thumbnailButton} ${activeImageIndex === index ? styles.thumbnailButtonActive : ""}`}
                  onClick={() => setActiveImageIndex(index)}
                  aria-label={`View product image ${index + 1}`}
                >
                  <Image
                    src={image}
                    alt={`${featuredProduct.name} ${index + 1}`}
                    width={64}
                    height={64}
                    className={styles.thumbnailImage}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className={styles.details}>
            <span className={styles.categoryPill}>{featuredProduct.category}</span>
            <h1 className={styles.title}>{featuredProduct.name}</h1>
            <p className={styles.shortDescription}>
              {featuredProduct.shortDescription}
            </p>

            <div className={styles.priceRow}>
              <strong className={styles.price}>Rs. {featuredProduct.price}</strong>
              <span className={styles.originalPrice}>
                Rs. {featuredProduct.originalPrice}
              </span>
            </div>

            <div className={styles.metaRow}>
              <span className={styles.metaChip}>
                <TruckIcon className={styles.metaIcon} />
                Fast delivery available
              </span>
              <span className={styles.metaChip}>
                <ShieldCheckIcon className={styles.metaIcon} />
                Trusted daily quality
              </span>
            </div>

            <p className={styles.longDescription}>
              {featuredProduct.longDescription}
            </p>

            <div className={styles.highlights}>
              {featuredProduct.highlights.map((item) => (
                <div key={item} className={styles.highlightItem}>
                  <CheckCircleIcon className={styles.highlightIcon} />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className={styles.actions}>
              <div className={styles.quantityControl}>
                <button
                  type="button"
                  onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                >
                  -
                </button>
                <span>{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((current) => current + 1)}
                >
                  +
                </button>
              </div>

              <button
                type="button"
                className={`${styles.primaryBtn} ${added ? styles.addedBtn : ""}`}
                onClick={handleAddToCart}
              >
                <ShoppingBagIcon className={styles.buttonIcon} />
                {added ? "Added to Cart" : "Add to Cart"}
              </button>
            </div>
          </div>
        </div>

        <div className={styles.infoGrid}>
          <div className={styles.descriptionCard}>
            <div className={styles.sectionHeading}>
              <SparklesIcon className={styles.sectionIcon} />
              <h2>Product Overview</h2>
            </div>
            <p>
              This product detail page is designed to keep things simple, clear and
              useful for customers. You can quickly review pricing, quantity,
              product details and add the item to your cart without distraction.
            </p>
          </div>

          <div className={styles.whyCard}>
            <div className={styles.sectionHeading}>
              <ShieldCheckIcon className={styles.sectionIcon} />
              <h2>Why shop with EoriCart?</h2>
            </div>

            <div className={styles.benefitList}>
              {featuredProduct.benefits.map((benefit) => (
                <div key={benefit.title} className={styles.benefitItem}>
                  <span className={styles.benefitDot} />
                  <div>
                    <h3>{benefit.title}</h3>
                    <p>{benefit.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
