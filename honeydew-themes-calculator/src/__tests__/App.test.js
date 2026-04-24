import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

describe('App routing', () => {
  test('renders navigation links', () => {
    render(<App />);
    const homeLink = screen.getAllByText(/Home/i);
    expect(homeLink[0]).toBeInTheDocument();
  });

  test('navigates to Calculator page', () => {
    render(<App />);
    const calculatorLink = screen.getByText(/Calculator/i, { selector: 'a' });
    fireEvent.click(calculatorLink);

    // The h2 component inside Calculator.js returns <h2>Calculator</h2>
    const heading = screen.getByRole('heading', { name: 'Calculator' });
    expect(heading).toBeInTheDocument();
  });

  test('navigates to Themes page', () => {
    render(<App />);
    const themesLink = screen.getByText(/Themes/i, { selector: 'a' });
    fireEvent.click(themesLink);

    // The h2 component inside Themes.js returns <h2>Themes</h2>
    const heading = screen.getByRole('heading', { name: 'Themes' });
    expect(heading).toBeInTheDocument();
  });

  test('navigates to Referral page', () => {
    render(<App />);
    const referralLink = screen.getByText(/Referral/i, { selector: 'a' });
    fireEvent.click(referralLink);

    const heading = screen.getByRole('heading', { name: 'Refer a Friend' });
    expect(heading).toBeInTheDocument();
  });

  test('navigates to Dashboard page', () => {
    render(<App />);
    const dashboardLink = screen.getByText(/Dashboard/i, { selector: 'a' });
    fireEvent.click(dashboardLink);

    const heading = screen.getByRole('heading', { name: 'Engagement Metrics Dashboard' });
    expect(heading).toBeInTheDocument();
  });
});
