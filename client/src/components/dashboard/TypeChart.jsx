import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { EmptyState, ErrorState, Skeleton } from '../ui/Feedback.jsx';
import { Panel, PanelHeader } from '../ui/Panel.jsx';
import { ChartTooltip } from './ChartTooltip.jsx';

const colors = ['#176b87', '#233d6b', '#d9a441', '#6b7280'];

export function TypeChart({ query }) {
  const data = query.data?.data || [];
  const total = data.reduce((sum, item) => sum + item.value, 0);
  return (
    <Panel>
      <PanelHeader
        title="Property mix"
        description="Current portfolio distribution by property type"
      />
      <div className="grid min-h-[330px] items-center gap-2 p-5 sm:grid-cols-[1fr_0.8fr]">
        {query.isLoading ? (
          <Skeleton className="col-span-full h-64 w-full" />
        ) : query.isError ? (
          <div className="col-span-full">
            <ErrorState compact onRetry={query.refetch} />
          </div>
        ) : !data.length ? (
          <div className="col-span-full">
            <EmptyState
              title="No property types"
              message="Add properties to build the distribution."
            />
          </div>
        ) : (
          <>
            <div className="relative h-56 min-w-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    innerRadius="58%"
                    outerRadius="84%"
                    paddingAngle={3}
                    stroke="none"
                  >
                    {data.map((entry, index) => (
                      <Cell key={entry.name} fill={colors[index % colors.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<ChartTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              <div className="pointer-events-none absolute inset-0 grid place-items-center text-center">
                <div>
                  <p className="text-2xl font-extrabold text-navy-950">{total}</p>
                  <p className="text-[10px] font-bold tracking-wide text-slate-400 uppercase">
                    Properties
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              {data.map((item, index) => (
                <div key={item.name} className="flex items-center justify-between gap-3 text-sm">
                  <span className="flex items-center gap-2 text-slate-600">
                    <span
                      className="size-2.5 rounded-full"
                      style={{ background: colors[index % colors.length] }}
                    />
                    {item.name}
                  </span>
                  <span className="font-bold text-slate-800">{item.value}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </Panel>
  );
}
