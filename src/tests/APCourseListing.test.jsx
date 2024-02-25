import { describe, it, expect } from "vitest";
import * as React from "react";
import { render, screen } from "@testing-library/react";
import APCourseListing from "../APCourseListing";

describe("APCourseListing component", () => {
  //creating fake course prop
  it("renders course details correctly", () => {
    const courseDetails = {
      test: "AP Computer Science",
      equivalency: "CSC170",
      credits: 3,
    };

    const { getByText } = render(<APCourseListing details={courseDetails} />);
    //testing that course is added to document
    expect(getByText("AP Computer Science")).toBeInTheDocument();
    expect(getByText("CSC170")).toBeInTheDocument();
    expect(getByText("3")).toBeInTheDocument(); // Assuming credits is rendered as text
  });
});
