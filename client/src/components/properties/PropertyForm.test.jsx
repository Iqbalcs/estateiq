import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { renderApp } from '../../test/render.jsx';
import { PropertyForm } from './PropertyForm.jsx';

describe('PropertyForm', () => {
  it('shows field-level errors and blocks an invalid submission', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    renderApp(<PropertyForm onSubmit={onSubmit} submitLabel="Create property" />);

    await user.click(screen.getByRole('button', { name: /create property/i }));

    expect(await screen.findByText('Enter at least 3 characters')).toBeInTheDocument();
    expect(screen.getByText('Enter at least 10 characters')).toBeInTheDocument();
    expect(screen.getByText('City is required')).toBeInTheDocument();
    expect(screen.getByText('Price must be greater than zero')).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });
});
