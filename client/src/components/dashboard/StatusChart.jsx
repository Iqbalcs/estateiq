import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { EmptyState, ErrorState, Skeleton } from '../ui/Feedback.jsx';
import { Panel, PanelHeader } from '../ui/Panel.jsx';
import { ChartTooltip } from './ChartTooltip.jsx';

export function StatusChart({ query }) {
  const overview = query.data?.data;
  const data = overview
    ? [
        { name: 'Available', value: overview.availableProperties },
        { name: 'Sold', value: overview.soldProperties },
      ]
    : [];
  const colors = ['#176b87', '#d9a441'];
  return (
    <Panel>
      <PanelHeader title="Portfolio status" description="Current available versus sold inventory" />
      <div className="h-[330px] p-5">
        {query.isLoading ? (
          <Skeleton className="h-full w-full" />
        ) : query.isError ? (
          <ErrorState compact onRetry={query.refetch} />
        ) : !overview?.totalProperties ? (
          <EmptyState title="No inventory" message="Add your first property to begin." />
        ) : (
          <div className="grid h-full grid-cols-[1fr_0.85fr] items-center">
            <ResponsiveContainer width="100%" height="90%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  innerRadius="56%"
                  outerRadius="82%"
                  paddingAngle={4}
                  stroke="none"
                >
                  {data.map((item, index) => (
                    <Cell key={item.name} fill={colors[index]} />
                  ))}
                </Pie>
                <Tooltip content={<ChartTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-4">
              {data.map((item, index) => (
                <div key={item.name}>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                    <span className="size-2.5 rounded-full" style={{ background: colors[index] }} />
                    {item.name}
                  </div>
                  <p className="mt-1 text-xl font-extrabold text-navy-950">{item.value}</p>
                  <p className="text-xs text-slate-400">
                    {Math.round((item.value / overview.totalProperties) * 100)}% of portfolio
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Panel>
  );
}
