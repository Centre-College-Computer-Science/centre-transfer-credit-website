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

      <tbody>
        {searchTerm // oh my god this is ugly. OK so if searchTerm is not empty filter for only institutions that match; otherwise display full table?
          ? institutions
              .filter((institution) =>
                institution.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((institution) => (
                <InstitutionListing
                  key={crypto.randomUUID()} // want to make this ri_code, no idea how to yet
                  institution={institution}
                />
              ))
          : institutions.map((institution) => (
              <InstitutionListing
                key={crypto.randomUUID()} // want to make this ri_code, no idea how to yet
                institution={institution}
              />
            ))}
      </tbody>
    </table>
  );
}
