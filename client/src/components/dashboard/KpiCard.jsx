import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { Panel } from '../ui/Panel.jsx';

export function KpiCard({ label, value, detail, icon: Icon, tone = 'brand', trend }) {
  const tones = {
    brand: 'bg-brand-100 text-brand-600',
    navy: 'bg-blue-50 text-navy-700',
    green: 'bg-emerald-50 text-emerald-700',
    gold: 'bg-amber-50 text-amber-700',
    violet: 'bg-violet-50 text-violet-700',
  };

  return (
    <Panel className="relative overflow-hidden p-5">
      <div className="absolute top-0 right-0 size-24 translate-x-8 -translate-y-8 rounded-full bg-slate-50" />
      <div className="relative flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs font-bold tracking-wide text-slate-500 uppercase">{label}</p>
          <p className="mt-3 truncate text-2xl font-extrabold tracking-tight text-navy-950">
            {value}
          </p>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-500">
            {trend != null && (
              <span className={trend >= 0 ? 'text-emerald-600' : 'text-red-600'}>
                {trend >= 0 ? (
                  <ArrowUpRight className="inline size-3.5" />
                ) : (
                  <ArrowDownRight className="inline size-3.5" />
                )}
              </span>
            )}
            <span>{detail}</span>
          </div>
        </div>
        <span className={`grid size-11 shrink-0 place-items-center rounded-xl ${tones[tone]}`}>
          <Icon className="size-5" strokeWidth={2} aria-hidden="true" />
        </span>
      </div>
    </Panel>
  );
}
