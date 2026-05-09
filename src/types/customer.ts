export interface Customer {
  name: string;
  customer_name: string;
  customer_type: string;
  customer_group: string;
  territory: string;
  email_id?: string;
  mobile_no?: string;
}

export interface SalesOrder {
  name: string;
  customer: string;
  customer_name: string;
  transaction_date: string;
  delivery_date?: string;
  grand_total: number;
  currency: string;
  status: string;
  docstatus: number;
}

export interface SalesOrderItem {
  item_code: string;
  item_name: string;
  qty: number;
  rate: number;
  amount: number;
}

export interface SalesOrderDetail extends SalesOrder {
  items: SalesOrderItem[];
  shipping_address_name?: string;
  billing_address_name?: string;
}