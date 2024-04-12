import { useContext, useState } from "react";
import { LevelContext } from "./LevelContext";

export default function InstitutionSearch() {
  let context = useContext(LevelContext);
  let searchTerm = context.searchTerm;
  let setSearchTerm = context.setSearchTerm;

  // Returns a text input field that changes the searchTerm
  // in the context on change
  return (
    <form className={"webform"} id="school-search">
      <div className={"form-item"}>
        <label htmlFor={"institution-name"}> Enter college name:</label>
        <input
            type="text"
            id="institution-name"
            name="institution-name"
            value={searchTerm}
            placeholder="Search courses..."
            onChange={(e) => setSearchTerm(e.target.value)}
        />

      </div>

    </form>

  );
}
