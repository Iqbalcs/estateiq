import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { env } from './config/env.js';
import { pool } from './db/pool.js';
import { errorHandler, routeNotFound } from './middleware/error-handler.js';
import { analyticsRouter } from './routes/analytics.routes.js';
import { propertyRouter } from './routes/property.routes.js';
import { saleRouter } from './routes/sale.routes.js';
import { asyncHandler } from './utils/async-handler.js';

export function createApp() {
  const app = express();

  app.disable('x-powered-by');
  app.use(helmet());
  app.use(
    cors({
      origin(origin, callback) {
        if (!origin || env.clientOrigins.includes(origin)) return callback(null, true);
        return callback(new Error('Origin is not allowed by CORS'));
      },
    }),
  );
  app.use(express.json({ limit: '100kb' }));
  app.use(
    '/api',
    rateLimit({
      windowMs: 15 * 60 * 1000,
      limit: env.nodeEnv === 'test' ? 10_000 : 500,
      standardHeaders: 'draft-8',
      legacyHeaders: false,
    }),
  );

  app.get(
    '/api/health',
    asyncHandler(async (_request, response) => {
      try {
        await pool.query('SELECT 1');
        response.json({
          data: {
            status: 'ok',
            database: 'connected',
            timestamp: new Date().toISOString(),
          },
        });
      } catch {
        response.status(503).json({
          error: {
            code: 'DATABASE_UNAVAILABLE',
            message: 'The API is running but the database is unavailable',
          },
        });
      }
    }),
  );

  app.use('/api/properties', propertyRouter);
  app.use('/api/sales', saleRouter);
  app.use('/api/analytics', analyticsRouter);
  app.use(routeNotFound);
  app.use(errorHandler);

  return app;
}
