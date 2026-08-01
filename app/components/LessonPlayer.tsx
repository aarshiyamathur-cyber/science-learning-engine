"use client";

import { useState } from "react";
import type { ResolvedLessonStep } from "@aarshiya/curriculum-schema";

interface LessonPlayerProps {
  steps: ResolvedLessonStep[];
  onAnswer: (input: { questionId: string; correct: boolean }) => void;
  onComplete: () => void;
}

const STEP_STYLE = {
  explanation: { label: "Explanation", emoji: "💡", accent: "sky" },
  example: { label: "Example", emoji: "🔍", accent: "violet" },
  question: { label: "Question", emoji: "❓", accent: "amber" },
  summary: { label: "Summary", emoji: "🎉", accent: "emerald" },
} as const;

const ACCENT_CLASSES = {
  sky: {
    badge: "bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-200",
    button: "bg-sky-600 hover:bg-sky-700 text-white",
    card: "border-sky-200 bg-sky-50 dark:border-sky-900 dark:bg-sky-950/40",
  },
  violet: {
    badge: "bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-200",
    button: "bg-violet-600 hover:bg-violet-700 text-white",
    card: "border-violet-200 bg-violet-50 dark:border-violet-900 dark:bg-violet-950/40",
  },
  amber: {
    badge: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
    button: "bg-amber-600 hover:bg-amber-700 text-white",
    card: "border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/40",
  },
  emerald: {
    badge: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200",
    button: "bg-emerald-600 hover:bg-emerald-700 text-white",
    card: "border-emerald-200 bg-emerald-50 dark:border-emerald-900 dark:bg-emerald-950/40",
  },
} as const;

function StepBadge({ type }: { type: keyof typeof STEP_STYLE }) {
  const style = STEP_STYLE[type];
  const accent = ACCENT_CLASSES[style.accent];
  return (
    <span
      className={`inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-sm font-semibold ${accent.badge}`}
    >
      <span aria-hidden>{style.emoji}</span>
      {style.label}
    </span>
  );
}

/**
 * Renders any lesson's ordered steps one at a time. Content is entirely
 * data-driven (ResolvedLessonStep) — this component has no knowledge of
 * science, or of any specific concept or lesson.
 */
