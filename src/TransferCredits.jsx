import { useRef, useContext, useEffect } from "react";
import { LevelContext } from "./LevelContext";
import CourseTable from "./CourseTable";
import InstitutionTable from "./InstitutionTable";
import InstitutionSearch from "./InstitutionSearch";
import CourseRequestForm from "./CourseRequestForm";

export default function TransferCredits() {

  let context = useContext(LevelContext);
  let currentInstitution = context.currentInstitution;
  let setCurrentInstitution = context.setCurrentInstitution;
  let accordionExpanded = context.accordionExpanded;
  let setAccordionExpanded = context.setAccordionExpanded;
  let animationDuration = 500;

  let selectedList = context.selectedList;
  const accordionContentRef = useRef(null);

  const slideDown = () => {
    const element = accordionContentRef.current;
    element.style.removeProperty('display');
    let display = window.getComputedStyle(element).display;
    if (display === 'none') {
      display = 'block';
    }
    element.style.display = display;
    const height = element.offsetHeight;
    element.style.overflow = 'hidden';
    element.style.height = 0;
    element.style.paddingTop = 0;
    element.style.paddingBottom = 0;
    element.style.marginTop = 0;
    element.style.marginBottom = 0;
    // Allow unused expression here, querying offsetHeight causes the browser to
    // recalculate the correct height.
    element.offsetHeight; // eslint-disable-line
    element.style.transitionProperty = 'height, margin, padding';
    element.style.transitionDuration = `${animationDuration}ms`;
    element.style.transitionTimingFunction = 'ease-in-out';
    element.style.height = `${height}px`;
    element.style.removeProperty('padding-top');
    element.style.removeProperty('padding-bottom');
    element.style.removeProperty('margin-top');
    element.style.removeProperty('margin-bottom');
    window.setTimeout(() => {
      element.style.removeProperty('height');
      element.style.removeProperty('overflow');
      element.style.removeProperty('transition-duration');
      element.style.removeProperty('transition-property');
    }, animationDuration);
  };

  const slideUp = () => {
    const element = accordionContentRef.current;
    element.style.height = `${element.offsetHeight}px`;
    element.style.transitionProperty = 'height, margin, padding';
    element.style.transitionDuration = `${animationDuration}ms`;
    element.style.transitionTimingFunction = 'ease-in-out';
    element.offsetHeight; // Cause a reflow, enabling the transition
    element.style.overflow = 'hidden';
    element.style.height = 0;
    element.style.paddingTop = 0;
    element.style.paddingBottom = 0;
    element.style.marginTop = 0;
    element.style.marginBottom = 0;
    window.setTimeout(() => {
      element.style.display = 'none';
      element.style.removeProperty('height');
      element.style.removeProperty('padding-top');
      element.style.removeProperty('padding-bottom');
      element.style.removeProperty('margin-top');
      element.style.removeProperty('margin-bottom');
      element.style.removeProperty('overflow');
      element.style.removeProperty('transition-duration');
      element.style.removeProperty('transition-property');
    }, animationDuration);
  };

  useEffect(() => {
    if (accordionExpanded) {
      slideDown();
    } else {
      slideUp();
    }
  }, [accordionExpanded]); // Effect will run when `isOpen` changes.

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
      <div className = "sticky">
      {/* <div className="grid-container full">
      <div className="grid-container "> */}
      <div className={accordionExpanded ? 'accordion accordion--open' : 'accordion'} data-accordion-open-text = "Click to Open" data-accordion-close-text = "Click to Close">
        {/* Code for the drop down button for the saved list */}
        <button className="accordion__button btn" aria-expanded={accordionExpanded ? 'true' : 'false'} onClick={() => setAccordionExpanded(!accordionExpanded)}>

          <span className = "accordion__button-text"><b> Saved Credits</b><span className="fix_count_size">{creditTotal == 0 ? null : " (" + creditTotal + ")"}</span></span>
          <svg className="accordion__icon" xmlns="http://www.w3.org/2000/svg" viewBox=" 0 0 30 30">
            <path className = "accordion__icon-path accordion__icon-path--horizontal" d = "M27.5 17.4h-25C1.2 17.4.1 16.3.1 15s1.1-2.4 2.4-2.4h25c1.3 0 2.4 1.1 2.4 2.4s-1.1 2.4-2.4 2.4z"></path>
            <path className ="accordion__icon-path accordion__icon-path--vertical" d="M14.5 29.9c-1.3 0-2.4-1.1-2.4-2.4v-25c0-1.3 1.1-2.4 2.4-2.4s2.4 1.1 2.4 2.4v25c0 1.3-1.1 2.4-2.4 2.4z"></path>
          </svg>

         </button>
            {/* Determines whether to show the list or not depending on if the button
            is pressed */}
          <div ref={accordionContentRef} className="accordion__content wysiwyg">
            <CourseTable isSelected={true} />
          </div>



      </div>
      {/* </div>
      </div> */}
      </div>





      {/* Displays either the list of institutions or an institution's courses,
          depending on whether a current institution is selected or not */}

      <div>
        {currentInstitution ? (
          <div>
          {/* Institution's courses*/}
            <div className="container2">
              <p>
                <button
                className="btn"
                type="button"
                onClick={() => setCurrentInstitution("")}
              >
                Back
              </button>
              </p>
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

              {/*<h2> Don't See Your Course Here? </h2>*/}
              {/*<p>*/}
              {/*  Fill out the form to request transfer credit for it!*/}
              {/*</p>*/}
              {/*<p>*/}
              {/*  <a className={"btn"} href={"/transfer-credit-form"} target={"_blank"}>Request Transfer Credit</a>*/}
              {/*</p>*/}
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
