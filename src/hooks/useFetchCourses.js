// hooks/useFetchCourses.js
import { useEffect, useState } from 'react';
import Papa from 'papaparse';
import fileCSV from '../Non-Catalog.csv';
import { makeTitleCase } from '../utils/utils';

export const useFetchCourses = () => {
  const [data, setData] = useState([]);
  const [courseList, setCourseList] = useState([]);
  const [institutions, setInstitutions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Inside useFetchCourses.js
console.log('Fetching courses...');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(fileCSV);
        if (!response.ok) throw new Error('Network response was not ok');
        const actualData = await response.text();

        Papa.parse(actualData, {
          header: true,
          complete: function (results) {
            const file = results.data;
            setData(file);

            let courses = file.map((course) => ({
              rewarding_institution: makeTitleCase(course["School Name"].trim()),
              ri_code: course["School ID Number"],
              ri_courseTitle: course["Non-Catalog Course Title"].trim(),
              centre_courseTitle: course["Course Work Course Title"],
              course_workNumber: course["Course Work Number"],
              centre_course_credits: course["Course Work Credit Hours"],
              checked: false,
            }));

            setCourseList(courses);

            const institutions = [...new Set(courses.map(course => course.rewarding_institution))];
            setInstitutions(institutions);
            setLoading(false);
          },
        });
      } catch (err) {
        console.error(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, courseList, institutions, setCourseList };
};
