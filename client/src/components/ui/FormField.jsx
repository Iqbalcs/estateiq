import { cn } from '../../utils/cn.js';

const controlClasses =
  'min-h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-900 shadow-sm transition placeholder:text-slate-400 hover:border-slate-300 focus:border-brand-500 focus:ring-3 focus:ring-brand-100';

export function FormField({ label, error, hint, required, children, htmlFor }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-semibold text-slate-700" htmlFor={htmlFor}>
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>
      {children}
      {error ? (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      ) : (
        hint && <p className="text-xs leading-5 text-slate-500">{hint}</p>
      )}
    </div>
  );
}

export function Input({ className, error, ...props }) {
  return (
    <input
      className={cn(controlClasses, error && 'border-red-300 focus:border-red-500', className)}
      aria-invalid={Boolean(error)}
      {...props}
    />
  );
}

export function Select({ className, error, children, ...props }) {
  return (
    <select
      className={cn(controlClasses, error && 'border-red-300 focus:border-red-500', className)}
      aria-invalid={Boolean(error)}
      {...props}
    >
      {children}
    </select>
  );
}

export function Textarea({ className, error, ...props }) {
  return (
    <textarea
      className={cn(
        controlClasses,
        'min-h-32 resize-y py-3 leading-6',
        error && 'border-red-300 focus:border-red-500',
        className,
      )}
      aria-invalid={Boolean(error)}
      {...props}
    />
  );
}
