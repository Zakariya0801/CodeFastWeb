import { describe } from 'node:test';
import App from '../App';
import { render } from '@testing-library/react';

describe('App Component', () => {
  it('renders without crashing', () => {
    const { container } = render(<App />);
    expect(container).toBeInTheDocument();
  });
});