import { cn } from '../../utils/cn.js';

export function StatusBadge({ status }) {
  const available = status === 'Available';
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold',
        available ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600',
      )}
    >
      <span
        className={cn('size-1.5 rounded-full', available ? 'bg-emerald-500' : 'bg-slate-400')}
        aria-hidden="true"
      />
      {status}
    </span>
  );
}
