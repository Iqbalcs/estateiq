import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 15_000,
  headers: { 'Content-Type': 'application/json' },
});

const unwrap = (response) => response.data;

export const propertyApi = {
  list: (params) => api.get('/properties', { params }).then(unwrap),
  get: (id) => api.get(`/properties/${id}`).then(unwrap),
  create: (data) => api.post('/properties', data).then(unwrap),
  update: ({ id, data }) => api.patch(`/properties/${id}`, data).then(unwrap),
  remove: (id) => api.delete(`/properties/${id}`),
};

export const saleApi = {
  list: (params) => api.get('/sales', { params }).then(unwrap),
  create: (data) => api.post('/sales', data).then(unwrap),
};

export const analyticsApi = {
  overview: (params) => api.get('/analytics/overview', { params }).then(unwrap),
  salesTrend: (params) => api.get('/analytics/sales-trend', { params }).then(unwrap),
  propertyTypes: () => api.get('/analytics/property-types').then(unwrap),
  cities: () => api.get('/analytics/cities').then(unwrap),
};
