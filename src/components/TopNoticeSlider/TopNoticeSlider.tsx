'use client';

import { useEffect, useRef, useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import eoriCartLogo from '@/assets/Eori Cart/eoricart-logo.png';
import styles from './TopNoticeSlider.module.css';

type Slide = {
  id: number;
  text: string;
  progress: string;
};

type TopNoticeSliderProps = {
  slides?: Slide[];
  variant?: 'light' | 'dark';
  showLogo?: boolean;
  logoSrc?: StaticImageData;
  className?: string;
};

const defaultSlides: Slide[] = [
  {
    id: 1,
    text: 'You are Rs. 2330 away from free delivery',
    progress: '100%',
  },
  {
    id: 2,
    text: 'Daily essentials delivered fast across your area',
    progress: '100%',
  },
  {
    id: 3,
    text: 'Fresh deals are live now on EoriCart',
    progress: '100%',
  },
];

const INTERVAL = 3200;

export default function TopNoticeSlider({
  slides = defaultSlides,
  variant = 'light',
  showLogo = false,
  logoSrc = eoriCartLogo,
  className = '',
}: TopNoticeSliderProps) {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrent((value) => (value + 1) % slides.length);
    }, INTERVAL);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [slides.length, current]);

  return (
    <section
      className={`${styles.noticeStrip} ${variant === 'dark' ? styles.noticeStripDark : ''} ${className}`.trim()}>
      <div
        className={`${styles.inner} ${variant === 'dark' ? styles.innerDark : ''}`}>
        {showLogo ? (
          <span className={styles.logoWrap}>
            <Image src={logoSrc} alt="EoriCart" className={styles.logo} />
          </span>
        ) : null}

        <div className={styles.viewport}>
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`${styles.slide} ${index === current ? styles.slideActive : ''}`}>
              <p className={variant === 'dark' ? styles.textDark : ''}>
                {slide.text}
              </p>
              <div
                className={`${styles.track} ${variant === 'dark' ? styles.trackDark : ''}`}>
                <span
                  className={`${styles.progress} ${variant === 'dark' ? styles.progressDark : ''}`}
                  style={{ width: slide.progress }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
