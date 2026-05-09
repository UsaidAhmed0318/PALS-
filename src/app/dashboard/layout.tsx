"use client";

import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";
import styles from "./dashboard.module.css";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <div className={styles.navBrand}>
          <h2>My Account</h2>
        </div>
        <LogoutButton className={styles.logoutBtn}>Logout</LogoutButton>
      </nav>

      <div className={styles.content}>
        <aside className={styles.sidebar}>
          <Link href="/dashboard" className={styles.link}>
            Dashboard
          </Link>
          <Link href="/dashboard/orders" className={styles.link}>
            My Orders
          </Link>
          <Link href="/dashboard/profile" className={styles.link}>
            Profile
          </Link>
        </aside>

        <main className={styles.main}>{children}</main>
      </div>
    </div>
  );
}
