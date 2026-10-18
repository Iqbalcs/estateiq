import { BarChart3 } from 'lucide-react';

export function Brand({ compact = false }) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-500 text-white shadow-lg shadow-brand-500/20">
        <BarChart3 className="size-5" strokeWidth={2.3} />
      </span>
      {!compact && (
        <div>
          <p className="text-lg leading-none font-extrabold tracking-tight text-white">EstateIQ</p>
          <p className="mt-1 text-[10px] font-semibold tracking-[0.14em] text-slate-400 uppercase">
            Property intelligence
          </p>
        </div>
      )}
    </div>
  );
}
