import { Router } from 'express';
import { propertyController } from '../controllers/property.controller.js';
import { validate } from '../middleware/validate.js';
import { asyncHandler } from '../utils/async-handler.js';
import {
  createPropertySchema,
  listPropertiesSchema,
  updatePropertySchema,
} from '../validators/property.schemas.js';
import { idParamsSchema } from '../validators/shared.schemas.js';

export const propertyRouter = Router();

propertyRouter.get('/', validate(listPropertiesSchema), asyncHandler(propertyController.list));
propertyRouter.get('/:id', validate(idParamsSchema), asyncHandler(propertyController.get));
propertyRouter.post('/', validate(createPropertySchema), asyncHandler(propertyController.create));
propertyRouter.patch(
  '/:id',
  validate(updatePropertySchema),
  asyncHandler(propertyController.update),
);
propertyRouter.delete('/:id', validate(idParamsSchema), asyncHandler(propertyController.remove));
