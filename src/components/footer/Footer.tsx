'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import {
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
} from '@heroicons/react/24/outline';
import { useCategories } from '@/lib/hooks/useCategories';
import logoImg from '@/assets/Eori Cart/eoricart-logo.png';
import styles from './Footer.module.css';

const QUICK_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'All Products', href: '/products' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'About Us', href: '/aboutus' },
  { label: 'Privacy Policy', href: '/privacypolicy' },
  { label: 'Terms & Conditions', href: '/terms' },
  { label: 'FAQs', href: '/faqs' },
];

export default function Footer() {
  const { data: catData } = useCategories();
  const categories = (catData?.data || []).slice(0, 8);

  const [email, setEmail] = useState('');
  const [subDone, setSubDone] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setSubDone(true);
    setEmail('');
  };

  return (
    <footer className={styles.footer}>
      {/* Top notice marquee */}
      <div className={styles.marqueeBar} aria-hidden="true">
        <div className={styles.marqueeTrack}>
          {[1, 2].map((rep) => (
            <span key={rep} className={styles.marqueeContent}>
              <span>Sab Sasta Hai!</span>
              <span className={styles.sep}>·</span>
              <span>Fast Delivery Across Pakistan</span>
              <span className={styles.sep}>·</span>
              <span>Cash on Delivery Available</span>
              <span className={styles.sep}>·</span>
              <span>100% Authentic Products</span>
              <span className={styles.sep}>·</span>
              <span>Fresh Deals Every Day</span>
              <span className={styles.sep}>·</span>
            </span>
          ))}
        </div>
      </div>

      <div className={styles.main}>
        <div className={styles.grid}>
          {/* Brand column */}
          <div className={styles.brand}>
            <Link href="/">
              <Image
                src={logoImg}
                alt="EoriCart"
                height={48}
                style={{ width: 'auto' }}
              />
            </Link>
            <p className={styles.tagline}>
              Pakistan&apos;s trusted grocery store. Fresh deals on essentials,
              delivered fast to your door.
            </p>
            <div className={styles.contact}>
              <a href="tel:+92300000000" className={styles.contactItem}>
                <PhoneIcon className={styles.contactIcon} />
                <span>+92 300 0000 000</span>
              </a>
              <a href="mailto:support@eoricart.com" className={styles.contactItem}>
                <EnvelopeIcon className={styles.contactIcon} />
                <span>support@eoricart.com</span>
              </a>
              <div className={styles.contactItem}>
                <MapPinIcon className={styles.contactIcon} />
                <span>Pakistan</span>
              </div>
            </div>
          </div>

          {/* Quick links */}
          <div className={styles.col}>
            <h3 className={styles.colTitle}>Quick Links</h3>
            <ul className={styles.linkList}>
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={styles.footerLink}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className={styles.col}>
            <h3 className={styles.colTitle}>Categories</h3>
            <ul className={styles.linkList}>
              {(categories as any[]).length > 0 ? (
                (categories as any[]).map((cat) => (
                  <li key={cat.name}>
                    <Link
                      href={`/products?category=${encodeURIComponent(cat.name)}`}
                      className={styles.footerLink}
                    >
                      {cat.name}
                    </Link>
                  </li>
                ))
              ) : (
                <li>
                  <Link href="/products" className={styles.footerLink}>
                    All Products
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {/* Newsletter */}
          <div className={styles.col}>
            <h3 className={styles.colTitle}>Newsletter</h3>
            <p className={styles.newsDesc}>
              Get exclusive deals, new arrivals and savings delivered to your
              inbox.
            </p>
            {subDone ? (
              <p className={styles.subSuccess}>
                Thanks for subscribing!
              </p>
            ) : (
              <form className={styles.newsForm} onSubmit={handleSubscribe}>
                <input
                  type="email"
                  placeholder="Your email address"
                  className={styles.newsInput}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className={styles.newsBtn}>
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className={styles.bottom}>
        <div className={styles.bottomInner}>
          <span className={styles.copy}>
            &copy; {new Date().getFullYear()} EoriCart. All rights reserved.
          </span>
          <div className={styles.bottomLinks}>
            <Link href="/privacypolicy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/faqs">FAQs</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
