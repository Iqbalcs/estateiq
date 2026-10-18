import { cn } from '../../utils/cn.js';

export function Panel({ className, children, ...props }) {
  return (
    <section
      className={cn('rounded-2xl border border-slate-200/80 bg-white shadow-panel', className)}
      {...props}
    >
      {children}
    </section>
  );
}

export function PanelHeader({ title, description, action }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-5 py-4 sm:px-6">
      <div>
        <h2 className="font-bold text-navy-950">{title}</h2>
        {description && <p className="mt-1 text-xs leading-5 text-slate-500">{description}</p>}
      </div>
      {action}
    </div>
  );
}
