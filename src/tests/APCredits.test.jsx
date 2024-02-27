import { describe, it, expect } from "vitest";
import * as React from "react";
import { render, screen } from "@testing-library/react";
import APCredits from '../APCredits';

describe('APCredits Component', () => {
    beforeEach(() => {
      render(<APCredits/>);
    });
    it('renders courses correctly', () => {
        const { getByText } = render(<APCredits />);
        //2 mock courses
        const mockCourses = [
          { test: 'American History', equivalency: 'elective', credits: 3 },
          { test: 'Art History', equivalency: 'elective', credits: 3 },
          // Add more mock courses as needed
        ];
        //testing that both mock courses now exist
        for (const course of mockCourses) {
            const { test, equivalency, credits } = course;
            screen.findByText(test).then(element => {
              expect(element).toBeInTheDocument();
            });
            screen.findByText(equivalency).then(element => {
              expect(element).toBeInTheDocument();
            });
            screen.findByText(credits.toString()).then(element => {
              expect(element).toBeInTheDocument();
            });
        }
      });
});