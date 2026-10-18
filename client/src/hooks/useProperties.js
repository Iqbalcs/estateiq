import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { propertyApi } from '../services/api.js';

export const propertyKeys = {
  all: ['properties'],
  lists: () => [...propertyKeys.all, 'list'],
  list: (params) => [...propertyKeys.lists(), params],
  details: () => [...propertyKeys.all, 'detail'],
  detail: (id) => [...propertyKeys.details(), String(id)],
};

const invalidatePortfolio = (queryClient) => {
  queryClient.invalidateQueries({ queryKey: propertyKeys.all });
  queryClient.invalidateQueries({ queryKey: ['analytics'] });
};

export function useProperties(params, options = {}) {
  return useQuery({
    queryKey: propertyKeys.list(params),
    queryFn: () => propertyApi.list(params),
    placeholderData: (previous) => previous,
    ...options,
  });
}

export function useProperty(id) {
  return useQuery({
    queryKey: propertyKeys.detail(id),
    queryFn: () => propertyApi.get(id),
    enabled: Boolean(id),
  });
}

export function useCreateProperty() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: propertyApi.create,
    onSuccess: () => invalidatePortfolio(queryClient),
  });
}

export function useUpdateProperty() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: propertyApi.update,
    onSuccess: (result) => {
      queryClient.setQueryData(propertyKeys.detail(result.data.id), result);
      invalidatePortfolio(queryClient);
    },
  });
}

export function useDeleteProperty() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: propertyApi.remove,
    onSuccess: () => invalidatePortfolio(queryClient),
  });
}
