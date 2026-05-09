import { useFrappeList } from './useFrappe';

export interface Category {
  name: string;
  item_group_name: string;
  parent_item_group: string;
  image: string | null;
}

export function useCategories() {
  return useFrappeList<Category>(
    'Item Group',
    {
      fields: ['name', 'image', 'item_group_name', 'parent_item_group'],
      filters: {
        is_group: 1, // only groups
        parent_item_group: 'All Item Groups', // top level only
      },
      order_by: 'name asc',
    },
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  );
}
