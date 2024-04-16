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
        <p className="tab">&emsp;&emsp;Centre’s policies in these areas are designed to reward extraordinary achievement while at the same time supporting our belief that the best Centre College experience is a four-year experience. 
          It is our philosophy that everything a student does prior to high school graduation is preparation for college, and all Centre students enter with exceptional academic credentials. 
          Some of those credentials include college course work and others do not. Consequently, we limit the amount of credit first-year students can be awarded prior to their enrollment
           at the College:<br /></p>
        <div className="tabbedMargin">
        <p>1.    A maximum of 24 hours of pre-matriculation credits may be awarded to first-year students from all sources (e.g., Advanced Placement, International Baccalaureate, dual-credit, all other college credit).<br />

        2.    Credit will not be awarded for any course or examination completed prior to the start of the junior year in high school.<br />

        3.    Credit will not be awarded for any course or examination that serves to satisfy the College’s entrance requirements.<br />

        4.    Students who legitimately exceed the 24-hour limit may choose which credits will be awarded, and may adjust his or her choices later subject to the constraints of any other College policies.<br />

        5.    Regardless of credit granted, students must complete at least one general education course in residence in each of the following three exploration areas: arts & humanities, social studies, science & mathematics.<br /></p>
        </div><p>
          {/* This tool helps transferring students to determine what classes can be transferred in to Centre. */}
        </p>
        <p>
          {/* Information on Centre's pre-matriculation credit policy, including <b>AP</b>, <b>IB</b>, CLEP, and international exams, can be found  */}
          {/* <a href="https://www.centre.edu/apply/college-credit-equivalency">here</a>. */}
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
