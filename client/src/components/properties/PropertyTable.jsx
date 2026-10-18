import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Bath, BedDouble, Eye, MapPin, Pencil, Ruler, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatCurrency, formatDate, formatNumber } from '../../utils/formatters.js';
import { Button } from '../ui/Button.jsx';
import { StatusBadge } from '../ui/StatusBadge.jsx';
import { PropertyVisual } from './PropertyVisual.jsx';

const columnHelper = createColumnHelper();

export function PropertyTable({ properties, onDelete }) {
  const columns = [
    columnHelper.accessor('title', {
      header: 'Property',
      cell: ({ row }) => (
        <div className="flex min-w-64 items-center gap-3">
          <PropertyVisual
            type={row.original.propertyType}
            city={row.original.city}
            className="min-h-14 w-16 shrink-0 rounded-xl p-2 [&_span:first-of-type]:hidden [&_span:last-of-type]:size-8"
          />
          <div className="min-w-0">
            <Link
              to={`/properties/${row.original.id}`}
              className="block truncate text-sm font-bold text-navy-950 hover:text-brand-600"
            >
              {row.original.title}
            </Link>
            <p className="mt-1 flex items-center gap-1 truncate text-xs text-slate-500">
              <MapPin className="size-3 shrink-0" />
              {row.original.city} · {row.original.address}
            </p>
          </div>
        </div>
      ),
    }),
    columnHelper.accessor('propertyType', {
      header: 'Type',
      cell: (info) => (
        <span className="text-sm font-semibold text-slate-600">{info.getValue()}</span>
      ),
    }),
    columnHelper.accessor('listingPrice', {
      header: 'Listing price',
      cell: (info) => (
        <span className="whitespace-nowrap text-sm font-bold text-slate-800">
          {formatCurrency(info.getValue())}
        </span>
      ),
    }),
    columnHelper.accessor('areaSqft', {
      header: 'Details',
      cell: ({ row }) => (
        <div className="space-y-1 text-xs text-slate-500">
          <p className="flex items-center gap-1">
            <Ruler className="size-3" />
            {formatNumber(row.original.areaSqft)} sq ft
          </p>
          <p className="flex items-center gap-2">
            <span className="flex items-center gap-1">
              <BedDouble className="size-3" />
              {row.original.bedrooms}
            </span>
            <span className="flex items-center gap-1">
              <Bath className="size-3" />
              {row.original.bathrooms}
            </span>
          </p>
        </div>
      ),
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      cell: (info) => <StatusBadge status={info.getValue()} />,
    }),
    columnHelper.accessor('createdAt', {
      header: 'Listed',
      cell: (info) => (
        <span className="whitespace-nowrap text-xs text-slate-500">
          {formatDate(info.getValue())}
        </span>
      ),
    }),
    columnHelper.display({
      id: 'actions',
      header: () => <span className="sr-only">Actions</span>,
      cell: ({ row }) => (
        <div className="flex justify-end gap-1">
          <Link
            to={`/properties/${row.original.id}`}
            className="grid size-9 place-items-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-brand-600"
            aria-label={`View ${row.original.title}`}
          >
            <Eye className="size-4" />
          </Link>
          <Link
            to={`/properties/${row.original.id}/edit`}
            className="grid size-9 place-items-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-brand-600"
            aria-label={`Edit ${row.original.title}`}
          >
            <Pencil className="size-4" />
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="size-9 min-h-9 hover:bg-red-50 hover:text-red-600"
            onClick={() => onDelete(row.original)}
            disabled={row.original.status === 'Sold'}
            aria-label={`Delete ${row.original.title}`}
            title={
              row.original.status === 'Sold'
                ? 'Sold properties cannot be deleted'
                : 'Delete property'
            }
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      ),
    }),
  ];

  // TanStack Table intentionally returns a stateful table API that React Compiler skips.
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({ data: properties, columns, getCoreRowModel: getCoreRowModel() });

  return (
    <>
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/70">
              {table.getHeaderGroups()[0].headers.map((header) => (
                <th
                  key={header.id}
                  className="px-5 py-3 text-left text-[11px] font-bold tracking-wide text-slate-500 uppercase last:text-right"
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="border-b border-slate-100 transition hover:bg-slate-50/60 last:border-0"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-5 py-4 align-middle">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="divide-y divide-slate-100 md:hidden">
        {properties.map((property) => (
          <article key={property.id} className="p-4">
            <PropertyVisual
              type={property.propertyType}
              city={property.city}
              className="min-h-36 rounded-xl"
            />
            <div className="mt-4 flex items-start justify-between gap-3">
              <div>
                <Link to={`/properties/${property.id}`} className="font-bold text-navy-950">
                  {property.title}
                </Link>
                <p className="mt-1 text-xs text-slate-500">{property.address}</p>
              </div>
              <StatusBadge status={property.status} />
            </div>
            <p className="mt-3 text-lg font-extrabold text-navy-950">
              {formatCurrency(property.listingPrice)}
            </p>
            <div className="mt-3 flex items-center gap-4 text-xs text-slate-500">
              <span>{formatNumber(property.areaSqft)} sq ft</span>
              <span>{property.bedrooms} beds</span>
              <span>{property.bathrooms} baths</span>
            </div>
            <div className="mt-4 flex gap-2">
              <Link
                to={`/properties/${property.id}`}
                className="inline-flex min-h-10 flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700"
              >
                <Eye className="size-4" />
                Details
              </Link>
              <Link
                to={`/properties/${property.id}/edit`}
                className="grid size-10 place-items-center rounded-xl border border-slate-200 text-slate-600"
              >
                <Pencil className="size-4" />
              </Link>
              <Button
                variant="ghost"
                size="icon"
                className="size-10 min-h-10 text-red-500"
                onClick={() => onDelete(property)}
                disabled={property.status === 'Sold'}
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
