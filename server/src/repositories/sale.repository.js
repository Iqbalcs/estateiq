import { pool } from '../db/pool.js';

function buildFilters(filters) {
  const clauses = [];
  const values = [];

  if (filters.search) {
    values.push(`%${filters.search}%`);
    clauses.push(
      `(p.title ILIKE $${values.length} OR p.address ILIKE $${values.length} OR p.city ILIKE $${values.length})`,
    );
  }
  if (filters.city) {
    values.push(filters.city);
    clauses.push(`p.city = $${values.length}`);
  }
  if (filters.dateFrom) {
    values.push(filters.dateFrom);
    clauses.push(`s.sold_at >= $${values.length}`);
  }
  if (filters.dateTo) {
    values.push(filters.dateTo);
    clauses.push(`s.sold_at <= $${values.length}`);
  }

  return {
    where: clauses.length ? `WHERE ${clauses.join(' AND ')}` : '',
    values,
  };
}

export const saleRepository = {
  async list(filters) {
    const { where, values } = buildFilters(filters);
    const sortColumns = { sold_at: 's.sold_at', sale_price: 's.sale_price' };
    const sortColumn = sortColumns[filters.sortBy];
    const sortOrder = filters.sortOrder === 'asc' ? 'ASC' : 'DESC';
    const offset = (filters.page - 1) * filters.limit;
    const listValues = [...values, filters.limit, offset];

    const [itemsResult, countResult] = await Promise.all([
      pool.query(
        `SELECT
          s.id::int AS id,
          s.property_id::int AS "propertyId",
          s.sale_price::float8 AS "salePrice",
          s.sold_at AS "soldAt",
          s.created_at AS "createdAt",
          p.title AS "propertyTitle",
          p.city,
          p.address,
          p.property_type AS "propertyType",
          p.listing_price::float8 AS "listingPrice"
         FROM sales s
         JOIN properties p ON p.id = s.property_id
         ${where}
         ORDER BY ${sortColumn} ${sortOrder}, s.id DESC
         LIMIT $${values.length + 1} OFFSET $${values.length + 2}`,
        listValues,
      ),
      pool.query(
        `SELECT COUNT(*)::int AS total
         FROM sales s JOIN properties p ON p.id = s.property_id ${where}`,
        values,
      ),
    ]);

    return { items: itemsResult.rows, total: countResult.rows[0].total };
  },

  async findPropertyForUpdate(client, propertyId) {
    const result = await client.query(
      `SELECT id::int AS id, title, status
       FROM properties
       WHERE id = $1
       FOR UPDATE`,
      [propertyId],
    );
    return result.rows[0] ?? null;
  },

  async createWithClient(client, sale) {
    const result = await client.query(
      `INSERT INTO sales (property_id, sale_price, sold_at)
       VALUES ($1, $2, $3)
       RETURNING id::int AS id, property_id::int AS "propertyId",
         sale_price::float8 AS "salePrice", sold_at AS "soldAt", created_at AS "createdAt"`,
      [sale.propertyId, sale.salePrice, sale.soldAt],
    );
    return result.rows[0];
  },

  async markPropertySold(client, propertyId) {
    await client.query(`UPDATE properties SET status = 'Sold' WHERE id = $1`, [propertyId]);
  },
};
