# Architecture

## System overview

```text
React/Vite client
  -> Axios + TanStack Query
  -> Express REST API (/api)
  -> controllers -> services -> repositories
  -> pg connection pool
  -> PostgreSQL
```

The project uses npm workspaces for a small monorepo. The client owns presentation, interaction,
client-side validation, routing, and server-state caching. Express owns request validation, business
rules, response semantics, and orchestration. PostgreSQL owns durable integrity constraints and
atomicity.

## Backend boundaries

- **Routes** map HTTP methods and paths and attach validators.
- **Controllers** translate HTTP input/output and contain no SQL.
- **Services** enforce business rules and transaction workflows.
- **Repositories** contain parameterized SQL and map database rows to JSON-friendly objects.
- **Middleware** handles validation, not-found behavior, and consistent errors.

The sale workflow intentionally lives in a service. It checks and locks the property row, inserts a
sale, and updates the property status through one checked-out client and one transaction. The
database additionally enforces one sale per property.

## Frontend boundaries

- **Pages** compose route-level experiences.
- **Feature components** render focused dashboard, property, and sales behaviors.
- **UI components** provide reusable buttons, inputs, dialogs, feedback, and skeletons.
- **Hooks** wrap TanStack Query keys and mutations.
- **Services** centralize Axios configuration and endpoint functions.
- **Utilities** format PKR, dates, query strings, and API errors.

URL query parameters are the source of truth for property and sales list controls. This makes views
refreshable, linkable, and compatible with browser navigation.

## Data flow

1. A page reads URL controls and calls a query hook.
2. The query hook calls the typed-by-convention API service.
3. Express validates every path, query, or body payload with Zod.
4. A controller invokes the service or repository.
5. Parameterized SQL returns rows and aggregate values.
6. The API sends `{ data, meta? }` or `{ error }`.
7. Mutations invalidate only affected TanStack Query key families.

## Key decisions

- **No ORM:** explicit `pg` SQL keeps database knowledge visible and makes aggregate queries direct.
- **No Redux:** TanStack Query handles server state; local UI state and URL state are sufficient.
- **No authentication in MVP:** appropriate for local portfolio use, but public writes are unsafe.
- **No property images in the schema:** stable local visual placeholders avoid broken third-party
  assets and keep the portfolio focused on data workflows.
- **Database constraint plus service rule:** application messages stay friendly while integrity is
  protected against concurrency and alternate clients.

## Security notes

Helmet sets common security headers, CORS is allow-listed, request sizes are bounded, inputs are
validated, and every SQL value is parameterized. Errors do not expose stack traces in production.
Before a public deployment, add authentication/authorization or disable write routes.
