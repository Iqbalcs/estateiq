import { pool } from '../db/pool.js';

const propertySelect = `
  p.id::int AS id,
  p.title,
  p.description,
  p.city,
  p.address,
  p.property_type AS "propertyType",
  p.listing_price::float8 AS "listingPrice",
  p.area_sqft AS "areaSqft",
  p.bedrooms,
  p.bathrooms,
  p.status,
  p.created_at AS "createdAt",
  p.updated_at AS "updatedAt"
`;

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
  if (filters.propertyType) {
    values.push(filters.propertyType);
    clauses.push(`p.property_type = $${values.length}`);
  }
  if (filters.status) {
    values.push(filters.status);
    clauses.push(`p.status = $${values.length}`);
  }

  return {
    where: clauses.length ? `WHERE ${clauses.join(' AND ')}` : '',
    values,
  };
}

export const propertyRepository = {
  async list(filters) {
    const { where, values } = buildFilters(filters);
    const sortColumns = {
      created_at: 'p.created_at',
      listing_price: 'p.listing_price',
    };
    const sortColumn = sortColumns[filters.sortBy];
    const sortOrder = filters.sortOrder === 'asc' ? 'ASC' : 'DESC';
    const offset = (filters.page - 1) * filters.limit;
    const listValues = [...values, filters.limit, offset];

    const [itemsResult, countResult] = await Promise.all([
      pool.query(
        `SELECT ${propertySelect}
         FROM properties p
         ${where}
         ORDER BY ${sortColumn} ${sortOrder}, p.id DESC
         LIMIT $${values.length + 1} OFFSET $${values.length + 2}`,
        listValues,
      ),
      pool.query(`SELECT COUNT(*)::int AS total FROM properties p ${where}`, values),
    ]);

    return { items: itemsResult.rows, total: countResult.rows[0].total };
  },

  async findById(id) {
    const result = await pool.query(
      `SELECT ${propertySelect},
        CASE WHEN s.id IS NULL THEN NULL ELSE json_build_object(
          'id', s.id::int,
          'salePrice', s.sale_price::float8,
          'soldAt', s.sold_at,
          'createdAt', s.created_at
        ) END AS sale
       FROM properties p
       LEFT JOIN sales s ON s.property_id = p.id
       WHERE p.id = $1`,
      [id],
    );
    return result.rows[0] ?? null;
  },

  async create(property) {
    const result = await pool.query(
      `INSERT INTO properties
        (title, description, city, address, property_type, listing_price, area_sqft, bedrooms, bathrooms)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING
         id::int AS id, title, description, city, address,
         property_type AS "propertyType", listing_price::float8 AS "listingPrice",
         area_sqft AS "areaSqft", bedrooms, bathrooms, status,
         created_at AS "createdAt", updated_at AS "updatedAt"`,
      [
        property.title,
        property.description,
        property.city,
        property.address,
        property.propertyType,
        property.listingPrice,
        property.areaSqft,
        property.bedrooms,
        property.bathrooms,
      ],
    );
    return result.rows[0];
  },

  async update(id, fields) {
    const columns = {
      title: 'title',
      description: 'description',
      city: 'city',
      address: 'address',
      propertyType: 'property_type',
      listingPrice: 'listing_price',
      areaSqft: 'area_sqft',
      bedrooms: 'bedrooms',
      bathrooms: 'bathrooms',
    };
    const entries = Object.entries(fields);
    const assignments = entries.map(([field], index) => `${columns[field]} = $${index + 1}`);
    const values = entries.map(([, value]) => value);
    values.push(id);

    const result = await pool.query(
      `UPDATE properties
       SET ${assignments.join(', ')}
       WHERE id = $${values.length}
       RETURNING
         id::int AS id, title, description, city, address,
         property_type AS "propertyType", listing_price::float8 AS "listingPrice",
         area_sqft AS "areaSqft", bedrooms, bathrooms, status,
         created_at AS "createdAt", updated_at AS "updatedAt"`,
      values,
    );
    return result.rows[0] ?? null;
  },

  async remove(id) {
    const result = await pool.query('DELETE FROM properties WHERE id = $1 RETURNING id', [id]);
    return result.rowCount > 0;
  },
};
