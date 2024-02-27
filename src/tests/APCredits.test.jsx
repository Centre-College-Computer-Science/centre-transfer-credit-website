import { describe, it, expect } from "vitest";
import * as React from "react";
import { render, screen } from "@testing-library/react";
import APCredits from '../APCredits';
//import { defineConfig } from 'vitest/config'

describe('APCredits Component', () => {
    beforeEach(() => {
      render(<APCredits/>);
    });

    it('renders text correctly',()=>{
      expect(screen.getByText(/Our approved credits for transfering AP credits is highly selective/i)).toBeInTheDocument();
      expect(screen.getByText('Approved Advanced Placement Credits')).toBeInTheDocument();
      expect(screen.getByText(/Grades of 4 and 5 are awarded credit accordingly/i)).toBeInTheDocument();
    });
    it('renders table notes correctly',()=>{
      expect(screen.getByText('* Pending validation by placement test.')).toBeInTheDocument();
      expect(screen.getByText(/If BC score is 3, student will receive 3 hours credit equivalent to/i)).toBeInTheDocument();
      expect(screen.getByText('***Credit not given for both world history and European history.')).toBeInTheDocument();
    });
    it('renders courses correctly', () => {
        const { getByText } = render(<APCredits />);
        //2 mock courses
        const mockCourses = [
          { test: 'American History', equivalency: 'elective', credits: 3 },
          { test: 'Art History', equivalency: 'elective', credits: 3 },
        
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