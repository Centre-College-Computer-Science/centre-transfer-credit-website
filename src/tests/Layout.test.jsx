import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Layout from '../Layout';

describe('Layout Component', () => {
  it('renders navigation links correctly', () => {

    // We need to wrap the component in a router beause it uses the <Link> thingy
    // I am still figuring out if I can do this in other way
    render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>
    );

    // Check for the presence of navigation links
    expect(screen.getByText('Transfer Credits')).toBeInTheDocument();
    expect(screen.getByText('AP Credits')).toBeInTheDocument();
    expect(screen.getByText('Study Abroad')).toBeInTheDocument();

    // Check if the links have correct href attributes
    expect(screen.getByText('Transfer Credits').closest('a')).toHaveAttribute('href', '/');
    expect(screen.getByText('AP Credits').closest('a')).toHaveAttribute('href', '/APCredits');
    expect(screen.getByText('Study Abroad').closest('a')).toHaveAttribute('href', '/StudyAbroad');
  });
});
