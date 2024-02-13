import { useContext, useState } from "react";
import { LevelContext } from "./LevelContext";

export default function InstitutionSearch() {
  let context = useContext(LevelContext);
  let searchTerm = context.searchTerm;
  let setSearchTerm = context.setSearchTerm;
  return (
    <form id="school-search">
      <label /*htmlFor="institution-name"*/>Enter college name: </label>
      <input
        type="text"
        id="institution-name"
        name="institution-name"
        placeholder="Centre College, Danville KY"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {/* <button type="submit">Search</button> */}
      {/* <button type="reset">Reset</button> */}
    </form>
  );
}
