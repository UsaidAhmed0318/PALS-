import {
  ChatBubbleLeftRightIcon,
  EnvelopeIcon,
  LifebuoyIcon,
  MapPinIcon,
  PhoneIcon,
  ShieldCheckIcon,
  SparklesIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";
import styles from "./ContactPage.module.css";
import TopNoticeSlider from "../TopNoticeSlider/TopNoticeSlider";

const contactCards = [
  {
    title: "Call Us",
    detail: "+92 300 1234567",
    note: "Mon to Sat, 9:00 AM to 8:00 PM",
    icon: PhoneIcon,
  },
  {
    title: "Email Us",
    detail: "support@eoricart.store",
    note: "We usually reply within a few hours",
    icon: EnvelopeIcon,
  },
  {
    title: "Visit Us",
    detail: "EoriCart, Main Market",
    note: "Friendly in-store help is always available",
    icon: MapPinIcon,
  },
];

const supportHighlights = [
  {
    title: "Fast Delivery Support",
    text: "Get quick help for delivery timing, order arrival and rider updates.",
    icon: TruckIcon,
  },
  {
    title: "Trusted Guidance",
    text: "Our team helps with products, payments and account questions smoothly.",
    icon: ShieldCheckIcon,
  },
  {
    title: "Friendly Service",
    text: "Clear and easy support designed to keep your shopping stress-free.",
    icon: ChatBubbleLeftRightIcon,
  },
];

export default function ContactPage() {
  return (
    <main className={styles.page}>
      <TopNoticeSlider className={styles.topFont} />

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>Contact Us</p>
          <h1 className={styles.title}>
            Support that feels quick, clear and premium.
          </h1>
          <p className={styles.subtitle}>
            Reach out for delivery updates, order help, account support or any
            shopping question. We keep the experience simple, warm and fast.
          </p>

          <div className={styles.heroBadges}>
            <span className={styles.heroBadge}>
              <LifebuoyIcon className={styles.badgeIcon} />
              Customer care available
            </span>
            <span className={styles.heroBadge}>
              <SparklesIcon className={styles.badgeIcon} />
              Fast and friendly support
            </span>
          </div>
        </div>

        <div className={styles.heroHighlight}>
          <span className={styles.highlightLabel}>Fast Response</span>
          <h2>We are ready to help you today.</h2>
          <p>
            From order issues to delivery questions, our support team is here to
            guide you with a smooth and helpful experience.
          </p>

          <div className={styles.highlightStats}>
            <div>
              <strong>09 AM - 08 PM</strong>
              <span>Support Hours</span>
            </div>
            <div>
              <strong>Quick Replies</strong>
              <span>Email & Phone</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.grid}>
        {contactCards.map((card) => {
          const Icon = card.icon;
          return (
            <article key={card.title} className={styles.card}>
              <span className={styles.cardIconWrap}>
                <Icon className={styles.cardIcon} />
              </span>
              <h2>{card.title}</h2>
              <p className={styles.detail}>{card.detail}</p>
              <p className={styles.note}>{card.note}</p>
            </article>
          );
        })}
      </section>

      <section className={styles.bottomGrid}>
        <article className={styles.messageBox}>
          <div className={styles.sectionHead}>
            <SparklesIcon className={styles.sectionIcon} />
            <h2>Customer Support</h2>
          </div>
          <p>
            For fast support, contact us through phone or email and our team
            will guide you step by step with a smooth and helpful experience.
          </p>
        </article>

        <article className={styles.supportPanel}>
          <div className={styles.sectionHead}>
            <ShieldCheckIcon className={styles.sectionIcon} />
            <h2>Why contact EoriCart?</h2>
          </div>

          <div className={styles.supportList}>
            {supportHighlights.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className={styles.supportItem}>
                  <span className={styles.supportIconWrap}>
                    <Icon className={styles.supportIcon} />
                  </span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </article>
      </section>
    </main>
  );
}
