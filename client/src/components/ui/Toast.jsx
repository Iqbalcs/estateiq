import { CheckCircle2, CircleAlert, Info, X } from 'lucide-react';
import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { cn } from '../../utils/cn.js';

const ToastContext = createContext(null);

const icons = {
  success: CheckCircle2,
  error: CircleAlert,
  info: Info,
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const dismiss = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(
    ({ title, message, type = 'success' }) => {
      const id = `${Date.now()}-${Math.random()}`;
      setToasts((current) => [...current, { id, title, message, type }]);
      window.setTimeout(() => dismiss(id), 4500);
    },
    [dismiss],
  );

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        className="fixed right-4 bottom-4 z-[70] flex w-[calc(100%-2rem)] max-w-sm flex-col gap-3"
        aria-live="polite"
      >
        {toasts.map((toast) => {
          const Icon = icons[toast.type] || Info;
          return (
            <div
              key={toast.id}
              className="flex gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl"
            >
              <Icon
                className={cn(
                  'mt-0.5 size-5 shrink-0',
                  toast.type === 'success' && 'text-emerald-600',
                  toast.type === 'error' && 'text-red-600',
                  toast.type === 'info' && 'text-brand-600',
                )}
              />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-slate-900">{toast.title}</p>
                {toast.message && <p className="mt-1 text-sm text-slate-500">{toast.message}</p>}
              </div>
              <button
                onClick={() => dismiss(toast.id)}
                className="grid size-7 place-items-center rounded-md text-slate-400 hover:bg-slate-100"
                aria-label="Dismiss notification"
              >
                <X className="size-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

// Fast Refresh safely preserves this colocated hook and provider in development.
// eslint-disable-next-line react-refresh/only-export-components
export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
}
