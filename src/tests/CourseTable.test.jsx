import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { LevelContext } from "../LevelContext";
import CourseTable from "../CourseTable";

// Mock the CourseListing component since its internal implementation is not the focus
vi.mock("../CourseListing", () => {
  return {
    default: ({ details }) => (
      <tr data-testid="mock-course-listing">
        <td>{details.rewarding_institution}</td>
        <td>{details.ri_courseTitle}</td>
        <td>{details.centre_courseTitle}</td>
        <td>{details.centre_course_credits}</td>
        <td>{"checkbox-placeholder"}</td>
      </tr>
    ),
  };
});

const mockContext = {
  courseList: [
    {
      course_workNumber: "1",
      rewarding_institution: "Institution A",
      ri_courseTitle: "Course A",
      centre_courseTitle: "Equivalent A",
      centre_course_credits: 3,
      checked: false,
    },
    {
      course_workNumber: "2",
      rewarding_institution: "Institution B",
      ri_courseTitle: "Course B",
      centre_courseTitle: "Equivalent B",
      centre_course_credits: 4,
      checked: false,
    },
  ],
  selectedList: [
    {
      course_workNumber: "2",
      rewarding_institution: "Institution B",
      ri_courseTitle: "Course B",
      centre_courseTitle: "Equivalent B",
      centre_course_credits: 4,
      checked: true,
    },
    {
      course_workNumber: "2",
      rewarding_institution: "Institution D",
      ri_courseTitle: "Course B",
      centre_courseTitle: "Equivalent D",
      centre_course_credits: 4,
      checked: true,
    },
  ],
  currentInstitution: "Institution A",
  toggleSelected: vi.fn(),
};

describe("CourseTable", () => {
  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();
  });

  it("renders correctly when isSelected is false", () => {
    render(
      <LevelContext.Provider value={mockContext}>
        <CourseTable isSelected={false} />
      </LevelContext.Provider>
    );

    expect(screen.getByTestId("course-table")).toBeInTheDocument();
    // Should filter and display only the courses from the current institution
    expect(screen.getAllByTestId("mock-course-listing")).toHaveLength(1);
  });

  it("renders correctly when isSelected is true", () => {
    render(
      <LevelContext.Provider value={mockContext}>
        <CourseTable isSelected={true} />
      </LevelContext.Provider>
    );

    expect(screen.getByTestId("course-table")).toBeInTheDocument();
    // Should display all selected courses
    expect(screen.getAllByTestId("mock-course-listing")).toHaveLength(2);
  });

  it("displays courses with the correct institution when isSelected is false", () => {
    render(
      <LevelContext.Provider value={mockContext}>
        <CourseTable isSelected={false} />
      </LevelContext.Provider>
    );
    const courseListings = screen.getAllByTestId("mock-course-listing");
    courseListings.forEach((listing) => {
      expect(listing).toHaveTextContent("Institution A");
    });
  });

  it("ensures selected courses belong to the correct institutions when isSelected is true", () => {
    render(
      <LevelContext.Provider value={mockContext}>
        <CourseTable isSelected={true} />
      </LevelContext.Provider>
    );

    // Since isSelected is true, we display courses from selectedList
    // This test assumes that selectedList  contain courses from any institution,
    // so we verify against the specific institutions of each selected course
    mockContext.selectedList.forEach((course) => {
      expect(
        screen.getByText(course.rewarding_institution)
      ).toBeInTheDocument();
    });
  });
});
