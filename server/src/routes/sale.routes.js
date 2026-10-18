import { Router } from 'express';
import { saleController } from '../controllers/sale.controller.js';
import { validate } from '../middleware/validate.js';
import { asyncHandler } from '../utils/async-handler.js';
import { createSaleSchema, listSalesSchema } from '../validators/sale.schemas.js';

export const saleRouter = Router();

saleRouter.get('/', validate(listSalesSchema), asyncHandler(saleController.list));
saleRouter.post('/', validate(createSaleSchema), asyncHandler(saleController.create));
