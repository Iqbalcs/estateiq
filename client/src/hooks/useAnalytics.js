import { useQuery } from '@tanstack/react-query';
import { analyticsApi } from '../services/api.js';

const analyticsRootKey = ['analytics'];

export const analyticsKeys = {
  all: analyticsRootKey,
  overview: (range) => [...analyticsRootKey, 'overview', range],
  salesTrend: (range) => [...analyticsRootKey, 'sales-trend', range],
  propertyTypes: [...analyticsRootKey, 'property-types'],
  cities: [...analyticsRootKey, 'cities'],
};

export const useOverview = (range) =>
  useQuery({
    queryKey: analyticsKeys.overview(range),
    queryFn: () => analyticsApi.overview(range),
  });

export const useSalesTrend = (range) =>
  useQuery({
    queryKey: analyticsKeys.salesTrend(range),
    queryFn: () => analyticsApi.salesTrend(range),
  });

export const usePropertyTypes = () =>
  useQuery({ queryKey: analyticsKeys.propertyTypes, queryFn: analyticsApi.propertyTypes });

export const useCities = () =>
  useQuery({ queryKey: analyticsKeys.cities, queryFn: analyticsApi.cities });
