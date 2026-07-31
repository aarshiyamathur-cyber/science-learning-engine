"use server";

import type { MasteryStatus } from "@aarshiya/learning-engine";
import { getCurriculum } from "./lib/curriculum";
import { DEMO_LEARNER_ID, getOrCreateProfile, getProgressStore } from "./lib/progress";

function computeMasteryStatus(masteryScore: number, threshold: number): MasteryStatus {
  if (masteryScore >= threshold) return "mastered";
  if (masteryScore > 0) return "in-progress";
  return "not-started";
}

export async function submitAnswerAction(input: {
  conceptId: string;
  questionId: string;
  correct: boolean;
}) {
  const db = getProgressStore();
  const { concepts, questions } = getCurriculum();
  const concept = concepts.get(input.conceptId);
  if (!concept) throw new Error(`Unknown concept "${input.conceptId}"`);

  db.recordAttempt({
    id: `attempt-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    learnerId: DEMO_LEARNER_ID,
    conceptId: input.conceptId,
    questionId: input.questionId,
    correct: input.correct,
    score: input.correct ? 1 : 0,
    attemptedAt: new Date().toISOString(),
  });

  const profile = getOrCreateProfile(DEMO_LEARNER_ID);
  db.upsertProfile({ ...profile, score: profile.score + (input.correct ? 1 : 0) });

  const attempts = db
    .listAttempts(DEMO_LEARNER_ID)
    .filter((a) => a.conceptId === input.conceptId);
  const correctQuestionIds = new Set(
    attempts.filter((a) => a.correct).map((a) => a.questionId),
  );
  const totalQuestions = [...questions.values()].filter(
    (q) => q.conceptId === input.conceptId,
  ).length;
  const masteryScore = totalQuestions > 0 ? correctQuestionIds.size / totalQuestions : 0;

  db.upsertMasteryState({
    learnerId: DEMO_LEARNER_ID,
    conceptId: input.conceptId,
    masteryScore,
    status: computeMasteryStatus(masteryScore, concept.masteryThreshold),
    attemptCount: attempts.length,
    lastAttemptAt: new Date().toISOString(),
  });

  return { masteryScore };
}

export async function completeLessonAction(input: {
  conceptId: string;
  lessonId: string;
}) {
  const db = getProgressStore();
  const { concepts } = getCurriculum();
  const concept = concepts.get(input.conceptId);
  if (!concept) throw new Error(`Unknown concept "${input.conceptId}"`);

  const profile = getOrCreateProfile(DEMO_LEARNER_ID);
  const alreadyCompleted = profile.completedLessons.includes(input.lessonId);

  const xp = alreadyCompleted ? profile.xp : profile.xp + concept.xpReward;
  db.upsertProfile({
    ...profile,
    completedLessons: alreadyCompleted
      ? profile.completedLessons
      : [...profile.completedLessons, input.lessonId],
    xp,
    lastCompletedAt: new Date().toISOString(),
  });

  return { xp };
}
