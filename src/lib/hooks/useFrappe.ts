import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
  UseMutationOptions,
} from '@tanstack/react-query';
import { apiClient } from '@/lib/api/client';
import { ERPNextResponse, ERPNextListResponse } from '@/types/erpnext';

/**
 * Fetch a single document
 */
export function useFrappeDoc<T = unknown>(
  doctype: string,
  name: string | null,
  fields?: string[],
  options?: Omit<UseQueryOptions<T>, 'queryKey' | 'queryFn'>,
) {
  return useQuery<T>({
    queryKey: ['frappe', doctype, name, fields],
    queryFn: async () => {
      const params = fields ? { fields: JSON.stringify(fields) } : {};
      const response = await apiClient.get<ERPNextResponse<T>>(
        `/api/resource/${doctype}/${name}`,
        { params },
      );
      return response.data.data;
    },
    enabled: !!name && (options?.enabled ?? true),
    ...options,
  });
}

/**
 * Fetch list of documents
 */
export function useFrappeList<T = unknown>(
  doctype: string,
  listOptions?: {
    fields?: string[];
    filters?: Record<string, unknown>;
    limit_start?: number;
    limit_page_length?: number;
    order_by?: string;
  },
  queryOptions?: Omit<
    UseQueryOptions<ERPNextListResponse<T>>,
    'queryKey' | 'queryFn'
  >,
) {
  return useQuery<ERPNextListResponse<T>>({
    queryKey: ['frappe', doctype, 'list', listOptions],
    queryFn: async () => {
      const params: Record<string, string | number> = {};

      if (listOptions?.fields) {
        // Try this format if JSON.stringify fails to return data
        params.fields = `["${listOptions.fields.join('","')}"]`;
      }
      if (listOptions?.filters)
        params.filters = JSON.stringify(listOptions.filters);
      if (listOptions?.limit_start !== undefined)
        params.limit_start = listOptions.limit_start;
      if (listOptions?.limit_page_length)
        params.limit_page_length = listOptions.limit_page_length;
      if (listOptions?.order_by) params.order_by = listOptions.order_by;

      const response = await apiClient.get<ERPNextListResponse<T>>(
        `/api/resource/${doctype}`,
        { params },
      );
      return response.data;
    },
    ...queryOptions,
  });
}

/**
 * Create a document
 */
export function useFrappeCreate<
  TData = unknown,
  TVariables = unknown,
  TContext = unknown,
>(
  doctype: string,
  mutationOptions?: UseMutationOptions<TData, Error, TVariables, TContext>,
) {
  const queryClient = useQueryClient();

  return useMutation<TData, Error, TVariables, TContext>({
    mutationFn: async (data: TVariables) => {
      const response = await apiClient.post<ERPNextResponse<TData>>(
        `/api/resource/${doctype}`,
        data,
      );
      return response.data.data;
    },
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate list queries
      queryClient.invalidateQueries({ queryKey: ['frappe', doctype, 'list'] });

      // Call custom onSuccess if provided
      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
    ...mutationOptions,
  });
}

/**
 * Update a document
 */
export function useFrappeUpdate<TData = unknown>(
  doctype: string,
  mutationOptions?: UseMutationOptions<
    TData,
    Error,
    { name: string; data: TData }
  >,
) {
  const queryClient = useQueryClient();

  return useMutation<TData, Error, { name: string; data: TData }>({
    mutationFn: async ({ name, data }) => {
      const response = await apiClient.put<ERPNextResponse<TData>>(
        `/api/resource/${doctype}/${name}`,
        data,
      );
      return response.data.data;
    },
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate specific document
      queryClient.invalidateQueries({
        queryKey: ['frappe', doctype, variables.name],
      });

      // Invalidate list queries
      queryClient.invalidateQueries({
        queryKey: ['frappe', doctype, 'list'],
      });

      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
    ...mutationOptions,
  });
}

/**
 * Delete a document
 */
export function useFrappeDelete(
  doctype: string,
  mutationOptions?: UseMutationOptions<void, Error, string>,
) {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: async (name: string) => {
      await apiClient.delete(`/api/resource/${doctype}/${name}`);
    },
    onSuccess: (data, variables, onMutateResult, context) => {
      // Invalidate list queries
      queryClient.invalidateQueries({
        queryKey: ['frappe', doctype, 'list'],
      });

      mutationOptions?.onSuccess?.(data, variables, onMutateResult, context);
    },
    ...mutationOptions,
  });
}

/**
 * Call a whitelisted method
 */
export function useFrappeMethod<TData = unknown, TVariables = unknown>(
  method: string,
  mutationOptions?: UseMutationOptions<TData, Error, TVariables, unknown>,
) {
  return useMutation<TData, Error, TVariables, unknown>({
    mutationFn: async (params?: TVariables) => {
      const response = await apiClient.post<ERPNextResponse<TData>>(
        `/api/method/${method}`,
        params,
      );
      return (response.data.data || response.data) as TData;
    },
    ...mutationOptions,
  });
}
