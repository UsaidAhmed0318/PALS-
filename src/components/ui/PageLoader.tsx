'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
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
      exit={{ opacity: 0, transition: { duration: 0.4 } }}
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

/* ─── Page-change overlay loader ─── */
function RouteLoader({ active }: { active: boolean }) {
  return (
    <AnimatePresence>
      {active && (
        <>
          {/* Top progress bar */}
          <motion.div
            key="topbar"
            className={styles.topBar}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3, delay: 0.15 } }}
          >
            <motion.div
              className={styles.topBarFill}
              initial={{ width: '0%' }}
              animate={{ width: '92%' }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
            />
          </motion.div>

          {/* Center spinner overlay */}
          <motion.div
            key="overlay"
            className={styles.routeOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.25 } }}
            transition={{ duration: 0.15 }}
          >
            <motion.div
              className={styles.spinnerWrap}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <div className={styles.spinner} />
              <div className={styles.spinnerLogo}>
                <Image src={logoImg} alt="EoriCart" height={32} style={{ width: 'auto' }} />
              </div>
            </motion.div>
          </motion.div>
        </>
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
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleDone = useCallback(() => setShowSplash(false), []);

  useEffect(() => {
    if (prevPath.current !== pathname) {
      prevPath.current = pathname;
      setRouteLoading(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setRouteLoading(false), 650);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [pathname]);

  return (
    <>
      <AnimatePresence>
        {showSplash && <SplashLoader key="splash" onDone={handleDone} />}
      </AnimatePresence>
      <RouteLoader active={routeLoading} />
    </>
  );
}
