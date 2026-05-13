'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChatBubbleLeftRightIcon,
  EnvelopeIcon,
  MapPinIcon,
  PhoneIcon,
  ShieldCheckIcon,
  TruckIcon,
  CheckCircleIcon,
  PaperAirplaneIcon,
  UserIcon,
  PencilSquareIcon,
} from '@heroicons/react/24/outline';
import styles from './ContactPage.module.css';

const CONTACT_CARDS = [
  {
    icon: PhoneIcon,
    title: 'Call Us',
    detail: '+92 300 1234567',
    note: 'Mon–Sat, 9 AM – 8 PM',
    href: 'tel:+923001234567',
    color: '#0269a6',
  },
  {
    icon: EnvelopeIcon,
    title: 'Email Us',
    detail: 'support@eoricart.store',
    note: 'We reply within a few hours',
    href: 'mailto:support@eoricart.store',
    color: '#9fbb32',
  },
  {
    icon: MapPinIcon,
    title: 'Visit Us',
    detail: 'EoriCart, Main Market',
    note: 'In-store help always available',
    href: '#',
    color: '#d73633',
  },
];

const SUPPORT_ITEMS = [
  { icon: TruckIcon,               title: 'Fast Delivery Support',  text: 'Quick help for delivery timing, order arrival and rider updates.' },
  { icon: ShieldCheckIcon,         title: 'Trusted Guidance',       text: 'Our team helps with products, payments and account questions.' },
  { icon: ChatBubbleLeftRightIcon, title: 'Friendly Service',       text: 'Clear and easy support designed to keep your shopping stress-free.' },
];

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  show:   (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.4 } }),
};

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    await new Promise((r) => setTimeout(r, 1200));
    setStatus('success');
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <main className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroBg} aria-hidden="true" />
        <motion.div
          className={styles.heroContent}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          <span className={styles.eyebrow}>Contact Us</span>
          <h1 className={styles.heroTitle}>
            We&apos;re Here to<br />
            <span>Help You</span>
          </h1>
          <p className={styles.heroSub}>
            Reach out for delivery updates, order help, account support or any
            shopping question. Fast, warm and helpful service, always.
          </p>
          <div className={styles.heroStats}>
            <div className={styles.heroStat}>
              <span className={styles.heroStatNum}>09 AM</span>
              <span className={styles.heroStatLabel}>Opening time</span>
            </div>
            <div className={styles.heroStatDiv} />
            <div className={styles.heroStat}>
              <span className={styles.heroStatNum}>08 PM</span>
              <span className={styles.heroStatLabel}>Closing time</span>
            </div>
            <div className={styles.heroStatDiv} />
            <div className={styles.heroStat}>
              <span className={styles.heroStatNum}>Fast</span>
              <span className={styles.heroStatLabel}>Email replies</span>
            </div>
          </div>
        </motion.div>
      </section>

      <div className={styles.wrapper}>
        {/* Contact cards */}
        <section className={styles.cardsRow} aria-label="Contact options">
          {CONTACT_CARDS.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.a
                key={card.title}
                href={card.href}
                className={styles.contactCard}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                style={{ '--card-color': card.color } as React.CSSProperties}
              >
                <span className={styles.cardIcon}>
                  <Icon />
                </span>
                <h2 className={styles.cardTitle}>{card.title}</h2>
                <p className={styles.cardDetail}>{card.detail}</p>
                <p className={styles.cardNote}>{card.note}</p>
              </motion.a>
            );
          })}
        </section>

        {/* Main grid: form + support */}
        <section className={styles.mainGrid}>
          {/* Contact form */}
          <div className={styles.formCard}>
            <div className={styles.formCardHeader}>
              <PencilSquareIcon className={styles.formCardIcon} />
              <div>
                <h2 className={styles.formCardTitle}>Send a Message</h2>
                <p className={styles.formCardSub}>We&apos;ll get back to you as soon as possible.</p>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  className={styles.formSuccess}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35 }}
                >
                  <div className={styles.formSuccessIcon}>
                    <CheckCircleIcon />
                  </div>
                  <h3>Message Sent!</h3>
                  <p>Thank you for reaching out. Our team will respond within a few hours.</p>
                  <button
                    className={styles.formSuccessBtn}
                    onClick={() => setStatus('idle')}
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  ref={formRef}
                  className={styles.form}
                  onSubmit={handleSubmit}
                  noValidate
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className={styles.formRow}>
                    <div className={styles.inputGroup}>
                      <label className={styles.inputLabel}>
                        <UserIcon className={styles.inputLabelIcon} />
                        Full Name *
                      </label>
                      <input
                        className={styles.input}
                        type="text"
                        name="name"
                        placeholder="Your full name"
                        value={form.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className={styles.inputGroup}>
                      <label className={styles.inputLabel}>
                        <EnvelopeIcon className={styles.inputLabelIcon} />
                        Email Address *
                      </label>
                      <input
                        className={styles.input}
                        type="email"
                        name="email"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className={styles.inputGroup}>
                    <label className={styles.inputLabel}>Subject</label>
                    <select
                      className={styles.input}
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                    >
                      <option value="">Select a topic</option>
                      <option value="order">Order Issue</option>
                      <option value="delivery">Delivery Query</option>
                      <option value="payment">Payment Help</option>
                      <option value="product">Product Question</option>
                      <option value="return">Return / Refund</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className={styles.inputGroup}>
                    <label className={styles.inputLabel}>
                      <ChatBubbleLeftRightIcon className={styles.inputLabelIcon} />
                      Message *
                    </label>
                    <textarea
                      className={`${styles.input} ${styles.textarea}`}
                      name="message"
                      placeholder="How can we help you today?"
                      value={form.message}
                      onChange={handleChange}
                      rows={5}
                      required
                    />
                  </div>

                  <motion.button
                    type="submit"
                    className={styles.submitBtn}
                    disabled={status === 'loading'}
                    whileTap={{ scale: 0.97 }}
                  >
                    <PaperAirplaneIcon className={styles.submitIcon} />
                    {status === 'loading' ? 'Sending...' : 'Send Message'}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* Support panel */}
          <div className={styles.supportPanel}>
            <h2 className={styles.supportTitle}>Why Contact EoriCart?</h2>
            <div className={styles.supportList}>
              {SUPPORT_ITEMS.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    className={styles.supportItem}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.4 }}
                  >
                    <span className={styles.supportIcon}>
                      <Icon />
                    </span>
                    <div>
                      <h3 className={styles.supportItemTitle}>{item.title}</h3>
                      <p className={styles.supportItemText}>{item.text}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Quick contact */}
            <div className={styles.quickContact}>
              <p className={styles.quickContactTitle}>Prefer direct contact?</p>
              <a href="tel:+923001234567" className={styles.quickBtn}>
                <PhoneIcon className={styles.quickBtnIcon} />
                Call Us Now
              </a>
              <a href="mailto:support@eoricart.store" className={styles.quickBtnOutline}>
                <EnvelopeIcon className={styles.quickBtnIcon} />
                Email Us
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
