import { analyticsRepository } from '../repositories/analytics.repository.js';

export const analyticsController = {
  async overview(request, response) {
    const data = await analyticsRepository.overview(request.validated.query);
    response.json({ data });
  },

  async salesTrend(request, response) {
    const data = await analyticsRepository.salesTrend(request.validated.query);
    response.json({ data });
  },

  async propertyTypes(_request, response) {
    const data = await analyticsRepository.propertyTypes();
    response.json({ data });
  },

  async cities(_request, response) {
    const data = await analyticsRepository.cities();
    response.json({ data });
  },
};
