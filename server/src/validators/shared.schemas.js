import { z } from 'zod';

export const idParamsSchema = z.object({
  body: z.unknown(),
  query: z.unknown(),
  params: z.object({ id: z.coerce.number().int().positive() }),
});

export const paginationFields = {
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
};

export const optionalDate = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'Use YYYY-MM-DD')
  .optional();

export const dateRangeSchema = z
  .object({
    dateFrom: optionalDate,
    dateTo: optionalDate,
  })
  .refine((value) => !value.dateFrom || !value.dateTo || value.dateFrom <= value.dateTo, {
    message: 'dateFrom must be on or before dateTo',
    path: ['dateFrom'],
  });
