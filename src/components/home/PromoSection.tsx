'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  TruckIcon,
  ShieldCheckIcon,
  CurrencyDollarIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline';
import styles from './PromoSection.module.css';

const FEATURES = [
  { icon: TruckIcon,         title: 'Fast Delivery',   desc: 'Quick doorstep delivery across Pakistan' },
  { icon: ShieldCheckIcon,   title: 'Secure Shopping', desc: '100% safe payments and trusted ordering' },
  { icon: CurrencyDollarIcon, title: 'Best Prices',    desc: 'Daily savings on essential groceries' },
  { icon: PhoneIcon,         title: '24/7 Support',    desc: 'Always here to help you shop better' },
];

export default function PromoSection() {
  return (
    <>
      {/* Feature bar */}
      <section className={styles.featureBar} aria-label="Our promises">
        <div className={styles.featureContainer}>
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                className={styles.feature}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
              >
                <div className={styles.featureIconWrap}>
                  <Icon className={styles.featureIcon} />
                </div>
                <div className={styles.featureText}>
                  <strong>{f.title}</strong>
                  <span>{f.desc}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Banner CTA */}
      <section className={styles.promoBanner} aria-label="Promotional offer">
        <div className={styles.promoBg} aria-hidden="true" />
        <motion.div
          className={styles.promoContent}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className={styles.promoEyebrow}>Limited Time Offer</span>
          <h2 className={styles.promoHeading}>
            Get <span>15% Off</span> Your First Order
          </h2>
          <p className={styles.promoDesc}>
            Use code <strong>WELCOME15</strong> at checkout. Fresh deals on groceries,
            essentials and household items delivered to your door.
          </p>
          <div className={styles.promoBtns}>
            <Link href="/products" className={styles.promoBtn}>
              Shop Now
            </Link>
            <Link href="/faqs" className={styles.promoBtnOutline}>
              Learn More
            </Link>
          </div>
        </motion.div>
      </section>
    </>
  );
}
