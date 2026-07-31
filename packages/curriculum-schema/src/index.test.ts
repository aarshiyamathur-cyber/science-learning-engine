import { describe, expect, it } from "vitest";
import {
  AssessmentQuestionSchema,
  ConceptSchema,
  LessonSchema,
  UnresolvedQuestionRefError,
  resolveLessonSteps,
  type AssessmentQuestion,
  type Lesson,
} from "./index";

describe("ConceptSchema", () => {
  const validConcept = {
    id: "sci-y7-particle-model",
    title: "The Particle Model of Matter",
    description: "Matter is made of particles that are in constant motion.",
    learningObjectives: ["Describe the particle model of matter"],
    misconceptions: [
      {
        id: "particles-touch",
        description: "Students think particles in a gas are touching.",
        correction: "Gas particles are far apart with large spaces between them.",
      },
    ],
    prerequisites: [],
    unlocks: ["sci-y7-states-of-matter"],
    masteryThreshold: 0.8,
    revisionStrategy: "spaced-repetition",
    lessonRefs: ["lesson-particle-model-intro"],
    assessmentRefs: ["assessment-particle-model-quiz"],
    xpReward: 50,
  };

  it("accepts a well-formed concept", () => {
    expect(ConceptSchema.safeParse(validConcept).success).toBe(true);
  });

  it("rejects a concept missing required fields", () => {
    const { title: _title, ...invalidConcept } = validConcept;
    expect(ConceptSchema.safeParse(invalidConcept).success).toBe(false);
  });

  it("rejects a mastery threshold outside 0-1", () => {
    expect(
      ConceptSchema.safeParse({ ...validConcept, masteryThreshold: 1.5 }).success,
    ).toBe(false);
  });

  it("rejects a negative xpReward", () => {
    expect(ConceptSchema.safeParse({ ...validConcept, xpReward: -10 }).success).toBe(
      false,
    );
  });

  it("defaults optional array fields to empty arrays", () => {
    const { prerequisites: _prerequisites, ...withoutPrereqs } = validConcept;
    const result = ConceptSchema.safeParse(withoutPrereqs);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.prerequisites).toEqual([]);
    }
  });
});

describe("LessonSchema", () => {
  const validLesson = {
    id: "lesson-matter-intro",
    conceptId: "sci-y7-matter",
    title: "Introducing Matter",
    summary: "A first look at what matter is made of.",
    steps: [
      {
        type: "explanation",
        body: "Matter is anything that has mass and takes up space.",
      },
      { type: "example", body: "Air, water, and rock are all matter." },
      { type: "question", questionId: "q-matter-01" },
      { type: "summary", body: "Matter comes in solid, liquid, and gas states." },
    ],
  };

  it("accepts a well-formed lesson", () => {
    expect(LessonSchema.safeParse(validLesson).success).toBe(true);
  });

  it("rejects a lesson with no steps", () => {
    expect(LessonSchema.safeParse({ ...validLesson, steps: [] }).success).toBe(false);
  });

  it("rejects a step with an unknown type", () => {
    expect(
      LessonSchema.safeParse({
        ...validLesson,
        steps: [{ type: "quiz", body: "not a real step type" }],
      }).success,
    ).toBe(false);
  });
});

describe("resolveLessonSteps", () => {
  const question: AssessmentQuestion = {
    id: "q-matter-01",
    conceptId: "sci-y7-matter",
    prompt: "Is water matter?",
    type: "multiple-choice",
    options: ["Yes", "No"],
    correctAnswer: "Yes",
    difficulty: 0.2,
  };
  const lesson: Lesson = {
    id: "lesson-matter-intro",
    conceptId: "sci-y7-matter",
    title: "Introducing Matter",
    summary: "A first look at what matter is made of.",
    steps: [
      {
        type: "explanation",
        body: "Matter is anything that has mass and takes up space.",
      },
      { type: "question", questionId: "q-matter-01" },
      { type: "summary", body: "Matter comes in solid, liquid, and gas states." },
    ],
  };

  it("replaces a question step's questionId with the full question object", () => {
    const resolved = resolveLessonSteps(lesson, new Map([[question.id, question]]));
    expect(resolved[1]).toEqual({ type: "question", question });
  });

  it("passes non-question steps through unchanged", () => {
    const resolved = resolveLessonSteps(lesson, new Map([[question.id, question]]));
    expect(resolved[0]).toEqual(lesson.steps[0]);
    expect(resolved[2]).toEqual(lesson.steps[2]);
  });

  it("throws UnresolvedQuestionRefError for an unknown questionId", () => {
    expect(() => resolveLessonSteps(lesson, new Map())).toThrow(
      UnresolvedQuestionRefError,
    );
  });
});

describe("AssessmentQuestionSchema", () => {
  it("accepts a well-formed multiple-choice question", () => {
    expect(
      AssessmentQuestionSchema.safeParse({
        id: "q-matter-01",
        conceptId: "sci-y7-matter",
        prompt: "Is water matter?",
        type: "multiple-choice",
        options: ["Yes", "No"],
        correctAnswer: "Yes",
        difficulty: 0.2,
      }).success,
    ).toBe(true);
  });
});
