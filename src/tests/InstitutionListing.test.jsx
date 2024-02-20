import { describe, it, expect, vi } from 'vitest';
import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import InstitutionListing from '../InstitutionListing.jsx';
import { LevelContext } from '../LevelContext'; 


it("render", ()=>{
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
   <LevelContext.Provider value={{ setCurrentInstitution: mockToggleSelected }}>
     <InstitutionListing institution={courseDetails.rewarding_institution} />
   </LevelContext.Provider>
 )
   // debug();
   expect(screen.getByText(courseDetails.rewarding_institution)).toBeInTheDocument();

   const nameFieldElement = screen.getByText(courseDetails.rewarding_institution); //name of the course
   fireEvent.click(nameFieldElement); //clicks on the name

   //see if its called?
   //see if the text appear?
   expect(mockToggleSelected).toHaveBeenCalledWith(courseDetails.rewarding_institution);
});
