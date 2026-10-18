import request from 'supertest';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createApp } from '../src/app.js';
import { saleService } from '../src/services/sale.service.js';
import { conflict } from '../src/utils/app-error.js';

describe('sales API', () => {
  let app;

  beforeEach(() => {
    app = createApp();
  });

  afterEach(() => vi.restoreAllMocks());

  it('returns the newly recorded sale', async () => {
    vi.spyOn(saleService, 'create').mockResolvedValue({
      id: 12,
      propertyId: 2,
      propertyTitle: 'Gulberg Executive Apartment',
      salePrice: 23_750_000,
      soldAt: '2026-10-15',
    });

    const response = await request(app).post('/api/sales').send({
      propertyId: 2,
      salePrice: 23_750_000,
      soldAt: '2026-10-15',
    });

    expect(response.status).toBe(201);
    expect(response.body.data).toMatchObject({ id: 12, propertyId: 2, salePrice: 23_750_000 });
  });

  it('returns conflict when the property already has a sale', async () => {
    vi.spyOn(saleService, 'create').mockRejectedValue(
      conflict('This property already has a recorded sale'),
    );

    const response = await request(app).post('/api/sales').send({
      propertyId: 2,
      salePrice: 23_750_000,
      soldAt: '2026-10-15',
    });

    expect(response.status).toBe(409);
    expect(response.body.error.code).toBe('CONFLICT');
  });
});
