import { screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useCities, useOverview, usePropertyTypes, useSalesTrend } from '../hooks/useAnalytics.js';
import { renderApp } from '../test/render.jsx';
import DashboardPage from './DashboardPage.jsx';

vi.mock('../hooks/useAnalytics.js', () => ({
  useOverview: vi.fn(),
  useSalesTrend: vi.fn(),
  usePropertyTypes: vi.fn(),
  useCities: vi.fn(),
}));

const idleQuery = { data: { data: [] }, isLoading: false, isError: false, refetch: vi.fn() };

describe('dashboard states', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useSalesTrend.mockReturnValue(idleQuery);
    usePropertyTypes.mockReturnValue(idleQuery);
    useCities.mockReturnValue(idleQuery);
  });

  it('renders skeletons while overview data is loading', () => {
    useOverview.mockReturnValue({ ...idleQuery, data: undefined, isLoading: true });

    renderApp(<DashboardPage />);

    expect(screen.getByLabelText('Loading dashboard')).toBeInTheDocument();
  });

  it('renders a recoverable error state when analytics fail', () => {
    useOverview.mockReturnValue({
      ...idleQuery,
      data: undefined,
      isError: true,
      error: new Error('Network unavailable'),
    });

    renderApp(<DashboardPage />);

    expect(screen.getByText('Unable to load this data')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument();
  });
});
