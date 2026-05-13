'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import Banner1 from '../../assets/Eori Cart/hero slider imgs/Banner_1.png';
import Banner2 from '../../assets/Eori Cart/hero slider imgs/Banner_2.png';
import Banner3 from '../../assets/Eori Cart/hero slider imgs/Banner_3.png';
import styles from './HeroSlider.module.css';

const SLIDES = [
  {
    id: 1,
    src: Banner1,
    alt: 'Smart Grocery Shopping Delivered to Your Door',
    badge: '🛒 New Arrivals',
    heading: ['Smart Grocery', 'Shopping'],
    sub: 'Fresh deals on groceries, essentials and household items — delivered fast to your door.',
    cta: 'Shop Now',
    ctaHref: '/products',
    accent: '#9fbb32',
  },
  {
    id: 2,
    src: Banner2,
    alt: 'EoriCart — Best Prices in Pakistan',
    badge: '💰 Best Value',
    heading: ['Best Prices', 'in Pakistan'],
    sub: 'Sab Sasta Hai — daily savings on everything you and your family needs.',
    cta: 'Explore Deals',
    ctaHref: '/products',
    accent: '#f0c32d',
  },
  {
    id: 3,
    src: Banner3,
    alt: 'Trusted by Homes, Delivered Daily',
    badge: '⭐ Trusted Store',
    heading: ['Trusted by', 'Thousands of Homes'],
    sub: 'Quality essentials from trusted brands, delivered right to your doorstep.',
    cta: 'Shop Groceries',
    ctaHref: '/products',
    accent: '#0390e0',
  },
];

const INTERVAL = 5000;

const contentVariants = {
  enter:  { opacity: 0, y: 30, filter: 'blur(4px)' },
  center: { opacity: 1, y: 0,  filter: 'blur(0px)', transition: { duration: 0.55, ease: 'easeOut' } },
  exit:   { opacity: 0, y: -20, filter: 'blur(2px)', transition: { duration: 0.3 } },
};

const badgeVariants = {
  enter:  { opacity: 0, x: -20 },
  center: { opacity: 1, x: 0, transition: { delay: 0.05, duration: 0.4 } },
  exit:   { opacity: 0, x: -10, transition: { duration: 0.2 } },
};

const h1Variants = {
  enter:  { opacity: 0, y: 28 },
  center: { opacity: 1, y: 0, transition: { delay: 0.12, duration: 0.5, ease: 'easeOut' } },
  exit:   { opacity: 0, y: -18, transition: { duration: 0.25 } },
};

const subVariants = {
  enter:  { opacity: 0, y: 20 },
  center: { opacity: 1, y: 0, transition: { delay: 0.22, duration: 0.45 } },
  exit:   { opacity: 0, transition: { duration: 0.2 } },
};

const ctaVariants = {
  enter:  { opacity: 0, scale: 0.88 },
  center: { opacity: 1, scale: 1, transition: { delay: 0.32, duration: 0.4, type: 'spring', stiffness: 200 } },
  exit:   { opacity: 0, scale: 0.92, transition: { duration: 0.18 } },
};

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((index: number) => setCurrent(index), []);

  const goNext = useCallback(() =>
    setCurrent((c) => (c + 1) % SLIDES.length), []);

  const goPrev = useCallback(() =>
    setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length), []);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(goNext, INTERVAL);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [goNext, paused]);

  const slide = SLIDES[current];

  return (
    <div
      className={styles.wrapper}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      role="region"
      aria-label="Hero banner"
      aria-roledescription="carousel"
    >
      {/* Background images (cross-fade) */}
      <div className={styles.track}>
        {SLIDES.map((s, i) => (
          <div
            key={s.id}
            className={`${styles.slide} ${i === current ? styles.active : ''}`}
            aria-hidden={i !== current}
          >
            <Image
              src={s.src}
              alt={s.alt}
              fill
              sizes="100vw"
              className={styles.slideImg}
              priority={i === 0}
            />
          </div>
        ))}

        {/* Gradient overlay */}
        <div className={styles.overlay} />

        {/* Animated content */}
        <div className={styles.contentWrap}>
          <div className={styles.contentInner}>
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                className={styles.content}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <motion.span className={styles.badge} variants={badgeVariants}>
                  {slide.badge}
                </motion.span>

                <motion.h1 className={styles.heading} variants={h1Variants}>
                  {slide.heading.map((line, i) => (
                    <span key={i}>
                      {i === 1 ? (
                        <em style={{ color: slide.accent, fontStyle: 'normal' }}>{line}</em>
                      ) : line}
                      {i < slide.heading.length - 1 && <br />}
                    </span>
                  ))}
                </motion.h1>

                <motion.p className={styles.sub} variants={subVariants}>
                  {slide.sub}
                </motion.p>

                <motion.div className={styles.ctaRow} variants={ctaVariants}>
                  <Link href={slide.ctaHref} className={styles.cta}>
                    {slide.cta}
                  </Link>
                  <Link href="/products" className={styles.ctaOutline}>
                    All Products
                  </Link>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Slide counter */}
          <div className={styles.counter}>
            <span className={styles.counterCurrent}>
              {String(current + 1).padStart(2, '0')}
            </span>
            <span className={styles.counterSep} />
            <span className={styles.counterTotal}>
              {String(SLIDES.length).padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>

      {/* Arrows */}
      <button
        className={`${styles.arrow} ${styles.arrowLeft}`}
        onClick={goPrev}
        aria-label="Previous slide"
      >
        <ChevronLeftIcon className={styles.arrowIcon} />
      </button>
      <button
        className={`${styles.arrow} ${styles.arrowRight}`}
        onClick={goNext}
        aria-label="Next slide"
      >
        <ChevronRightIcon className={styles.arrowIcon} />
      </button>

      {/* Dots */}
      <div className={styles.dotsWrap} role="tablist" aria-label="Slide navigation">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
            onClick={() => goTo(i)}
            role="tab"
            aria-selected={i === current}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div className={styles.progressBar}>
        <div
          key={`${current}-${paused}`}
          className={`${styles.progress} ${paused ? '' : styles.progressActive}`}
          style={{ animationDuration: `${INTERVAL}ms` }}
        />
      </div>
    </div>
  );
}
