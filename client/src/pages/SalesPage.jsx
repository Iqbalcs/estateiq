import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { RevenueChart } from '../components/dashboard/RevenueChart.jsx';
import { RecordSaleButton } from '../components/sales/RecordSaleButton.jsx';
import { SalesFilters } from '../components/sales/SalesFilters.jsx';
import { SalesTable } from '../components/sales/SalesTable.jsx';
import { EmptyState, ErrorState } from '../components/ui/Feedback.jsx';
import { PageHeader } from '../components/ui/PageHeader.jsx';
import { Pagination } from '../components/ui/Pagination.jsx';
import { Panel } from '../components/ui/Panel.jsx';
import { useSalesTrend } from '../hooks/useAnalytics.js';
import { useSales } from '../hooks/useSales.js';
import { getApiError } from '../utils/api-error.js';
import { PropertyListSkeleton } from '../components/properties/PropertyListSkeleton.jsx';

const defaults = { page: 1, limit: 10, sortBy: 'sold_at', sortOrder: 'desc' };

export default function SalesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const filters = useMemo(
    () => ({
      page: Number(searchParams.get('page')) || 1,
      limit: 10,
      search: searchParams.get('search') || undefined,
      city: searchParams.get('city') || undefined,
      dateFrom: searchParams.get('dateFrom') || undefined,
      dateTo: searchParams.get('dateTo') || undefined,
      sortBy: searchParams.get('sortBy') || defaults.sortBy,
      sortOrder: searchParams.get('sortOrder') || defaults.sortOrder,
    }),
    [searchParams],
  );
  const salesQuery = useSales(filters);
  const trendQuery = useSalesTrend({ dateFrom: filters.dateFrom, dateTo: filters.dateTo });

  const update = (changes) => {
    const next = new URLSearchParams(searchParams);
    Object.entries({ ...changes, page: changes.page || 1 }).forEach(([key, value]) => {
      if (!value || value === defaults[key]) next.delete(key);
      else next.set(key, String(value));
    });
    setSearchParams(next);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Sales management"
        title="Sales history"
        description="Review actual transaction values and record completed property sales."
        actions={<RecordSaleButton />}
      />
      <RevenueChart query={trendQuery} />
      <Panel className="overflow-hidden">
        <SalesFilters
          key={searchParams.toString()}
          filters={filters}
          onChange={update}
          onReset={() => setSearchParams({})}
        />
        {salesQuery.isLoading ? (
          <PropertyListSkeleton />
        ) : salesQuery.isError ? (
          <ErrorState message={getApiError(salesQuery.error)} onRetry={salesQuery.refetch} />
        ) : !salesQuery.data?.data.length ? (
          <EmptyState
            title="No sales found"
            message="Record a sale or adjust the current filters."
            action={<RecordSaleButton />}
          />
        ) : (
          <SalesTable sales={salesQuery.data.data} />
        )}
        <Pagination
          page={salesQuery.data?.meta.page || filters.page}
          totalPages={salesQuery.data?.meta.totalPages || 0}
          total={salesQuery.data?.meta.total || 0}
          label="sales"
          onPageChange={(page) => update({ page })}
        />
      </Panel>
    </div>
  );
}
