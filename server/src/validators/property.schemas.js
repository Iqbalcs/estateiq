import { z } from 'zod';
import { paginationFields } from './shared.schemas.js';

const propertyFields = {
  title: z.string().trim().min(3).max(160),
  description: z.string().trim().min(10).max(4000),
  city: z.string().trim().min(2).max(80),
  address: z.string().trim().min(5).max(220),
  propertyType: z.enum(['House', 'Apartment', 'Commercial', 'Plot']),
  listingPrice: z.coerce.number().positive().max(999_999_999_999.99),
  areaSqft: z.coerce.number().int().positive().max(10_000_000),
  bedrooms: z.coerce.number().int().min(0).max(100),
  bathrooms: z.coerce.number().int().min(0).max(100),
};

export const createPropertySchema = z.object({
  body: z.object(propertyFields),
  query: z.unknown(),
  params: z.unknown(),
});

export const updatePropertySchema = z.object({
  body: z
    .object(propertyFields)
    .partial()
    .refine((body) => Object.keys(body).length > 0, {
      message: 'Provide at least one property field',
    }),
  query: z.unknown(),
  params: z.object({ id: z.coerce.number().int().positive() }),
});

export const listPropertiesSchema = z.object({
  body: z.unknown(),
  params: z.unknown(),
  query: z.object({
    ...paginationFields,
    search: z.string().trim().max(120).optional(),
    city: z.string().trim().max(80).optional(),
    propertyType: z.enum(['House', 'Apartment', 'Commercial', 'Plot']).optional(),
    status: z.enum(['Available', 'Sold']).optional(),
    sortBy: z.enum(['created_at', 'listing_price']).default('created_at'),
    sortOrder: z.enum(['asc', 'desc']).default('desc'),
  }),
});
