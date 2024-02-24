import { useContext } from "react";
import { LevelContext } from "./LevelContext";

import InstitutionListing from "./InstitutionListing";

export default function InstitutionTable(props) {
  let context = useContext(LevelContext);
  let institutions = context.institutions;
  let searchTerm = context.searchTerm;

  return (
    <table>
      <thead>
        <tr>
          <th>School Name</th>
        </tr>
      </thead>

      {/* If searchTerm is not empty, filter for only institutions that match the searchTerm.
          Otherwise, dislay the full table */}
      <tbody>
        {searchTerm
          // Search filtered table
          ? institutions
              .filter((institution) =>
                institution.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((institution) => (
                <InstitutionListing
                  key={crypto.randomUUID()} // Would prefer to use a rewarding institution code, if it ever got included into the dataset
                  institution={institution}
                />
              ))
          // Full table
          : institutions.map((institution) => (
              <InstitutionListing
                key={crypto.randomUUID()}
                institution={institution}
              />
            ))}
      </tbody>
    </table>
  );
}
