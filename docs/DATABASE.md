# Database

## PostgreSQL schema

### `properties`

Stores the listing catalogue. Monetary values use `NUMERIC(14,2)` rather than floating point.
`property_type` and `status` use check constraints for a readable, migration-friendly domain.
Prices and dimensions must be positive; room counts cannot be negative.

### `sales`

Stores the immutable sales event. `property_id` is both a foreign key and unique, preventing more
than one sale for a property. `ON DELETE RESTRICT` preserves history.

```text
properties 1 -------- 0..1 sales
```

The API locks an available property with `SELECT ... FOR UPDATE`, inserts the sale, and updates its
status within one transaction. The uniqueness constraint is the final concurrency safeguard.

## Indexes

- City, property type, and status support catalogue filters.
- Listing price and creation date support server sorting.
- Sale date supports reporting windows and recent-first history.
- Lowercased property title and city expressions support case-insensitive lookup.

## Commands

Create a local database first, set `DATABASE_URL`, then run:

```bash
npm run db:migrate
npm run db:seed
```

Migrations are recorded in `schema_migrations` and run once in filename order. The seed is
development-only: it replaces EstateIQ table data with deterministic fictional records, making it
safe and repeatable for a dedicated local development database. Never point the seed command at a
shared or production database.
