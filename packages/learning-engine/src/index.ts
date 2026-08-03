import { z } from "zod";

/**
 * Learning engine domain models.
 *
 * These schemas describe learner state: who the learner is, how well they've
 * mastered each concept in the knowledge graph (@aarshiya/curriculum-schema),
 * and the individual attempts that state is derived from. They are the
 * foundation for persistence (BL-017) and any future progression engine.
 */

export const LearnerProfileSchema = z.object({
  id: z.string().min(1),
  displayName: z.string().min(1),
  createdAt: z.string().datetime(),
  completedLessons: z.array(z.string()).default([]),
  xp: z.number().int().min(0).default(0),
  score: z.number().min(0).default(0),
  lastCompletedAt: z.string().datetime().optional(),
  /** Set only when this profile's progress is explicitly reset, distinct
   * from normal activity — lets the UI tell "progress was just wiped" apart
   * from "a lesson was just completed" even though both touch xp/completedLessons. */
  resetAt: z.string().datetime().optional(),
});
export type LearnerProfile = z.infer<typeof LearnerProfileSchema>;

export const MasteryStatusSchema = z.enum(["not-started", "in-progress", "mastered"]);
export type MasteryStatus = z.infer<typeof MasteryStatusSchema>;

export const MasteryStateSchema = z.object({
  learnerId: z.string().min(1),
  conceptId: z.string().min(1),
  masteryScore: z.number().min(0).max(1),
  status: MasteryStatusSchema,
  attemptCount: z.number().int().min(0).default(0),
  lastAttemptAt: z.string().datetime().optional(),
});
export type MasteryState = z.infer<typeof MasteryStateSchema>;

export const AttemptRecordSchema = z.object({
  id: z.string().min(1),
  learnerId: z.string().min(1),
  conceptId: z.string().min(1),
  questionId: z.string().min(1),
  correct: z.boolean(),
  score: z.number().min(0).max(1),
  attemptedAt: z.string().datetime(),
  timeSpentMs: z.number().min(0).optional(),
});
export type AttemptRecord = z.infer<typeof AttemptRecordSchema>;
