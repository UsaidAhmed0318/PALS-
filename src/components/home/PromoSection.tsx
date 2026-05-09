import Link from 'next/link';
import {
  TruckIcon,
  ShieldCheckIcon,
  CurrencyDollarIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline';
import styles from './PromoSection.module.css';

const FEATURES = [
  {
    icon: TruckIcon,
    title: 'Fast Delivery',
    desc: 'Quick doorstep delivery across Pakistan',
  },
  {
    icon: ShieldCheckIcon,
    title: 'Secure Shopping',
    desc: '100% safe payments and trusted ordering',
  },
  {
    icon: CurrencyDollarIcon,
    title: 'Best Prices',
    desc: 'Daily savings on essential groceries',
  },
  {
    icon: PhoneIcon,
    title: '24/7 Support',
    desc: 'Always here to help you shop better',
  },
];

export default function PromoSection() {
  return (
    <>
      {/* Feature bar */}
      <section className={styles.featureBar} aria-label="Our promises">
        <div className={styles.featureContainer}>
          {FEATURES.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.title} className={styles.feature}>
                <div className={styles.featureIconWrap}>
                  <Icon className={styles.featureIcon} />
                </div>
                <div className={styles.featureText}>
                  <strong>{f.title}</strong>
                  <span>{f.desc}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Banner CTA */}
      <section className={styles.promoBanner} aria-label="Promotional offer">
        <div className={styles.promoContent}>
          <span className={styles.promoEyebrow}>Limited Time Offer</span>
          <h2 className={styles.promoHeading}>
            Get <span>15% Off</span> Your First Order
          </h2>
          <p className={styles.promoDesc}>
            Use code <strong>WELCOME15</strong> at checkout. Fresh deals on groceries,
            essentials and household items delivered to your door.
          </p>
          <Link href="/products" className={styles.promoBtn}>
            Shop Now
          </Link>
        </div>
        <div className={styles.promoBg} aria-hidden="true" />
      </section>
    </>
  );
}
