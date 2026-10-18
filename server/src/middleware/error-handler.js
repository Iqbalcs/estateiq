import { env } from '../config/env.js';
import { AppError } from '../utils/app-error.js';

const databaseErrorMap = {
  23503: [409, 'FOREIGN_KEY_CONFLICT', 'This record is referenced by another resource'],
  23505: [409, 'DUPLICATE_RECORD', 'This record already exists'],
  23514: [400, 'CONSTRAINT_VIOLATION', 'The submitted data violates a data constraint'],
};

export function errorHandler(error, _request, response, _next) {
  if (error instanceof AppError) {
    return response.status(error.status).json({
      error: {
        code: error.code,
        message: error.message,
        ...(error.details && { details: error.details }),
      },
    });
  }

  if (databaseErrorMap[error.code]) {
    const [status, code, message] = databaseErrorMap[error.code];
    return response.status(status).json({ error: { code, message } });
  }

  console.error(error);
  return response.status(500).json({
    error: {
      code: 'INTERNAL_ERROR',
      message: 'An unexpected error occurred',
      ...(env.nodeEnv !== 'production' && { details: error.message }),
    },
  });
}

export function routeNotFound(request, response) {
  response.status(404).json({
    error: {
      code: 'ROUTE_NOT_FOUND',
      message: `No route matches ${request.method} ${request.originalUrl}`,
    },
  });
}
