import { RotateCcw, Search } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/Button.jsx';
import { Input, Select } from '../ui/FormField.jsx';

export function SalesFilters({ filters, onChange, onReset }) {
  const [search, setSearch] = useState(filters.search || '');
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onChange({ search: search.trim() || undefined });
      }}
      className="grid gap-3 border-b border-slate-100 p-4 sm:grid-cols-2 sm:p-5 xl:grid-cols-[1.35fr_repeat(4,0.75fr)_auto]"
    >
      <div className="relative">
        <Search className="absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-slate-400" />
        <Input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search property or city"
          className="pl-10"
          aria-label="Search sales"
        />
      </div>
      <Select
        value={filters.city || ''}
        onChange={(event) => onChange({ city: event.target.value || undefined })}
        aria-label="Filter sales by city"
      >
        <option value="">All cities</option>
        {['Lahore', 'Islamabad', 'Rawalpindi', 'Karachi', 'Peshawar'].map((city) => (
          <option key={city}>{city}</option>
        ))}
      </Select>
      <Input
        type="date"
        value={filters.dateFrom || ''}
        max={filters.dateTo || undefined}
        onChange={(event) => onChange({ dateFrom: event.target.value || undefined })}
        aria-label="Sales from date"
      />
      <Input
        type="date"
        value={filters.dateTo || ''}
        min={filters.dateFrom || undefined}
        onChange={(event) => onChange({ dateTo: event.target.value || undefined })}
        aria-label="Sales to date"
      />
      <Select
        value={`${filters.sortBy}:${filters.sortOrder}`}
        onChange={(event) => {
          const [sortBy, sortOrder] = event.target.value.split(':');
          onChange({ sortBy, sortOrder });
        }}
        aria-label="Sort sales"
      >
        <option value="sold_at:desc">Most recent</option>
        <option value="sold_at:asc">Oldest first</option>
        <option value="sale_price:desc">Highest value</option>
        <option value="sale_price:asc">Lowest value</option>
      </Select>
      <div className="flex gap-2">
        <Button type="submit" variant="accent" className="flex-1">
          Apply
        </Button>
        <Button variant="secondary" size="icon" onClick={onReset} aria-label="Reset sales filters">
          <RotateCcw className="size-4" />
        </Button>
      </div>
    </form>
  );
}
