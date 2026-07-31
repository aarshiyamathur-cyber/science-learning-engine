import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { CurriculumLoadError, loadCurriculumData } from "./loader";

describe("loadCurriculumData", () => {
  let root: string;

  beforeEach(() => {
    root = mkdtempSync(join(tmpdir(), "curriculum-"));
    for (const dir of ["concepts", "lessons", "assessments"]) {
      mkdirSync(join(root, dir));
    }
    writeFileSync(
      join(root, "concepts", "matter.yaml"),
      [
        "id: sci-y7-matter",
        "title: Matter",
        "description: Anything with mass that takes up space.",
        "learningObjectives:",
        "  - Define matter",
        "masteryThreshold: 0.8",
        "revisionStrategy: none",
        "xpReward: 50",
      ].join("\n"),
    );
    writeFileSync(
      join(root, "assessments", "matter-quiz.yaml"),
      [
        "- id: q-matter-01",
        "  conceptId: sci-y7-matter",
        "  prompt: Is water matter?",
        "  type: multiple-choice",
        "  options: [Yes, No]",
        "  correctAnswer: Yes",
        "  difficulty: 0.2",
      ].join("\n"),
    );
    writeFileSync(
      join(root, "lessons", "matter-intro.yaml"),
      [
        "id: lesson-matter-intro",
        "conceptId: sci-y7-matter",
        "title: What Is Matter?",
        "summary: An introduction to matter.",
        "steps:",
        "  - type: explanation",
        "    body: Matter is anything with mass.",
        "  - type: question",
        "    questionId: q-matter-01",
      ].join("\n"),
    );
  });

  afterEach(() => {
    rmSync(root, { recursive: true, force: true });
  });

  it("loads concepts, lessons, and questions keyed by id", () => {
    const data = loadCurriculumData(root);
    expect(data.concepts.get("sci-y7-matter")?.title).toBe("Matter");
    expect(data.lessons.get("lesson-matter-intro")?.title).toBe("What Is Matter?");
    expect(data.questions.get("q-matter-01")?.prompt).toBe("Is water matter?");
  });

  it("throws CurriculumLoadError with the offending file on invalid data", () => {
    writeFileSync(join(root, "concepts", "broken.yaml"), "id: missing-required-fields\n");
    expect(() => loadCurriculumData(root)).toThrow(CurriculumLoadError);
  });
});
