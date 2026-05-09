export interface Product {
  name: string;
  item_code: string;
  item_name: string;
  description?: string;
  item_group: string;
  image?: string;
  website_image?: string;
  thumbnail?: string;
  stock_uom: string;
  has_variants?: number;
  variant_of?: string;
  standard_rate?: number;
  website_price?: number;
}

export interface ItemPrice {
  name: string;
  item_code: string;
  price_list: string;
  price_list_rate: number;
  currency: string;
}