import { useFrappeDoc, useFrappeList } from './useFrappe';
import { Customer, SalesOrder, SalesOrderDetail } from '@/types/customer';

export function useCustomer(customerName: string | null) {
  return useFrappeDoc<Customer>('Customer', customerName);
}

export function useCustomerOrders(customerName: string | null) {
  return useFrappeList<SalesOrder>('Sales Order', {
    fields: [
      'name',
      'customer',
      'customer_name',
      'transaction_date',
      'delivery_date',
      'grand_total',
      'currency',
      'status',
      'docstatus',
    ],
    filters: {
      customer: customerName,
      docstatus: ['in', [0, 1]], // Draft and Submitted
    },
    limit_page_length: 50,
    order_by: 'transaction_date desc',
  }, {
    enabled: !!customerName,
  });
}

export function useOrderDetail(orderName: string | null) {
  return useFrappeDoc<SalesOrderDetail>(
    'Sales Order',
    orderName,
    [
      'name',
      'customer',
      'customer_name',
      'transaction_date',
      'delivery_date',
      'grand_total',
      'currency',
      'status',
      'items',
      'shipping_address_name',
      'billing_address_name',
    ]
  );
}