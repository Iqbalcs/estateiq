# EstateIQ Product Requirements

## Purpose

EstateIQ is a single-user portfolio application for small real estate businesses to maintain a
property catalogue, record sales, and understand portfolio performance. It demonstrates a complete
React-to-REST-to-PostgreSQL workflow without introducing authentication or multi-tenant complexity.

## MVP scope

- Dashboard KPIs and charts computed from PostgreSQL data.
- Property creation, reading, editing, eligible deletion, search, filters, sorting, and server-side
  pagination.
- Atomic sale recording, sale history, filters, pagination, and monthly performance visualization.
- Responsive, accessible SaaS interface with loading, empty, success, and error feedback.
- PostgreSQL migrations and fictional Pakistan-focused seed data.
- API and UI tests for the business-critical paths.

Authentication, file uploads, map integrations, notifications, and multi-tenant permissions are
outside the MVP.

## Users and stories

### Business owner

- I can see the number and value of properties sold so I can assess performance.
- I can filter reporting by date so I can compare relevant periods.
- I can inspect trends by month, property type, and city so I can direct sales activity.

### Property manager

- I can add and maintain complete property listings.
- I can search, filter, sort, and paginate listings so I can find inventory quickly.
- I cannot delete a sold property, preserving historical sales integrity.

### Sales analyst

- I can record an actual sale price and date for an available property.
- I can review and filter sale history.
- I cannot record a second sale for the same property.

## Acceptance criteria

1. Dashboard totals and charts are returned by analytics endpoints, never hardcoded in React.
2. Property list controls are sent as validated query parameters and applied in SQL.
3. Valid property create/edit operations persist and invalidate affected client queries.
4. Invalid forms show field-level feedback; invalid API requests return HTTP 400.
5. Recording a sale inserts the sale and changes the property to `Sold` in one transaction.
6. A unique database constraint and backend checks reject a duplicate sale with HTTP 409.
7. Sold properties cannot be deleted and return HTTP 409.
8. Currency is consistently presented as PKR and dates are readable across supported screens.
9. Layout and navigation remain usable at mobile, tablet, and desktop widths.
10. A new developer can migrate, seed, test, and start the app from README instructions.

## Success measures

- All required lint, test, and production-build commands pass.
- Seed data produces meaningful pagination and non-empty charts.
- No secrets, real customer data, remote placeholder dependency, or fabricated deployment claims.
