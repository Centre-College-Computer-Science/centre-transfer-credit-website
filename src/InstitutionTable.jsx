import { useContext } from "react";
import { LevelContext } from "./LevelContext";
//import {randomUUID} from 'node:crypto';
//window.crypto.randomUUID = randomUUID;

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
                  key = {institution}
                  institution={institution}
                />
              ))
          // Full table
         : institutions.map((institution) => (
              <InstitutionListing
                key = {institution}
                institution={institution}
              />
            ))}
      </tbody>
    </table>
  );
}
