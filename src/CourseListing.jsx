import { useContext } from "react";
import { LevelContext } from "./LevelContext";

export default function CourseListing(props) {
  let course = props.details;
  let context = useContext(LevelContext);
  let toggleSelected = context.toggleSelected;

  return (
    <tr className="centered">
      <td>{course.rewarding_institution}</td>
      <td>{course.ri_courseTitle}</td>
      <td>{course.centre_courseTitle}</td>
      <td>{course.centre_course_credits}</td>
      <td className="checkbox-col">
        <input
          type="checkbox"
          checked={course.checked}
          onChange={(e) => toggleSelected(course, e.target.checked)}
        />
      </td>
    </tr>
  );
}
