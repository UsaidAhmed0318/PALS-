'use client';

import { useEffect, useState } from 'react';
import styles from './profile.module.css';

interface User {
  email: string;
  full_name: string;
  customer?: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/auth/session')
      .then(res => res.json())
      .then(data => {
        if (data.authenticated) {
          setUser(data.user);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className={styles.loading}>Loading profile...</div>;
  }

  if (!user) {
    return <div className={styles.error}>Failed to load profile</div>;
  }

  return (
    <div className={styles.container}>
      <h1>Profile</h1>
      
      <div className={styles.card}>
        <div className={styles.field}>
          <label>Full Name</label>
          <p>{user.full_name}</p>
        </div>
        
        <div className={styles.field}>
          <label>Email</label>
          <p>{user.email}</p>
        </div>
        
        {user.customer && (
          <div className={styles.field}>
            <label>Customer ID</label>
            <p>{user.customer}</p>
          </div>
        )}
      </div>
    </div>
  );
}