"use client";

import { useState } from "react";
import type { ResolvedLessonStep } from "@aarshiya/curriculum-schema";

interface LessonPlayerProps {
  steps: ResolvedLessonStep[];
  onAnswer: (input: { questionId: string; correct: boolean }) => void;
  onComplete: () => void;
}

/**
 * Renders any lesson's ordered steps one at a time. Content is entirely
 * data-driven (ResolvedLessonStep) — this component has no knowledge of
 * science, or of any specific concept or lesson.
 */
export function LessonPlayer({ steps, onAnswer, onComplete }: LessonPlayerProps) {
  const [index, setIndex] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);

  const step = steps[index];
  const isLast = index === steps.length - 1;

  function goNext() {
    setAnswered(false);
    setSelected(null);
    setRevealed(false);
    if (isLast) {
      onComplete();
    } else {
      setIndex(index + 1);
    }
  }

  if (step.type === "explanation" || step.type === "example") {
    return (
      <div className="flex flex-col gap-4">
        <p className="text-sm font-medium uppercase tracking-wide text-zinc-500">
          {step.type}
        </p>
        <p className="text-lg text-zinc-800 dark:text-zinc-200">{step.body}</p>
        <button
          type="button"
          onClick={goNext}
          className="self-start rounded bg-zinc-900 px-4 py-2 text-sm font-medium text-white dark:bg-zinc-100 dark:text-zinc-900"
        >
          Next
        </button>
      </div>
    );
  }

  if (step.type === "summary") {
    return (
      <div className="flex flex-col gap-4">
        <p className="text-sm font-medium uppercase tracking-wide text-zinc-500">
          Summary
        </p>
        <p className="text-lg text-zinc-800 dark:text-zinc-200">{step.body}</p>
        <button
          type="button"
          onClick={goNext}
          className="self-start rounded bg-zinc-900 px-4 py-2 text-sm font-medium text-white dark:bg-zinc-100 dark:text-zinc-900"
        >
          Finish lesson
        </button>
      </div>
    );
  }

  const { question } = step;

  function submitMultipleChoice(option: string) {
    if (answered) return;
    setSelected(option);
    setAnswered(true);
    onAnswer({ questionId: question.id, correct: option === question.correctAnswer });
  }

  function submitShortAnswerSelfAssessment(correct: boolean) {
    if (answered) return;
    setAnswered(true);
    onAnswer({ questionId: question.id, correct });
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm font-medium uppercase tracking-wide text-zinc-500">
        Question
      </p>
      <p className="text-lg text-zinc-800 dark:text-zinc-200">{question.prompt}</p>

      {question.type === "multiple-choice" && question.options && (
        <div className="flex flex-col gap-2">
          {question.options.map((option) => {
            const isSelected = selected === option;
            const isCorrectOption = option === question.correctAnswer;
            return (
              <button
                key={option}
                type="button"
                disabled={answered}
                onClick={() => submitMultipleChoice(option)}
                className={`rounded border px-4 py-2 text-left text-sm ${
                  answered && isCorrectOption
                    ? "border-green-600 bg-green-50 dark:bg-green-950"
                    : answered && isSelected
                      ? "border-red-600 bg-red-50 dark:bg-red-950"
                      : "border-zinc-300 dark:border-zinc-700"
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>
      )}

      {question.type !== "multiple-choice" && !revealed && (
        <div className="flex flex-col gap-2">
          <p className="text-sm text-zinc-500">
            Think through your answer, then check it below.
          </p>
          <button
            type="button"
            onClick={() => setRevealed(true)}
            className="self-start rounded border border-zinc-300 px-4 py-2 text-sm dark:border-zinc-700"
          >
            Show reference answer
          </button>
        </div>
      )}

      {question.type !== "multiple-choice" && revealed && !answered && (
        <div className="flex flex-col gap-2">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Reference answer: {String(question.correctAnswer)}
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                setSelected("correct");
                submitShortAnswerSelfAssessment(true);
              }}
              className="rounded bg-zinc-900 px-4 py-2 text-sm text-white dark:bg-zinc-100 dark:text-zinc-900"
            >
              I got it right
            </button>
            <button
              type="button"
              onClick={() => {
                setSelected("incorrect");
                submitShortAnswerSelfAssessment(false);
              }}
              className="rounded border border-zinc-300 px-4 py-2 text-sm dark:border-zinc-700"
            >
              I got it wrong
            </button>
          </div>
        </div>
      )}

      {answered && (
        <button
          type="button"
          onClick={goNext}
          className="self-start rounded bg-zinc-900 px-4 py-2 text-sm font-medium text-white dark:bg-zinc-100 dark:text-zinc-900"
        >
          Next
        </button>
      )}
    </div>
  );
}
