import { saleService } from '../services/sale.service.js';

export const saleController = {
  async list(request, response) {
    const filters = request.validated.query;
    const result = await saleService.list(filters);
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

  async create(request, response) {
    const sale = await saleService.create(request.validated.body);
    response.status(201).json({ data: sale });
  },
};
