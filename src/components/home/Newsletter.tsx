'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  EnvelopeIcon,
  CheckCircleIcon,
  BoltIcon,
  TagIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
import styles from './Newsletter.module.css';

const PERKS = [
  { icon: BoltIcon,     text: 'Exclusive flash deals' },
  { icon: TagIcon,      text: 'Weekly promo codes' },
  { icon: SparklesIcon, text: 'New product alerts' },
];

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus('loading');
    await new Promise((r) => setTimeout(r, 900));
    setStatus('success');
    setEmail('');
  };

  return (
    <section className={styles.section} aria-labelledby="newsletter-heading">
      <div className={styles.container}>
        <motion.div
          className={styles.inner}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Text side */}
          <div className={styles.textSide}>
            <div className={styles.iconWrap}>
              <EnvelopeIcon className={styles.icon} />
            </div>
            <div>
              <p className={styles.eyebrow}>Newsletter</p>
              <h2 id="newsletter-heading" className={styles.heading}>
                Stay in the Loop
              </h2>
              <p className={styles.desc}>
                Get exclusive deals, new arrivals and grocery savings delivered
                straight to your inbox. No spam, ever.
              </p>
              <div className={styles.perks}>
                {PERKS.map((p) => {
                  const Icon = p.icon;
                  return (
                    <span key={p.text} className={styles.perk}>
                      <Icon className={styles.perkIcon} />
                      {p.text}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Form side */}
          <div className={styles.formSide}>
            {status === 'success' ? (
              <motion.div
                className={styles.successMsg}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35 }}
              >
                <CheckCircleIcon className={styles.successIcon} />
                <div>
                  <p className={styles.successTitle}>You&apos;re subscribed!</p>
                  <p className={styles.successText}>
                    Watch your inbox for deals and updates.
                  </p>
                </div>
              </motion.div>
            ) : (
              <>
                <form className={styles.form} onSubmit={handleSubmit}>
                  <div className={styles.inputWrap}>
                    <EnvelopeIcon className={styles.inputIcon} />
                    <input
                      type="email"
                      className={styles.input}
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={status === 'loading'}
                      aria-label="Email address"
                    />
                  </div>
                  <button
                    type="submit"
                    className={styles.submitBtn}
                    disabled={status === 'loading'}
                  >
                    {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
                  </button>
                </form>
                <p className={styles.privacy}>
                  By subscribing, you agree to our Privacy Policy. We never share your data.
                </p>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
