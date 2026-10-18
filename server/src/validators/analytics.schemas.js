import { z } from 'zod';
import { dateRangeSchema } from './shared.schemas.js';

export const analyticsRangeSchema = z.object({
  body: z.unknown(),
  params: z.unknown(),
  query: dateRangeSchema,
});
