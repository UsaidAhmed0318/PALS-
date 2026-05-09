"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import sugar from "../../assets/Eori Cart/add to cart imgs/sugar.avif";
import styles from "./BabyCare.module.css";
import ItemDropdown from "./ItemDropdown";
import ProductCard from "./ProductCard";

const subcategories = ["Baby Food", "Diapers & Essentials"];
const items = ["BabyCare"];

const products = [
  {
    id: 1,
    name: "Bazaar Select Sugar 1kg",
    image: sugar,
    price: 170,
    originalPrice: 200,
    badge: "15% off",
    tab: "Baby Food",
    brand: "BabyCare",
  },
];

export default function BabyCare() {
  const [activeTab, setActiveTab] = useState("All");
  const [showItems, setShowItems] = useState(false);
  const [activeItem, setActiveItem] = useState("");
  const cardsRef = useRef<HTMLDivElement | null>(null);

  const visibleProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesTab = activeTab === "All" || product.tab === activeTab;
      const matchesItem = !activeItem || product.brand === activeItem;
      return matchesTab && matchesItem;
    });
  }, [activeTab, activeItem]);

  useEffect(() => {
    if (cardsRef.current) {
      cardsRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [visibleProducts]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.breadcrumb}>
        <Link href="/">Home</Link>
        <span>&gt;</span>
        <Link href="/">All categories</Link>
        <span>&gt;</span>
        <span className={styles.breadcrumbActive}>Baby Care</span>
      </div>

      <h1 className={styles.title}>Baby Care</h1>

      <div className={styles.filterBar}>
        <ItemDropdown
          activeItem={activeItem}
          isOpen={showItems}
          items={items}
          showItemIcons={false}
          triggerLabel="Items"
          onSelectItem={(item) => {
            setActiveItem((currentItem) => (currentItem === item ? "" : item));
            setShowItems(false);
          }}
          onToggle={() => setShowItems(!showItems)}
        />

        <div className={styles.divider} />

        <button
          type="button"
          className={`${styles.allBtn} ${activeTab === "All" ? styles.allBtnActive : ""}`}
          onClick={() => setActiveTab("All")}
        >
          All
        </button>

        <div className={styles.tabsTrack}>
          {subcategories.map((tab) => (
            <button
              type="button"
              key={tab}
              className={`${styles.tabBtn} ${activeTab === tab ? styles.tabBtnActive : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div ref={cardsRef} className={styles.gridArea}>
        {visibleProducts.length === 0 ? (
          <p className={styles.emptyMsg}>No products to display yet.</p>
        ) : (
          <div className={styles.productsSection}>
            {visibleProducts.map((product) => (
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
          </div>
        )}
      </div>
    </div>
  );
}
