import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

test('renders navigation links', () => {
  render(<App />);
  const homeLink = screen.getAllByText(/Home/i);
  expect(homeLink[0]).toBeInTheDocument();
});
