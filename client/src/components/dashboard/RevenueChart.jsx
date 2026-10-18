import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { formatCurrency } from '../../utils/formatters.js';
import { EmptyState, ErrorState, Skeleton } from '../ui/Feedback.jsx';
import { Panel, PanelHeader } from '../ui/Panel.jsx';
import { ChartTooltip } from './ChartTooltip.jsx';

export function RevenueChart({ query }) {
  const data = query.data?.data || [];
  return (
    <Panel>
      <PanelHeader
        title="Monthly sales revenue"
        description="Actual sale value across the selected reporting period"
      />
      <div className="h-[330px] p-3 pt-5 sm:p-6">
        {query.isLoading ? (
          <Skeleton className="h-full w-full" />
        ) : query.isError ? (
          <ErrorState compact onRetry={query.refetch} />
        ) : !data.length ? (
          <EmptyState
            title="No revenue data"
            message="Try a wider date range or record the first sale."
          />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid stroke="#e8edf4" strokeDasharray="4 4" vertical={false} />
              <XAxis
                dataKey="label"
                tick={{ fill: '#64748b', fontSize: 11 }}
                tickLine={false}
                axisLine={false}
                minTickGap={24}
              />
              <YAxis
                tickFormatter={(value) => formatCurrency(value, true).replace('PKR', '').trim()}
                tick={{ fill: '#64748b', fontSize: 11 }}
                tickLine={false}
                axisLine={false}
                width={58}
              />
              <Tooltip content={<ChartTooltip currency />} />
              <Line
                type="monotone"
                dataKey="revenue"
                name="Revenue"
                stroke="#176b87"
                strokeWidth={3}
                dot={{ r: 3, fill: '#176b87', strokeWidth: 0 }}
                activeDot={{ r: 6, fill: '#d9a441', stroke: '#fff', strokeWidth: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </Panel>
  );
}
