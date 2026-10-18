import { Router } from 'express';
import { analyticsController } from '../controllers/analytics.controller.js';
import { validate } from '../middleware/validate.js';
import { asyncHandler } from '../utils/async-handler.js';
import { analyticsRangeSchema } from '../validators/analytics.schemas.js';

export const analyticsRouter = Router();

analyticsRouter.get(
  '/overview',
  validate(analyticsRangeSchema),
  asyncHandler(analyticsController.overview),
);
analyticsRouter.get(
  '/sales-trend',
  validate(analyticsRangeSchema),
  asyncHandler(analyticsController.salesTrend),
);
analyticsRouter.get('/property-types', asyncHandler(analyticsController.propertyTypes));
analyticsRouter.get('/cities', asyncHandler(analyticsController.cities));
