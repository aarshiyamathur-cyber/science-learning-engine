import { describe, expect, it } from "vitest";
import { slugifyLearnerName } from "./progress";

describe("slugifyLearnerName", () => {
  it("lowercases and hyphenates a normal name", () => {
    expect(slugifyLearnerName("Sudeep Mathur")).toBe("learner-sudeep-mathur");
  });

  it("strips punctuation and collapses repeated separators", () => {
    expect(slugifyLearnerName("  Test - QA #2!! ")).toBe("learner-test-qa-2");
  });

  it("falls back to a generic id for an empty or whitespace-only name", () => {
    expect(slugifyLearnerName("")).toBe("learner-guest");
    expect(slugifyLearnerName("   ")).toBe("learner-guest");
  });

  it("produces the same id for names that differ only in case or spacing", () => {
    expect(slugifyLearnerName("Aarshiya")).toBe(slugifyLearnerName("  aarshiya  "));
  });
});
