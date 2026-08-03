import path from "node:path";
import { mkdirSync } from "node:fs";
import type { LearnerProfile } from "@aarshiya/learning-engine";
import {
  openLearnerProgressStore,
  type LearnerProgressStore,
} from "@aarshiya/learning-engine/persistence";

/** Default learner: the real student this app is built for. */
export const DEMO_LEARNER_ID = "learner-aarshiya";

/**
 * Cookie holding whichever learner id is currently active in this browser.
 * Lets a tester switch to their own named progress track without touching
 * Aarshiya's real progress, and reset it independently at any time.
 */
export const ACTIVE_LEARNER_COOKIE = "activeLearnerId";

/** Derives a stable, storage-safe learner id from a free-text tester/student name. */
export function slugifyLearnerName(name: string): string {
  const slug = name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `learner-${slug || "guest"}`;
}

let store: LearnerProgressStore | undefined;

export function getProgressStore(): LearnerProgressStore {
  if (!store) {
    const dataDir = path.join(process.cwd(), "data");
    mkdirSync(dataDir, { recursive: true });
    store = openLearnerProgressStore(path.join(dataDir, "learner-progress.db"));
  }
  return store;
}

export function getOrCreateProfile(learnerId: string, displayName = "Aarshiya"): LearnerProfile {
  const db = getProgressStore();
  const existing = db.getProfile(learnerId);
  if (existing) return existing;

  const profile: LearnerProfile = {
    id: learnerId,
    displayName,
    createdAt: new Date().toISOString(),
    completedLessons: [],
    xp: 0,
    score: 0,
  };
  db.upsertProfile(profile);
  return profile;
}
