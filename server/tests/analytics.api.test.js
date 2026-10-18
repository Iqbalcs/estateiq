import request from 'supertest';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { createApp } from '../src/app.js';
import { analyticsRepository } from '../src/repositories/analytics.repository.js';

describe('analytics API', () => {
  afterEach(() => vi.restoreAllMocks());

  it('returns database-derived revenue totals for the requested range', async () => {
    vi.spyOn(analyticsRepository, 'overview').mockResolvedValue({
      totalProperties: 28,
      availableProperties: 17,
      soldProperties: 11,
      totalSalesRevenue: 420_350_000,
      averageSalePrice: 38_213_636.36,
    });

    const response = await request(createApp()).get(
      '/api/analytics/overview?dateFrom=2026-01-01&dateTo=2026-12-31',
    );

    expect(response.status).toBe(200);
    expect(analyticsRepository.overview).toHaveBeenCalledWith({
      dateFrom: '2026-01-01',
      dateTo: '2026-12-31',
    });
    expect(response.body.data.totalSalesRevenue).toBe(420_350_000);
  });
});
