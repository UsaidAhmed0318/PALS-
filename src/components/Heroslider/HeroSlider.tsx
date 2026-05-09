'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
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
    badge: 'New Arrivals',
    heading: 'Smart Grocery\nShopping',
    sub: 'Fresh deals on groceries, essentials and household items delivered fast.',
    cta: 'Shop Now',
    ctaHref: '/products',
  },
  {
    id: 2,
    src: Banner2,
    alt: 'EoriCart — Best Prices in Pakistan',
    badge: 'Best Value',
    heading: 'Best Prices\nin Pakistan',
    sub: 'Sab Sasta Hai — daily savings on everything you need.',
    cta: 'Explore Deals',
    ctaHref: '/products',
  },
  {
    id: 3,
    src: Banner3,
    alt: 'Trusted by Homes, Delivered Daily',
    badge: 'Trusted Store',
    heading: 'Trusted by\nThousands of Homes',
    sub: 'Quality essentials from trusted brands, delivered right to your doorstep.',
    cta: 'Shop Groceries',
    ctaHref: '/products',
  },
];

const INTERVAL = 4500;

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((index: number) => {
    setCurrent(index);
  }, []);

  const goNext = useCallback(() => {
    setCurrent((c) => (c + 1) % SLIDES.length);
  }, []);

  const goPrev = useCallback(() => {
    setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(goNext, INTERVAL);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [goNext, paused]);

  return (
    <div
      className={styles.wrapper}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      role="region"
      aria-label="Hero banner"
      aria-roledescription="carousel"
    >
      {/* Slides */}
      <div className={styles.track}>
        {SLIDES.map((slide, i) => (
          <div
            key={slide.id}
            className={`${styles.slide} ${i === current ? styles.active : ''}`}
            aria-hidden={i !== current}
            aria-label={`Slide ${i + 1} of ${SLIDES.length}`}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              sizes="100vw"
              className={styles.slideImg}
              priority={i === 0}
            />
            <div className={styles.overlay} />

            <div className={styles.content}>
              <span className={styles.badge}>{slide.badge}</span>
              <h1 className={styles.heading}>
                {slide.heading.split('\n').map((line, j) => (
                  <span key={j}>{line}<br /></span>
                ))}
              </h1>
              <p className={styles.sub}>{slide.sub}</p>
              <Link href={slide.ctaHref} className={styles.cta}>
                {slide.cta}
              </Link>
            </div>
          </div>
        ))}
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
      <div className={styles.dots} role="tablist" aria-label="Slide navigation">
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
          key={current}
          className={`${styles.progress} ${paused ? '' : styles.progressActive}`}
          style={{ animationDuration: `${INTERVAL}ms` }}
        />
      </div>
    </div>
  );
}
