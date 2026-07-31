import path from "node:path";
import { mkdirSync } from "node:fs";
import type { LearnerProfile } from "@aarshiya/learning-engine";
import {
  openLearnerProgressStore,
  type LearnerProgressStore,
} from "@aarshiya/learning-engine/persistence";

/** Single-learner demo: this project has one user (Aarshiya), no accounts. */
export const DEMO_LEARNER_ID = "learner-aarshiya";

let store: LearnerProgressStore | undefined;

export function getProgressStore(): LearnerProgressStore {
  if (!store) {
    const dataDir = path.join(process.cwd(), "data");
    mkdirSync(dataDir, { recursive: true });
    store = openLearnerProgressStore(path.join(dataDir, "learner-progress.db"));
  }
  return store;
}

export function getOrCreateProfile(learnerId: string): LearnerProfile {
  const db = getProgressStore();
  const existing = db.getProfile(learnerId);
  if (existing) return existing;

  const profile: LearnerProfile = {
    id: learnerId,
    displayName: "Aarshiya",
    createdAt: new Date().toISOString(),
    completedLessons: [],
    xp: 0,
    score: 0,
  };
  db.upsertProfile(profile);
  return profile;
}
