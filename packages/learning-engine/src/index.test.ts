import { describe, expect, it } from "vitest";
import { AttemptRecordSchema, LearnerProfileSchema, MasteryStateSchema } from "./index";

describe("LearnerProfileSchema", () => {
  const validProfile = {
    id: "learner-aarshiya",
    displayName: "Aarshiya",
    createdAt: "2026-08-01T00:00:00.000Z",
  };

  it("accepts a well-formed learner profile", () => {
    expect(LearnerProfileSchema.safeParse(validProfile).success).toBe(true);
  });

  it("rejects a profile missing required fields", () => {
    const { displayName: _displayName, ...invalid } = validProfile;
    expect(LearnerProfileSchema.safeParse(invalid).success).toBe(false);
  });

  it("rejects a non-ISO createdAt", () => {
    expect(
      LearnerProfileSchema.safeParse({ ...validProfile, createdAt: "not-a-date" })
        .success,
    ).toBe(false);
  });
});

describe("MasteryStateSchema", () => {
  const validState = {
    learnerId: "learner-aarshiya",
    conceptId: "sci-y7-particle-model",
    masteryScore: 0.75,
    status: "in-progress" as const,
    attemptCount: 3,
  };

  it("accepts a well-formed mastery state", () => {
    expect(MasteryStateSchema.safeParse(validState).success).toBe(true);
  });

  it("rejects a mastery score outside 0-1", () => {
    expect(
      MasteryStateSchema.safeParse({ ...validState, masteryScore: 1.2 }).success,
    ).toBe(false);
  });

  it("rejects an unknown status value", () => {
    expect(
      MasteryStateSchema.safeParse({ ...validState, status: "expert" }).success,
    ).toBe(false);
  });

  it("defaults attemptCount to 0 when omitted", () => {
    const { attemptCount: _attemptCount, ...withoutAttempts } = validState;
    const result = MasteryStateSchema.safeParse(withoutAttempts);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.attemptCount).toBe(0);
    }
  });
});

describe("AttemptRecordSchema", () => {
  const validAttempt = {
    id: "attempt-1",
    learnerId: "learner-aarshiya",
    conceptId: "sci-y7-particle-model",
    questionId: "assessment-particle-model-quiz-q1",
    correct: true,
    score: 1,
    attemptedAt: "2026-08-01T00:00:00.000Z",
  };

  it("accepts a well-formed attempt record", () => {
    expect(AttemptRecordSchema.safeParse(validAttempt).success).toBe(true);
  });

  it("rejects a score outside 0-1", () => {
    expect(AttemptRecordSchema.safeParse({ ...validAttempt, score: 2 }).success).toBe(
      false,
    );
  });

  it("rejects a negative timeSpentMs", () => {
    expect(
      AttemptRecordSchema.safeParse({ ...validAttempt, timeSpentMs: -5 }).success,
    ).toBe(false);
  });
});
