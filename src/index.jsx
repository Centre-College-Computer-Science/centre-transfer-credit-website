import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
//Test
// const courses = [
//   {
//     rewarding_institution: "ABC College",
//     ri_course_code: "101",
//     ri_course_credits: 3,
//     centre_course_code: "110",
//     centre_course_credits: 3,
//     checked: false
//   },
//   {
//     rewarding_institution: "ABC College",
//     ri_course_code: "102",
//     ri_course_credits: 3,
//     centre_course_code: "120",
//     centre_course_credits: 3,
//     checked: false
//   },
//   {
//     rewarding_institution: "XYZ University",
//     ri_course_code: "201",
//     ri_course_credits: 4,
//     centre_course_code: "210",
//     centre_course_credits: 4,
//     checked: false
//   },
//   {
//     rewarding_institution: "DEF College",
//     ri_course_code: "301",
//     ri_course_credits: 3,
//     centre_course_code: "310",
//     centre_course_credits: 3,
//     checked: false
//   },
//   {
//     rewarding_institution: "GHI University",
//     ri_course_code: "401",
//     ri_course_credits: 4,
//     centre_course_code: "410",
//     centre_course_credits: 4,
//     checked: false
//   },
//   {
//     rewarding_institution: "JKL College",
//     ri_course_code: "501",
//     ri_course_credits: 3,
//     centre_course_code: "510",
//     centre_course_credits: 3,
//     checked: false
//   }
// ];

// const selectedCourses = [];

// getting unique list of colleges to make college table
// const institutions = courses.map((course) => course.rewarding_institution);
// const institutionSet = new Set(institutions);
// const distinctInstitutions = Array.from(institutionSet);
// console.log(distinctInstitutions);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
