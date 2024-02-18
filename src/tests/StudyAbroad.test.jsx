import { render, screen } from '@testing-library/react';
import StudyAbroad from '../StudyAbroad'; // Adjust the import path according to your file structure

describe('StudyAbroad Component', () => {
  it('renders Study Abroad component and checks for specific content', () => {
    render(<StudyAbroad />);
    const studyAbroadElement = screen.getByTestId('study-abroad');
    expect(studyAbroadElement).toBeInTheDocument();

    expect(screen.getByText(/Study Abroad Transfer Credit Policy/i)).toBeInTheDocument();
    expect(screen.getByText(/Approved Study Abroad Credits/i)).toBeInTheDocument();
    expect(screen.getByText(/Lorem ipsum dolor sit amet, consectetur adipiscing elit,/i)).toBeInTheDocument();
  });
});
