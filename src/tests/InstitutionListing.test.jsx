import { describe, it, expect, vi } from 'vitest';
import * as React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import InstitutionListing from '../InstitutionListing.jsx';
import { LevelContext } from '../LevelContext'; 
import CourseListing from '../CourseListing.jsx';

describe('Seeing if Instution List is functioning properly', () => {
  it("render", async () => {
    const mockToggleSelected = vi.fn(); //mock function

    //a mockup list of a course
    const courseDetails = {
      rewarding_institution: 'Institution Name',
      ri_courseTitle: 'RI Course Title',
      centre_courseTitle: 'Centre Course Title',
      centre_course_credits: '3',
      checked: false
    };

    //setting up the InstitutionListing by rendering it

  render(
    <LevelContext.Provider value={{ setCurrentInstitution: mockToggleSelected}}>
      <InstitutionListing institution={courseDetails.rewarding_institution} />
    </LevelContext.Provider> 
  )
    //see if the name appears on the document
    expect(screen.getByText(courseDetails.rewarding_institution)).toBeInTheDocument();

    const nameFieldElement = screen.getByText(courseDetails.rewarding_institution); //name of the course
    fireEvent.click(nameFieldElement); //an event that clicks on the name
    expect(mockToggleSelected).toHaveBeenCalledWith(courseDetails.rewarding_institution);
    //see of the function has been called or has been click
  });
});
