import { LoaderCircle } from 'lucide-react';
import { cn } from '../../utils/cn.js';

const variants = {
  primary:
    'bg-navy-900 text-white shadow-sm hover:bg-navy-800 disabled:bg-slate-300 disabled:text-slate-500',
  secondary:
    'border border-slate-200 bg-white text-slate-700 shadow-sm hover:border-slate-300 hover:bg-slate-50 disabled:text-slate-400',
  danger:
    'bg-red-600 text-white shadow-sm hover:bg-red-700 disabled:bg-red-200 disabled:text-red-400',
  ghost: 'text-slate-600 hover:bg-slate-100 hover:text-slate-950 disabled:text-slate-300',
  accent:
    'bg-brand-600 text-white shadow-sm hover:bg-brand-500 disabled:bg-slate-300 disabled:text-slate-500',
};

const sizes = {
  sm: 'min-h-9 px-3 text-sm',
  md: 'min-h-11 px-4 text-sm',
  lg: 'min-h-12 px-5 text-base',
  icon: 'size-10 p-0',
};

export function Button({
  type = 'button',
  variant = 'primary',
  size = 'md',
  loading = false,
  className,
  children,
  disabled,
  ...props
}) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-colors disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        className,
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />}
      {children}
    </button>
  );
}
