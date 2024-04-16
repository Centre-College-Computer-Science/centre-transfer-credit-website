import "./styles.css";
import { useEffect, useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { LevelContext } from "./LevelContext";
import { useFetchCourses } from "./hooks/useFetchCourses";
import Layout from "./Layout";
import TransferCredits from "./TransferCredits";
import APCredits from "./APCredits";
import StudyAbroad from "./StudyAbroad";

export default function App() {
  const { data, loading, courseList, institutions, setCourseList } =
    useFetchCourses();
  const [selectedList, setSelectedList] = useState([]);
  const [currentInstitution, setCurrentInstitution] = useState("");
  const [accordionExpanded, setAccordionExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Update selected list whenever courseList changes
  useEffect(() => {
    setSelectedList(courseList.filter((course) => course.checked));
  }, [courseList]);

  const toggleSelected = (target, checked_state) => {
    setCourseList((existingCourseList) =>
      existingCourseList.map((course) =>
        course.course_workNumber === target.course_workNumber
          ? { ...course, checked: checked_state }
          : course
      )
    );
  };

  if (loading) return <div>Loading...</div>;

  return (
    <LevelContext.Provider
      value={{
        institutions,
        courseList,
        setCourseList,
        selectedList,
        setSelectedList,
        currentInstitution,
        setCurrentInstitution,
        accordionExpanded,
        setAccordionExpanded,
        searchTerm,
        setSearchTerm,
        toggleSelected,
      }}
    >
      <div className="container  parent_sticky">
        <div className="parent_content">
        <p>
          Please use this website to verify which courses transfer across
          universities. If your original credit was given by a traditional
          college or university, please see the transfer credit page. If your credit
          was awarded through an Advanced Placement (AP) Exam, please see the AP Credits page.
          For current students, please see the Study Abroad page to view the past accepted
          study abroad transfer credits.

          Dual Credit Policy:
          AP Credit Policy:
        </p>

        <HashRouter>

          <Routes>

            <Route path="/" element={<Layout />}>
              <Route index element={<TransferCredits />} />
              <Route path="APCredits" element={<APCredits />} />
              <Route path="StudyAbroad" element={<StudyAbroad />} />
            </Route>

          </Routes>

        </HashRouter>

      </div>
      </div>
    </LevelContext.Provider>
  );
}