export function LessonPlayer({ steps, onAnswer, onComplete }: LessonPlayerProps) {
  const [index, setIndex] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [typedAnswer, setTypedAnswer] = useState("");
  const [checked, setChecked] = useState(false);

  const step = steps[index];
  const isLast = index === steps.length - 1;

  function goNext() {
    setAnswered(false);
    setSelectedOption(null);
    setTypedAnswer("");
    setChecked(false);
    if (isLast) {
      onComplete();
    } else {
      setIndex(index + 1);
    }
  }

  if (step.type === "explanation" || step.type === "example") {
    const accent = ACCENT_CLASSES[STEP_STYLE[step.type].accent];
    return (
      <div className={`flex flex-col gap-4 rounded-xl border-2 p-6 ${accent.card}`}>
        <StepBadge type={step.type} />
        <p className="text-lg text-zinc-800 dark:text-zinc-100">{step.body}</p>
        <button
          type="button"
          onClick={goNext}
          className={`self-start rounded-full px-5 py-2 text-sm font-semibold shadow-sm ${accent.button}`}
        >
          Next →
        </button>
      </div>
    );
  }

  if (step.type === "summary") {
    const accent = ACCENT_CLASSES[STEP_STYLE.summary.accent];
    return (
      <div className={`flex flex-col gap-4 rounded-xl border-2 p-6 ${accent.card}`}>
        <StepBadge type="summary" />
        <p className="text-lg text-zinc-800 dark:text-zinc-100">{step.body}</p>
        <button
          type="button"
          onClick={goNext}
          className={`self-start rounded-full px-5 py-2 text-sm font-semibold shadow-sm ${accent.button}`}
        >
          Finish lesson 🎉
        </button>
      </div>
    );
  }

  const { question } = step;
  const accent = ACCENT_CLASSES[STEP_STYLE.question.accent];

  function submitMultipleChoice(option: string) {
    if (answered) return;
    setSelectedOption(option);
    setAnswered(true);
    onAnswer({ questionId: question.id, correct: option === question.correctAnswer });
  }

  function checkTypedAnswer() {
    if (!typedAnswer.trim()) return;
    setChecked(true);
  }

  function submitShortAnswerSelfAssessment(correct: boolean) {
    if (answered) return;
    setAnswered(true);
    onAnswer({ questionId: question.id, correct });
  }

  return (
    <div className={`flex flex-col gap-4 rounded-xl border-2 p-6 ${accent.card}`}>
      <StepBadge type="question" />
      <p className="text-lg text-zinc-800 dark:text-zinc-100">{question.prompt}</p>

      {question.type === "multiple-choice" && question.options && (
        <div className="flex flex-col gap-2">
          {question.options.map((option) => {
            const isSelected = selectedOption === option;
            const isCorrectOption = option === question.correctAnswer;
            return (
              <button
                key={option}
                type="button"
                disabled={answered}
                onClick={() => submitMultipleChoice(option)}
                className={`rounded-lg border-2 px-4 py-3 text-left text-base font-medium transition-colors ${
                  answered && isCorrectOption
                    ? "border-emerald-500 bg-emerald-100 text-emerald-900 dark:bg-emerald-900 dark:text-emerald-100"
                    : answered && isSelected
                      ? "border-rose-500 bg-rose-100 text-rose-900 dark:bg-rose-900 dark:text-rose-100"
                      : "border-amber-300 bg-white hover:bg-amber-50 dark:border-amber-800 dark:bg-zinc-900 dark:hover:bg-amber-950"
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>
      )}

      {question.type !== "multiple-choice" && !checked && (
        <div className="flex flex-col gap-2">
          <label htmlFor="short-answer-input" className="text-sm text-zinc-600 dark:text-zinc-300">
            Type your answer, then check it:
          </label>
          <textarea
            id="short-answer-input"
            value={typedAnswer}
            onChange={(e) => setTypedAnswer(e.target.value)}
            rows={2}
            placeholder="Write your answer here..."
            className="rounded-lg border-2 border-amber-300 bg-white p-3 text-base text-zinc-900 focus:border-amber-500 focus:outline-none dark:border-amber-800 dark:bg-zinc-900 dark:text-zinc-100"
          />
          <button
            type="button"
            onClick={checkTypedAnswer}
            disabled={!typedAnswer.trim()}
            className={`self-start rounded-full px-5 py-2 text-sm font-semibold shadow-sm disabled:opacity-40 ${accent.button}`}
          >
            Check my answer
          </button>
        </div>
      )}

      {question.type !== "multiple-choice" && checked && !answered && (
        <div className="flex flex-col gap-3 rounded-lg border-2 border-amber-300 bg-white p-4 dark:border-amber-800 dark:bg-zinc-900">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">You wrote:</p>
          <p className="rounded bg-zinc-100 p-2 text-base text-zinc-800 dark:bg-zinc-800 dark:text-zinc-100">
            {typedAnswer}
          </p>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Reference answer:</p>
          <p className="text-base font-medium text-zinc-800 dark:text-zinc-100">
            {String(question.correctAnswer)}
          </p>
          <p className="text-sm text-zinc-600 dark:text-zinc-300">Did you get it right?</p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => submitShortAnswerSelfAssessment(true)}
              className="rounded-full bg-emerald-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700"
            >
              ✅ I got it right
            </button>
            <button
              type="button"
              onClick={() => submitShortAnswerSelfAssessment(false)}
              className="rounded-full bg-rose-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-rose-700"
            >
              ❌ I got it wrong
            </button>
          </div>
        </div>
      )}

      {answered && (
        <button
          type="button"
          onClick={goNext}
          className={`self-start rounded-full px-5 py-2 text-sm font-semibold shadow-sm ${accent.button}`}
        >
          Next →
        </button>
      )}
    </div>
  );
}
