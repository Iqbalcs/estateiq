// Visual-QA fixture only. Normal development and production always use PostgreSQL.
import { createApp } from '../../src/app.js';
import { analyticsRepository } from '../../src/repositories/analytics.repository.js';
import { propertyRepository } from '../../src/repositories/property.repository.js';
import { saleRepository } from '../../src/repositories/sale.repository.js';
import { saleService } from '../../src/services/sale.service.js';

const properties = [
  {
    id: 1,
    title: 'DHA Phase 6 Family Villa',
    description: 'Sunlit family villa with a landscaped lawn, study, and generous living spaces.',
    city: 'Lahore',
    address: 'Street 18, DHA Phase 6',
    propertyType: 'House',
    listingPrice: 68500000,
    areaSqft: 4500,
    bedrooms: 5,
    bathrooms: 6,
    status: 'Sold',
    createdAt: '2025-09-08T00:00:00.000Z',
    updatedAt: '2026-01-18T00:00:00.000Z',
  },
  {
    id: 2,
    title: 'Gulberg Executive Apartment',
    description: 'Modern apartment with city views, secure parking, and backup power.',
    city: 'Lahore',
    address: 'Main Boulevard, Gulberg III',
    propertyType: 'Apartment',
    listingPrice: 24500000,
    areaSqft: 1650,
    bedrooms: 3,
    bathrooms: 3,
    status: 'Available',
    createdAt: '2026-08-21T00:00:00.000Z',
    updatedAt: '2026-08-21T00:00:00.000Z',
  },
  {
    id: 3,
    title: 'Bahria Orchard Corner House',
    description: 'Corner home close to the community park with a separate drawing room.',
    city: 'Lahore',
    address: 'Block E, Bahria Orchard',
    propertyType: 'House',
    listingPrice: 32800000,
    areaSqft: 2250,
    bedrooms: 4,
    bathrooms: 4,
    status: 'Sold',
    createdAt: '2025-08-14T00:00:00.000Z',
    updatedAt: '2025-11-03T00:00:00.000Z',
  },
  {
    id: 4,
    title: 'F-11 Park View Apartment',
    description: 'Well-planned apartment overlooking a park with lift and covered parking.',
    city: 'Islamabad',
    address: 'F-11 Markaz',
    propertyType: 'Apartment',
    listingPrice: 31500000,
    areaSqft: 1900,
    bedrooms: 3,
    bathrooms: 3,
    status: 'Sold',
    createdAt: '2025-10-02T00:00:00.000Z',
    updatedAt: '2025-12-12T00:00:00.000Z',
  },
  {
    id: 5,
    title: 'Bani Gala Hillside Home',
    description: 'Quiet hillside home with wide terraces and views toward Rawal Lake.',
    city: 'Islamabad',
    address: 'Street 9, Bani Gala',
    propertyType: 'House',
    listingPrice: 57500000,
    areaSqft: 3800,
    bedrooms: 5,
    bathrooms: 5,
    status: 'Available',
    createdAt: '2026-05-11T00:00:00.000Z',
    updatedAt: '2026-05-11T00:00:00.000Z',
  },
  {
    id: 6,
    title: 'Clifton Sea View Apartment',
    description: 'Spacious apartment with sea-facing windows and a staffed reception.',
    city: 'Karachi',
    address: 'Block 2, Clifton',
    propertyType: 'Apartment',
    listingPrice: 47500000,
    areaSqft: 2350,
    bedrooms: 4,
    bathrooms: 4,
    status: 'Sold',
    createdAt: '2025-07-12T00:00:00.000Z',
    updatedAt: '2025-10-21T00:00:00.000Z',
  },
  {
    id: 7,
    title: 'Scheme 33 Residential Plot',
    description: 'West-open plot in a growing gated community with paved access.',
    city: 'Karachi',
    address: 'Sector 27-A, Scheme 33',
    propertyType: 'Plot',
    listingPrice: 14200000,
    areaSqft: 2160,
    bedrooms: 0,
    bathrooms: 0,
    status: 'Available',
    createdAt: '2026-08-07T00:00:00.000Z',
    updatedAt: '2026-08-07T00:00:00.000Z',
  },
  {
    id: 8,
    title: 'Bahria Town Designer House',
    description: 'Designer home featuring double-height living and a private courtyard.',
    city: 'Rawalpindi',
    address: 'Overseas Enclave, Bahria Town',
    propertyType: 'House',
    listingPrice: 46500000,
    areaSqft: 3100,
    bedrooms: 5,
    bathrooms: 5,
    status: 'Sold',
    createdAt: '2025-09-25T00:00:00.000Z',
    updatedAt: '2026-04-07T00:00:00.000Z',
  },
  {
    id: 9,
    title: 'Askari 14 Family Apartment',
    description: 'Secure family apartment with playground access and reserved parking.',
    city: 'Rawalpindi',
    address: 'Sector B, Askari 14',
    propertyType: 'Apartment',
    listingPrice: 18750000,
    areaSqft: 1450,
    bedrooms: 3,
    bathrooms: 3,
    status: 'Available',
    createdAt: '2026-09-17T00:00:00.000Z',
    updatedAt: '2026-09-17T00:00:00.000Z',
  },
  {
    id: 10,
    title: 'University Town Residence',
    description: 'Updated residence with two lounges and a compact private garden.',
    city: 'Peshawar',
    address: 'Road 4, University Town',
    propertyType: 'House',
    listingPrice: 49800000,
    areaSqft: 3600,
    bedrooms: 5,
    bathrooms: 5,
    status: 'Available',
    createdAt: '2026-03-19T00:00:00.000Z',
    updatedAt: '2026-03-19T00:00:00.000Z',
  },
  {
    id: 11,
    title: 'Saddar Trade Centre Office',
    description: 'Ready-to-use office with reception, cabins, and a conference room.',
    city: 'Peshawar',
    address: 'Saddar Road',
    propertyType: 'Commercial',
    listingPrice: 26400000,
    areaSqft: 1800,
    bedrooms: 0,
    bathrooms: 2,
    status: 'Available',
    createdAt: '2026-07-09T00:00:00.000Z',
    updatedAt: '2026-07-09T00:00:00.000Z',
  },
  {
    id: 12,
    title: 'Johar Town Retail Unit',
    description: 'Ground-floor commercial unit on a busy market corridor.',
    city: 'Lahore',
    address: 'G1 Market, Johar Town',
    propertyType: 'Commercial',
    listingPrice: 29500000,
    areaSqft: 900,
    bedrooms: 0,
    bathrooms: 1,
    status: 'Available',
    createdAt: '2026-09-02T00:00:00.000Z',
    updatedAt: '2026-09-02T00:00:00.000Z',
  },
];

