import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { saleApi } from '../services/api.js';
import { propertyKeys } from './useProperties.js';

export const saleKeys = {
  all: ['sales'],
  list: (params) => [...saleKeys.all, 'list', params],
};

export function useSales(params) {
  return useQuery({
    queryKey: saleKeys.list(params),
    queryFn: () => saleApi.list(params),
    placeholderData: (previous) => previous,
  });
}

export function useCreateSale() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: saleApi.create,
    onSuccess: (_result, variables) => {
      queryClient.invalidateQueries({ queryKey: saleKeys.all });
      queryClient.invalidateQueries({ queryKey: propertyKeys.all });
      queryClient.invalidateQueries({ queryKey: ['analytics'] });
      queryClient.invalidateQueries({ queryKey: propertyKeys.detail(variables.propertyId) });
    },
  });
}
