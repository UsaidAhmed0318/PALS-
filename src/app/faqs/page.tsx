'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './faqs.module.css';

interface FAQ {
  q: string;
  a: string | React.ReactNode;
}

interface FAQGroup {
  id: string;
  title: string;
  icon: React.ReactNode;
  faqs: FAQ[];
}

const groups: FAQGroup[] = [
  {
    id: 'ordering',
    title: 'Ordering',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
        <line x1="3" y1="6" x2="21" y2="6"/>
        <path d="M16 10a4 4 0 0 1-8 0"/>
      </svg>
    ),
    faqs: [
      {
        q: 'How do I place an order on EoriCart?',
        a: 'Browse products, add items to your cart, then click "Checkout". You can order as a guest or log into your account for faster checkout and order tracking. Select your delivery address and preferred payment method to complete your order.',
      },
      {
        q: 'Can I modify or cancel my order after placing it?',
        a: 'You can modify or cancel your order within 30 minutes of placing it by contacting our support team via WhatsApp or phone. Once the order is dispatched, cancellation is not possible.',
      },
      {
        q: 'Is there a minimum order amount?',
        a: 'There is no minimum order amount. However, orders below Rs. 2,000 will have a standard delivery charge applied at checkout.',
      },
      {
        q: 'How do I track my order?',
        a: (
          <>
            After placing your order, you will receive a confirmation message with your order ID. You can track your order by logging into your account and visiting <strong>My Orders</strong>, or by contacting our support team with your order ID.
          </>
        ),
      },
      {
        q: 'Can I order by phone?',
        a: 'Yes! You can place orders by calling our customer service helpline. Our team is available from 9 AM to 9 PM, 7 days a week to assist you.',
      },
    ],
  },
  {
    id: 'delivery',
    title: 'Delivery',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="1" y="3" width="15" height="13"/>
        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
        <circle cx="5.5" cy="18.5" r="2.5"/>
        <circle cx="18.5" cy="18.5" r="2.5"/>
      </svg>
    ),
    faqs: [
      {
        q: 'What are the delivery charges?',
        a: 'Delivery is FREE on orders above Rs. 2,000. For orders below Rs. 2,000, a delivery charge of Rs. 99–150 applies depending on your location.',
      },
      {
        q: 'How long does delivery take?',
        a: 'Standard delivery takes 1–3 business days depending on your city. For major cities like Karachi, Lahore, and Islamabad, same-day or next-day delivery is often available on orders placed before 12 PM.',
      },
      {
        q: 'What areas do you deliver to?',
        a: 'We currently deliver across major cities in Pakistan including Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad, Multan, and more. Enter your address at checkout to confirm delivery availability.',
      },
      {
        q: 'What if I am not home when the delivery arrives?',
        a: 'Our delivery team will call you before arrival. If you are unavailable, they will attempt delivery twice. You can also leave instructions for a safe drop-off location or authorize someone else to receive the order.',
      },
      {
        q: 'Do you deliver on weekends and public holidays?',
        a: 'Yes, we deliver 7 days a week including Saturdays and Sundays. Delivery on public holidays may be subject to availability in your area.',
      },
    ],
  },
  {
    id: 'payment',
    title: 'Payment',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
        <line x1="1" y1="10" x2="23" y2="10"/>
      </svg>
    ),
    faqs: [
      {
        q: 'What payment methods do you accept?',
        a: (
          <ul>
            <li>Cash on Delivery (COD)</li>
            <li>Debit & Credit Cards (Visa, Mastercard)</li>
            <li>JazzCash & EasyPaisa</li>
            <li>Bank Transfer</li>
          </ul>
        ),
      },
      {
        q: 'Is Cash on Delivery (COD) available everywhere?',
        a: 'COD is available in most cities we serve. You will see the COD option at checkout if it is available for your delivery address.',
      },
      {
        q: 'Is it safe to pay online on EoriCart?',
        a: 'Absolutely. All online payments are processed through PCI-DSS certified payment gateways with SSL encryption. We never store your full card details on our servers.',
      },
      {
        q: 'Can I get a receipt or invoice for my order?',
        a: 'Yes. A digital invoice is sent to your email after every successful order. You can also download it from your account under My Orders.',
      },
    ],
  },
  {
    id: 'returns',
    title: 'Returns & Refunds',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="1 4 1 10 7 10"/>
        <path d="M3.51 15a9 9 0 1 0 .49-3.17"/>
      </svg>
    ),
    faqs: [
      {
        q: 'What is your return policy?',
        a: 'We accept returns for damaged, defective, or incorrect items reported within 24 hours of delivery. Please contact our support team with photos of the product and your order ID.',
      },
      {
        q: 'How long does a refund take?',
        a: 'Approved refunds are processed within 5–7 business days. For online payments, the amount is reversed to your original payment method. For COD orders, we issue a store credit or bank transfer.',
      },
      {
        q: 'Can I exchange a product?',
        a: 'Yes. If you received a wrong or defective product, we can arrange an exchange. Contact our support team within 24 hours and we will schedule a pickup and re-delivery at no extra cost.',
      },
      {
        q: 'Which items cannot be returned?',
        a: (
          <ul>
            <li>Opened perishable items (fresh food, dairy, bakery)</li>
            <li>Items damaged due to customer misuse</li>
            <li>Products returned without original packaging</li>
            <li>Claims made after 24 hours of delivery</li>
          </ul>
        ),
      },
    ],
  },
  {
    id: 'account',
    title: 'Account & Profile',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
    ),
    faqs: [
      {
        q: 'How do I create an account?',
        a: (
          <>
            Click on <strong>Login / Register</strong> in the top right corner and fill in your details. You can also sign up with your phone number via OTP verification.
          </>
        ),
      },
      {
        q: 'How do I reset my password?',
        a: 'On the login page, click "Forgot Password" and enter your registered email. You will receive a password reset link within a few minutes. Check your spam folder if you do not see it.',
      },
      {
        q: 'Can I save multiple delivery addresses?',
        a: 'Yes. Go to your account profile and add multiple addresses (Home, Office, etc.). At checkout, simply select the address you want the order delivered to.',
      },
      {
        q: 'How do I delete my account?',
        a: 'To delete your account, contact our support team at support@eoricart.com with your request. Account deletion is permanent and all your data will be removed within 14 business days.',
      },
    ],
  },
  {
    id: 'products',
    title: 'Products',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
      </svg>
    ),
    faqs: [
      {
        q: 'Are all products on EoriCart 100% authentic?',
        a: 'Yes. EoriCart sources all products directly from authorized distributors and manufacturers. We do not sell counterfeit or expired goods. Every product comes with a valid expiry date printed on the packaging.',
      },
      {
        q: 'How do I find a specific product?',
        a: 'Use the search bar at the top of the page and type the product name, brand, or category. You can also browse by category using the navigation menu.',
      },
      {
        q: 'Can I request a product that is not listed?',
        a: 'Absolutely! If you need a specific product we do not currently carry, reach out to us via the Contact page or WhatsApp. We regularly update our catalog based on customer demand.',
      },
      {
        q: 'What does "Out of Stock" mean and when will it be available?',
        a: 'Out of stock means the item is temporarily unavailable. Restock timelines vary by product. You can contact our team to get an estimated availability date or leave your email for a back-in-stock notification.',
      },
    ],
  },
];

