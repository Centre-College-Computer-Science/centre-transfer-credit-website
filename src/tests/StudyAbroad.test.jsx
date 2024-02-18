import { render, screen } from '@testing-library/react';
import StudyAbroad from '../StudyAbroad';

describe('StudyAbroad Component', () => {
  beforeEach(() => {
    render(<StudyAbroad />);
  });

  it('should be in the document', () => {
    expect(screen.getByTestId('study-abroad')).toBeInTheDocument();
  });

  // Example using accessible roles instead of class names where possible
  it('checks for the presence of headings using roles', () => {
    expect(screen.getByRole('heading', { name: /Study Abroad Transfer Credit Policy/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Approved Study Abroad Credits/i })).toBeInTheDocument();
  });

  // Fallback to using document.querySelectorAll for class-specific queries when necessary
  it('checks for nested container structure using class names', () => {
    const containers = document.querySelectorAll('.container');
    expect(containers.length).toBeGreaterThanOrEqual(4);
  });

  it('validates the presence of detailed information text', () => {
    expect(screen.getByText(/Lorem ipsum dolor sit amet,/i)).toBeInTheDocument();
  });

});
