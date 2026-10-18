import { pool } from '../db/pool.js';

export const analyticsRepository = {
  async overview({ dateFrom, dateTo }) {
    const result = await pool.query(
      `SELECT
        (SELECT COUNT(*)::int FROM properties) AS "totalProperties",
        (SELECT COUNT(*)::int FROM properties WHERE status = 'Available') AS "availableProperties",
        (SELECT COUNT(*)::int FROM properties WHERE status = 'Sold') AS "soldProperties",
        (SELECT COALESCE(SUM(sale_price), 0)::float8
          FROM sales
          WHERE ($1::date IS NULL OR sold_at >= $1::date)
            AND ($2::date IS NULL OR sold_at <= $2::date)) AS "totalSalesRevenue",
        (SELECT COALESCE(AVG(sale_price), 0)::float8
          FROM sales
          WHERE ($1::date IS NULL OR sold_at >= $1::date)
            AND ($2::date IS NULL OR sold_at <= $2::date)) AS "averageSalePrice"`,
      [dateFrom ?? null, dateTo ?? null],
    );
    return result.rows[0];
  },

  async salesTrend({ dateFrom, dateTo }) {
    const result = await pool.query(
      `WITH bounds AS (
         SELECT
           date_trunc('month', COALESCE($1::date, CURRENT_DATE - INTERVAL '11 months'))::date AS start_month,
           date_trunc('month', COALESCE($2::date, CURRENT_DATE))::date AS end_month
       ), months AS (
         SELECT generate_series(start_month, end_month, INTERVAL '1 month')::date AS month
         FROM bounds
       ), totals AS (
         SELECT date_trunc('month', sold_at)::date AS month,
           SUM(sale_price)::float8 AS revenue,
           COUNT(*)::int AS sales_count
         FROM sales
         WHERE ($1::date IS NULL OR sold_at >= $1::date)
           AND ($2::date IS NULL OR sold_at <= $2::date)
         GROUP BY 1
       )
       SELECT
         to_char(m.month, 'YYYY-MM') AS month,
         to_char(m.month, 'Mon YYYY') AS label,
         COALESCE(t.revenue, 0)::float8 AS revenue,
         COALESCE(t.sales_count, 0)::int AS "salesCount"
       FROM months m
       LEFT JOIN totals t ON t.month = m.month
       ORDER BY m.month`,
      [dateFrom ?? null, dateTo ?? null],
    );
    return result.rows;
  },

  async propertyTypes() {
    const result = await pool.query(
      `SELECT property_type AS name, COUNT(*)::int AS value
       FROM properties
       GROUP BY property_type
       ORDER BY value DESC, name`,
    );
    return result.rows;
  },

  async cities() {
    const result = await pool.query(
      `SELECT city AS name, COUNT(*)::int AS value,
         COUNT(*) FILTER (WHERE status = 'Available')::int AS available,
         COUNT(*) FILTER (WHERE status = 'Sold')::int AS sold
       FROM properties
       GROUP BY city
       ORDER BY value DESC, name`,
    );
    return result.rows;
  },
};
