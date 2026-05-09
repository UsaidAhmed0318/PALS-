"use client";

import styles from "./page.module.css";

export default function DashboardPage() {
  return (
    <div className={styles.container}>
      <h1>Welcome to ERPNext Dashboard</h1>
      <p>Select an option from the sidebar to get started.</p>

      <div className={styles.cards}>
        <div className={styles.card}>
          <h3>Items</h3>
          <p>Manage your inventory items</p>
        </div>

        <div className={styles.card}>
          <h3>Customers</h3>
          <p>View and manage customers</p>
        </div>

        <div className={styles.card}>
          <h3>Reports</h3>
          <p>Generate business reports</p>
        </div>
      </div>
    </div>
  );
}
