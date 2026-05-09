import Image from "next/image";
import Link from "next/link";

import logoImg from "@/assets/Eori Cart/eoricart-logo.png";
import styles from "./authWrapper.module.css";

export default function AuthWrapper({
  mode,
  children,
}: {
  mode: "login" | "signup";
  children: React.ReactNode;
}) {
  return (
    <div className={styles.authWrapper}>
      <div
        className={`${styles.card} ${
          mode === "signup" ? styles.signupCard : styles.loginCard
        } `}
      >
        <Link href="/" className={styles.logoLink}>
          <Image
            src={logoImg}
            alt="Eori Cart"
            className={styles.logoImage}
            height={50}
            width={100}
            priority
          />
        </Link>
        {children}
      </div>
    </div>
  );
}
