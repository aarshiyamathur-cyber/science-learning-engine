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

function ProgressBar({ value }: { value: number }) {
  const pct = Math.round(value * 100);
  return (
    <div className="flex flex-col gap-1">
      <div className="h-3 w-full overflow-hidden rounded-full bg-white/60 dark:bg-zinc-800">
        <div
          className="h-full rounded-full bg-gradient-to-r from-teal-400 to-emerald-500 transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="text-sm font-medium text-teal-900 dark:text-teal-200">{pct}% mastered</p>
    </div>
  );
}

/**
 * The one screen for Sprint 2: pick up the current concept, start its
 * lesson, and see progress update when it's finished. No maps, avatars,
 * coins, or achievement systems — but real color, so it reads as engaging
 * rather than a plain document (feedback from Aarshiya's first try).
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
    <div className="min-h-full w-full bg-gradient-to-br from-sky-100 via-teal-50 to-violet-100 dark:from-sky-950 dark:via-zinc-950 dark:to-violet-950">
      <div className="mx-auto flex w-full max-w-md flex-col gap-6 px-6 py-16">
        <h1 className="flex items-center gap-2 text-3xl font-bold text-sky-900 dark:text-sky-100">
          🔬 Science
        </h1>

        {view === "idle" && (
          <div className="flex flex-col gap-4 rounded-2xl border-2 border-teal-200 bg-white/80 p-6 shadow-md dark:border-teal-900 dark:bg-zinc-900/80">
            <p className="text-sm font-bold uppercase tracking-wide text-teal-700 dark:text-teal-300">
              ▶️ Continue Learning
            </p>
            <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">{conceptTitle}</p>
            <ProgressBar value={masteryScore} />
            <p className="text-sm font-medium text-amber-700 dark:text-amber-300">
              ⭐ {xp} XP{completed && " · Lesson completed!"}
            </p>
            <button
              type="button"
              onClick={() => setView("in-lesson")}
              className="self-start rounded-full bg-gradient-to-r from-teal-500 to-sky-500 px-6 py-3 text-base font-bold text-white shadow-md transition-transform hover:scale-105"
            >
              Start Lesson 🚀
            </button>
          </div>
        )}

        {view === "in-lesson" && (
          <div className="flex flex-col gap-4">
            <p className="text-lg font-semibold text-sky-900 dark:text-sky-100">{lessonTitle}</p>
            <LessonPlayer steps={steps} onAnswer={handleAnswer} onComplete={handleComplete} />
          </div>
        )}

        {view === "done" && (
          <div className="flex flex-col gap-4 rounded-2xl border-2 border-emerald-300 bg-white/80 p-6 shadow-md dark:border-emerald-800 dark:bg-zinc-900/80">
            <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">
              🎉 Lesson complete!
            </p>
            <ProgressBar value={masteryScore} />
            <p className="text-sm font-medium text-amber-700 dark:text-amber-300">⭐ {xp} XP</p>
            <button
              type="button"
              onClick={() => setView("idle")}
              className="self-start rounded-full bg-gradient-to-r from-teal-500 to-sky-500 px-6 py-3 text-base font-bold text-white shadow-md transition-transform hover:scale-105"
            >
              Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
