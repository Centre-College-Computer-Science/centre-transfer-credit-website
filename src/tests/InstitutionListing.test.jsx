import { describe, it, expect } from "vitest";
import * as React from "react";
import { render, screen } from "@testing-library/react";
import InstitutionListing from './InstitutionListing.jsx';


it("render", ()=>{
   const institutionName = "BERRY COLLEGE"


   render(<InstitutionListing />)


   expect(screen.getByText(institutionName));
});
