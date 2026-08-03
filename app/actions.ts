"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { MasteryStatus } from "@aarshiya/learning-engine";
import { getCurriculum } from "./lib/curriculum";
import {
  ACTIVE_LEARNER_COOKIE,
  DEMO_LEARNER_ID,
  getOrCreateProfile,
  getProgressStore,
  slugifyLearnerName,
} from "./lib/progress";

const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

/** Whichever learner id is active in this browser, defaulting to the real student. */
async function getActiveLearnerId(): Promise<string> {
  const cookieStore = await cookies();
  return cookieStore.get(ACTIVE_LEARNER_COOKIE)?.value ?? DEMO_LEARNER_ID;
}

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
  const learnerId = await getActiveLearnerId();
  const db = getProgressStore();
  const { concepts, questions } = getCurriculum();
  const concept = concepts.get(input.conceptId);
  if (!concept) throw new Error(`Unknown concept "${input.conceptId}"`);

  db.recordAttempt({
    id: `attempt-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    learnerId,
    conceptId: input.conceptId,
    questionId: input.questionId,
    correct: input.correct,
    score: input.correct ? 1 : 0,
    attemptedAt: new Date().toISOString(),
  });

  const profile = getOrCreateProfile(learnerId);
  db.upsertProfile({ ...profile, score: profile.score + (input.correct ? 1 : 0) });

  const attempts = db.listAttempts(learnerId).filter((a) => a.conceptId === input.conceptId);
  const correctQuestionIds = new Set(
    attempts.filter((a) => a.correct).map((a) => a.questionId),
  );
  const totalQuestions = [...questions.values()].filter(
    (q) => q.conceptId === input.conceptId,
  ).length;
  const masteryScore = totalQuestions > 0 ? correctQuestionIds.size / totalQuestions : 0;

  db.upsertMasteryState({
    learnerId,
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
  const learnerId = await getActiveLearnerId();
  const db = getProgressStore();
  const { concepts } = getCurriculum();
  const concept = concepts.get(input.conceptId);
  if (!concept) throw new Error(`Unknown concept "${input.conceptId}"`);

  const profile = getOrCreateProfile(learnerId);
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

/** Switches the active browser session to a named tester/student's own progress track. */
export async function switchLearnerAction(name: string) {
  const trimmed = name.trim();
  if (!trimmed) return;

  const learnerId = slugifyLearnerName(trimmed);
  getOrCreateProfile(learnerId, trimmed);

  const cookieStore = await cookies();
  cookieStore.set(ACTIVE_LEARNER_COOKIE, learnerId, {
    maxAge: ONE_YEAR_SECONDS,
    path: "/",
  });

  redirect("/");
}

/** Clears the currently active learner's completed lessons, XP, and mastery — a fresh start for that name. */
export async function resetProgressAction() {
  const learnerId = await getActiveLearnerId();
  getProgressStore().resetProfile(learnerId);
  redirect("/");
}
