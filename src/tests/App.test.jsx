import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import App from "../App";
import { useFetchCourses } from "../hooks/useFetchCourses";
import { fireEvent } from "@testing-library/react";

// Mock the custom hook to control its return values and behavior

vi.mock("../hooks/useFetchCourses", () => ({
  useFetchCourses: vi.fn(),
}));

beforeEach(() => {
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
    render(<App />);
    // Wait for the loading indicator to disappear before asserting that the content has loaded
    await waitFor(() =>
      expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument()
    );
    // Assert that the expected content is rendered
    expect(
      screen.getByText(/Centre College Transfer Policy/i)
    ).toBeInTheDocument();
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
