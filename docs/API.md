# REST API

Base URL: `http://localhost:5000/api`

Successful single-resource responses use `{ "data": ... }`. Lists add a `meta` pagination object.
Errors use `{ "error": { "code", "message", "details"? } }`.

## Health

### `GET /health`

Returns API and database health. A database outage produces HTTP 503.

## Properties

### `GET /properties`

Query parameters:

| Parameter       | Values                             |
| --------------- | ---------------------------------- |
| `page`, `limit` | Positive integers; limit max 100   |
| `search`        | Title, address, or city text       |
| `city`          | Exact city                         |
| `propertyType`  | House, Apartment, Commercial, Plot |
| `status`        | Available, Sold                    |
| `sortBy`        | `created_at` or `listing_price`    |
| `sortOrder`     | `asc` or `desc`                    |

Example response:

```json
{
  "data": [{ "id": 12, "title": "Canal View Family House", "status": "Available" }],
  "meta": { "page": 1, "limit": 10, "total": 28, "totalPages": 3 }
}
```

### `GET /properties/:id`

Returns a property and its sale summary when sold.

### `POST /properties`

```json
{
  "title": "Garden Town Family Home",
  "description": "Well-maintained home close to schools and parks.",
  "city": "Lahore",
  "address": "12 Babar Block, Garden Town",
  "propertyType": "House",
  "listingPrice": 38500000,
  "areaSqft": 2700,
  "bedrooms": 4,
  "bathrooms": 4
}
```

Returns HTTP 201. New properties are always available.

### `PATCH /properties/:id`

Accepts any non-empty subset of the create fields. Status changes are intentionally excluded; only
the sale workflow can mark a property sold.

### `DELETE /properties/:id`

Returns HTTP 204 for an available property. Sold properties return HTTP 409.

## Sales

### `GET /sales`

Supports `page`, `limit`, `search`, `city`, `dateFrom`, `dateTo`, `sortBy` (`sold_at` or
`sale_price`), and `sortOrder`.

### `POST /sales`

```json
{ "propertyId": 12, "salePrice": 37250000, "soldAt": "2026-10-15" }
```

Returns HTTP 201. A missing property returns 404; a sold/previously recorded property returns 409.

## Analytics

All analytics endpoints accept optional ISO `dateFrom` and `dateTo` query parameters. The overview
applies them to revenue/average sale price while inventory counts represent current portfolio state.

- `GET /analytics/overview`
- `GET /analytics/sales-trend`
- `GET /analytics/property-types`
- `GET /analytics/cities`

The sales trend returns each month in the requested period, including zero-revenue months.
