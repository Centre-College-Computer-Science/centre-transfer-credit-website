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
                  key={crypto.randomUUID()} // want to make this ri_code, no idea how to yet (Update 02/24/24: Not sure what Michael meant by this - Jackson Arnold)
                  institution={institution}
                />
              ))
          // Full table
          : institutions.map((institution) => (
              <InstitutionListing
                key={crypto.randomUUID()} // want to make this ri_code, no idea how to yet (Update 02/24/24: Not sure what Michael meant by this - Jackson Arnold)
                institution={institution}
              />
            ))}
      </tbody>
    </table>
  );
}
