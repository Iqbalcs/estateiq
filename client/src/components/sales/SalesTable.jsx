import { ArrowRight, CalendarDays, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatCurrency, formatDate } from '../../utils/formatters.js';

export function SalesTable({ sales }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[760px] border-collapse">
        <thead>
          <tr className="border-b border-slate-100 bg-slate-50/70">
            {['Property', 'City', 'Sale date', 'Listed at', 'Sold for', ''].map((header) => (
              <th
                key={header}
                className="px-5 py-3 text-left text-[11px] font-bold tracking-wide text-slate-500 uppercase last:text-right"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sales.map((sale) => (
            <tr
              key={sale.id}
              className="border-b border-slate-100 transition hover:bg-slate-50/60 last:border-0"
            >
              <td className="px-5 py-4">
                <Link
                  to={`/properties/${sale.propertyId}`}
                  className="text-sm font-bold text-navy-950 hover:text-brand-600"
                >
                  {sale.propertyTitle}
                </Link>
                <p className="mt-1 text-xs text-slate-500">{sale.propertyType}</p>
              </td>
              <td className="px-5 py-4">
                <span className="flex items-center gap-1.5 text-sm text-slate-600">
                  <MapPin className="size-3.5 text-brand-600" />
                  {sale.city}
                </span>
              </td>
              <td className="px-5 py-4">
                <span className="flex items-center gap-1.5 whitespace-nowrap text-sm text-slate-600">
                  <CalendarDays className="size-3.5" />
                  {formatDate(sale.soldAt)}
                </span>
              </td>
              <td className="px-5 py-4 text-sm text-slate-500">
                {formatCurrency(sale.listingPrice)}
              </td>
              <td className="px-5 py-4">
                <p className="text-sm font-extrabold text-emerald-700">
                  {formatCurrency(sale.salePrice)}
                </p>
                <p
                  className={`mt-1 text-xs font-semibold ${sale.salePrice >= sale.listingPrice ? 'text-emerald-600' : 'text-amber-600'}`}
                >
                  {sale.salePrice >= sale.listingPrice
                    ? 'At / above asking'
                    : `${Math.round(((sale.listingPrice - sale.salePrice) / sale.listingPrice) * 100)}% below asking`}
                </p>
              </td>
              <td className="px-5 py-4 text-right">
                <Link
                  to={`/properties/${sale.propertyId}`}
                  className="inline-grid size-9 place-items-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-brand-600"
                  aria-label={`View ${sale.propertyTitle}`}
                >
                  <ArrowRight className="size-4" />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
