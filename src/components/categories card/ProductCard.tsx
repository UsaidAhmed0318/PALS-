"use client";

import { useState } from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import styles from "./ProductCard.module.css";
import { addCartItem } from "@/lib/cart-storage";

type ProductCardProps = {
  badge: string;
  image: StaticImageData;
  productHref?: string;
  productId: number | string;
  name: string;
  originalPrice: number;
  price: number;
};

export default function ProductCard({
  badge,
  image,
  productHref,
  productId,
  name,
  originalPrice,
  price,
}: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const decreaseQuantity = () => {
    setQuantity((currentQuantity) => Math.max(1, currentQuantity - 1));
  };

  const increaseQuantity = () => {
    setQuantity((currentQuantity) => currentQuantity + 1);
  };

  const handleAddToCart = () => {
    addCartItem({
      id: String(productId),
      name,
      price,
      originalPrice,
      qty: quantity,
      badge,
    });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  };

  return (
    <article className={styles.card}>
      {productHref ? (
        <Link href={productHref} className={styles.cardLink}>
          <div className={styles.imageWrapper}>
            <span className={styles.badge}>{badge}</span>
            <Image
              src={image}
              alt={name}
              width={120}
              height={120}
              style={{ objectFit: "contain" }}
            />
          </div>

          <p className={styles.name}>{name}</p>

          <p className={styles.price}>
            Rs. {price}
            <span>Rs. {originalPrice}</span>
          </p>
        </Link>
      ) : (
        <>
          <div className={styles.imageWrapper}>
            <span className={styles.badge}>{badge}</span>
            <Image
              src={image}
              alt={name}
              width={120}
              height={120}
              style={{ objectFit: "contain" }}
            />
          </div>

          <p className={styles.name}>{name}</p>

          <p className={styles.price}>
            Rs. {price}
            <span>Rs. {originalPrice}</span>
          </p>
        </>
      )}

      <div className={styles.actions}>
        <div className={styles.quantity}>
          <button type="button" onClick={decreaseQuantity}>
            -
          </button>
          <span>{quantity}</span>
          <button type="button" onClick={increaseQuantity}>
            +
          </button>
        </div>
        <button
          type="button"
          className={`${styles.addBtn} ${added ? styles.addedBtn : ""}`}
          onClick={handleAddToCart}
        >
          {added ? "Added" : "Add"}
        </button>
      </div>
    </article>
  );
}
