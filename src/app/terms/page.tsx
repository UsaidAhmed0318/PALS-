import Link from 'next/link';
import styles from '../legal.module.css';

export const metadata = {
  title: 'Terms & Conditions',
  description: 'Read the terms and conditions governing your use of EoriCart.',
};

const sections = [
  { id: 'acceptance', num: '01', title: 'Acceptance of Terms' },
  { id: 'account', num: '02', title: 'User Accounts' },
  { id: 'products', num: '03', title: 'Products & Pricing' },
  { id: 'orders', num: '04', title: 'Orders & Payment' },
  { id: 'delivery', num: '05', title: 'Delivery Policy' },
  { id: 'returns', num: '06', title: 'Returns & Refunds' },
  { id: 'prohibited', num: '07', title: 'Prohibited Uses' },
  { id: 'liability', num: '08', title: 'Limitation of Liability' },
  { id: 'governing', num: '09', title: 'Governing Law' },
];

export default function TermsPage() {
  return (
    <div className={styles.page}>
      {/* Hero */}
      <div className={styles.hero}>
        <div className={styles.heroBadge}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
          Terms & Conditions
        </div>
        <h1 className={styles.heroTitle}>Terms of Service</h1>
        <p className={styles.heroSub}>
          Please read these terms carefully before using EoriCart. By accessing our platform, you agree to be bound by these terms.
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
          These Terms and Conditions govern your access to and use of the EoriCart website, mobile application, and services. EoriCart is operated by EoriCart Pakistan. If you do not agree with these terms, please do not use our platform.
        </div>

        {/* Section 1 */}
        <div className={styles.section} id="acceptance">
          <div className={styles.sectionHeader}>
            <div className={styles.sectionIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            </div>
            <div>
              <span className={styles.sectionNum}>Section 01</span>
              <h2 className={styles.sectionTitle}>Acceptance of Terms</h2>
            </div>
          </div>
          <div className={styles.divider} />
          <div className={styles.sectionBody}>
            <p>By accessing or using EoriCart (the &quot;Service&quot;), you confirm that you are at least 18 years of age, have read and understood these Terms, and agree to be legally bound by them.</p>
            <p>These Terms apply to all visitors, users, and others who access or use the Service. We reserve the right to update these Terms at any time. Continued use after changes constitutes acceptance of the revised Terms.</p>
          </div>
        </div>

        {/* Section 2 */}
        <div className={styles.section} id="account">
          <div className={styles.sectionHeader}>
            <div className={styles.sectionIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </div>
            <div>
              <span className={styles.sectionNum}>Section 02</span>
              <h2 className={styles.sectionTitle}>User Accounts</h2>
            </div>
          </div>
          <div className={styles.divider} />
          <div className={styles.sectionBody}>
            <p>To place orders, you must register for an account. You agree to:</p>
            <ul>
              <li>Provide accurate, current, and complete information during registration</li>
              <li>Maintain the security of your password and accept responsibility for all activity under your account</li>
              <li>Notify us immediately of any unauthorized use of your account</li>
              <li>Not share your account credentials with any third party</li>
            </ul>
            <p>EoriCart reserves the right to suspend or terminate accounts that violate these Terms or engage in fraudulent activity.</p>
          </div>
        </div>

        {/* Section 3 */}
        <div className={styles.section} id="products">
          <div className={styles.sectionHeader}>
            <div className={styles.sectionIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            </div>
            <div>
              <span className={styles.sectionNum}>Section 03</span>
              <h2 className={styles.sectionTitle}>Products & Pricing</h2>
            </div>
          </div>
          <div className={styles.divider} />
          <div className={styles.sectionBody}>
            <p>EoriCart strives to display accurate product information and pricing. However:</p>
            <ul>
              <li>Product images are for illustration purposes only and may differ slightly from the actual product</li>
              <li>Prices are displayed in Pakistani Rupees (PKR) and are subject to change without prior notice</li>
              <li>In the event of a pricing error, we reserve the right to cancel the order and issue a full refund</li>
              <li>Promotional prices are valid only for the stated duration</li>
              <li>Product availability is subject to stock levels and may change at any time</li>
            </ul>
            <div className={styles.highlight}>
              All products sold on EoriCart are 100% authentic. We source directly from authorized distributors and manufacturers.
            </div>
          </div>
        </div>

        {/* Section 4 */}
        <div className={styles.section} id="orders">
          <div className={styles.sectionHeader}>
            <div className={styles.sectionIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
            </div>
            <div>
              <span className={styles.sectionNum}>Section 04</span>
              <h2 className={styles.sectionTitle}>Orders & Payment</h2>
            </div>
          </div>
          <div className={styles.divider} />
          <div className={styles.sectionBody}>
            <p>When you place an order on EoriCart:</p>
            <ul>
              <li>Your order is an offer to purchase; acceptance occurs when we confirm and dispatch your order</li>
              <li>We accept Cash on Delivery (COD) and online payment methods as listed at checkout</li>
              <li>Payment must be made in full before the order is dispatched (for prepaid orders)</li>
              <li>We reserve the right to refuse or cancel any order at our discretion</li>
              <li>Order confirmation emails do not guarantee stock availability</li>
            </ul>
            <p>For Cash on Delivery orders, please ensure the exact amount is ready. Our delivery staff cannot provide change for large denominations.</p>
          </div>
        </div>

        {/* Section 5 */}
        <div className={styles.section} id="delivery">
          <div className={styles.sectionHeader}>
            <div className={styles.sectionIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
            </div>
            <div>
              <span className={styles.sectionNum}>Section 05</span>
              <h2 className={styles.sectionTitle}>Delivery Policy</h2>
            </div>
          </div>
          <div className={styles.divider} />
          <div className={styles.sectionBody}>
            <ul>
              <li>Free delivery is available on orders above Rs. 2,000 within supported areas</li>
              <li>Standard delivery typically takes 1–3 business days depending on your location</li>
              <li>Delivery times are estimates and may be affected by weather, traffic, or other unforeseen circumstances</li>
              <li>EoriCart is not liable for delays caused by incorrect address information provided by the customer</li>
              <li>Risk of loss and title for items pass to you upon delivery</li>
            </ul>
            <p>If you are unavailable at the time of delivery, our team will attempt to contact you. After 2 failed attempts, the order may be returned and a re-delivery charge may apply.</p>
          </div>
        </div>

        {/* Section 6 */}
        <div className={styles.section} id="returns">
          <div className={styles.sectionHeader}>
            <div className={styles.sectionIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.17"/></svg>
            </div>
            <div>
              <span className={styles.sectionNum}>Section 06</span>
              <h2 className={styles.sectionTitle}>Returns & Refunds</h2>
            </div>
          </div>
          <div className={styles.divider} />
          <div className={styles.sectionBody}>
            <p>We accept returns and offer refunds in the following situations:</p>
            <ul>
              <li>Damaged or defective products — report within 24 hours of delivery with photos</li>
              <li>Wrong item received — report within 24 hours of delivery</li>
              <li>Expired products — return immediately upon discovery</li>
            </ul>
            <p><strong>Non-refundable items:</strong></p>
            <ul>
              <li>Perishable items (fresh food, dairy) once opened</li>
              <li>Products damaged due to customer mishandling</li>
              <li>Items returned without original packaging</li>
            </ul>
            <p>Approved refunds are processed within 5–7 business days to your original payment method. For COD orders, a store credit or bank transfer is issued.</p>
            <div className={styles.warning}>
              To initiate a return, please contact our support team within 24 hours of receiving your order. Late claims may not be accepted.
            </div>
          </div>
        </div>

        {/* Section 7 */}
        <div className={styles.section} id="prohibited">
          <div className={styles.sectionHeader}>
            <div className={styles.sectionIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
            </div>
            <div>
              <span className={styles.sectionNum}>Section 07</span>
              <h2 className={styles.sectionTitle}>Prohibited Uses</h2>
            </div>
          </div>
          <div className={styles.divider} />
          <div className={styles.sectionBody}>
            <p>You may not use EoriCart to:</p>
            <ul>
              <li>Violate any applicable law or regulation</li>
              <li>Place fraudulent orders or use stolen payment methods</li>
              <li>Engage in any form of automated scraping or data harvesting</li>
              <li>Attempt to gain unauthorized access to our systems or other user accounts</li>
              <li>Transmit malware, viruses, or any harmful code</li>
              <li>Post false reviews or manipulate product ratings</li>
              <li>Resell products purchased on EoriCart without prior written consent</li>
            </ul>
            <p>Violation of these prohibitions may result in immediate account termination and legal action.</p>
          </div>
        </div>

        {/* Section 8 */}
        <div className={styles.section} id="liability">
          <div className={styles.sectionHeader}>
            <div className={styles.sectionIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <div>
              <span className={styles.sectionNum}>Section 08</span>
              <h2 className={styles.sectionTitle}>Limitation of Liability</h2>
            </div>
          </div>
          <div className={styles.divider} />
          <div className={styles.sectionBody}>
            <p>To the maximum extent permitted by law, EoriCart shall not be liable for:</p>
            <ul>
              <li>Indirect, incidental, or consequential damages arising from your use of the Service</li>
              <li>Losses due to unauthorized access to your account if you failed to maintain password security</li>
              <li>Product misuse or allergic reactions not disclosed on product packaging</li>
              <li>Service interruptions or technical errors beyond our reasonable control</li>
            </ul>
            <p>Our total liability to you for any claim shall not exceed the amount you paid for the relevant order.</p>
          </div>
        </div>

        {/* Section 9 */}
        <div className={styles.section} id="governing">
          <div className={styles.sectionHeader}>
            <div className={styles.sectionIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
            </div>
            <div>
              <span className={styles.sectionNum}>Section 09</span>
              <h2 className={styles.sectionTitle}>Governing Law</h2>
            </div>
          </div>
          <div className={styles.divider} />
          <div className={styles.sectionBody}>
            <p>These Terms shall be governed by and construed in accordance with the laws of Pakistan. Any disputes arising from these Terms or your use of EoriCart shall be subject to the exclusive jurisdiction of the courts of Pakistan.</p>
            <p>If any provision of these Terms is found to be unenforceable, the remaining provisions shall continue in full force and effect.</p>
          </div>
        </div>

        {/* Contact Card */}
        <div className={styles.contactCard}>
          <h3>Have Questions About Our Terms?</h3>
          <p>Our support team is happy to clarify anything. We&apos;re available 7 days a week.</p>
          <div className={styles.contactLinks}>
            <Link href="/contact" className={styles.contactLink}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              Contact Support
            </Link>
            <Link href="/faqs" className={styles.contactLink}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
              View FAQs
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