const sales = [
  { id: 1, propertyId: 1, salePrice: 65750000, soldAt: '2026-01-18' },
  { id: 2, propertyId: 3, salePrice: 31500000, soldAt: '2025-11-03' },
  { id: 3, propertyId: 4, salePrice: 30250000, soldAt: '2025-12-12' },
  { id: 4, propertyId: 6, salePrice: 45100000, soldAt: '2025-10-21' },
  { id: 5, propertyId: 8, salePrice: 44750000, soldAt: '2026-04-07' },
];

const joinedSales = () =>
  sales.map((sale) => {
    const property = properties.find((item) => item.id === sale.propertyId);
    return {
      ...sale,
      createdAt: `${sale.soldAt}T12:00:00.000Z`,
      propertyTitle: property.title,
      city: property.city,
      address: property.address,
      propertyType: property.propertyType,
      listingPrice: property.listingPrice,
    };
  });

propertyRepository.list = async (filters) => {
  let result = [...properties];
  if (filters.search)
    result = result.filter((item) =>
      `${item.title} ${item.address} ${item.city}`
        .toLowerCase()
        .includes(filters.search.toLowerCase()),
    );
  if (filters.city) result = result.filter((item) => item.city === filters.city);
  if (filters.propertyType)
    result = result.filter((item) => item.propertyType === filters.propertyType);
  if (filters.status) result = result.filter((item) => item.status === filters.status);
  const direction = filters.sortOrder === 'asc' ? 1 : -1;
  const key = filters.sortBy === 'listing_price' ? 'listingPrice' : 'createdAt';
  result.sort((left, right) => (left[key] > right[key] ? direction : -direction));
  const offset = (filters.page - 1) * filters.limit;
  return { items: result.slice(offset, offset + filters.limit), total: result.length };
};

propertyRepository.findById = async (id) => {
  const property = properties.find((item) => item.id === Number(id));
  if (!property) return null;
  const sale = joinedSales().find((item) => item.propertyId === property.id);
  return {
    ...property,
    sale: sale
      ? { id: sale.id, salePrice: sale.salePrice, soldAt: sale.soldAt, createdAt: sale.createdAt }
      : null,
  };
};

