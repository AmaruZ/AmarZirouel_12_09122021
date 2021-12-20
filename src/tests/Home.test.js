import { render, screen } from '@testing-library/react';
import Home from '../pages/Home';
import { MemoryRouter} from 'react-router-dom';

test('renders learn react link', () => {
  render(<Home/>, {wrapper: MemoryRouter})
  const linkElement = screen.getByText(/Page d'accueil/i);
  expect(linkElement).toBeInTheDocument();
});
