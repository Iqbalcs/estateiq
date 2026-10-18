import { pool } from '../db/pool.js';
import { saleRepository } from '../repositories/sale.repository.js';
import { conflict, notFound } from '../utils/app-error.js';

export const saleService = {
  list(filters) {
    return saleRepository.list(filters);
  },

  async create(input) {
    const client = await pool.connect();

    try {
      await client.query('BEGIN');
      const property = await saleRepository.findPropertyForUpdate(client, input.propertyId);

      if (!property) throw notFound('Property');
      if (property.status !== 'Available') {
        throw conflict('This property has already been sold');
      }

      let sale;
      try {
        sale = await saleRepository.createWithClient(client, input);
      } catch (error) {
        if (error.code === '23505') {
          throw conflict('This property already has a recorded sale');
        }
        throw error;
      }

      await saleRepository.markPropertySold(client, input.propertyId);
      await client.query('COMMIT');
      return { ...sale, propertyTitle: property.title };
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  },
};
