import {
  ArrowLeft,
  Bath,
  BedDouble,
  CalendarDays,
  MapPin,
  Pencil,
  Ruler,
  Trash2,
} from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { PropertyVisual } from '../components/properties/PropertyVisual.jsx';
import { SaleDialog } from '../components/sales/SaleDialog.jsx';
import { Button } from '../components/ui/Button.jsx';
import { ConfirmDialog } from '../components/ui/ConfirmDialog.jsx';
import { ErrorState, Skeleton } from '../components/ui/Feedback.jsx';
import { Panel, PanelHeader } from '../components/ui/Panel.jsx';
import { StatusBadge } from '../components/ui/StatusBadge.jsx';
import { useToast } from '../components/ui/Toast.jsx';
import { useDeleteProperty, useProperty } from '../hooks/useProperties.js';
import { getApiError } from '../utils/api-error.js';
import { formatCurrency, formatDate, formatNumber } from '../utils/formatters.js';

function DetailItem({ icon: Icon, label, value }) {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4">
      <p className="flex items-center gap-2 text-xs font-semibold text-slate-500">
        <Icon className="size-4 text-brand-600" />
        {label}
      </p>
      <p className="mt-2 font-bold text-slate-900">{value}</p>
    </div>
  );
}

export default function PropertyDetailsPage() {
  const { id } = useParams();
  const query = useProperty(id);
  const deleteMutation = useDeleteProperty();
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [saleOpen, setSaleOpen] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();

  if (query.isLoading)
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-60" />
        <Skeleton className="h-[620px] w-full" />
      </div>
    );
  if (query.isError)
    return (
      <div className="rounded-2xl border border-slate-200 bg-white">
        <ErrorState
          title="Property not available"
          message={getApiError(query.error)}
          onRetry={query.refetch}
        />
      </div>
    );

  const property = query.data.data;
  const remove = async () => {
    try {
      await deleteMutation.mutateAsync(property.id);
      showToast({ title: 'Property deleted', message: `${property.title} was removed.` });
      navigate('/properties');
    } catch (error) {
      showToast({ title: 'Unable to delete property', message: getApiError(error), type: 'error' });
      setDeleteOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <Link
          to="/properties"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-brand-600"
        >
          <ArrowLeft className="size-4" />
          Back to properties
        </Link>
        <div className="flex flex-wrap gap-2">
          {property.status === 'Available' && (
            <Button variant="accent" onClick={() => setSaleOpen(true)}>
              Record sale
            </Button>
          )}
          <Link
            to={`/properties/${property.id}/edit`}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
          >
            <Pencil className="size-4" />
            Edit
          </Link>
          <Button
            variant="secondary"
            onClick={() => setDeleteOpen(true)}
            disabled={property.status === 'Sold'}
            title={property.status === 'Sold' ? 'Sold properties cannot be deleted' : undefined}
          >
            <Trash2 className="size-4 text-red-500" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <Panel className="overflow-hidden">
          <PropertyVisual
            type={property.propertyType}
            city={property.city}
            className="min-h-72 sm:min-h-80"
          />
          <div className="p-5 sm:p-7">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-brand-100 px-2.5 py-1 text-xs font-bold text-brand-600">
                    {property.propertyType}
                  </span>
                  <StatusBadge status={property.status} />
                </div>
                <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-navy-950 sm:text-3xl">
                  {property.title}
                </h1>
                <p className="mt-2 flex items-start gap-2 text-sm text-slate-500">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-brand-600" />
                  {property.address}, {property.city}
                </p>
              </div>
              <div className="shrink-0 sm:text-right">
                <p className="text-xs font-bold tracking-wide text-slate-400 uppercase">
                  Listing price
                </p>
                <p className="mt-1 text-2xl font-extrabold text-navy-950">
                  {formatCurrency(property.listingPrice)}
                </p>
              </div>
            </div>
            <div className="my-7 h-px bg-slate-100" />
            <h2 className="font-bold text-navy-950">About this property</h2>
            <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-600">
              {property.description}
            </p>
          </div>
        </Panel>

        <div className="space-y-6">
          <Panel>
            <PanelHeader title="Property facts" description="Structured listing information" />
            <div className="grid gap-3 p-5 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
              <DetailItem
                icon={Ruler}
                label="Area"
                value={`${formatNumber(property.areaSqft)} sq ft`}
              />
              <DetailItem icon={BedDouble} label="Bedrooms" value={property.bedrooms} />
              <DetailItem icon={Bath} label="Bathrooms" value={property.bathrooms} />
              <DetailItem
                icon={CalendarDays}
                label="Listed"
                value={formatDate(property.createdAt)}
              />
            </div>
          </Panel>
          <Panel>
            <PanelHeader
              title={property.sale ? 'Recorded sale' : 'Sale status'}
              description={
                property.sale
                  ? 'Immutable transaction history for this property'
                  : 'This property is currently available'
              }
            />
            <div className="p-5">
              {property.sale ? (
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-bold tracking-wide text-slate-400 uppercase">
                      Actual sale price
                    </p>
                    <p className="mt-1 text-2xl font-extrabold text-emerald-700">
                      {formatCurrency(property.sale.salePrice)}
                    </p>
                  </div>
                  <div className="flex justify-between border-t border-slate-100 pt-4 text-sm">
                    <span className="text-slate-500">Sold on</span>
                    <span className="font-bold text-slate-800">
                      {formatDate(property.sale.soldAt)}
                    </span>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-sm leading-6 text-slate-500">
                    Record a completed transaction to update portfolio revenue and mark this
                    property sold.
                  </p>
                  <Button
                    variant="accent"
                    className="mt-4 w-full"
                    onClick={() => setSaleOpen(true)}
                  >
                    Record property sale
                  </Button>
                </div>
              )}
            </div>
          </Panel>
        </div>
      </div>

      <SaleDialog property={property} open={saleOpen} onClose={() => setSaleOpen(false)} />
      <ConfirmDialog
        open={deleteOpen}
        title="Delete this property?"
        message={`${property.title} will be permanently removed. This action cannot be undone.`}
        confirmLabel="Delete property"
        loading={deleteMutation.isPending}
        onConfirm={remove}
        onClose={() => setDeleteOpen(false)}
      />
    </div>
  );
}
