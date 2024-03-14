import { useContext } from "react";
import { useState } from "react";
import { LevelContext } from "./LevelContext";

import CourseTable from "./CourseTable";
import InstitutionTable from "./InstitutionTable";
import InstitutionSearch from "./InstitutionSearch";
import CourseRequestForm from "./CourseRequestForm";




export default function TransferCredits() {
  let context = useContext(LevelContext);
  let currentInstitution = context.currentInstitution;
  let setCurrentInstitution = context.setCurrentInstitution;

  const [showList, setShowList] = useState(false);
  const onClick = () => setShowList((showList) => !showList);
  let selectedList = context.selectedList;


// Loops through the selectedList and adds up all the course credit totals
// for the courses in that list
  const creditTotal = ( function (){
    let total = 0;


    for(var i = 0; i < selectedList.length; i++){
      total += Number(selectedList[i].centre_course_credits);
    }


    return total; } ) ();
  return (
    
    <div>
     
      <div className="accordion" data-accordion-open-text = "Clisck to Open" data-accordion-close-text = "Click to Close">
        {/* Code for the drop down button for the saved list */}
        <button className="button accordion_button" onClick={onClick} aria-expanded = "false">
          <span className="show-for-sr"></span>
          <span className = "acordion_button-text"> Saved Courses<p><b>({creditTotal == 0 ? null : creditTotal})</b></p></span>
              <svg className = "accordion_icon" xmlns="http://www.w3.org/2000/svg" viewBox=" 0 0 30 30">
                <path className = "accordion_icon-path accordion_icon-path--horizontal" d = "M27.5 17.4h-25C1.2 17.4.1 16.3.1 15s1.1-2.4 2.4-2.4h25c1.3 0 2.4 1.1 2.4 2.4s-1.1 2.4-2.4 2.4z"></path>
                <path className ="accordion__icon-path accordion__icon-path--vertical" d="M14.5 29.9c-1.3 0-2.4-1.1-2.4-2.4v-25c0-1.3 1.1-2.4 2.4-2.4s2.4 1.1 2.4 2.4v25c0 1.3-1.1 2.4-2.4 2.4z"></path>
              </svg>
        </button>
        {/* Determines whether to show the list or not depending on if the button
            is pressed */}
        <div className="accordion_content wysiwyg" style= "display: none; transition-timing-function:ease-in-out;">
          {showList ? <CourseTable isSelected={true} /> : null}
        </div>
      </div>

      {/* Displays either the list of institutions or an institution's courses,
          depending on whether a current institution is selected or not */}

      <div>
        {currentInstitution ? (
          <div>
          {/* Institution's courses*/}
            <div className="container2">
              <button
                className="button standard_button"
                type="button"
                onClick={() => setCurrentInstitution("")}
              >
                Back
              </button>
              <h2> {currentInstitution} Courses </h2>

              <p>
                You should now see the courses we have on file below. Please
                feel free to browse at your leisure; clicking on the checkboxes
                next to a course you're looking at will save it to your Saved
                Course Summary so you can see your progress as you go, or add
                courses from multiple institutions.
              </p>
              <div className="container2">
              <div className="scrollable_table">
                <CourseTable isSelected={false} />
              </div>
                <h2> Don't See Your Course Here? </h2>
                <p>
                  Fill out the form below to request transfer credit for it!
                </p>
                <div className = "container2">
                <CourseRequestForm />
                </div>
            </div>
            </div>
        </div>
        ) : (
          <>
            {/* List of all institutions*/}
            <h2> Institutions </h2>
            <InstitutionSearch />
            <InstitutionTable />
          </>
        )}
      </div>
    </div>
  );
}
