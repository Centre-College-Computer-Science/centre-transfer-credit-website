// useFetchCourses.test.ts
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook } from '@testing-library/react-hooks';
import { useFetchCourses } from '../hooks/useFetchCourses';

// Mock fetch globally
global.fetch = vi.fn();

beforeEach(() => {
  global.fetch.mockClear();
});

describe('useFetchCourses', () => {
  it('fetches courses and processes data correctly', async () => {
    const mockCSV = `School Name,School ID Number,Non-Catalog Course Title,Course Work Course Title,Course Work Number,Course Work Credit Hours
    University of Test,12345,Intro to Testing,Testing 101,101,3`;

    global.fetch.mockResolvedValueOnce({
      ok: true,
      text: async () => mockCSV,
    });

    const { result, waitForNextUpdate } = renderHook(() => useFetchCourses());

    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toHaveLength(1);
    expect(result.current.courseList[0].rewarding_institution).toBe('University of Test');
    expect(result.current.institutions).toContain('University of Test');
  });

  it('sets loading to false and logs error on fetch failure', async () => {
    global.fetch.mockRejectedValueOnce(new Error('Network response was not ok'));

    vi.spyOn(console, 'error').mockImplementation(() => {});

    const { result, waitForNextUpdate } = renderHook(() => useFetchCourses());

    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
    expect(console.error).toHaveBeenCalledWith('Network response was not ok');

    console.error.mockRestore();
  });
});
