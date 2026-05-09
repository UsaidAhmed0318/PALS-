export interface Product {
  name: string;
  item_code: string;
  item_name: string;
  description?: string;
  item_group: string;
  image?: string | null;
  stock_uom: string;
  has_variants?: number;
  variant_of?: string | null;
  valuation_rate?: number;
  brand?: string | null;
  custom_is_published?: number;
}

export interface ItemPrice {
  name: string;
  item_code: string;
  price_list: string;
  price_list_rate: number;
  currency: string;
}
