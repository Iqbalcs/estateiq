import { AlertTriangle, X } from 'lucide-react';
import { Button } from './Button.jsx';

export function ConfirmDialog({ open, title, message, confirmLabel, loading, onConfirm, onClose }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-navy-950/55 p-4 backdrop-blur-sm">
      <div
        className="w-full max-w-md rounded-2xl border border-white/10 bg-white p-6 shadow-2xl"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        aria-describedby="confirm-message"
      >
        <div className="flex items-start justify-between gap-4">
          <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-red-50 text-red-600">
            <AlertTriangle className="size-5" />
          </span>
          <button
            className="grid size-9 place-items-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"
            onClick={onClose}
            aria-label="Close confirmation"
          >
            <X className="size-5" />
          </button>
        </div>
        <h2 id="confirm-title" className="mt-5 text-lg font-bold text-slate-950">
          {title}
        </h2>
        <p id="confirm-message" className="mt-2 text-sm leading-6 text-slate-500">
          {message}
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="secondary" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button variant="danger" onClick={onConfirm} loading={loading}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
