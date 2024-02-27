import { useContext } from "react";
import { LevelContext } from "./LevelContext";

export default function InstitutionListing(props) {
  let institution = props.institution;
  let context = useContext(LevelContext)
  let setCurrentInstitution = context.setCurrentInstitution;

  // Returns a table row with a link for an institution. On click of that link,
  // changes the currently saved institition in the context
  return (
    <tr id={institution}>
      <td className="name-field" onClick={() => setCurrentInstitution(institution)}>
        {institution}
      </td>
    </tr>
  );
}
