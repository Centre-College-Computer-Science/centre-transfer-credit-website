// Import the necessary functions and the component you're testing
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import App from "../App";
import { useFetchCourses } from "../hooks/useFetchCourses";
import { fireEvent } from "@testing-library/react";

// At the top of your test file
vi.mock("../hooks/useFetchCourses", () => ({
  useFetchCourses: vi.fn(),
}));

// Before each test or within a specific test
useFetchCourses.mockReturnValue({
  data: [],
  loading: false,
  courseList: [{ course_workNumber: "CS101", checked: false }],
  institutions: ["Institution 1", "Institution 2"],
  setCourseList: vi.fn(),
});

beforeEach(() => {
  // Before each test or within a specific test
  useFetchCourses.mockReturnValue({
    data: [],
    loading: false,
    courseList: [{ course_workNumber: "CS101", checked: false }],
    institutions: ["Institution 1", "Institution 2"],
    setCourseList: vi.fn(),
  });
});

describe("App Component", () => {
  it("renders content after loading", async () => {
    // Redefine the mock for this specific test
    vi.mock("./hooks/useFetchCourses", () => ({
      useFetchCourses: vi.fn(() => ({
        data: [],
        loading: false,
        courseList: [{ course_workNumber: "CS101", checked: false }],
        institutions: ["Institution 1", "Institution 2"],
        setCourseList: vi.fn(),
      })),
    }));

    // You must re-import or re-render the component here for the new mock to take effect
    render(<App />);
    await waitFor(() =>
      expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument()
    );
    // expect(
    //   screen.getByText(/Centre College Transfer Policy/i)
    // ).toBeInTheDocument();
  });
  // Test for Route Navigation
  it("navigates to the APCredits page", () => {
    render(<App />);
    const apCreditsLink = screen.getByText("AP Credits");
    fireEvent.click(apCreditsLink);
    expect(
      screen.getByText("Advanced Placement (AP) Credit Policy")
    ).toBeInTheDocument();
  });

  it("navigates to Study Abroad", () => {
    render(<App />);
    const StudyAbroadLink = screen.getByText("Study Abroad");
    fireEvent.click(StudyAbroadLink);
    expect(
      screen.getByText("Study Abroad Transfer Credit Policy")
    ).toBeInTheDocument();
  });

  it("navigates to Study Abroad and then back", () => {
    render(<App />);
    const StudyAbroadLink = screen.getByText("Study Abroad");
    fireEvent.click(StudyAbroadLink);
    expect(
      screen.getByText("Study Abroad Transfer Credit Policy")
    ).toBeInTheDocument();

    const TransferCreditsLink = screen.getByText("Transfer Credits");
    fireEvent.click(TransferCreditsLink);
    expect(screen.getByText("Enter college name:")).toBeInTheDocument();
  });
});
