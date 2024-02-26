import { useContext } from "react";
import { LevelContext } from "./LevelContext";

export default function InstitutionListing(props) {
  let institution = props.institution;
  let context = useContext(LevelContext)
  let setCurrentInstitution = context.setCurrentInstitution;
  return (
    <tr id={institution}>
      <td className="name-field" onClick={() => setCurrentInstitution(institution)}>
        {institution}
      </td>
    </tr>
  );
}
