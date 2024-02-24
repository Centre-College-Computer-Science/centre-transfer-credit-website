import { useContext, useState } from "react";
import { LevelContext } from "./LevelContext";

export default function InstitutionSearch() {
  let context = useContext(LevelContext);
  let searchTerm = context.searchTerm;
  let setSearchTerm = context.setSearchTerm;

  // Returns a text input field that changes the searchTerm
  // in the context on change
  return (
    <form id="school-search">
      <label> Enter college name: 
        <input
          type="text"
          id="institution-name"
          name="institution-name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </label>
    </form>
   
  );
}
