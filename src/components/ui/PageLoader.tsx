'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import logoImg from '@/assets/Eori Cart/eoricart-logo.png';
import styles from './PageLoader.module.css';

/* ─── Initial full-screen splash (first visit only) ─── */
function SplashLoader({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 1600);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div
      className={styles.splash}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.45 } }}
    >
      <div className={styles.splashBg} />

      <motion.div
        className={styles.splashContent}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.logoWrap}>
          <Image src={logoImg} alt="EoriCart" height={60} style={{ width: 'auto' }} priority />
        </div>

        {/* Animated dots loader */}
        <div className={styles.dotsRow}>
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className={styles.dot}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
            />
          ))}
        </div>

        <p className={styles.splashText}>Loading your store...</p>
      </motion.div>

      {/* Bottom progress bar */}
      <div className={styles.splashProgress}>
        <motion.div
          className={styles.splashProgressFill}
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 1.4, ease: 'easeInOut' }}
        />
      </div>
    </motion.div>
  );
}

/* ─── Top-bar route-change loader ─── */
function TopBarLoader({ active }: { active: boolean }) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className={styles.topBar}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.3, delay: 0.2 } }}
        >
          <motion.div
            className={styles.topBarFill}
            initial={{ width: '0%' }}
            animate={{ width: '85%' }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── Main export — rendered once in layout ─── */
export default function PageLoader() {
  const [showSplash, setShowSplash] = useState(true);
  const [routeLoading, setRouteLoading] = useState(false);
  const pathname = usePathname();
  const prevPath = useRef(pathname);

  useEffect(() => {
    if (prevPath.current !== pathname) {
      prevPath.current = pathname;
      setRouteLoading(true);
      const t = setTimeout(() => setRouteLoading(false), 700);
      return () => clearTimeout(t);
    }
  }, [pathname]);

  return (
    <>
      <AnimatePresence>
        {showSplash && (
          <SplashLoader key="splash" onDone={() => setShowSplash(false)} />
        )}
      </AnimatePresence>

      <TopBarLoader active={routeLoading} />
    </>
  );
}
