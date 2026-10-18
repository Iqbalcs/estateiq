import { afterEach, describe, expect, it, vi } from 'vitest';
import { pool } from '../src/db/pool.js';
import { saleRepository } from '../src/repositories/sale.repository.js';
import { saleService } from '../src/services/sale.service.js';

function createClient() {
  return {
    query: vi.fn().mockResolvedValue({}),
    release: vi.fn(),
  };
}

const saleInput = { propertyId: 7, salePrice: 55_000_000, soldAt: '2026-10-12' };

describe('sale service transaction', () => {
  afterEach(() => vi.restoreAllMocks());

  it('atomically creates a sale and marks the property sold', async () => {
    const client = createClient();
    vi.spyOn(pool, 'connect').mockResolvedValue(client);
    vi.spyOn(saleRepository, 'findPropertyForUpdate').mockResolvedValue({
      id: 7,
      title: 'Bani Gala Hillside Home',
      status: 'Available',
    });
    vi.spyOn(saleRepository, 'createWithClient').mockResolvedValue({ id: 21, ...saleInput });
    vi.spyOn(saleRepository, 'markPropertySold').mockResolvedValue();

    const sale = await saleService.create(saleInput);

    expect(client.query.mock.calls.map(([sql]) => sql)).toEqual(['BEGIN', 'COMMIT']);
    expect(saleRepository.createWithClient).toHaveBeenCalledWith(client, saleInput);
    expect(saleRepository.markPropertySold).toHaveBeenCalledWith(client, 7);
    expect(sale).toMatchObject({ id: 21, propertyTitle: 'Bani Gala Hillside Home' });
    expect(client.release).toHaveBeenCalledOnce();
  });

  it('rolls back when the property is already sold', async () => {
    const client = createClient();
    vi.spyOn(pool, 'connect').mockResolvedValue(client);
    vi.spyOn(saleRepository, 'findPropertyForUpdate').mockResolvedValue({
      id: 7,
      title: 'Bani Gala Hillside Home',
      status: 'Sold',
    });
    const createSpy = vi.spyOn(saleRepository, 'createWithClient');

    await expect(saleService.create(saleInput)).rejects.toMatchObject({ status: 409 });

    expect(client.query.mock.calls.map(([sql]) => sql)).toEqual(['BEGIN', 'ROLLBACK']);
    expect(createSpy).not.toHaveBeenCalled();
    expect(client.release).toHaveBeenCalledOnce();
  });

  it('translates the database uniqueness constraint into a conflict and rolls back', async () => {
    const client = createClient();
    vi.spyOn(pool, 'connect').mockResolvedValue(client);
    vi.spyOn(saleRepository, 'findPropertyForUpdate').mockResolvedValue({
      id: 7,
      title: 'Bani Gala Hillside Home',
      status: 'Available',
    });
    vi.spyOn(saleRepository, 'createWithClient').mockRejectedValue({ code: '23505' });

    await expect(saleService.create(saleInput)).rejects.toMatchObject({
      status: 409,
      message: 'This property already has a recorded sale',
    });
    expect(client.query.mock.calls.map(([sql]) => sql)).toEqual(['BEGIN', 'ROLLBACK']);
  });
});
