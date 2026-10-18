import { useNavigate } from 'react-router-dom';
import { PropertyForm } from '../components/properties/PropertyForm.jsx';
import { PageHeader } from '../components/ui/PageHeader.jsx';
import { useToast } from '../components/ui/Toast.jsx';
import { useCreateProperty } from '../hooks/useProperties.js';
import { getApiError } from '../utils/api-error.js';

export default function AddPropertyPage() {
  const mutation = useCreateProperty();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const submit = async (values) => {
    try {
      const result = await mutation.mutateAsync(values);
      showToast({
        title: 'Property added',
        message: `${result.data.title} is now in the portfolio.`,
      });
      navigate(`/properties/${result.data.id}`);
    } catch (error) {
      showToast({ title: 'Property not saved', message: getApiError(error), type: 'error' });
      throw error;
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="New listing"
        title="Add a property"
        description="Capture the details needed for reliable catalogue management and analytics."
      />
      <PropertyForm
        onSubmit={submit}
        isPending={mutation.isPending}
        submitLabel="Create property"
      />
    </div>
  );
}
