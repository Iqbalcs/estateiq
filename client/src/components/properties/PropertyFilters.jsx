import { Filter, RotateCcw, Search } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/Button.jsx';
import { Input, Select } from '../ui/FormField.jsx';

const cities = ['Lahore', 'Islamabad', 'Rawalpindi', 'Karachi', 'Peshawar'];

export function PropertyFilters({ filters, onChange, onReset }) {
  const [search, setSearch] = useState(filters.search || '');
  const submit = (event) => {
    event.preventDefault();
    onChange({ search: search.trim() || undefined });
  };

  return (
    <div className="border-b border-slate-100 p-4 sm:p-5">
      <form
        onSubmit={submit}
        className="grid gap-3 xl:grid-cols-[minmax(14rem,1.4fr)_repeat(4,minmax(8rem,0.75fr))_auto]"
      >
        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-slate-400" />
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search title, address, or city"
            className="pl-10"
            aria-label="Search properties"
          />
        </div>
        <Select
          value={filters.city || ''}
          onChange={(event) => onChange({ city: event.target.value || undefined })}
          aria-label="Filter by city"
        >
          <option value="">All cities</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </Select>
        <Select
          value={filters.propertyType || ''}
          onChange={(event) => onChange({ propertyType: event.target.value || undefined })}
          aria-label="Filter by property type"
        >
          <option value="">All types</option>
          {['House', 'Apartment', 'Commercial', 'Plot'].map((type) => (
            <option key={type}>{type}</option>
          ))}
        </Select>
        <Select
          value={filters.status || ''}
          onChange={(event) => onChange({ status: event.target.value || undefined })}
          aria-label="Filter by status"
        >
          <option value="">All statuses</option>
          <option>Available</option>
          <option>Sold</option>
        </Select>
        <Select
          value={`${filters.sortBy}:${filters.sortOrder}`}
          onChange={(event) => {
            const [sortBy, sortOrder] = event.target.value.split(':');
            onChange({ sortBy, sortOrder });
          }}
          aria-label="Sort properties"
        >
          <option value="created_at:desc">Newest listed</option>
          <option value="created_at:asc">Oldest listed</option>
          <option value="listing_price:desc">Price: high to low</option>
          <option value="listing_price:asc">Price: low to high</option>
        </Select>
        <div className="flex gap-2">
          <Button
            type="submit"
            variant="accent"
            className="flex-1 xl:px-3"
            aria-label="Apply search"
          >
            <Filter className="size-4" />
            <span className="xl:hidden 2xl:inline">Apply</span>
          </Button>
          <Button variant="secondary" size="icon" onClick={onReset} aria-label="Reset filters">
            <RotateCcw className="size-4" />
          </Button>
        </div>
      </form>
    </div>
  );
}
