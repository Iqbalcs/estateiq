import { formatCurrency, formatNumber } from '../../utils/formatters.js';

export function ChartTooltip({ active, payload, label, currency = false }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-slate-200 bg-white/95 p-3 shadow-xl backdrop-blur">
      {label && <p className="mb-2 text-xs font-bold text-slate-700">{label}</p>}
      {payload.map((item) => (
        <div
          key={item.dataKey || item.name}
          className="flex items-center justify-between gap-5 text-xs"
        >
          <span className="flex items-center gap-2 text-slate-500">
            <span
              className="size-2 rounded-full"
              style={{ backgroundColor: item.color || item.fill }}
            />
            {item.name}
          </span>
          <span className="font-bold text-slate-800">
            {currency ? formatCurrency(item.value) : formatNumber(item.value)}
          </span>
        </div>
      ))}
    </div>
  );
}
