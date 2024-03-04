// utils.test.ts
import { describe, it, expect } from "vitest";
import { makeTitleCase } from "../utils/utils";

describe("makeTitleCase", () => {
  it('converts simple strings to title case, excluding "of"', () => {
    expect(makeTitleCase("university of hard knocks")).toBe(
      "University of Hard Knocks"
    );
  });

  it("works with empty strings", () => {
    expect(makeTitleCase("")).toBe("");
  });
});
