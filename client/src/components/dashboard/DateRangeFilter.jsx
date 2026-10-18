import { CalendarDays } from 'lucide-react';
import { useState } from 'react';
import { getCurrentYearRange, toDateInput } from '../../utils/formatters.js';
import { Button } from '../ui/Button.jsx';
import { Input } from '../ui/FormField.jsx';

export function DateRangeFilter({ value, onChange }) {
  const [draft, setDraft] = useState(value);
  const [error, setError] = useState('');

  const apply = () => {
    if (draft.dateFrom && draft.dateTo && draft.dateFrom > draft.dateTo) {
      setError('Start date must be before the end date.');
      return;
    }
    setError('');
    onChange(draft);
  };

  const preset = (next) => {
    setDraft(next);
    setError('');
    onChange(next);
  };

  const lastTwelveMonths = () => {
    const today = new Date();
    const start = new Date(today.getFullYear(), today.getMonth() - 11, 1);
    preset({ dateFrom: toDateInput(start), dateTo: toDateInput(today) });
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-end">
        <div className="flex items-center gap-2 px-1 pb-1 text-sm font-bold text-slate-700 xl:pb-2.5">
          <CalendarDays className="size-4 text-brand-600" />
          Reporting period
        </div>
        <div className="grid flex-1 grid-cols-1 gap-2 sm:grid-cols-2">
          <label className="text-xs font-semibold text-slate-500">
            From
            <Input
              type="date"
              value={draft.dateFrom || ''}
              max={draft.dateTo || toDateInput(new Date())}
              onChange={(event) =>
                setDraft((current) => ({ ...current, dateFrom: event.target.value }))
              }
              className="mt-1 min-h-10"
              aria-label="Report start date"
            />
          </label>
          <label className="text-xs font-semibold text-slate-500">
            To
            <Input
              type="date"
              value={draft.dateTo || ''}
              min={draft.dateFrom || undefined}
              max={toDateInput(new Date())}
              onChange={(event) =>
                setDraft((current) => ({ ...current, dateTo: event.target.value }))
              }
              className="mt-1 min-h-10"
              aria-label="Report end date"
            />
          </label>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button size="sm" variant="secondary" onClick={lastTwelveMonths}>
            12 months
          </Button>
          <Button size="sm" variant="secondary" onClick={() => preset(getCurrentYearRange())}>
            This year
          </Button>
          <Button size="sm" variant="secondary" onClick={() => preset({})}>
            All time
          </Button>
          <Button size="sm" variant="accent" onClick={apply}>
            Apply
          </Button>
        </div>
      </div>
      {error && (
        <p className="mt-2 text-xs font-semibold text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
