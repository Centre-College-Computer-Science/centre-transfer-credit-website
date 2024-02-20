import "./styles.css";

import { useContext, useEffect, useState, useRef } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LevelContext } from "./LevelContext";
import Layout from "./Layout";
import Home from "./Home";
import TransferCredits from "./TransferCredits";
import APCredits from "./APCredits";
import StudyAbroad from "./StudyAbroad";
import Papa from "papaparse";
import fileCSV from "./Non-Catalog.csv";
import Forms from "./Forms";
import InstitutionTable from "./InstitutionTable";
import CourseTable from "./CourseTable";

export default function App() {
  //let courses = props.courses;
  //let selectedCourses = props.selectedCourses;
  //let institutions = props.institutions;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // converting names to title case (why are they not already??)
  // need to parse out improperly spaced dashes oops lol
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

  // Part of the Level Context
  const [institutions, setInstitutions] = useState([]);
  const [courseList, setCourseList] = useState([]);
  const [selectedList, setSelectedList] = useState([]);
  const [currentInstitution, setCurrentInstitution] = useState("");

  const [searchTerm, setSearchTerm] = useState(""); // for use in filtering institution table

  // It takes the csv file and parses it into a JSON object
  // tally of times i've had to reload data: 10
  // weird bug - sometimes when I break things this doesn't run on entering TransferCredits. needs work
  // empty dependency array probably overkill. we want to fetch data when the component loads, but for some reason it isn't firing all the time? weird
  useEffect(() => {
    fetch(fileCSV)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error");
        }
        return response.text();
      })
      .then((actualData) => {
        //Convert the CSV to JSON and into a 2d array
        Papa.parse(actualData, {
          //taking first line as header from csv
          header: true,
          complete: function (actualData) {
            const file = actualData.data;
            setData(file);
            //WHy empty
            console.log(data);
            //Change this to Data to FILE KHASFKJSHF
            //I really dont know why the fudge I need change this but it works?
            //Im just confusec as heck also ;-;
            let courses = file.map((course) => {
              return {
                rewarding_institution: makeTitleCase(
                  course["School Name"].trim()
                ),
                ri_code: course["School ID Number"],
                ri_courseTitle: course["Non-Catalog Course Title"].trim(),
                centre_courseTitle: course["Course Work Course Title"],
                course_workNumber: course["Course Work Number"],
                //centre_course_code: course["Course Work Catalog Code"], //?
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
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  useEffect(() => {
    setSelectedList(courseList.filter((course) => course.checked));
  }, [courseList]);

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
  /* unnecessary, oops */
  // function toggleInstitutionTable(institution_name) {
  //   setCurrentInstitution(institution_name);
  // }

  // function updateSearchTerm(search_term) {
  //   setSearchTerm(search_term);
  // }

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
    // toggleInstitutionTable: toggleInstitutionTable,
    // updateSearchTerm: updateSearchTerm
  };

  return (
    <LevelContext.Provider value={context}>
      <div class="container">
        <h1>Centre College Transfer Policy</h1>
        <p>
          Please use this website to verify which courses transfer accros
          universities. If your original credit was given by a traditional
          college or university, please see the transfer credit page.
        </p>
        
        <div>
        
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                {/* <Route index element={<Home />} /> */}
                <Route index element={<TransferCredits />} />
                <Route path="APCredits" element={<APCredits />} />
                <Route path="StudyAbroad" element={<StudyAbroad />} />
                {/* <Route path="Forms" element={<Forms />} /> */}
              </Route>
            </Routes>
          </BrowserRouter>
          
        </div>
        
      </div>
    </LevelContext.Provider>
  );
}
