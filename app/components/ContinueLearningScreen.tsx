"use client";

import { useState } from "react";
import type { ResolvedLessonStep } from "@aarshiya/curriculum-schema";
import { completeLessonAction, submitAnswerAction } from "../actions";
import { CelebrationIllustration, StatesOfMatterIllustration } from "./icons";
import { LessonPlayer } from "./LessonPlayer";
import { Badge, Button, Card, ProgressBar } from "./ui";

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
        <h1 className="flex items-center gap-2 text-display font-bold text-info-900 dark:text-info-100">
          🔬 Science
        </h1>

        {view === "idle" && (
          <Card tone="brand">
            <Badge tone="brand" icon="▶️">
              Continue Learning
            </Badge>
            <StatesOfMatterIllustration className="h-20 w-full" aria-hidden />
            <p className="text-heading font-bold text-zinc-900 dark:text-zinc-50">
              {conceptTitle}
            </p>
            <ProgressBar value={masteryScore} />
            <p className="text-label font-medium text-warning-700 dark:text-warning-300">
              ⭐ {xp} XP{completed && " · Lesson completed!"}
            </p>
            <Button onClick={() => setView("in-lesson")}>Start Lesson 🚀</Button>
          </Card>
        )}

        {view === "in-lesson" && (
          <div className="flex flex-col gap-4">
            <p className="text-subheading font-semibold text-info-900 dark:text-info-100">
              {lessonTitle}
            </p>
            <LessonPlayer
              steps={steps}
              onAnswer={handleAnswer}
              onComplete={handleComplete}
            />
          </div>
        )}

        {view === "done" && (
          <Card tone="success">
            <CelebrationIllustration className="h-20 w-full" aria-hidden />
            <p className="text-heading font-bold text-success-700 dark:text-success-300">
              🎉 Lesson complete!
            </p>
            <ProgressBar value={masteryScore} />
            <p className="text-label font-medium text-warning-700 dark:text-warning-300">
              ⭐ {xp} XP
            </p>
            <Button onClick={() => setView("idle")}>Back</Button>
          </Card>
        )}
      </div>
    </div>
  );
}
