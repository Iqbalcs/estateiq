import { BadgeDollarSign, X } from 'lucide-react';
import { useState } from 'react';
import { useProperties } from '../../hooks/useProperties.js';
import { getApiError } from '../../utils/api-error.js';
import { formatCurrency } from '../../utils/formatters.js';
import { Button } from '../ui/Button.jsx';
import { ErrorState, Skeleton } from '../ui/Feedback.jsx';
import { Select } from '../ui/FormField.jsx';
import { SaleDialog } from './SaleDialog.jsx';

export function RecordSaleButton() {
  const [chooserOpen, setChooserOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [saleOpen, setSaleOpen] = useState(false);
  const query = useProperties(
    { page: 1, limit: 100, status: 'Available', sortBy: 'created_at', sortOrder: 'desc' },
    { enabled: chooserOpen },
  );

  const close = () => {
    setChooserOpen(false);
    setSaleOpen(false);
    setSelected(null);
  };

  return (
    <>
      <Button variant="accent" onClick={() => setChooserOpen(true)}>
        <BadgeDollarSign className="size-4" />
        Record a sale
      </Button>
      {chooserOpen && !saleOpen && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-navy-950/60 p-4 backdrop-blur-sm">
          <div
            className="w-full max-w-lg rounded-2xl bg-white p-5 shadow-2xl sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="choose-property-title"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 id="choose-property-title" className="text-lg font-bold text-navy-950">
                  Choose an available property
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Only properties without a recorded sale are eligible.
                </p>
              </div>
              <button
                className="grid size-9 place-items-center rounded-lg text-slate-400 hover:bg-slate-100"
                onClick={close}
                aria-label="Close property chooser"
              >
                <X className="size-5" />
              </button>
            </div>
            <div className="mt-6">
              {query.isLoading ? (
                <Skeleton className="h-11 w-full" />
              ) : query.isError ? (
                <ErrorState compact message={getApiError(query.error)} onRetry={query.refetch} />
              ) : !query.data?.data.length ? (
                <p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
                  There are no available properties to sell.
                </p>
              ) : (
                <Select
                  value={selected?.id || ''}
                  onChange={(event) =>
                    setSelected(
                      query.data.data.find((item) => item.id === Number(event.target.value)) ||
                        null,
                    )
                  }
                  aria-label="Available property"
                >
                  <option value="">Select a property</option>
                  {query.data.data.map((property) => (
                    <option key={property.id} value={property.id}>
                      {property.title} — {formatCurrency(property.listingPrice)}
                    </option>
                  ))}
                </Select>
              )}
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <Button variant="secondary" onClick={close}>
                Cancel
              </Button>
              <Button variant="accent" disabled={!selected} onClick={() => setSaleOpen(true)}>
                Continue
              </Button>
            </div>
          </div>
        </div>
      )}
      <SaleDialog property={selected} open={saleOpen} onClose={close} />
    </>
  );
}
