import { render, screen, fireEvent } from '@testing-library/react';
import CourseListing from '../CourseListing';
import { LevelContext } from '../LevelContext'; 
import { describe, it, expect, vi } from 'vitest';

describe('CourseListing Component', () => {
  const mockToggleSelected = vi.fn(); // Using Vitest's vi.fn() to create a mock function
  const courseDetails = {
    rewarding_institution: 'Institution Name',
    ri_courseTitle: 'RI Course Title',
    centre_courseTitle: 'Centre Course Title',
    centre_course_credits: '3',
    checked: false
  };

  it('renders course information correctly', () => {
    render(
      <LevelContext.Provider value={{ toggleSelected: mockToggleSelected }}>
        <table>
          <tbody>
            <CourseListing details={courseDetails} />
          </tbody>
        </table>
      </LevelContext.Provider>
    );

    expect(screen.getByText(courseDetails.rewarding_institution)).toBeInTheDocument();
    expect(screen.getByText(courseDetails.ri_courseTitle)).toBeInTheDocument();
    expect(screen.getByText(courseDetails.centre_courseTitle)).toBeInTheDocument();
    expect(screen.getByText(courseDetails.centre_course_credits)).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('checkbox toggles checked state on click', () => {
    render(
      <LevelContext.Provider value={{ toggleSelected: mockToggleSelected }}>
        <table>
          <tbody>
            <CourseListing details={{ ...courseDetails, checked: true }} />
          </tbody>
        </table>
      </LevelContext.Provider>
    );

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
    fireEvent.click(checkbox);
    expect(mockToggleSelected).toHaveBeenCalledWith({ ...courseDetails, checked: true }, false);
  });
});
