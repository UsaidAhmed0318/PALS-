import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api/client';
import { Product } from '@/types/product';

export const ITEM_FIELDS = [
  'item_code',
  'item_name',
  'description',
  'item_group',
  'image',
  'stock_uom',
  'valuation_rate',
  'brand',
  'has_variants',
  'variant_of',
];

type FilterValue = string | number | [string, unknown];
type ExtraFilters = Record<string, FilterValue>;

function buildFilterList(extra?: ExtraFilters): unknown[] {
  const list: unknown[] = [['custom_is_published', '=', 1]];
  if (!extra) return list;
  Object.entries(extra).forEach(([k, v]) => {
    if (Array.isArray(v)) {
      list.push([k, v[0], v[1]]);
    } else {
      list.push([k, '=', v]);
    }
  });
  return list;
}

export function useProducts(
  extraFilters?: ExtraFilters,
  limit: number = 20,
  orderBy: string | undefined = 'item_name asc',
  enabled: boolean = true,
) {
  return useQuery<{ data: Product[] }>({
    queryKey: ['products', extraFilters, limit, orderBy],
    enabled,
    queryFn: async () => {
      const params = new URLSearchParams();
      params.set('fields', JSON.stringify(ITEM_FIELDS));
      params.set('limit_page_length', String(limit));
      if (orderBy) params.set('order_by', orderBy);
      params.set('filters', JSON.stringify(buildFilterList(extraFilters)));
      const res = await apiClient.get(`/api/resource/Item?${params.toString()}`);
      return res.data;
    },
    staleTime: 60_000,
    retry: 2,
  });
}

export function useProduct(itemCode: string | null) {
  return useQuery<Product>({
    queryKey: ['product', itemCode],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.set('fields', JSON.stringify(ITEM_FIELDS));
      const res = await apiClient.get(
        `/api/resource/Item/${encodeURIComponent(itemCode!)}?${params.toString()}`,
      );
      return res.data?.data ?? res.data;
    },
    enabled: !!itemCode,
    staleTime: 60_000,
    retry: 1,
  });
}
