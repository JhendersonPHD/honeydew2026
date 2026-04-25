import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Themes from '../Themes';

describe('Themes Component', () => {
  test('renders AI-Powered Theme Suggestions section', () => {
    render(<Themes />);
    const heading = screen.getByText(/AI-Powered Theme Suggestions/i);
    expect(heading).toBeInTheDocument();
  });

  test('generates a suggestion when button is clicked', async () => {
    render(<Themes />);
    const button = screen.getByRole('button', { name: /Suggest a Theme/i });

    fireEvent.click(button);

    // Check for loading state
    expect(screen.getByRole('button', { name: /Generating Idea/i })).toBeInTheDocument();

    // Wait for suggestion to appear
    await waitFor(() => {
      const suggestion = screen.getByText(/"(Midnight Harvest|Sunrise Orchard|Verdant Fields|Ocean Breeze|Berry Burst).*"/i);
      expect(suggestion).toBeInTheDocument();
    }, { timeout: 1500 });
  });
});
