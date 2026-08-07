"use client";

import { useRouter } from "next/navigation";
import { useState, type ComponentType, type SVGProps } from "react";
import type { ResolvedLessonStep } from "@aarshiya/curriculum-schema";
import {
  completeLessonAction,
  resetProgressAction,
  submitAnswerAction,
  switchLearnerAction,
} from "../actions";
import {
  AtomicStructureIllustration,
  BodySystemsHeroIllustration,
  CelebrationIllustration,
  CellsHeroIllustration,
  ChangesOfStateIllustration,
  ChemicalReactionHeroIllustration,
  EcosystemHeroIllustration,
  EnergyHeroIllustration,
  ForcesHeroIllustration,
  GeneticsHeroIllustration,
  ParticleModelIllustration,
  PeriodicTableIllustration,
  PlateTectonicsHeroIllustration,
  StatesOfMatterIllustration,
  SolarSystemHeroIllustration,
} from "./icons";
import { LessonPlayer } from "./LessonPlayer";
import { Badge, Button, Card, ProgressBar } from "./ui";

/**
 * Per-lesson topic-card illustration, keyed by conceptId, so each lesson in
 * the Matter topic gets a distinct visual instead of sharing one image.
 */
const LESSON_ILLUSTRATIONS: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  "sci-y7-matter": StatesOfMatterIllustration,
  "sci-y7-particle-model": ParticleModelIllustration,
  "sci-y7-states-of-matter": ChangesOfStateIllustration,
  "sci-y7-atomic-structure": AtomicStructureIllustration,
  "sci-y7-periodic-table": PeriodicTableIllustration,
  "sci-y7-chemical-reactions": ChemicalReactionHeroIllustration,
  "sci-y7-forces": ForcesHeroIllustration,
  "sci-y7-energy": EnergyHeroIllustration,
  "sci-y7-cells": CellsHeroIllustration,
  "sci-y7-body-systems": BodySystemsHeroIllustration,
  "sci-y7-ecosystems": EcosystemHeroIllustration,
  "sci-y7-genetics-reproduction": GeneticsHeroIllustration,
  "sci-y7-plate-tectonics": PlateTectonicsHeroIllustration,
  "sci-y7-solar-system": SolarSystemHeroIllustration,
};

export interface LessonEntry {
  conceptId: string;
  conceptTitle: string;
  lessonId: string;
  lessonTitle: string;
  steps: ResolvedLessonStep[];
  initialMasteryScore: number;
  alreadyCompleted: boolean;
  locked: boolean;
}

interface ContinueLearningScreenProps {
  lessons: LessonEntry[];
  initialXp: number;
  /** Whose progress is currently shown — the real student by default, or any
   * tester's own name once they've switched to it. */
  learnerDisplayName: string;
  /** Other names with existing progress on this browser, for quick switching. */
  otherLearnerNames: string[];
}

type Screen = "topic" | "in-lesson" | "done";

/**
 * Lets whoever is using this browser switch to their own named progress
 * track (so a tester's click-throughs don't land on the real student's
 * progress) and reset that track at any time. Both actions navigate back to
 * "/" server-side, so there's no stale client state to reconcile.
 */
function LearnerSwitcher({
  learnerDisplayName,
  otherLearnerNames,
}: {
  learnerDisplayName: string;
  otherLearnerNames: string[];
}) {
  const [nameInput, setNameInput] = useState("");
  const [isSwitching, setIsSwitching] = useState(false);
  const [resetArmed, setResetArmed] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  async function switchTo(name: string) {
    if (!name.trim() || isSwitching) return;
    setIsSwitching(true);
    await switchLearnerAction(name);
  }

  async function confirmReset() {
    setIsResetting(true);
    await resetProgressAction();
  }

  return (
    <Card tone="neutral">
      <p className="text-label text-zinc-600 dark:text-zinc-300">
        Testing as <span className="font-bold text-zinc-900 dark:text-zinc-50">{learnerDisplayName}</span>
      </p>

      <div className="flex flex-wrap items-center gap-2">
        <input
          type="text"
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
          placeholder="Switch to a name..."
          className="min-w-0 flex-1 rounded-lg border-2 border-zinc-200 bg-white px-3 py-2 text-label text-zinc-900 focus:border-brand-500 focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
        />
        <Button
          variant="solid"
          tone="neutral"
          disabled={!nameInput.trim() || isSwitching}
          onClick={() => switchTo(nameInput)}
        >
          Switch
        </Button>
      </div>

      {otherLearnerNames.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {otherLearnerNames.map((name) => (
            <button
              key={name}
              type="button"
              disabled={isSwitching}
              onClick={() => switchTo(name)}
              className="rounded-full border-2 border-zinc-200 bg-white px-3 py-1 text-label text-zinc-700 hover:bg-zinc-50 disabled:opacity-40 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200"
            >
              {name}
            </button>
          ))}
        </div>
      )}

      {resetArmed ? (
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-label text-danger-700 dark:text-danger-300">
            Reset {learnerDisplayName}&apos;s progress? This can&apos;t be undone.
          </p>
          <Button variant="solid" tone="danger" disabled={isResetting} onClick={confirmReset}>
            Yes, reset
          </Button>
          <button
            type="button"
            onClick={() => setResetArmed(false)}
            className="text-label text-zinc-500 underline hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setResetArmed(true)}
          className="self-start text-label text-danger-600 underline hover:text-danger-800 dark:text-danger-400 dark:hover:text-danger-200"
        >
          Reset progress
        </button>
      )}
    </Card>
  );
}

