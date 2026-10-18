import { Plus } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { PropertyFilters } from '../components/properties/PropertyFilters.jsx';
import { PropertyListSkeleton } from '../components/properties/PropertyListSkeleton.jsx';
import { PropertyTable } from '../components/properties/PropertyTable.jsx';
import { Button } from '../components/ui/Button.jsx';
import { ConfirmDialog } from '../components/ui/ConfirmDialog.jsx';
import { EmptyState, ErrorState } from '../components/ui/Feedback.jsx';
import { PageHeader } from '../components/ui/PageHeader.jsx';
import { Pagination } from '../components/ui/Pagination.jsx';
import { Panel } from '../components/ui/Panel.jsx';
import { useDeleteProperty, useProperties } from '../hooks/useProperties.js';
import { getApiError } from '../utils/api-error.js';
import { useToast } from '../components/ui/Toast.jsx';

const defaults = { page: 1, limit: 10, sortBy: 'created_at', sortOrder: 'desc' };

export default function PropertiesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [deleteTarget, setDeleteTarget] = useState(null);
  const { showToast } = useToast();
  const filters = useMemo(
    () => ({
      page: Number(searchParams.get('page')) || defaults.page,
      limit: defaults.limit,
      search: searchParams.get('search') || undefined,
      city: searchParams.get('city') || undefined,
      propertyType: searchParams.get('propertyType') || undefined,
      status: searchParams.get('status') || undefined,
      sortBy: searchParams.get('sortBy') || defaults.sortBy,
      sortOrder: searchParams.get('sortOrder') || defaults.sortOrder,
    }),
    [searchParams],
  );
  const query = useProperties(filters);
  const deleteMutation = useDeleteProperty();

  const updateFilters = (changes) => {
    const next = new URLSearchParams(searchParams);
    Object.entries({ ...changes, page: changes.page || 1 }).forEach(([key, value]) => {
      if (!value || value === defaults[key]) next.delete(key);
      else next.set(key, String(value));
    });
    setSearchParams(next);
  };

  const remove = async () => {
    try {
      await deleteMutation.mutateAsync(deleteTarget.id);
      showToast({ title: 'Property deleted', message: `${deleteTarget.title} was removed.` });
      setDeleteTarget(null);
    } catch (error) {
      showToast({ title: 'Unable to delete property', message: getApiError(error), type: 'error' });
    }
  };

  const hasFilters = filters.search || filters.city || filters.propertyType || filters.status;
  const properties = query.data?.data || [];

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Property management"
        title="Portfolio properties"
        description="Search, evaluate, and maintain every listing from one workspace."
        actions={
          <Link
            to="/properties/new"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-navy-900 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-navy-800"
          >
            <Plus className="size-4" />
            Add property
          </Link>
        }
      />
      <Panel className="overflow-hidden">
        <PropertyFilters
          key={searchParams.toString()}
          filters={filters}
          onChange={updateFilters}
          onReset={() => setSearchParams({})}
        />
        {query.isLoading ? (
          <PropertyListSkeleton />
        ) : query.isError ? (
          <ErrorState message={getApiError(query.error)} onRetry={query.refetch} />
        ) : !properties.length ? (
          <EmptyState
            title={hasFilters ? 'No matching properties' : 'No properties yet'}
            message={
              hasFilters
                ? 'Adjust or clear the filters to see more of the portfolio.'
                : 'Create your first property to begin building the portfolio.'
            }
            action={
              hasFilters ? (
                <Button variant="secondary" onClick={() => setSearchParams({})}>
                  Clear filters
                </Button>
              ) : (
                <Link
                  to="/properties/new"
                  className="inline-flex min-h-11 items-center rounded-xl bg-navy-900 px-4 text-sm font-semibold text-white"
                >
                  Add property
                </Link>
              )
            }
          />
        ) : (
          <PropertyTable properties={properties} onDelete={setDeleteTarget} />
        )}
        <Pagination
          page={query.data?.meta.page || filters.page}
          totalPages={query.data?.meta.totalPages || 0}
          total={query.data?.meta.total || 0}
          label="properties"
          onPageChange={(page) => updateFilters({ page })}
        />
      </Panel>
      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete this property?"
        message={
          deleteTarget
            ? `${deleteTarget.title} will be permanently removed. This action cannot be undone.`
            : ''
        }
        confirmLabel="Delete property"
        loading={deleteMutation.isPending}
        onConfirm={remove}
        onClose={() => setDeleteTarget(null)}
      />
    </div>
  );
}
