"use client";

import { useState } from "react";
import type { ResolvedLessonStep } from "@aarshiya/curriculum-schema";
import { completeLessonAction, submitAnswerAction } from "../actions";
import { LessonPlayer } from "./LessonPlayer";

interface ContinueLearningScreenProps {
  conceptId: string;
  conceptTitle: string;
  lessonId: string;
  lessonTitle: string;
  steps: ResolvedLessonStep[];
  initialXp: number;
  initialMasteryScore: number;
  alreadyCompleted: boolean;
}

type ViewState = "idle" | "in-lesson" | "done";

/**
 * The one screen for Sprint 2: pick up the current concept, start its
 * lesson, and see progress update when it's finished. No maps, avatars,
 * coins, or achievements — deliberately.
 */
export function ContinueLearningScreen({
  conceptId,
  conceptTitle,
  lessonId,
  lessonTitle,
  steps,
  initialXp,
  initialMasteryScore,
  alreadyCompleted,
}: ContinueLearningScreenProps) {
  const [view, setView] = useState<ViewState>("idle");
  const [xp, setXp] = useState(initialXp);
  const [masteryScore, setMasteryScore] = useState(initialMasteryScore);
  const [completed, setCompleted] = useState(alreadyCompleted);

  async function handleAnswer(input: { questionId: string; correct: boolean }) {
    const { masteryScore: updated } = await submitAnswerAction({
      conceptId,
      questionId: input.questionId,
      correct: input.correct,
    });
    setMasteryScore(updated);
  }

  async function handleComplete() {
    const { xp: updated } = await completeLessonAction({ conceptId, lessonId });
    setXp(updated);
    setCompleted(true);
    setView("done");
  }

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-6 px-6 py-16">
      <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">Science</h1>

      {view === "idle" && (
        <div className="flex flex-col gap-4 rounded border border-zinc-200 p-6 dark:border-zinc-800">
          <p className="text-sm font-medium uppercase tracking-wide text-zinc-500">
            Continue Learning
          </p>
          <p className="text-xl font-medium text-zinc-900 dark:text-zinc-50">
            {conceptTitle}
          </p>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Progress: {Math.round(masteryScore * 100)}% · XP: {xp}
            {completed && " · Lesson completed"}
          </p>
          <button
            type="button"
            onClick={() => setView("in-lesson")}
            className="self-start rounded bg-zinc-900 px-4 py-2 text-sm font-medium text-white dark:bg-zinc-100 dark:text-zinc-900"
          >
            Start Lesson
          </button>
        </div>
      )}

      {view === "in-lesson" && (
        <div className="flex flex-col gap-6 rounded border border-zinc-200 p-6 dark:border-zinc-800">
          <p className="text-sm text-zinc-500">{lessonTitle}</p>
          <LessonPlayer
            steps={steps}
            onAnswer={handleAnswer}
            onComplete={handleComplete}
          />
        </div>
      )}

      {view === "done" && (
        <div className="flex flex-col gap-4 rounded border border-zinc-200 p-6 dark:border-zinc-800">
          <p className="text-xl font-medium text-zinc-900 dark:text-zinc-50">
            Lesson complete
          </p>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Progress: {Math.round(masteryScore * 100)}% · XP: {xp}
          </p>
          <button
            type="button"
            onClick={() => setView("idle")}
            className="self-start rounded border border-zinc-300 px-4 py-2 text-sm dark:border-zinc-700"
          >
            Back
          </button>
        </div>
      )}
    </div>
  );
}