function AccordionItem({ faq, index }: { faq: FAQ; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`${styles.item} ${open ? styles.itemOpen : ''}`}>
      <button className={styles.trigger} onClick={() => setOpen(!open)}>
        <div className={styles.triggerLeft}>
          <span className={styles.qNum}>{index + 1}</span>
          <span className={styles.question}>{faq.q}</span>
        </div>
        <svg
          className={`${styles.chevron} ${open ? styles.chevronOpen : ''}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      <div
        className={styles.answer}
        style={{ maxHeight: open ? '600px' : '0' }}
      >
        <div className={styles.answerInner}>{faq.a}</div>
      </div>
    </div>
  );
}

export default function FAQsPage() {
  const [activeTab, setActiveTab] = useState('all');

  const displayed = activeTab === 'all'
    ? groups
    : groups.filter((g) => g.id === activeTab);

  return (
    <div className={styles.page}>
      {/* Hero */}
      <div className={styles.hero}>
        <div className={styles.heroBadge}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="12" cy="12" r="10"/>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
            <line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
          Help Center
        </div>
        <h1 className={styles.heroTitle}>Frequently Asked Questions</h1>
        <p className={styles.heroSub}>
          Find quick answers to common questions about ordering, delivery, payments, and more.
        </p>
        <div className={styles.heroSearch}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" style={{ flexShrink: 0 }}>
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            type="text"
            className={styles.heroSearchInput}
            placeholder="Search questions..."
            readOnly
          />
          <button className={styles.heroSearchBtn} type="button">
            Search
          </button>
        </div>
      </div>

      {/* Content */}
      <div className={styles.content}>
        {/* Stats */}
        <div className={styles.stats}>
          <div className={styles.statCard}>
            <div className={`${styles.statIcon} ${styles.blue}`}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            </div>
            <div className={styles.statValue}>30+</div>
            <div className={styles.statLabel}>Questions Answered</div>
          </div>
          <div className={styles.statCard}>
            <div className={`${styles.statIcon} ${styles.green}`}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.58 1.21h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.95a16 16 0 0 0 6.29 6.29l1.31-1.31a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.03z"/></svg>
            </div>
            <div className={styles.statValue}>2 min</div>
            <div className={styles.statLabel}>Avg. Response Time</div>
          </div>
          <div className={styles.statCard}>
            <div className={`${styles.statIcon} ${styles.orange}`}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            </div>
            <div className={styles.statValue}>98%</div>
            <div className={styles.statLabel}>Customer Satisfaction</div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === 'all' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('all')}
          >
            All Topics
          </button>
          {groups.map((g) => (
            <button
              key={g.id}
              className={`${styles.tab} ${activeTab === g.id ? styles.tabActive : ''}`}
              onClick={() => setActiveTab(g.id)}
            >
              {g.title}
            </button>
          ))}
        </div>

        {/* FAQ Groups */}
        {displayed.map((group) => (
          <div className={styles.group} key={group.id}>
            <div className={styles.groupHeader}>
              <div className={styles.groupIcon}>{group.icon}</div>
              <h2 className={styles.groupTitle}>{group.title}</h2>
              <span className={styles.groupCount}>{group.faqs.length} questions</span>
            </div>
            <div className={styles.accordion}>
              {group.faqs.map((faq, i) => (
                <AccordionItem key={i} faq={faq} index={i} />
              ))}
            </div>
          </div>
        ))}

        {/* Still have questions CTA */}
        <div className={styles.cta}>
          <h3>Still Have Questions?</h3>
          <p>Our support team is available 7 days a week to assist you.</p>
          <div className={styles.ctaOptions}>
            <Link href="/contact" className={styles.ctaOption}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              <span>Live Chat</span>
              <small>Usually replies in 2 min</small>
            </Link>
            <a href="tel:+923001234567" className={styles.ctaOption}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.58 1.21h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.95a16 16 0 0 0 6.29 6.29l1.31-1.31a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.03z"/>
              </svg>
              <span>Call Us</span>
              <small>9 AM – 9 PM daily</small>
            </a>
            <a href="mailto:support@eoricart.com" className={styles.ctaOption}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              <span>Email</span>
              <small>Reply within 24 hrs</small>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
