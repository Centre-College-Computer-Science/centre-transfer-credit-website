import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import StudyAbroad from '../StudyAbroad'; // Adjust the import path according to your project structure

describe('StudyAbroad Component', () => {
  it('renders without crashing', () => {
    render(<StudyAbroad />);
    expect(screen.getByTestId('study-abroad')).toBeInTheDocument();
  });

  it('displays the correct heading', () => {
    render(<StudyAbroad />);
    expect(screen.getByRole('heading', { name: /Study Abroad Transfer Credit Policy/i })).toBeInTheDocument();
  });

  it('contains the information about study abroad credit transfer', () => {
    render(<StudyAbroad />);
    expect(screen.getByText(/if you are a current Centre student aiming to transfer over a study abroad credit/i)).toBeInTheDocument();
  });

  it('mentions the approved study abroad credits section', () => {
    render(<StudyAbroad />);
    expect(screen.getByRole('heading', { name: /Approved Study Abroad Credits/i })).toBeInTheDocument();
    expect(screen.getByText(/This table is coming soon/i)).toBeInTheDocument();
  });
});
