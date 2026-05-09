import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api/client';

export interface Category {
  name: string;
  item_group_name: string;
  parent_item_group: string;
  image: string | null;
}

export function useCategories() {
  return useQuery<{ data: Category[] }>({
    queryKey: ['categories'],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.set(
        'fields',
        JSON.stringify(['name', 'image', 'item_group_name', 'parent_item_group']),
      );
      params.set(
        'filters',
        JSON.stringify([['parent_item_group', '=', 'All Item Groups']]),
      );
      params.set('order_by', 'name asc');
      params.set('limit_page_length', '50');
      const res = await apiClient.get(`/api/resource/Item Group?${params.toString()}`);
      return res.data;
    },
    staleTime: 10 * 60 * 1000,
    retry: 2,
  });
}

export function useSubCategories(parentGroup: string | null) {
  return useQuery<{ data: { name: string }[] }>({
    queryKey: ['sub-categories', parentGroup],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.set('fields', JSON.stringify(['name']));
      params.set(
        'filters',
        JSON.stringify([['parent_item_group', '=', parentGroup]]),
      );
      params.set('limit_page_length', '100');
      const res = await apiClient.get(`/api/resource/Item Group?${params.toString()}`);
      return res.data;
    },
    enabled: !!parentGroup,
    staleTime: 10 * 60 * 1000,
    retry: 2,
  });
}
