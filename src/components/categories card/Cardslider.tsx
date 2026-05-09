import styles from "./Cardslider.module.css";
import sugar from "../../assets/Eori Cart/add to cart imgs/sugar.avif";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import ProductCard from "./ProductCard";

const products = [
  {
    id: 1,
    name: "Bazaar Select Sugar 1kg",
    image: sugar,
    price: 170,
    originalPrice: 200,
    badge: "15% off",
  },
];

export default function CardSlider() {
  return (
    <section className={styles.section}>
      {/* Heading */}
      <div className={styles.headingRow}>
        {/* <h2 className={styles.heading}>Best Items</h2>
        <Link href="/view-more" className={styles.viewMore}>
          View More
        </Link> */}
      </div>

      {/* Left Arrow */}
      <button
        className={`${styles.arrow} ${styles.left}`}
        aria-label="Previous"
      >
        <ChevronLeftIcon className={styles.icon} />
      </button>

      {products.map((product) => (
        <ProductCard
          key={product.id}
          badge={product.badge}
          image={product.image}
          name={product.name}
          originalPrice={product.originalPrice}
          price={product.price}
          productHref="/products/bazaar-select-sugar-1kg"
          productId={product.id}
        />
      ))}

      {/* Right Arrow */}
      <button className={`${styles.arrow} ${styles.right}`} aria-label="Next">
        <ChevronRightIcon className={styles.icon} />
      </button>
    </section>
  );
}
