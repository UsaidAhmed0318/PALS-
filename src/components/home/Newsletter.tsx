'use client';

import { useState } from 'react';
import { EnvelopeIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import styles from './Newsletter.module.css';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus('loading');
    // Simulate subscription — integrate with real API as needed
    await new Promise((r) => setTimeout(r, 1000));
    setStatus('success');
    setEmail('');
  };

  return (
    <section className={styles.section} aria-labelledby="newsletter-heading">
      <div className={styles.container}>
        <div className={styles.inner}>
          <div className={styles.textSide}>
            <div className={styles.iconWrap}>
              <EnvelopeIcon className={styles.icon} />
            </div>
            <div>
              <h2 id="newsletter-heading" className={styles.heading}>
                Stay in the Loop
              </h2>
              <p className={styles.desc}>
                Get new arrivals, exclusive deals, and grocery savings delivered
                straight to your inbox. No spam, unsubscribe anytime.
              </p>
            </div>
          </div>

          <div className={styles.formSide}>
            {status === 'success' ? (
              <div className={styles.successMsg}>
                <CheckCircleIcon className={styles.successIcon} />
                <div>
                  <p className={styles.successTitle}>You&apos;re subscribed!</p>
                  <p className={styles.successText}>
                    Watch your inbox for deals and updates.
                  </p>
                </div>
              </div>
            ) : (
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
            )}
            <p className={styles.privacy}>
              By subscribing, you agree to our Privacy Policy. We never share
              your data.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
