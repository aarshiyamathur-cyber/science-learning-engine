import { describe, expect, it } from "vitest";
import { ConceptSchema } from "./index";

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

  it("defaults optional array fields to empty arrays", () => {
    const { prerequisites: _prerequisites, ...withoutPrereqs } = validConcept;
    const result = ConceptSchema.safeParse(withoutPrereqs);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.prerequisites).toEqual([]);
    }
  });
});
