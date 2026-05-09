import { useFrappeList, useFrappeDoc } from './useFrappe';
import { Product, ItemPrice } from '@/types/product';

export function useProducts(
  filters?: Record<string, unknown>,
  limit: number = 20,
  orderBy: string | undefined = 'modified desc',
) {
  return useFrappeList<Product>('Item', {
    fields: [
      'name',
      'item_code',
      'item_name',
      'description',
      'item_group',
      'image',
      'website_image',
      'stock_uom',
      'standard_rate',
      'has_variants',
      'variant_of',
    ],
    filters: {
      disabled: 0,
      ...filters,
    },
    limit_page_length: limit,
    order_by: orderBy,
  });
}

export function useProduct(itemCode: string | null) {
  return useFrappeDoc<Product>('Item', itemCode);
}

export function useItemPrice(
  itemCode: string | null,
  priceList: string = 'Standard Selling',
) {
  return useFrappeList<ItemPrice>('Item Price', {
    fields: ['name', 'item_code', 'price_list', 'price_list_rate', 'currency'],
    filters: {
      item_code: itemCode,
      price_list: priceList,
    },
    limit_page_length: 1,
  });
}
