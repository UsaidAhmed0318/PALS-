import Link from 'next/link';
import styles from '../legal.module.css';

export const metadata = {
  title: 'Privacy Policy',
  description: 'Learn how EoriCart collects, uses, and protects your personal information.',
};

const sections = [
  { id: 'information', num: '01', title: 'Information We Collect' },
  { id: 'usage', num: '02', title: 'How We Use Your Information' },
  { id: 'sharing', num: '03', title: 'Information Sharing' },
  { id: 'cookies', num: '04', title: 'Cookies & Tracking' },
  { id: 'security', num: '05', title: 'Data Security' },
  { id: 'rights', num: '06', title: 'Your Rights' },
  { id: 'children', num: '07', title: 'Children\'s Privacy' },
  { id: 'changes', num: '08', title: 'Policy Changes' },
];

export default function PrivacyPage() {
  return (
    <div className={styles.page}>
      {/* Hero */}
      <div className={styles.hero}>
        <div className={styles.heroBadge}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          Privacy Policy
        </div>
        <h1 className={styles.heroTitle}>Your Privacy Matters to Us</h1>
        <p className={styles.heroSub}>
          We are committed to protecting your personal information and being transparent about what we collect and how we use it.
        </p>
        <span className={styles.heroMeta}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          Last updated: May 2025
        </span>
      </div>

      {/* Content */}
      <div className={styles.content}>
        {/* TOC */}
        <div className={styles.toc}>
          <p className={styles.tocTitle}>Table of Contents</p>
          <ol className={styles.tocList}>
            {sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`}>{s.num}. {s.title}</a>
              </li>
            ))}
          </ol>
        </div>

        <div className={styles.highlight}>
          This Privacy Policy applies to EoriCart and describes how we handle personal information collected through our website, mobile app, and related services. By using EoriCart, you agree to the practices described in this policy.
        </div>

        {/* Section 1 */}
        <div className={styles.section} id="information">
          <div className={styles.sectionHeader}>
            <div className={styles.sectionIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </div>
            <div>
              <span className={styles.sectionNum}>Section 01</span>
              <h2 className={styles.sectionTitle}>Information We Collect</h2>
            </div>
          </div>
          <div className={styles.divider} />
          <div className={styles.sectionBody}>
            <p>When you use EoriCart, we collect the following types of information:</p>
            <p><strong>Personal Information you provide:</strong></p>
            <ul>
              <li>Full name, email address, and phone number when creating an account</li>
              <li>Delivery address and billing information when placing orders</li>
              <li>Payment details (processed securely — we do not store card numbers)</li>
              <li>Profile preferences and saved addresses</li>
            </ul>
            <p><strong>Information collected automatically:</strong></p>
            <ul>
              <li>Device type, browser, and operating system</li>
              <li>IP address and approximate location</li>
              <li>Pages visited, products viewed, and time spent on the site</li>
              <li>Referral sources and search terms used on the platform</li>
            </ul>
            <p><strong>Order & Transaction Data:</strong></p>
            <ul>
              <li>Purchase history, order status, and delivery records</li>
              <li>Customer support communications</li>
              <li>Product reviews and ratings you submit</li>
            </ul>
          </div>
        </div>

        {/* Section 2 */}
        <div className={styles.section} id="usage">
          <div className={styles.sectionHeader}>
            <div className={styles.sectionIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
            </div>
            <div>
              <span className={styles.sectionNum}>Section 02</span>
              <h2 className={styles.sectionTitle}>How We Use Your Information</h2>
            </div>
          </div>
          <div className={styles.divider} />
          <div className={styles.sectionBody}>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Process and fulfill your orders, and send order confirmations and delivery updates</li>
              <li>Create and manage your account</li>
              <li>Provide customer support and respond to your inquiries</li>
              <li>Send promotional offers, deals, and newsletters (you can opt out anytime)</li>
              <li>Improve our website, product catalog, and shopping experience</li>
              <li>Detect and prevent fraud or unauthorized access</li>
              <li>Comply with legal obligations and resolve disputes</li>
            </ul>
            <div className={styles.highlight}>
              We will never sell your personal data to third parties for their own marketing purposes.
            </div>
          </div>
        </div>

        {/* Section 3 */}
        <div className={styles.section} id="sharing">
          <div className={styles.sectionHeader}>
            <div className={styles.sectionIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
            </div>
            <div>
              <span className={styles.sectionNum}>Section 03</span>
              <h2 className={styles.sectionTitle}>Information Sharing</h2>
            </div>
          </div>
          <div className={styles.divider} />
          <div className={styles.sectionBody}>
            <p>We may share your information only in these limited circumstances:</p>
            <ul>
              <li><strong>Delivery Partners:</strong> We share your name, address, and contact number with our delivery partners solely to fulfill your orders.</li>
              <li><strong>Payment Processors:</strong> Payment information is securely transmitted to certified payment gateways. We never store full card details.</li>
              <li><strong>Legal Requirements:</strong> We may disclose information if required by law, court order, or government authority.</li>
              <li><strong>Business Transfers:</strong> In the event of a merger or acquisition, your data may be transferred to the successor entity.</li>
            </ul>
            <p>All third-party partners are contractually obligated to keep your information confidential and use it only for the specified purpose.</p>
          </div>
        </div>

        {/* Section 4 */}
        <div className={styles.section} id="cookies">
          <div className={styles.sectionHeader}>
            <div className={styles.sectionIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"/><path d="M8.5 8.5v.01"/><path d="M16 15.5v.01"/><path d="M12 12v.01"/></svg>
            </div>
            <div>
              <span className={styles.sectionNum}>Section 04</span>
              <h2 className={styles.sectionTitle}>Cookies & Tracking</h2>
            </div>
          </div>
          <div className={styles.divider} />
          <div className={styles.sectionBody}>
            <p>We use cookies and similar technologies to enhance your browsing experience. These include:</p>
            <ul>
              <li><strong>Essential Cookies:</strong> Required for the website to function (login sessions, cart data). Cannot be disabled.</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how visitors use the site so we can improve it.</li>
              <li><strong>Preference Cookies:</strong> Remember your settings and preferences across sessions.</li>
            </ul>
            <p>You can control non-essential cookies through your browser settings. Disabling certain cookies may affect some features of the website.</p>
          </div>
        </div>

        {/* Section 5 */}
        <div className={styles.section} id="security">
          <div className={styles.sectionHeader}>
            <div className={styles.sectionIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            </div>
            <div>
              <span className={styles.sectionNum}>Section 05</span>
              <h2 className={styles.sectionTitle}>Data Security</h2>
            </div>
          </div>
          <div className={styles.divider} />
          <div className={styles.sectionBody}>
            <p>We take data security seriously and implement industry-standard measures including:</p>
            <ul>
              <li>SSL/TLS encryption for all data transmission</li>
              <li>Encrypted storage of sensitive data at rest</li>
              <li>Secure HTTPOnly session cookies (iron-session)</li>
              <li>Regular security audits and access controls</li>
              <li>Staff training on data handling and privacy practices</li>
            </ul>
            <div className={styles.warning}>
              While we implement strong security measures, no system is 100% secure. Please use a strong, unique password for your EoriCart account and do not share it with anyone.
            </div>
          </div>
        </div>

        {/* Section 6 */}
        <div className={styles.section} id="rights">
          <div className={styles.sectionHeader}>
            <div className={styles.sectionIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 12l2 2 4-4"/><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z"/></svg>
            </div>
            <div>
              <span className={styles.sectionNum}>Section 06</span>
              <h2 className={styles.sectionTitle}>Your Rights</h2>
            </div>
          </div>
          <div className={styles.divider} />
          <div className={styles.sectionBody}>
            <p>You have the following rights regarding your personal data:</p>
            <ul>
              <li><strong>Access:</strong> Request a copy of the personal data we hold about you.</li>
              <li><strong>Correction:</strong> Ask us to correct inaccurate or incomplete information.</li>
              <li><strong>Deletion:</strong> Request deletion of your account and personal data (subject to legal retention requirements).</li>
              <li><strong>Opt-Out:</strong> Unsubscribe from marketing emails at any time via the link in any email.</li>
              <li><strong>Portability:</strong> Request your data in a portable format.</li>
            </ul>
            <p>To exercise any of these rights, contact us at <strong>privacy@eoricart.com</strong>. We will respond within 14 business days.</p>
          </div>
        </div>

        {/* Section 7 */}
        <div className={styles.section} id="children">
          <div className={styles.sectionHeader}>
            <div className={styles.sectionIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
            <div>
              <span className={styles.sectionNum}>Section 07</span>
              <h2 className={styles.sectionTitle}>Children&apos;s Privacy</h2>
            </div>
          </div>
          <div className={styles.divider} />
          <div className={styles.sectionBody}>
            <p>EoriCart is not directed at children under the age of 13. We do not knowingly collect personal information from children. If you believe a child has provided us with personal data, please contact us and we will delete it promptly.</p>
          </div>
        </div>

        {/* Section 8 */}
        <div className={styles.section} id="changes">
          <div className={styles.sectionHeader}>
            <div className={styles.sectionIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.17"/></svg>
            </div>
            <div>
              <span className={styles.sectionNum}>Section 08</span>
              <h2 className={styles.sectionTitle}>Policy Changes</h2>
            </div>
          </div>
          <div className={styles.divider} />
          <div className={styles.sectionBody}>
            <p>We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. When we make material changes, we will notify you via email or a prominent notice on our website.</p>
            <p>Continued use of EoriCart after changes are posted constitutes your acceptance of the updated policy. We encourage you to review this page periodically.</p>
          </div>
        </div>

        {/* Contact Card */}
        <div className={styles.contactCard}>
          <h3>Questions About Your Privacy?</h3>
          <p>Our team is here to help. Reach out to us anytime and we&apos;ll get back to you within 2 business days.</p>
          <div className={styles.contactLinks}>
            <Link href="/contact" className={styles.contactLink}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              Contact Us
            </Link>
            <a href="mailto:privacy@eoricart.com" className={styles.contactLink}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              privacy@eoricart.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
