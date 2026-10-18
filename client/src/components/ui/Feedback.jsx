import { AlertCircle, Inbox, RefreshCw } from 'lucide-react';
import { Button } from './Button.jsx';

export function ErrorState({
  title = 'Unable to load this data',
  message,
  onRetry,
  compact = false,
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center ${compact ? 'min-h-48 p-5' : 'min-h-80 p-8'}`}
      role="alert"
    >
      <span className="mb-4 grid size-11 place-items-center rounded-xl bg-red-50 text-red-600">
        <AlertCircle className="size-5" aria-hidden="true" />
      </span>
      <h2 className="font-bold text-slate-900">{title}</h2>
      <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
        {message || 'Check that the API and database are running, then try again.'}
      </p>
      {onRetry && (
        <Button variant="secondary" size="sm" className="mt-5" onClick={onRetry}>
          <RefreshCw className="size-4" aria-hidden="true" />
          Try again
        </Button>
      )}
    </div>
  );
}

export function EmptyState({ title, message, action }) {
  return (
    <div className="flex min-h-64 flex-col items-center justify-center px-6 py-10 text-center">
      <span className="mb-4 grid size-12 place-items-center rounded-2xl bg-slate-100 text-slate-500">
        <Inbox className="size-5" aria-hidden="true" />
      </span>
      <h2 className="font-bold text-slate-900">{title}</h2>
      <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">{message}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function Skeleton({ className = '' }) {
  return (
    <div className={`animate-pulse rounded-xl bg-slate-200/80 ${className}`} aria-hidden="true" />
  );
}
