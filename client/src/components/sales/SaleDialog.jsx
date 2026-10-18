import { zodResolver } from '@hookform/resolvers/zod';
import { BadgeDollarSign, X } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useCreateSale } from '../../hooks/useSales.js';
import { getApiError } from '../../utils/api-error.js';
import { formatCurrency, toDateInput } from '../../utils/formatters.js';
import { Button } from '../ui/Button.jsx';
import { FormField, Input } from '../ui/FormField.jsx';
import { useToast } from '../ui/Toast.jsx';

const schema = z.object({
  salePrice: z.coerce.number().positive('Sale price must be greater than zero'),
  soldAt: z
    .string()
    .min(1, 'Sale date is required')
    .refine((value) => value <= toDateInput(new Date()), 'Sale date cannot be in the future'),
});

export function SaleDialog({ property, open, onClose }) {
  const mutation = useCreateSale();
  const { showToast } = useToast();
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  useEffect(() => {
    if (open && property)
      reset({ salePrice: property.listingPrice, soldAt: toDateInput(new Date()) });
  }, [open, property, reset]);

  if (!open || !property) return null;

  const submit = async (values) => {
    try {
      await mutation.mutateAsync({ propertyId: property.id, ...values });
      showToast({ title: 'Sale recorded', message: `${property.title} is now marked as sold.` });
      onClose();
    } catch (error) {
      const message = getApiError(error, 'Unable to record this sale.');
      setError('root', { message });
      showToast({ title: 'Sale not recorded', message, type: 'error' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-navy-950/60 p-4 backdrop-blur-sm">
      <div
        className="w-full max-w-lg rounded-2xl bg-white shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="sale-dialog-title"
      >
        <div className="flex items-start justify-between border-b border-slate-100 p-5 sm:p-6">
          <div className="flex gap-3">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-100 text-brand-600">
              <BadgeDollarSign className="size-5" />
            </span>
            <div>
              <h2 id="sale-dialog-title" className="text-lg font-bold text-navy-950">
                Record property sale
              </h2>
              <p className="mt-1 text-sm text-slate-500">This will mark the property as sold.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="grid size-9 place-items-center rounded-lg text-slate-400 hover:bg-slate-100"
            aria-label="Close sale form"
          >
            <X className="size-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit(submit)} className="space-y-5 p-5 sm:p-6" noValidate>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-bold text-slate-900">{property.title}</p>
            <p className="mt-1 text-xs text-slate-500">
              {property.city} · Listed at {formatCurrency(property.listingPrice)}
            </p>
          </div>
          <FormField
            label="Actual sale price (PKR)"
            htmlFor="salePrice"
            error={errors.salePrice?.message}
            hint="Revenue analytics use this value, not the listing price."
            required
          >
            <Input
              id="salePrice"
              type="number"
              min="1"
              step="1000"
              error={errors.salePrice}
              {...register('salePrice')}
            />
          </FormField>
          <FormField label="Sale date" htmlFor="soldAt" error={errors.soldAt?.message} required>
            <Input
              id="soldAt"
              type="date"
              max={toDateInput(new Date())}
              error={errors.soldAt}
              {...register('soldAt')}
            />
          </FormField>
          {errors.root?.message && (
            <p className="rounded-xl bg-red-50 p-3 text-sm text-red-700" role="alert">
              {errors.root.message}
            </p>
          )}
          <div className="flex justify-end gap-3 pt-1">
            <Button variant="secondary" onClick={onClose} disabled={mutation.isPending}>
              Cancel
            </Button>
            <Button type="submit" variant="accent" loading={mutation.isPending}>
              Record sale
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