/**
 * The full science course screen: a list of every lesson across every topic
 * (in teaching order), each showing its own progress and lock state, plus the
 * existing single-lesson play/answer/complete flow once one is selected.
 * Locking is derived entirely from each concept's existing `prerequisites`
 * field — no new engine capability, just reading data that already exists.
 */
export function ContinueLearningScreen({
  lessons,
  initialXp,
  learnerDisplayName,
  otherLearnerNames,
}: ContinueLearningScreenProps) {
  const router = useRouter();
  const [screen, setScreen] = useState<Screen>("topic");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [xp, setXp] = useState(initialXp);
  const [masteryByLesson, setMasteryByLesson] = useState<Record<string, number>>(() =>
    Object.fromEntries(lessons.map((l) => [l.lessonId, l.initialMasteryScore])),
  );
  const [completedByLesson, setCompletedByLesson] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(lessons.map((l) => [l.lessonId, l.alreadyCompleted])),
  );

  const selected = selectedIndex !== null ? lessons[selectedIndex] : null;

  function startLesson(index: number) {
    setSelectedIndex(index);
    setScreen("in-lesson");
  }

  function backToTopic() {
    setSelectedIndex(null);
    setScreen("topic");
  }

  async function handleAnswer(input: { questionId: string; correct: boolean }) {
    if (!selected) return;
    const { masteryScore } = await submitAnswerAction({
      conceptId: selected.conceptId,
      questionId: input.questionId,
      correct: input.correct,
    });
    setMasteryByLesson((prev) => ({ ...prev, [selected.lessonId]: masteryScore }));
  }

  async function handleComplete() {
    if (!selected) return;
    const { xp: updatedXp } = await completeLessonAction({
      conceptId: selected.conceptId,
      lessonId: selected.lessonId,
    });
    setXp(updatedXp);
    setCompletedByLesson((prev) => ({ ...prev, [selected.lessonId]: true }));
    setScreen("done");
    // Re-fetches the topic list's lock state server-side, so a newly-unlocked
    // lesson (one whose prerequisite this completion just satisfied) shows as
    // Ready immediately on return, without requiring a manual page reload.
    router.refresh();
  }

  return (
    <div className="min-h-full w-full bg-gradient-to-br from-sky-100 via-teal-50 to-violet-100 dark:from-sky-950 dark:via-zinc-950 dark:to-violet-950">
      <div className="mx-auto flex w-full max-w-md flex-col gap-6 px-6 py-16">
        <h1 className="flex items-center gap-2 text-display font-bold text-info-900 dark:text-info-100">
          🔬 Science
        </h1>

        {screen === "topic" && (
          <div className="flex flex-col gap-4">
            <p className="text-heading font-bold text-zinc-900 dark:text-zinc-50">Science Course</p>
            <p className="text-label font-medium text-warning-700 dark:text-warning-300">
              ⭐ {xp} XP
            </p>
            <LearnerSwitcher
              learnerDisplayName={learnerDisplayName}
              otherLearnerNames={otherLearnerNames}
            />
            {lessons.map((entry, index) => {
              const completed = completedByLesson[entry.lessonId];
              const mastery = masteryByLesson[entry.lessonId];
              const tone = entry.locked ? "neutral" : completed ? "success" : "brand";
              const Illustration =
                LESSON_ILLUSTRATIONS[entry.conceptId] ?? StatesOfMatterIllustration;
              return (
                <Card key={entry.lessonId} tone={tone}>
                  <Illustration className="h-16 w-full" aria-hidden />
                  <Badge tone={tone} icon={entry.locked ? "🔒" : completed ? "✓" : "▶️"}>
                    {entry.locked ? "Locked" : completed ? "Completed" : "Ready"}
                  </Badge>
                  <p className="text-subheading font-bold text-zinc-900 dark:text-zinc-50">
                    {entry.conceptTitle}
                  </p>
                  <p className="text-label text-zinc-600 dark:text-zinc-300">
                    {entry.lessonTitle}
                  </p>
                  <ProgressBar value={mastery} />
                  {entry.locked ? (
                    <p className="text-label text-zinc-500 dark:text-zinc-400">
                      Complete the previous lesson first.
                    </p>
                  ) : (
                    <Button onClick={() => startLesson(index)}>
                      {completed ? "Review Lesson" : "Start Lesson 🚀"}
                    </Button>
                  )}
                </Card>
              );
            })}
          </div>
        )}

        {screen === "in-lesson" && selected && (
          <div className="flex flex-col gap-4">
            <button
              type="button"
              onClick={backToTopic}
              className="self-start text-label text-info-600 underline hover:text-info-800 dark:text-info-400 dark:hover:text-info-200"
            >
              ← Back to topic list
            </button>
            <p className="text-subheading font-semibold text-info-900 dark:text-info-100">
              {selected.lessonTitle}
            </p>
            <LessonPlayer
              steps={selected.steps}
              onAnswer={handleAnswer}
              onComplete={handleComplete}
            />
          </div>
        )}

        {screen === "done" && selected && (
          <Card tone="success">
            <CelebrationIllustration className="h-20 w-full" aria-hidden />
            <p className="text-heading font-bold text-success-700 dark:text-success-300">
              🎉 Lesson complete!
            </p>
            <ProgressBar value={masteryByLesson[selected.lessonId]} />
            <p className="text-label font-medium text-warning-700 dark:text-warning-300">
              ⭐ {xp} XP
            </p>
            <Button onClick={backToTopic}>Back to topic list</Button>
          </Card>
        )}
      </div>
    </div>
  );
}
