'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useCustomerOrders } from '@/lib/hooks/useCustomer';
import styles from './orders.module.css';

export default function OrdersPage() {
  const [customerName, setCustomerName] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/auth/session')
      .then(res => res.json())
      .then(data => {
        if (data.authenticated && data.user?.customer) {
          setCustomerName(data.user.customer);
        }
      });
  }, []);

  const { data, isLoading, error } = useCustomerOrders(customerName);

  if (isLoading) {
    return <div className={styles.loading}>Loading orders...</div>;
  }

  if (error) {
    return <div className={styles.error}>Failed to load orders</div>;
  }

  const orders = data?.data || [];

  if (orders.length === 0) {
    return (
      <div className={styles.empty}>
        <h2>No orders yet</h2>
        <p>Start shopping to see your orders here</p>
        <Link href="/products" className={styles.shopBtn}>
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1>My Orders</h1>
      
      <div className={styles.ordersList}>
        {orders.map(order => (
          <Link
            key={order.name}
            href={`/dashboard/orders/${order.name}`}
            className={styles.orderCard}
          >
            <div className={styles.orderHeader}>
              <div>
                <h3>{order.name}</h3>
                <p className={styles.date}>
                  {new Date(order.transaction_date).toLocaleDateString()}
                </p>
              </div>
              <div className={styles.status}>
                {order.status}
              </div>
            </div>
            
            <div className={styles.orderFooter}>
              <span className={styles.total}>
                {order.currency} {order.grand_total.toFixed(2)}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}