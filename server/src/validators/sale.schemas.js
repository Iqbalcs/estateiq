import { z } from 'zod';
import { dateRangeSchema, paginationFields } from './shared.schemas.js';

const pakistanDateFormatter = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Asia/Karachi',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

const dateNotFuture = (value) => {
  const parts = Object.fromEntries(
    pakistanDateFormatter
      .formatToParts(new Date())
      .filter((part) => part.type !== 'literal')
      .map((part) => [part.type, part.value]),
  );
  const todayInPakistan = `${parts.year}-${parts.month}-${parts.day}`;
  return value <= todayInPakistan;
};

export const createSaleSchema = z.object({
  body: z.object({
    propertyId: z.coerce.number().int().positive(),
    salePrice: z.coerce.number().positive().max(999_999_999_999.99),
    soldAt: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, 'Use YYYY-MM-DD')
      .refine(dateNotFuture, 'Sale date cannot be in the future'),
  }),
  query: z.unknown(),
  params: z.unknown(),
});

export const listSalesSchema = z.object({
  body: z.unknown(),
  params: z.unknown(),
  query: z
    .object({
      ...paginationFields,
      search: z.string().trim().max(120).optional(),
      city: z.string().trim().max(80).optional(),
      dateFrom: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, 'Use YYYY-MM-DD')
        .optional(),
      dateTo: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, 'Use YYYY-MM-DD')
        .optional(),
      sortBy: z.enum(['sold_at', 'sale_price']).default('sold_at'),
      sortOrder: z.enum(['asc', 'desc']).default('desc'),
    })
    .superRefine((value, context) => {
      const range = dateRangeSchema.safeParse({ dateFrom: value.dateFrom, dateTo: value.dateTo });
      if (!range.success) {
        context.addIssue({
          code: 'custom',
          path: ['dateFrom'],
          message: 'dateFrom must be on or before dateTo',
        });
      }
    }),
});