propertyRepository.create = async (input) => {
  const now = new Date().toISOString();
  const property = {
    id: Math.max(...properties.map((item) => item.id)) + 1,
    ...input,
    status: 'Available',
    createdAt: now,
    updatedAt: now,
  };
  properties.unshift(property);
  return property;
};

propertyRepository.update = async (id, input) => {
  const index = properties.findIndex((item) => item.id === Number(id));
  if (index < 0) return null;
  properties[index] = { ...properties[index], ...input, updatedAt: new Date().toISOString() };
  return properties[index];
};

propertyRepository.remove = async (id) => {
  const index = properties.findIndex((item) => item.id === Number(id));
  if (index < 0) return false;
  properties.splice(index, 1);
  return true;
};

saleRepository.list = async (filters) => {
  let result = joinedSales();
  if (filters.search)
    result = result.filter((item) =>
      `${item.propertyTitle} ${item.city}`.toLowerCase().includes(filters.search.toLowerCase()),
    );
  if (filters.city) result = result.filter((item) => item.city === filters.city);
  if (filters.dateFrom) result = result.filter((item) => item.soldAt >= filters.dateFrom);
  if (filters.dateTo) result = result.filter((item) => item.soldAt <= filters.dateTo);
  const direction = filters.sortOrder === 'asc' ? 1 : -1;
  const key = filters.sortBy === 'sale_price' ? 'salePrice' : 'soldAt';
  result.sort((left, right) => (left[key] > right[key] ? direction : -direction));
  const offset = (filters.page - 1) * filters.limit;
  return { items: result.slice(offset, offset + filters.limit), total: result.length };
};

saleService.create = async (input) => {
  const property = properties.find((item) => item.id === input.propertyId);
  if (!property || property.status !== 'Available') throw new Error('Property is not available');
  property.status = 'Sold';
  const sale = { id: sales.length + 1, ...input };
  sales.push(sale);
  return { ...sale, propertyTitle: property.title };
};

const withinRange = (sale, range) =>
  (!range.dateFrom || sale.soldAt >= range.dateFrom) &&
  (!range.dateTo || sale.soldAt <= range.dateTo);

analyticsRepository.overview = async (range) => {
  const periodSales = sales.filter((sale) => withinRange(sale, range));
  const revenue = periodSales.reduce((sum, sale) => sum + sale.salePrice, 0);
  return {
    totalProperties: properties.length,
    availableProperties: properties.filter((item) => item.status === 'Available').length,
    soldProperties: properties.filter((item) => item.status === 'Sold').length,
    totalSalesRevenue: revenue,
    averageSalePrice: periodSales.length ? revenue / periodSales.length : 0,
  };
};

analyticsRepository.salesTrend = async (range) => {
  const months = [];
  const start = new Date(`${range.dateFrom || '2025-11-01'}T00:00:00Z`);
  const end = new Date(`${range.dateTo || '2026-10-17'}T00:00:00Z`);
  const cursor = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), 1));
  while (cursor <= end && months.length < 36) {
    const month = cursor.toISOString().slice(0, 7);
    const monthSales = sales.filter(
      (sale) => sale.soldAt.startsWith(month) && withinRange(sale, range),
    );
    months.push({
      month,
      label: cursor.toLocaleDateString('en-PK', {
        month: 'short',
        year: 'numeric',
        timeZone: 'UTC',
      }),
      revenue: monthSales.reduce((sum, sale) => sum + sale.salePrice, 0),
      salesCount: monthSales.length,
    });
    cursor.setUTCMonth(cursor.getUTCMonth() + 1);
  }
  return months;
};

analyticsRepository.propertyTypes = async () =>
  Object.entries(Object.groupBy(properties, (item) => item.propertyType))
    .map(([name, items]) => ({ name, value: items.length }))
    .sort((left, right) => right.value - left.value);
analyticsRepository.cities = async () =>
  Object.entries(Object.groupBy(properties, (item) => item.city))
    .map(([name, items]) => ({
      name,
      value: items.length,
      available: items.filter((item) => item.status === 'Available').length,
      sold: items.filter((item) => item.status === 'Sold').length,
    }))
    .sort((left, right) => right.value - left.value);

const app = createApp();
const server = app.listen(5000, () =>
  console.info('Visual-QA fixture API listening on http://localhost:5000'),
);
process.on('SIGINT', () => server.close(() => process.exit(0)));
process.on('SIGTERM', () => server.close(() => process.exit(0)));
