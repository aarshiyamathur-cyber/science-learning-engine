import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { openLearnerProgressStore, type LearnerProgressStore } from "./persistence";

describe("LearnerProgressStore", () => {
  let dir: string;
  let store: LearnerProgressStore;

  beforeEach(() => {
    dir = mkdtempSync(join(tmpdir(), "learner-progress-"));
    store = openLearnerProgressStore(join(dir, "progress.db"));
  });

  afterEach(() => {
    store.close();
    rmSync(dir, { recursive: true, force: true });
  });

  it("returns undefined for a profile that doesn't exist", () => {
    expect(store.getProfile("learner-aarshiya")).toBeUndefined();
  });

  it("round-trips a learner profile", () => {
    store.upsertProfile({
      id: "learner-aarshiya",
      displayName: "Aarshiya",
      createdAt: "2026-08-01T00:00:00.000Z",
      completedLessons: ["lesson-matter-intro"],
      xp: 50,
      score: 4,
      lastCompletedAt: "2026-08-01T00:05:00.000Z",
    });

    expect(store.getProfile("learner-aarshiya")).toEqual({
      id: "learner-aarshiya",
      displayName: "Aarshiya",
      createdAt: "2026-08-01T00:00:00.000Z",
      completedLessons: ["lesson-matter-intro"],
      xp: 50,
      score: 4,
      lastCompletedAt: "2026-08-01T00:05:00.000Z",
    });
  });

  it("updates an existing profile on upsert rather than duplicating it", () => {
    const base = {
      id: "learner-aarshiya",
      displayName: "Aarshiya",
      createdAt: "2026-08-01T00:00:00.000Z",
      completedLessons: [],
      xp: 0,
      score: 0,
    };
    store.upsertProfile(base);
    store.upsertProfile({ ...base, xp: 50, completedLessons: ["lesson-matter-intro"] });

    const profile = store.getProfile("learner-aarshiya");
    expect(profile?.xp).toBe(50);
    expect(profile?.completedLessons).toEqual(["lesson-matter-intro"]);
  });

  it("round-trips mastery state", () => {
    store.upsertMasteryState({
      learnerId: "learner-aarshiya",
      conceptId: "sci-y7-matter",
      masteryScore: 0.8,
      status: "mastered",
      attemptCount: 5,
      lastAttemptAt: "2026-08-01T00:05:00.000Z",
    });

    expect(store.getMasteryState("learner-aarshiya", "sci-y7-matter")).toEqual({
      learnerId: "learner-aarshiya",
      conceptId: "sci-y7-matter",
      masteryScore: 0.8,
      status: "mastered",
      attemptCount: 5,
      lastAttemptAt: "2026-08-01T00:05:00.000Z",
    });
  });

  it("records and lists attempts for a learner in order", () => {
    store.recordAttempt({
      id: "attempt-1",
      learnerId: "learner-aarshiya",
      conceptId: "sci-y7-matter",
      questionId: "q-matter-01",
      correct: true,
      score: 1,
      attemptedAt: "2026-08-01T00:01:00.000Z",
    });
    store.recordAttempt({
      id: "attempt-2",
      learnerId: "learner-aarshiya",
      conceptId: "sci-y7-matter",
      questionId: "q-matter-02",
      correct: false,
      score: 0,
      attemptedAt: "2026-08-01T00:02:00.000Z",
      timeSpentMs: 4200,
    });

    const attempts = store.listAttempts("learner-aarshiya");
    expect(attempts).toHaveLength(2);
    expect(attempts[0]).toMatchObject({ id: "attempt-1", correct: true });
    expect(attempts[1]).toMatchObject({
      id: "attempt-2",
      correct: false,
      timeSpentMs: 4200,
    });
  });
});
