import request from 'supertest';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createApp } from '../src/app.js';
import { propertyRepository } from '../src/repositories/property.repository.js';

const validProperty = {
  title: 'Garden Town Family Home',
  description: 'A well-maintained family home close to schools and parks.',
  city: 'Lahore',
  address: '12 Babar Block, Garden Town',
  propertyType: 'House',
  listingPrice: 38_500_000,
  areaSqft: 2700,
  bedrooms: 4,
  bathrooms: 4,
};

describe('properties API', () => {
  let app;

  beforeEach(() => {
    app = createApp();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('creates a property from valid input', async () => {
    vi.spyOn(propertyRepository, 'create').mockResolvedValue({
      id: 29,
      ...validProperty,
      status: 'Available',
      createdAt: '2026-10-17T00:00:00.000Z',
      updatedAt: '2026-10-17T00:00:00.000Z',
    });

    const response = await request(app).post('/api/properties').send(validProperty);

    expect(response.status).toBe(201);
    expect(response.body.data).toMatchObject({
      id: 29,
      title: validProperty.title,
      status: 'Available',
    });
    expect(propertyRepository.create).toHaveBeenCalledWith(validProperty);
  });

  it('rejects invalid property input before repository access', async () => {
    const createSpy = vi.spyOn(propertyRepository, 'create');

    const response = await request(app)
      .post('/api/properties')
      .send({
        ...validProperty,
        title: 'X',
        listingPrice: -1,
      });

    expect(response.status).toBe(400);
    expect(response.body.error.code).toBe('VALIDATION_ERROR');
    expect(response.body.error.details).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ field: 'title' }),
        expect.objectContaining({ field: 'listingPrice' }),
      ]),
    );
    expect(createSpy).not.toHaveBeenCalled();
  });

  it('validates and forwards filtering and pagination parameters', async () => {
    vi.spyOn(propertyRepository, 'list').mockResolvedValue({
      items: [{ id: 3, title: 'Bahria Orchard Corner House' }],
      total: 21,
    });

    const response = await request(app).get(
      '/api/properties?page=2&limit=5&city=Lahore&propertyType=House&status=Sold&sortBy=listing_price&sortOrder=asc&search=corner',
    );

    expect(response.status).toBe(200);
    expect(response.body.meta).toEqual({ page: 2, limit: 5, total: 21, totalPages: 5 });
    expect(propertyRepository.list).toHaveBeenCalledWith({
      page: 2,
      limit: 5,
      city: 'Lahore',
      propertyType: 'House',
      status: 'Sold',
      sortBy: 'listing_price',
      sortOrder: 'asc',
      search: 'corner',
    });
  });

  it('refuses to delete a sold property', async () => {
    vi.spyOn(propertyRepository, 'findById').mockResolvedValue({ id: 3, status: 'Sold' });
    const removeSpy = vi.spyOn(propertyRepository, 'remove');

    const response = await request(app).delete('/api/properties/3');

    expect(response.status).toBe(409);
    expect(response.body.error.message).toMatch(/sold properties cannot be deleted/i);
    expect(removeSpy).not.toHaveBeenCalled();
  });
});
