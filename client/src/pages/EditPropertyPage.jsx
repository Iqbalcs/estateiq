import { useNavigate, useParams } from 'react-router-dom';
import { PropertyForm } from '../components/properties/PropertyForm.jsx';
import { ErrorState, Skeleton } from '../components/ui/Feedback.jsx';
import { PageHeader } from '../components/ui/PageHeader.jsx';
import { useToast } from '../components/ui/Toast.jsx';
import { useProperty, useUpdateProperty } from '../hooks/useProperties.js';
import { getApiError } from '../utils/api-error.js';

export default function EditPropertyPage() {
  const { id } = useParams();
  const propertyQuery = useProperty(id);
  const mutation = useUpdateProperty();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const submit = async (values) => {
    try {
      const result = await mutation.mutateAsync({ id, data: values });
      showToast({
        title: 'Property updated',
        message: `${result.data.title} was saved successfully.`,
      });
      navigate(`/properties/${id}`);
    } catch (error) {
      showToast({ title: 'Changes not saved', message: getApiError(error), type: 'error' });
      throw error;
    }
  };

  if (propertyQuery.isLoading)
    return (
      <div className="space-y-6">
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-[620px] w-full" />
      </div>
    );
  if (propertyQuery.isError)
    return (
      <div className="rounded-2xl border border-slate-200 bg-white">
        <ErrorState message={getApiError(propertyQuery.error)} onRetry={propertyQuery.refetch} />
      </div>
    );

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Property management"
        title={`Edit ${propertyQuery.data.data.title}`}
        description="Update listing information without changing its sale history."
      />
      <PropertyForm
        defaultValues={propertyQuery.data.data}
        onSubmit={submit}
        isPending={mutation.isPending}
        submitLabel="Save changes"
      />
    </div>
  );
}
