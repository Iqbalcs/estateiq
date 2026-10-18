import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Save } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { z } from 'zod';
import { getFieldErrors } from '../../utils/api-error.js';
import { Button } from '../ui/Button.jsx';
import { FormField, Input, Select, Textarea } from '../ui/FormField.jsx';
import { Panel, PanelHeader } from '../ui/Panel.jsx';

const propertyFormSchema = z.object({
  title: z.string().trim().min(3, 'Enter at least 3 characters').max(160),
  description: z.string().trim().min(10, 'Enter at least 10 characters').max(4000),
  city: z.string().trim().min(2, 'City is required').max(80),
  address: z.string().trim().min(5, 'Enter a complete address').max(220),
  propertyType: z.enum(['House', 'Apartment', 'Commercial', 'Plot']),
  listingPrice: z.coerce.number().positive('Price must be greater than zero'),
  areaSqft: z.coerce.number().int('Use a whole number').positive('Area must be greater than zero'),
  bedrooms: z.coerce.number().int('Use a whole number').min(0, 'Cannot be negative'),
  bathrooms: z.coerce.number().int('Use a whole number').min(0, 'Cannot be negative'),
});

const emptyValues = {
  title: '',
  description: '',
  city: '',
  address: '',
  propertyType: 'House',
  listingPrice: '',
  areaSqft: '',
  bedrooms: 0,
  bathrooms: 0,
};

export function PropertyForm({
  defaultValues,
  onSubmit,
  isPending,
  submitLabel = 'Save property',
}) {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(propertyFormSchema),
    defaultValues: defaultValues || emptyValues,
  });

  useEffect(() => {
    if (defaultValues) reset(defaultValues);
  }, [defaultValues, reset]);

  const submit = async (values) => {
    try {
      await onSubmit(values);
    } catch (error) {
      const fieldErrors = getFieldErrors(error);
      Object.entries(fieldErrors).forEach(([field, message]) => {
        if (field in emptyValues) setError(field, { type: 'server', message });
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-6" noValidate>
      <Panel>
        <PanelHeader
          title="Core information"
          description="Use a clear title and an accurate, buyer-friendly description."
        />
        <div className="grid gap-5 p-5 sm:p-6 lg:grid-cols-2">
          <div className="lg:col-span-2">
            <FormField
              label="Property title"
              htmlFor="title"
              error={errors.title?.message}
              required
            >
              <Input
                id="title"
                placeholder="e.g. DHA Phase 6 Family Villa"
                error={errors.title}
                {...register('title')}
              />
            </FormField>
          </div>
          <div className="lg:col-span-2">
            <FormField
              label="Description"
              htmlFor="description"
              error={errors.description?.message}
              hint="Describe condition, location benefits, and standout features."
              required
            >
              <Textarea
                id="description"
                placeholder="Describe the property in a few useful sentences…"
                error={errors.description}
                {...register('description')}
              />
            </FormField>
          </div>
          <FormField
            label="Property type"
            htmlFor="propertyType"
            error={errors.propertyType?.message}
            required
          >
            <Select id="propertyType" error={errors.propertyType} {...register('propertyType')}>
              {['House', 'Apartment', 'Commercial', 'Plot'].map((type) => (
                <option key={type}>{type}</option>
              ))}
            </Select>
          </FormField>
          <FormField
            label="Listing price (PKR)"
            htmlFor="listingPrice"
            error={errors.listingPrice?.message}
            required
          >
            <Input
              id="listingPrice"
              type="number"
              min="1"
              step="1000"
              placeholder="38500000"
              error={errors.listingPrice}
              {...register('listingPrice')}
            />
          </FormField>
        </div>
      </Panel>

      <Panel>
        <PanelHeader
          title="Location and specifications"
          description="Structured details power search, filters, and portfolio reporting."
        />
        <div className="grid gap-5 p-5 sm:grid-cols-2 sm:p-6 lg:grid-cols-4">
          <FormField label="City" htmlFor="city" error={errors.city?.message} required>
            <Input
              id="city"
              list="pakistan-cities"
              placeholder="Lahore"
              error={errors.city}
              {...register('city')}
            />
            <datalist id="pakistan-cities">
              {['Lahore', 'Islamabad', 'Rawalpindi', 'Karachi', 'Peshawar'].map((city) => (
                <option key={city} value={city} />
              ))}
            </datalist>
          </FormField>
          <div className="sm:col-span-1 lg:col-span-3">
            <FormField
              label="Street address"
              htmlFor="address"
              error={errors.address?.message}
              required
            >
              <Input
                id="address"
                placeholder="Street 18, DHA Phase 6"
                error={errors.address}
                {...register('address')}
              />
            </FormField>
          </div>
          <FormField
            label="Area (sq ft)"
            htmlFor="areaSqft"
            error={errors.areaSqft?.message}
            required
          >
            <Input
              id="areaSqft"
              type="number"
              min="1"
              step="1"
              placeholder="2250"
              error={errors.areaSqft}
              {...register('areaSqft')}
            />
          </FormField>
          <FormField label="Bedrooms" htmlFor="bedrooms" error={errors.bedrooms?.message} required>
            <Input
              id="bedrooms"
              type="number"
              min="0"
              step="1"
              error={errors.bedrooms}
              {...register('bedrooms')}
            />
          </FormField>
          <FormField
            label="Bathrooms"
            htmlFor="bathrooms"
            error={errors.bathrooms?.message}
            required
          >
            <Input
              id="bathrooms"
              type="number"
              min="0"
              step="1"
              error={errors.bathrooms}
              {...register('bathrooms')}
            />
          </FormField>
        </div>
      </Panel>

      <div className="flex flex-col-reverse justify-between gap-3 sm:flex-row sm:items-center">
        <Link
          to="/properties"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold text-slate-600 hover:bg-slate-100"
        >
          <ArrowLeft className="size-4" />
          Back to properties
        </Link>
        <Button type="submit" variant="accent" loading={isPending}>
          <Save className="size-4" />
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}
