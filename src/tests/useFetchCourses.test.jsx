// Import necessary testing libraries and the custom hook to be tested
import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook } from "@testing-library/react-hooks";
import { useFetchCourses } from "../hooks/useFetchCourses";

// Mock the global fetch function to control network responses
global.fetch = vi.fn();

// Clear the mock's data before each test to ensure test isolation
beforeEach(() => {
  global.fetch.mockClear();
});

// Describe block groups tests related to the useFetchCourses hook
describe("useFetchCourses", () => {
  // Test case for successful fetch and data processing
  it("fetches courses and processes data correctly", async () => {
    // Define a mock CSV string to simulate the response from the fetch call
    const mockCSV = `School Name,School ID Number,Non-Catalog Course Title,Course Work Course Title,Course Work Number,Course Work Credit Hours
    University of Test,12345,Intro to Testing,Testing 101,101,3`;

    // Mock the fetch call to resolve with the mock CSV data
    global.fetch.mockResolvedValueOnce({
      ok: true,
      text: async () => mockCSV,
    });

    // Render the hook for testing and capture the result and update mechanism
    const { result, waitForNextUpdate } = renderHook(() => useFetchCourses());

    // Wait for the hook to complete its initial data fetch
    await waitForNextUpdate();

    // Assert that the hook has processed the data correctly
    expect(result.current.loading).toBe(false);
    expect(result.current.data).toHaveLength(1);
    expect(result.current.courseList[0].rewarding_institution).toBe(
      "University of Test"
    );
    expect(result.current.institutions).toContain("University of Test");
  });

  // Test case for handling fetch failures gracefully
  it("sets loading to false and logs error on fetch failure", async () => {
    // Mock the fetch call to reject, simulating a network error
    global.fetch.mockRejectedValueOnce(
      new Error("Network response was not ok")
    );

    // Check the console.error to verify it's called with the correct error
    vi.spyOn(console, "error").mockImplementation(() => {});

    // Render the hook and wait for it to update after the failed fetch attempt
    const { result, waitForNextUpdate } = renderHook(() => useFetchCourses());

    await waitForNextUpdate();

    // Assert that the hook correctly sets its loading state and logs the error
    expect(result.current.loading).toBe(false);
    expect(console.error).toHaveBeenCalledWith("Network response was not ok");

    // Restore the original console.error function to avoid affecting other tests
    console.error.mockRestore();
  });

  // Test for handling empty data response
  it("handles empty data response correctly", async () => {
    // Mock an empty CSV data response
    global.fetch.mockResolvedValueOnce({
      ok: true,
      text: async () => "",
    });

    const { result, waitForNextUpdate } = renderHook(() => useFetchCourses());

    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toHaveLength(0);
    expect(result.current.courseList).toHaveLength(0);
    expect(result.current.institutions).toHaveLength(0);
  });

  // Test for correct data parsing
  it("parses fetched data correctly", async () => {
    // Extend mock CSV data to include multiple entries
    const mockCSV = `School Name,School ID Number,Non-Catalog Course Title,Course Work Course Title,Course Work Number,Course Work Credit Hours
  University of Test,12345,Intro to Testing,Testing 101,101,3
  Another University,54321,Advanced Testing,Testing 201,201,3`;

    global.fetch.mockResolvedValueOnce({
      ok: true,
      text: async () => mockCSV,
    });

    const { result, waitForNextUpdate } = renderHook(() => useFetchCourses());

    await waitForNextUpdate();

    // Assertions to ensure data is parsed and stored correctly
    expect(result.current.loading).toBe(false);
    expect(result.current.data).toHaveLength(2); // Verify correct number of entries
    expect(result.current.institutions).toContain("University of Test");
    expect(result.current.institutions).toContain("Another University");
  });

  // Test for initial loading state
  it("starts with correct initial loading state", async () => {
    renderHook(() => useFetchCourses());

    const { result } = renderHook(() => useFetchCourses());

    // Assert initial loading state is true
    expect(result.current.loading).toBe(true);
  });

  // Test for handling non-OK fetch responses
  it("handles non-OK fetch responses correctly", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      text: async () => "Not found",
    });

    const { result, waitForNextUpdate } = renderHook(() => useFetchCourses());

    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
  });
});
