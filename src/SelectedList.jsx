// No longer necessary -- implemented using a CourseTable component
import CourseListing from "./CourseListing";

export default function SelectedList(props) {
  let courses = props.courses.courses;

  return (
    <table>
      <thead>
        <tr>
          <th>Rewarding Institution</th>
          <th>Course Code</th>
          <th>Course Name</th>
          <th>Centre Course Code</th>
          <th>Centre Course Name</th>
          <th>Remove from list?</th>
        </tr>
      </thead>
      <tbody>
        {courses.map((course) => (
          <CourseListing course={course} toggleFunc={toggleFunc} />
        ))}
      </tbody>
    </table>
  );
}
