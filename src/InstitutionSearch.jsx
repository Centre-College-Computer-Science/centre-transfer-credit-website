import { useContext, useState } from "react";
import { LevelContext } from "./LevelContext";

export default function InstitutionSearch() {
  let context = useContext(LevelContext);
  let searchTerm = context.searchTerm;
  let setSearchTerm = context.setSearchTerm;
  return (
 
    
    <form id="school-search">
      <label /*htmlFor="institution-name"*/>Enter college name: 
      <input
        type="text"
        id="institution-name"
        name="institution-name"
        value={searchTerm}
        placeholder="Search courses..."
        onChange={(e) => setSearchTerm(e.target.value)}
      /></label>
      
    </form>
   
  );
}
