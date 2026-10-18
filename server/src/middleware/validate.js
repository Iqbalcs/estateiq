import { AppError } from '../utils/app-error.js';

export const validate = (schema) => (request, _response, next) => {
  const result = schema.safeParse({
    body: request.body,
    query: request.query,
    params: request.params,
  });

  if (!result.success) {
    const details = result.error.issues.map((issue) => ({
      field: issue.path.slice(1).join('.'),
      message: issue.message,
    }));
    return next(new AppError(400, 'VALIDATION_ERROR', 'Request validation failed', details));
  }

  request.validated = result.data;
  return next();
};
