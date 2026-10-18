# EstateIQ

EstateIQ is a full-stack real estate portfolio management and analytics application. It provides a responsive workspace for managing property listings, recording sales, and monitoring portfolio performance across Pakistani cities.

> All property and sales data included in this repository is fictional and intended for demonstration purposes.

## Features

- Analytics dashboard with date filters, key metrics, revenue trends, property mix, city distribution, and inventory status
- Property catalogue with server-side search, filtering, sorting, and pagination
- Create, view, edit, and delete workflows for eligible properties
- Sales recording with actual transaction values and searchable sales history
- Transaction-safe sale processing that prevents duplicate sales and updates property status atomically
- Request validation, consistent API errors, rate limiting, CORS, and secure HTTP headers
- Responsive layouts with loading, empty, validation, error, and not-found states

## Screenshots

### Dashboard overview

![EstateIQ dashboard overview](Screenshot/dashboard-overview.png)

### Portfolio analytics

![Monthly sales revenue and property mix](Screenshot/dashboard-revenue-property-mix.png)

![Inventory by city and portfolio status](Screenshot/dashboard-city-status.png)

### Property management

![EstateIQ property catalogue](Screenshot/properties.png)

### Sales history

![EstateIQ sales history](Screenshot/sales-history.png)

## Tech stack

| Area                 | Technologies                               |
| -------------------- | ------------------------------------------ |
| Frontend             | React 19, Vite, Tailwind CSS, React Router |
| Data and charts      | TanStack Query, TanStack Table, Recharts   |
| Forms and validation | React Hook Form, Zod                       |
| Backend              | Node.js, Express, PostgreSQL (`pg`)        |
| Testing              | Vitest, React Testing Library, Supertest   |
| Code quality         | ESLint, Prettier                           |

## Architecture

```text
React UI
  -> Axios and TanStack Query
  -> Express routes and Zod validation
  -> Controllers -> services -> repositories
  -> PostgreSQL
```

The backend uses parameterized SQL instead of an ORM. Recording a sale runs inside a database transaction: the property row is locked and checked, the sale is created, and the property is marked as sold. A unique database constraint on `sales.property_id` provides an additional concurrency safeguard.

## Getting started

### Prerequisites

- Node.js 22.22.2 or newer
- npm 10 or newer
- PostgreSQL 15 or newer

### Installation

1. Clone the repository and install all workspace dependencies:

   ```bash
   git clone <your-repository-url>
   cd estateiq
   npm install
   ```

2. Create a local PostgreSQL database:

   ```bash
   createdb estateiq
   ```

3. Copy the environment template:

   ```bash
   cp .env.example .env
   ```

   On Windows PowerShell, use `Copy-Item .env.example .env` instead. Update `DATABASE_URL` in `.env` if your PostgreSQL credentials differ from the defaults.

4. Apply the schema and load the fictional development data:

   ```bash
   npm run db:migrate
   npm run db:seed
   ```

5. Start the frontend and API:

   ```bash
   npm run dev
   ```

The application is available at `http://localhost:5173`. The API runs at `http://localhost:5000/api`, with a health check at `http://localhost:5000/api/health`.

## Environment variables

| Variable        | Default                                                  | Purpose                                                  |
| --------------- | -------------------------------------------------------- | -------------------------------------------------------- |
| `PORT`          | `5000`                                                   | Express server port                                      |
| `DATABASE_URL`  | `postgresql://postgres:postgres@localhost:5432/estateiq` | PostgreSQL connection string                             |
| `DATABASE_SSL`  | `false`                                                  | Enables SSL for hosted PostgreSQL                        |
| `CLIENT_ORIGIN` | `http://localhost:5173`                                  | Allowed frontend origin; accepts comma-separated origins |
| `VITE_API_URL`  | `/api`                                                   | Optional frontend API base URL                           |

Keep `.env` files private. Only `.env.example` should be committed.

## Available commands

| Command                 | Description                                      |
| ----------------------- | ------------------------------------------------ |
| `npm run dev`           | Start the client and API in development mode     |
| `npm run build`         | Build the frontend for production                |
| `npm run lint`          | Lint both workspaces                             |
| `npm test`              | Run backend and frontend tests                   |
| `npm run test:coverage` | Run the test suites with coverage                |
| `npm run format:check`  | Check formatting                                 |
| `npm run db:migrate`    | Apply pending database migrations                |
| `npm run db:seed`       | Reset EstateIQ tables with development seed data |

## API overview

| Resource   | Endpoints                                                                   |
| ---------- | --------------------------------------------------------------------------- |
| Health     | `GET /api/health`                                                           |
| Properties | `GET/POST /api/properties`, `GET/PATCH/DELETE /api/properties/:id`          |
| Sales      | `GET/POST /api/sales`                                                       |
| Analytics  | `GET /api/analytics/overview`, `/sales-trend`, `/property-types`, `/cities` |

API responses use a `data` object and optional pagination metadata. Errors use a consistent `error` object. See the [API documentation](docs/API.md) for filters, validation rules, and sample responses.

## Project structure

```text
estateiq/
|-- client/       React and Vite frontend
|-- server/       Express API, business logic, and tests
|-- database/     PostgreSQL migrations and seed data
|-- docs/         Product, architecture, database, and API documentation
|-- Screenshot/   Application screenshots
`-- README.md
```

## Documentation

- [Product requirements](docs/PRD.md)
- [Architecture](docs/ARCHITECTURE.md)
- [Database design](docs/DATABASE.md)
- [API reference](docs/API.md)

## Important note

EstateIQ is currently a single-user demonstration project without authentication or authorization. Add access controls before exposing write endpoints publicly.

## License

No open-source license has been added yet.
