import React from "react";
import { render } from "@testing-library/react";
// import "@testing-library/jest-dom/extend-expect"; // for extra matchers like toBeInTheDocument
import { LevelContext } from "../LevelContext";
import CourseTable from "../CourseTable";

test("renders CourseTable component with specific courses", () => {
  const courseList = [
    //Sample course data for testing
    {
      rewarding_institution: "Institution A",
      ri_courseTitle: 'RI Course Title',
      centre_courseTitle: 'Centre Course Title',
      centre_course_credits: '3',
      checked: false
    },
     {
      rewarding_institution: "Institution A",
      ri_courseTitle: 'RI Course Title',
      centre_courseTitle: 'Centre Course Title',
      centre_course_credits: '3',
      checked: false
      // Add other necessary fields
    },
    {
      rewarding_institution: "Institution A",
      ri_courseTitle: 'RI Course Title',
      centre_courseTitle: 'Centre Course Title',
      centre_course_credits: '3',
      checked: false
      // Add other necessary fields
    },
    {
      rewarding_institution: "Institution A",
      ri_courseTitle: 'RI Course Title',
      centre_courseTitle: 'Centre Course Title',
      centre_course_credits: '3',
      checked: false
      // Add other necessary fields
    },
    // Add more sample courses as needed
  ];

  const selectedList = [
    // Sample selected courses for testing
    {
      rewarding_institution: "Institution C",
      ri_courseTitle: 'RI Course Title',
      centre_courseTitle: 'Centre Course Title',
      centre_course_credits: '3',
      checked: false

      // Add other necessary fields
    },
    // Add more sample selected courses as needed
  ];

  const currentInstitution = "Institution A"; // Set the current institution for testing

  const contextValue = {
    courseList,
    selectedList,
    currentInstitution,
  };

  const { getByTestId, getAllByRole } = render(
    <LevelContext.Provider value={contextValue}>
      <CourseTable isSelected={false} />
    </LevelContext.Provider>
  );

  
  // Check if the table is rendered
  const courseTable = getByTestId("course-table");
  expect(courseTable).toBeInTheDocument();

  // Check if specific courses are displayed in the table
  const courseRows = getAllByRole("row");
  expect(courseRows).toHaveLength(courseList.length + 1);


  // Add more specific assertions as needed based on your component's logic
});
// Add more tests as needed for different scenarios (e.g., isSelected=true, empty courseList, etc.)
