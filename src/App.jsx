import "./styles.css";
import "./theme.css";
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
        searchTerm,
        setSearchTerm,
        toggleSelected,
      }}
    >
      <div className="container  parent_sticky">
        <div className="parent_content"> 
        <p>
          This tool helps transferring students to determine what classes can be transferred in to Centre.
        </p>
        <p>
          Information on Centre's pre-matriculation credit policy, including <b>AP</b>, <b>IB</b>, CLEP, and international exams, can be found 
          <a href="https://www.centre.edu/apply/college-credit-equivalency">here</a>.
        </p>

        <p>
          <b>If you do not see your transferring institution below</b>, click <a href="https://youtu.be/dQw4w9WgXcQ?si=W7wjRWeYkdsnsFvu">here</a> to submit a request for your courses to be accepted.
        </p>
    
        <TransferCredits />
      
      </div>
      </div>
    </LevelContext.Provider>
  );
}
