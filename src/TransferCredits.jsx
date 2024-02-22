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
  // trying to get tables to be side-by-side: bad practice but wrap in big table

  const [showList, setShowList] = useState(false);
  const onClick = () => setShowList((showList) => !showList);
  let selectedList = context.selectedList;


// Loops through the selectedList and adds up all the course credit totals
  const creditTotal = ( function (){
    let total = 0;


    for(var i = 0; i < selectedList.length; i++){
      total += Number(selectedList[i].centre_course_credits);
    }


    return total; } ) ();
  return (
    
    <div>
     
      <div className="sticky">
        <button className="button course_button" onClick={onClick}>
          <div>
            <div className="button course_button_text">Saved Courses </div>
            
            <div className="button course_button_icon">
              <table className = "course_button_info">
                <tbody>
                <tr className = "standard">
                  <td>
              <p><b>{creditTotal == 0 ? null : creditTotal}</b></p>
              </td>
              <td >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
              </svg>
              </td>
              </tr>
              </tbody>
              </table>
            </div>
          </div>
        </button>
        <div className="scrollable_table">
          {showList ? <CourseTable isSelected={true} /> : null}
        </div>
      </div>

      <div>
        {currentInstitution ? (
          <>
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
              <div className="scrollable_table">
                <CourseTable
                  // courses={courseList.filter(
                  //   (course) => course.rewarding_institution == currentInstitution
                  // )}
                  isSelected={false}
                />
              </div>
             
                <h2> Don't See Your Course Here? </h2>
                <p>
                  Fill out the form below to request transfer credit for it!
                </p>
                <CourseRequestForm />
            </div>
          </>
        ) : (
          <>
            <h2> Institutions </h2>
            <InstitutionSearch />
            <InstitutionTable />
          </>
        )}
      </div>
    </div>
  );
}
