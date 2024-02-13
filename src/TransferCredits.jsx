import { useContext } from "react";
import { useState } from "react";
import { LevelContext } from "./LevelContext";

import CourseTable from "./CourseTable";
import InstitutionTable from "./InstitutionTable";
import InstitutionSearch from "./InstitutionSearch";

export default function TransferCredits() {
  let context = useContext(LevelContext);
  let currentInstitution = context.currentInstitution;
  let setCurrentInstitution = context.setCurrentInstitution;
  // trying to get tables to be side-by-side: bad practice but wrap in big table

  const [showList, setShowList] = useState(false);
  const onClick = () => setShowList((showList) => !showList);

  return (
    <div class="full">
      <div class="sticky">
        <button class="button course_button" onClick={onClick}>
          <div>
            <div class="button course_button_text">Saved Courses</div>

            <div class="button course_button_icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
              </svg>
            </div>
          </div>
        </button>
        <div class="scrollable_table">
          {showList ? <CourseTable isSelected={true} /> : null}
        </div>
      </div>

      <div>
        {currentInstitution ? (
          <>
            <div class="container2">
              <button
                class="button standard_button"
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
              <div class="scrollable_table">
                <CourseTable
                  // courses={courseList.filter(
                  //   (course) => course.rewarding_institution == currentInstitution
                  // )}
                  isSelected={false}
                />
              </div>
              <div class="container2">
                <h2> Don't See Your Course Here? </h2>
                <p>
                  If you have a Centre College Login, please follow the
                  following link to request a transfer credit.
                </p>
              </div>
              <div class="container2">
                <form action="https://centrenet.centre.edu/ICS/">
                  <button class="button standard_button" type="submit">
                    Credit Request Form
                  </button>
                </form>
              </div>
            </div>
          </>
        ) : (
          <>
            <h2> Institutions </h2>
            <InstitutionSearch />
            <InstitutionTable />
          </>
        )}

        {/* <td>
              <h2 className="centered"> Saved Courses </h2>
              <CourseTable isSelected={true} />
            </td> */}
      </div>
    </div>
  );
}
