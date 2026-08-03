import { DatabaseSync } from "node:sqlite";
import {
  AttemptRecordSchema,
  LearnerProfileSchema,
  MasteryStateSchema,
  type AttemptRecord,
  type LearnerProfile,
  type MasteryState,
} from "./index";

/**
 * Learner progress persistence, backed by Node's built-in `node:sqlite`
 * (no native compilation required, unlike better-sqlite3 — see ADR 0006).
 */

const SCHEMA = `
  CREATE TABLE IF NOT EXISTS learner_profiles (
    id TEXT PRIMARY KEY,
    displayName TEXT NOT NULL,
    createdAt TEXT NOT NULL,
    completedLessons TEXT NOT NULL,
    xp INTEGER NOT NULL,
    score REAL NOT NULL,
    lastCompletedAt TEXT,
    resetAt TEXT
  );
  CREATE TABLE IF NOT EXISTS mastery_states (
    learnerId TEXT NOT NULL,
    conceptId TEXT NOT NULL,
    masteryScore REAL NOT NULL,
    status TEXT NOT NULL,
    attemptCount INTEGER NOT NULL,
    lastAttemptAt TEXT,
    PRIMARY KEY (learnerId, conceptId)
  );
  CREATE TABLE IF NOT EXISTS attempt_records (
    id TEXT PRIMARY KEY,
    learnerId TEXT NOT NULL,
    conceptId TEXT NOT NULL,
    questionId TEXT NOT NULL,
    correct INTEGER NOT NULL,
    score REAL NOT NULL,
    attemptedAt TEXT NOT NULL,
    timeSpentMs REAL
  );
`;

export interface LearnerProgressStore {
  getProfile(id: string): LearnerProfile | undefined;
  upsertProfile(profile: LearnerProfile): void;
  listProfiles(): LearnerProfile[];
  /** Clears a learner's completed lessons, XP, score, mastery states, and attempt
   * history, while keeping the same id/displayName/createdAt — a fresh start
   * for that name, not a new identity. */
  resetProfile(learnerId: string): void;
  getMasteryState(learnerId: string, conceptId: string): MasteryState | undefined;
  upsertMasteryState(state: MasteryState): void;
  recordAttempt(attempt: AttemptRecord): void;
  listAttempts(learnerId: string): AttemptRecord[];
  close(): void;
}

export function openLearnerProgressStore(dbPath: string): LearnerProgressStore {
  const db = new DatabaseSync(dbPath);
  db.exec(SCHEMA);

  // Migration: `resetAt` was added after `learner_profiles` already existed in
  // deployed databases, so `CREATE TABLE IF NOT EXISTS` alone won't add it.
  const existingColumns = (
    db.prepare("PRAGMA table_info(learner_profiles)").all() as { name: string }[]
  ).map((col) => col.name);
  if (!existingColumns.includes("resetAt")) {
    db.exec("ALTER TABLE learner_profiles ADD COLUMN resetAt TEXT");
  }

  return {
    getProfile(id) {
      const row = db.prepare("SELECT * FROM learner_profiles WHERE id = ?").get(id) as
        Record<string, unknown> | undefined;
      if (!row) return undefined;
      return LearnerProfileSchema.parse({
        ...row,
        completedLessons: JSON.parse(row.completedLessons as string),
        lastCompletedAt: row.lastCompletedAt ?? undefined,
        resetAt: row.resetAt ?? undefined,
      });
    },

    upsertProfile(profile) {
      const parsed = LearnerProfileSchema.parse(profile);
      db.prepare(
        `INSERT INTO learner_profiles (id, displayName, createdAt, completedLessons, xp, score, lastCompletedAt, resetAt)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)
         ON CONFLICT(id) DO UPDATE SET
           displayName = excluded.displayName,
           completedLessons = excluded.completedLessons,
           xp = excluded.xp,
           score = excluded.score,
           lastCompletedAt = excluded.lastCompletedAt,
           resetAt = excluded.resetAt`,
      ).run(
        parsed.id,
        parsed.displayName,
        parsed.createdAt,
        JSON.stringify(parsed.completedLessons),
        parsed.xp,
        parsed.score,
        parsed.lastCompletedAt ?? null,
        parsed.resetAt ?? null,
      );
    },

    listProfiles() {
      const rows = db
        .prepare("SELECT * FROM learner_profiles ORDER BY createdAt")
        .all() as Record<string, unknown>[];
      return rows.map((row) =>
        LearnerProfileSchema.parse({
          ...row,
          completedLessons: JSON.parse(row.completedLessons as string),
          lastCompletedAt: row.lastCompletedAt ?? undefined,
          resetAt: row.resetAt ?? undefined,
        }),
      );
    },

    resetProfile(learnerId) {
      db.prepare("DELETE FROM attempt_records WHERE learnerId = ?").run(learnerId);
      db.prepare("DELETE FROM mastery_states WHERE learnerId = ?").run(learnerId);
      db.prepare(
        `UPDATE learner_profiles
         SET completedLessons = ?, xp = 0, score = 0, lastCompletedAt = NULL, resetAt = ?
         WHERE id = ?`,
      ).run(JSON.stringify([]), new Date().toISOString(), learnerId);
    },

    getMasteryState(learnerId, conceptId) {
      const row = db
        .prepare("SELECT * FROM mastery_states WHERE learnerId = ? AND conceptId = ?")
        .get(learnerId, conceptId) as Record<string, unknown> | undefined;
      if (!row) return undefined;
      return MasteryStateSchema.parse({
        ...row,
        lastAttemptAt: row.lastAttemptAt ?? undefined,
      });
    },

    upsertMasteryState(state) {
      const parsed = MasteryStateSchema.parse(state);
      db.prepare(
        `INSERT INTO mastery_states (learnerId, conceptId, masteryScore, status, attemptCount, lastAttemptAt)
         VALUES (?, ?, ?, ?, ?, ?)
         ON CONFLICT(learnerId, conceptId) DO UPDATE SET
           masteryScore = excluded.masteryScore,
           status = excluded.status,
           attemptCount = excluded.attemptCount,
           lastAttemptAt = excluded.lastAttemptAt`,
      ).run(
        parsed.learnerId,
        parsed.conceptId,
        parsed.masteryScore,
        parsed.status,
        parsed.attemptCount,
        parsed.lastAttemptAt ?? null,
      );
    },

    recordAttempt(attempt) {
      const parsed = AttemptRecordSchema.parse(attempt);
      db.prepare(
        `INSERT INTO attempt_records (id, learnerId, conceptId, questionId, correct, score, attemptedAt, timeSpentMs)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      ).run(
        parsed.id,
        parsed.learnerId,
        parsed.conceptId,
        parsed.questionId,
        parsed.correct ? 1 : 0,
        parsed.score,
        parsed.attemptedAt,
        parsed.timeSpentMs ?? null,
      );
    },

    listAttempts(learnerId) {
      const rows = db
        .prepare("SELECT * FROM attempt_records WHERE learnerId = ? ORDER BY attemptedAt")
        .all(learnerId) as Record<string, unknown>[];
      return rows.map((row) =>
        AttemptRecordSchema.parse({
          ...row,
          correct: Boolean(row.correct),
          timeSpentMs: row.timeSpentMs ?? undefined,
        }),
      );
    },

    close() {
      db.close();
    },
  };
}
