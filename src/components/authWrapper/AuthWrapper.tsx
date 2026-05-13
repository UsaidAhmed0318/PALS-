'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  TruckIcon,
  ShieldCheckIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
import logoImg from '@/assets/Eori Cart/eoricart-logo.png';
import styles from './authWrapper.module.css';

const FEATURES = [
  { icon: TruckIcon,       text: 'Fast delivery across Pakistan' },
  { icon: ShieldCheckIcon, text: '100% authentic, trusted products' },
  { icon: SparklesIcon,    text: 'Best prices — Sab Sasta Hai!' },
];

export default function AuthWrapper({
  mode,
  children,
}: {
  mode: 'login' | 'signup';
  children: React.ReactNode;
}) {
  return (
    <div className={styles.page}>
      {/* Brand panel */}
      <div className={styles.brandPanel}>
        <div className={styles.brandCircle} />
        <div className={styles.brandCircle} />

        <motion.div
          className={styles.brandContent}
          initial={{ opacity: 0, x: -32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <Link href="/" className={styles.brandLogo}>
            <Image src={logoImg} alt="EoriCart" height={52} style={{ width: 'auto' }} priority />
          </Link>

          <h1 className={styles.brandHeading}>
            Pakistan&apos;s Best<br />
            <span>Grocery Store</span>
          </h1>
          <p className={styles.brandSub}>
            Shop fresh groceries, household essentials and daily items at the
            best prices with fast delivery.
          </p>

          <div className={styles.brandFeatures}>
            {FEATURES.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.text}
                  className={styles.brandFeature}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
                >
                  <span className={styles.brandFeatureIcon}>
                    <Icon />
                  </span>
                  {f.text}
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <div className={styles.brandBottom}>
          <div className={styles.brandStat}>
            <span className={styles.brandStatNum}>10K+</span>
            <span className={styles.brandStatLabel}>Customers</span>
          </div>
          <div className={styles.brandStatDivider} />
          <div className={styles.brandStat}>
            <span className={styles.brandStatNum}>500+</span>
            <span className={styles.brandStatLabel}>Products</span>
          </div>
          <div className={styles.brandStatDivider} />
          <div className={styles.brandStat}>
            <span className={styles.brandStatNum}>5★</span>
            <span className={styles.brandStatLabel}>Rating</span>
          </div>
        </div>
      </div>

      {/* Form panel */}
      <div className={styles.formPanel}>
        <motion.div
          className={styles.formBox}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          {/* Shown on mobile only (brand panel is hidden) */}
          <div className={styles.formLogo}>
            <Link href="/">
              <Image src={logoImg} alt="EoriCart" height={44} style={{ width: 'auto' }} priority />
            </Link>
          </div>

          {children}
        </motion.div>
      </div>
    </div>
  );
}
