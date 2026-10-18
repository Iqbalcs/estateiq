import { propertyService } from '../services/property.service.js';

export const propertyController = {
  async list(request, response) {
    const filters = request.validated.query;
    const result = await propertyService.list(filters);
    response.json({
      data: result.items,
      meta: {
        page: filters.page,
        limit: filters.limit,
        total: result.total,
        totalPages: Math.ceil(result.total / filters.limit),
      },
    });
  },

  async get(request, response) {
    const property = await propertyService.get(request.validated.params.id);
    response.json({ data: property });
  },

  async create(request, response) {
    const property = await propertyService.create(request.validated.body);
    response.status(201).json({ data: property });
  },

  async update(request, response) {
    const property = await propertyService.update(
      request.validated.params.id,
      request.validated.body,
    );
    response.json({ data: property });
  },

  async remove(request, response) {
    await propertyService.remove(request.validated.params.id);
    response.status(204).send();
  },
};
