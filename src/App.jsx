import "./styles.css";

import { useContext, useEffect, useState, useRef } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LevelContext } from "./LevelContext";
import Layout from "./Layout";
import TransferCredits from "./TransferCredits";
import APCredits from "./APCredits";
import StudyAbroad from "./StudyAbroad";
import Papa from "papaparse";
import fileCSV from "./Non-Catalog.csv";
import InstitutionTable from "./InstitutionTable";
import CourseTable from "./CourseTable";

export default function App() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // converting names to title case 
  // parse out improperly spaced dashes oops lol
  function makeTitleCase(string) {
    const words = string.split(/[\s+]/);
    let new_words = words.map((word) => {
      if (word != "of") {
        return word.slice(0, 1).toUpperCase() + word.slice(1).toLowerCase();
      } else {
        return word;
      }
    });
    return new_words.join(" ");
  }
  const [institutions, setInstitutions] = useState([]);
  const [courseList, setCourseList] = useState([]);
  const [selectedList, setSelectedList] = useState([]);
  const [currentInstitution, setCurrentInstitution] = useState("");

  const [searchTerm, setSearchTerm] = useState(""); // for use in filtering institution table

 //use effect to pull the CSV file, handle errors if it is not found, and parse the information 
 //into usable information for the instititutions and course list
  useEffect(() => {
    fetch(fileCSV)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error");
        }
        return response.text();
      })
      .then((actualData) => {
        Papa.parse(actualData, {
          //taking first line as header from csv
          header: true,
          complete: function (actualData) {
            const file = actualData.data;
            setData(file);
            //WHy empty
            console.log(data);
            //Change this to Data to FILE 
            let courses = file.map((course) => {
              return {
                rewarding_institution: makeTitleCase(
                  course["School Name"].trim()
                ),
                ri_code: course["School ID Number"],
                ri_courseTitle: course["Non-Catalog Course Title"].trim(),
                centre_courseTitle: course["Course Work Course Title"],
                course_workNumber: course["Course Work Number"],
                // clean up below to be consistent with camelcase
                centre_course_credits: course["Course Work Credit Hours"],
                checked: false,
              };
            });

            setCourseList(courses);

            const institutions = courses.map(
              (course) => course.rewarding_institution
            );
            const institutionSet = new Set(institutions);
            const distinctInstitutions = Array.from(institutionSet);

            setInstitutions(distinctInstitutions);
          },
        });
      })
      // catch errors and log them 
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  useEffect(() => {
    setSelectedList(courseList.filter((course) => course.checked));
  }, [courseList]);

//toggle function to go to page with more information on the courses
  function toggleSelected(target, checked_state) {
    // console.log(target, checked_state);
    setCourseList((existingCourseList) =>
      existingCourseList.map((course) => {
        if (course.course_workNumber === target.course_workNumber) {
          return { ...course, checked: checked_state };
        } else {
          return course;
        }
      })
    );
  }
 
  //setting all variables into context
  const context = {
    institutions: institutions,
    setInstitutions: setInstitutions,
    courseList: courseList,
    setCourseList: setCourseList,
    selectedList: selectedList,
    setSelectedList: setSelectedList,
    currentInstitution: currentInstitution,
    setCurrentInstitution: setCurrentInstitution,
    searchTerm: searchTerm,
    setSearchTerm: setSearchTerm,
    toggleSelected: toggleSelected,
  };

  //returns the overall page
  return (
    <LevelContext.Provider value={context}>
      {/*container div ensures column-oriented formatting for the page */}
      <div className="container">
        <h1>Centre College Transfer Policy</h1>
        <p>
          Please use this website to verify which courses transfer accros
          universities. If your original credit was given by a traditional
          college or university, please see the transfer credit page.
        </p>
          {/*Calls the Layout function to display the navigation bar and the pages it contains.
           Sets the index as the Transfer Credits and routes to the two other pages.*/}
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<TransferCredits />} />
                <Route path="APCredits" element={<APCredits />} />
                <Route path="StudyAbroad" element={<StudyAbroad />} />
              </Route>
            </Routes>
          </BrowserRouter>
      </div>
    </LevelContext.Provider>
  );
}
