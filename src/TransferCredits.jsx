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

  const[accorChange, changeAccorClass] = useState(false)
  const clicked = () => {setShowList((showList) => !showList), changeAccorClass((accorChange) => !accorChange)};



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
      {/* <div className = "sticky">
      <div className="accordion borderless " data-accordion-open-text = "Click to Open" data-accordion-close-text = "Click to Close">
        
        <button className="accordion_button btn full sticky_space" >
          
          <span className = "accordion_button-text left_pos"><b> Saved Courses</b><span className="fix_count_size">{creditTotal == 0 ? null : " (" + creditTotal + ")"}</span></span>
              <span className = "accordion_button-text right_pos"><svg className = "accordion_icon saved_course_button" xmlns="http://www.w3.org/2000/svg" viewBox=" 0 0 30 30">
                <path className = "accordion_icon-path accordion_icon-path--horizontal" d = "M27.5 17.4h-25C1.2 17.4.1 16.3.1 15s1.1-2.4 2.4-2.4h25c1.3 0 2.4 1.1 2.4 2.4s-1.1 2.4-2.4 2.4z"></path>
                <path className ="accordion__icon-path accordion__icon-path--vertical" d="M14.5 29.9c-1.3 0-2.4-1.1-2.4-2.4v-25c0-1.3 1.1-2.4 2.4-2.4s2.4 1.1 2.4 2.4v25c0 1.3-1.1 2.4-2.4 2.4z"></path>
              </svg></span>
              

              </button>
          <div className="accordion_content wysiwyg scrollable_table">
          {showList ? <CourseTable isSelected={true} /> : null}
          </div>  
        
          
        
        
      </div>
     
      </div>

      */}


      <div className="sticky">
      <div class={accorChange ? "accordion" : "accordion--open"} data-accordion-open-text="Click to Open" data-accordion-close-text="Click to Close">

        <button class="accordion__button btn sticky_space" onClick={clicked} aria-expanded =  {accorChange}  style={accorChange ? {'background-color': "white"} : {'background-color':"#ffcd00"}}>
                <span class="show-for-sr"></span>
                <span class="accordion__button-text"><b> Saved Courses</b><span className="fix_count_size">{creditTotal == 0 ? null : " (" + creditTotal + ")"}</span></span>
                <svg class="accordion__icon" xmlns="http://www.w3.org/2000/svg" viewbox="0 0 30 30">
                  <path class="accordion__icon-path accordion__icon-path--horizontal" d="M27.5 17.4h-25C1.2 17.4.1 16.3.1 15s1.1-2.4 2.4-2.4h25c1.3 0 2.4 1.1 2.4 2.4s-1.1 2.4-2.4 2.4z"/>
                  <path class="accordion__icon-path accordion__icon-path--vertical" d="M14.5 29.9c-1.3 0-2.4-1.1-2.4-2.4v-25c0-1.3 1.1-2.4 2.4-2.4s2.4 1.1 2.4 2.4v25c0 1.3-1.1 2.4-2.4 2.4z"></path>
                  </svg>
        </button>
        <div class="accordion__content wysiwyg backgroundFormatting" style={accorChange ? {display:"block", transitionTimingFunction : "ease-in-out"} : {display:"none"}}>
        
          {showList ? <CourseTable isSelected={true} /> : null}
        </div>

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
            </div>
            </div>
        </div>
        ) : (
          <>
            {/* List of all institutions*/}
            <h2 className="fix_top_margin"> Institutions </h2>
            <InstitutionSearch />
            <InstitutionTable />
          </>
        )}
      </div>
    </div>
  );
}
