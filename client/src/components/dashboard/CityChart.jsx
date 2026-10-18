import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { EmptyState, ErrorState, Skeleton } from '../ui/Feedback.jsx';
import { Panel, PanelHeader } from '../ui/Panel.jsx';
import { ChartTooltip } from './ChartTooltip.jsx';

export function CityChart({ query }) {
  const data = query.data?.data || [];
  return (
    <Panel>
      <PanelHeader
        title="Inventory by city"
        description="Available and sold properties across key markets"
      />
      <div className="h-[330px] p-3 pt-5 sm:p-6">
        {query.isLoading ? (
          <Skeleton className="h-full w-full" />
        ) : query.isError ? (
          <ErrorState compact onRetry={query.refetch} />
        ) : !data.length ? (
          <EmptyState title="No city data" message="Add properties to compare markets." />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 5, right: 5, left: -22, bottom: 0 }}>
              <CartesianGrid stroke="#e8edf4" strokeDasharray="4 4" vertical={false} />
              <XAxis
                dataKey="name"
                tick={{ fill: '#64748b', fontSize: 11 }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                allowDecimals={false}
                tick={{ fill: '#64748b', fontSize: 11 }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip content={<ChartTooltip />} />
              <Bar
                dataKey="available"
                name="Available"
                stackId="status"
                fill="#176b87"
                radius={[0, 0, 4, 4]}
              />
              <Bar
                dataKey="sold"
                name="Sold"
                stackId="status"
                fill="#d9a441"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </Panel>
  );
}
