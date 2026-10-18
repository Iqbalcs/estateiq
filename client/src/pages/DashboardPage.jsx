import { Banknote, Building2, CircleCheckBig, Landmark, Tags } from 'lucide-react';
import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CityChart } from '../components/dashboard/CityChart.jsx';
import { DashboardSkeleton } from '../components/dashboard/DashboardSkeleton.jsx';
import { DateRangeFilter } from '../components/dashboard/DateRangeFilter.jsx';
import { KpiCard } from '../components/dashboard/KpiCard.jsx';
import { RevenueChart } from '../components/dashboard/RevenueChart.jsx';
import { StatusChart } from '../components/dashboard/StatusChart.jsx';
import { TypeChart } from '../components/dashboard/TypeChart.jsx';
import { ErrorState } from '../components/ui/Feedback.jsx';
import { PageHeader } from '../components/ui/PageHeader.jsx';
import { useCities, useOverview, usePropertyTypes, useSalesTrend } from '../hooks/useAnalytics.js';
import { formatCurrency, formatNumber } from '../utils/formatters.js';

export default function DashboardPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const range = useMemo(
    () => ({
      ...(searchParams.get('dateFrom') && { dateFrom: searchParams.get('dateFrom') }),
      ...(searchParams.get('dateTo') && { dateTo: searchParams.get('dateTo') }),
    }),
    [searchParams],
  );

  const overview = useOverview(range);
  const trend = useSalesTrend(range);
  const types = usePropertyTypes();
  const cities = useCities();

  const updateRange = (next) => {
    const params = new URLSearchParams();
    if (next.dateFrom) params.set('dateFrom', next.dateFrom);
    if (next.dateTo) params.set('dateTo', next.dateTo);
    setSearchParams(params);
  };

  const retryAll = () => {
    overview.refetch();
    trend.refetch();
    types.refetch();
    cities.refetch();
  };

  const data = overview.data?.data;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Analytics dashboard"
        title="A clearer view of your portfolio"
        description="Track inventory, sales performance, and market distribution from live property and transaction data."
      />
      <DateRangeFilter
        key={`${range.dateFrom || ''}:${range.dateTo || ''}`}
        value={range}
        onChange={updateRange}
      />

      {overview.isLoading ? (
        <DashboardSkeleton />
      ) : overview.isError ? (
        <div className="rounded-2xl border border-slate-200 bg-white shadow-panel">
          <ErrorState
            message="We couldn't retrieve portfolio analytics. Confirm that the API and PostgreSQL are available."
            onRetry={retryAll}
          />
        </div>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            <KpiCard
              label="Total properties"
              value={formatNumber(data.totalProperties)}
              detail="All portfolio listings"
              icon={Building2}
              tone="navy"
            />
            <KpiCard
              label="Available"
              value={formatNumber(data.availableProperties)}
              detail="Ready for sale"
              icon={Tags}
              tone="brand"
            />
            <KpiCard
              label="Sold"
              value={formatNumber(data.soldProperties)}
              detail="Recorded transactions"
              icon={CircleCheckBig}
              tone="green"
            />
            <KpiCard
              label="Sales revenue"
              value={formatCurrency(data.totalSalesRevenue, true)}
              detail={range.dateFrom || range.dateTo ? 'Selected period' : 'All recorded sales'}
              icon={Banknote}
              tone="gold"
            />
            <KpiCard
              label="Average sale"
              value={formatCurrency(data.averageSalePrice, true)}
              detail="Actual transaction value"
              icon={Landmark}
              tone="violet"
            />
          </div>
          <div className="grid gap-6 xl:grid-cols-[1.65fr_1fr]">
            <RevenueChart query={trend} />
            <TypeChart query={types} />
            <CityChart query={cities} />
            <StatusChart query={overview} />
          </div>
        </>
      )}
    </div>
  );
}
