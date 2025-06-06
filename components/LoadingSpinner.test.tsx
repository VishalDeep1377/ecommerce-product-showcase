import { render, screen } from '@testing-library/react';
import LoadingSpinner from './LoadingSpinner';
import '@testing-library/jest-dom';

describe('LoadingSpinner', () => {
  it('renders a spinning loading indicator', () => {
    render(<LoadingSpinner />);

    // Check if the element with the animate-spin class is present
    const spinnerElement = screen.getByRole('status', { hidden: true }); // Use role status for loading indicators
    expect(spinnerElement).toBeInTheDocument();

    // You could also check for specific classes if needed, e.g.,
    // expect(spinnerElement).toHaveClass('animate-spin');
  });
}); 