import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api/client';

export interface SearchResult {
  item_code: string;
  item_name: string;
  image?: string;
  item_group?: string;
}

export function useSearchProducts(query: string) {
  const trimmed = query.trim();

  return useQuery<SearchResult[]>({
    queryKey: ['search', 'products', trimmed],
    queryFn: async () => {
      const params = new URLSearchParams({
        fields: '["item_code","item_name","image","item_group"]',
        filters: JSON.stringify([['item_name', 'like', `%${trimmed}%`]]),
        limit_page_length: '8',
        order_by: 'item_name asc',
      });

      const response = await apiClient.get(`/api/resource/Item?${params.toString()}`);
      return response.data?.data || [];
    },
    enabled: trimmed.length >= 2,
    staleTime: 30_000,
    retry: 1,
  });
}
