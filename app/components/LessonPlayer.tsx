"use client";

import { useRef, useState } from "react";
import type { ResolvedLessonStep } from "@aarshiya/curriculum-schema";
import { ExampleIcon, ExplanationIcon, QuestionIcon, SummaryIcon } from "./icons";
import { Badge, Button, Card } from "./ui";
import type { Tone } from "./ui/tone";
import { ParticleStateExplorer } from "./widgets/ParticleStateExplorer";

/**
 * Registry of interactive widgets, keyed by the id a lesson's interactive
 * step references (see InteractiveStepSchema). Adding a widget means adding
 * one entry here — the schema doesn't need to know the closed set of ids.
 */
const WIDGET_REGISTRY: Record<string, React.ComponentType> = {
  "particle-state-explorer": ParticleStateExplorer,
};

interface LessonPlayerProps {
  steps: ResolvedLessonStep[];
  onAnswer: (input: { questionId: string; correct: boolean }) => void;
  onComplete: () => void;
}

const STEP_META: Record<
  "explanation" | "example" | "question" | "summary",
  { label: string; tone: Tone; Icon: typeof ExplanationIcon }
> = {
  explanation: { label: "Explanation", tone: "info", Icon: ExplanationIcon },
  example: { label: "Example", tone: "accent", Icon: ExampleIcon },
  question: { label: "Question", tone: "warning", Icon: QuestionIcon },
  summary: { label: "Summary", tone: "success", Icon: SummaryIcon },
};

/**
 * This component only ever mounts client-side, after a user clicks "Start
 * Lesson" — it is never part of the server-rendered initial HTML — so
 * reading `window` directly at render time (not in an effect) is safe here.
 */
function isSpeechRecognitionSupported(): boolean {
  if (typeof window === "undefined") return false;
  const w = window as typeof window & {
    SpeechRecognition?: unknown;
    webkitSpeechRecognition?: unknown;
  };
  return Boolean(w.SpeechRecognition ?? w.webkitSpeechRecognition);
}

/** Minimal shape of the Web Speech API surface this component uses. */
interface SpeechRecognitionLike {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  onresult:
    ((event: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
}

function VoiceAnswerButton({ onTranscript }: { onTranscript: (text: string) => void }) {
  const supported = isSpeechRecognitionSupported();
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);

  if (!supported) {
    return (
      <p className="text-label text-zinc-400 dark:text-zinc-500">
        🎤 Voice answers aren&apos;t supported on this browser — use the text box above.
      </p>
    );
  }

  function startListening() {
    const w = window as typeof window & {
      SpeechRecognition?: new () => SpeechRecognitionLike;
      webkitSpeechRecognition?: new () => SpeechRecognitionLike;
    };
    const Recognition = w.SpeechRecognition ?? w.webkitSpeechRecognition;
    if (!Recognition) return;

    const recognition = new Recognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onresult = (event) => {
      const transcript = event.results[0]?.[0]?.transcript;
      if (transcript) onTranscript(transcript);
    };
    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);
    recognitionRef.current = recognition;
    setListening(true);
    recognition.start();
  }

  function stopListening() {
    recognitionRef.current?.stop();
    setListening(false);
  }

  return (
    <div className="flex flex-col gap-1">
      <Button
        variant="solid"
        tone={listening ? "danger" : "info"}
        onClick={listening ? stopListening : startListening}
      >
        {listening ? "⏹ Stop" : "🎤 Answer out loud"}
      </Button>
      {listening && (
        <p className="text-label font-semibold text-danger-700 dark:text-danger-300">
          🎤 Listening — say your answer now
        </p>
      )}
    </div>
  );
}

/**
 * Renders any lesson's ordered steps one at a time. Content is entirely
 * data-driven (ResolvedLessonStep) — this component has no knowledge of
 * science, or of any specific concept or lesson.
 */
export function LessonPlayer({ steps, onAnswer, onComplete }: LessonPlayerProps) {
  const [index, setIndex] = useState(0);
  const [outcome, setOutcome] = useState<"correct" | "incorrect" | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [typedAnswer, setTypedAnswer] = useState("");
  const [checked, setChecked] = useState(false);
  const [hintShown, setHintShown] = useState(false);

  const step = steps[index];
  const isLast = index === steps.length - 1;

  function resetQuestionState() {
    setOutcome(null);
    setSelectedOption(null);
    setTypedAnswer("");
    setChecked(false);
    setHintShown(false);
  }

  function goNext() {
    resetQuestionState();
    if (isLast) {
      onComplete();
    } else {
      setIndex(index + 1);
    }
  }

  function tryAgain() {
    setOutcome(null);
    setSelectedOption(null);
    setTypedAnswer("");
    setChecked(false);
    setHintShown(false);
  }

  if (step.type === "explanation" || step.type === "example" || step.type === "summary") {
    const meta = STEP_META[step.type];
    return (
      <Card tone={meta.tone}>
        <Badge tone={meta.tone} icon={<meta.Icon className="h-4 w-4" />}>
          {meta.label}
        </Badge>
        <p className="text-body text-zinc-800 dark:text-zinc-100">{step.body}</p>
        <Button variant="solid" tone={meta.tone} onClick={goNext}>
          {step.type === "summary" ? "Finish lesson 🎉" : "Next →"}
        </Button>
      </Card>
    );
  }

  if (step.type === "interactive") {
    const Widget = WIDGET_REGISTRY[step.widget];
    return (
      <Card tone="accent">
        <Badge tone="accent" icon="🧪">
          Try it yourself
        </Badge>
        <p className="text-body text-zinc-800 dark:text-zinc-100">{step.prompt}</p>
        {Widget ? (
          <Widget />
        ) : (
          <p className="text-label text-danger-600 dark:text-danger-400">
            Unknown widget &quot;{step.widget}&quot;.
          </p>
        )}
        <Button variant="solid" tone="accent" onClick={goNext}>
          Next →
        </Button>
      </Card>
    );
  }

  const { question } = step;
  const meta = STEP_META.question;

  function submitMultipleChoice(option: string) {
    if (outcome) return;
    const correct = option === question.correctAnswer;
    setSelectedOption(option);
    setOutcome(correct ? "correct" : "incorrect");
    onAnswer({ questionId: question.id, correct });
  }

  function checkTypedAnswer() {
    if (!typedAnswer.trim()) return;
    setChecked(true);
  }

  function submitShortAnswerSelfAssessment(correct: boolean) {
    if (outcome) return;
    setOutcome(correct ? "correct" : "incorrect");
    onAnswer({ questionId: question.id, correct });
  }

  return (
    <Card tone={meta.tone}>
      <Badge tone={meta.tone} icon={<meta.Icon className="h-4 w-4" />}>
        {meta.label}
      </Badge>
      <p className="text-body text-zinc-800 dark:text-zinc-100">{question.prompt}</p>

      {outcome === null && (
        <div>
          {hintShown ? (
            <p className="rounded-lg border-2 border-info-300 bg-info-50 p-3 text-label text-info-800 dark:border-info-800 dark:bg-info-950/40 dark:text-info-200">
              💡 {question.hint}
            </p>
          ) : (
            <button
              type="button"
              onClick={() => setHintShown(true)}
              className="text-label text-info-600 underline hover:text-info-800 dark:text-info-400 dark:hover:text-info-200"
            >
              💡 Need a hint?
            </button>
          )}
        </div>
      )}

      {question.type === "multiple-choice" && question.options && (
        <div className="flex flex-col gap-2">
          <p className="text-label text-zinc-500 dark:text-zinc-400">
            Tap the answer you think is right:
          </p>
          {question.options.map((option) => {
            const isSelected = selectedOption === option;
            const isCorrectOption = option === question.correctAnswer;
            return (
              <button
                key={option}
                type="button"
                disabled={outcome !== null}
                onClick={() => submitMultipleChoice(option)}
                className={`rounded-lg border-2 px-4 py-3 text-left text-body font-medium transition-colors ${
                  outcome && isCorrectOption
                    ? "border-success-500 bg-success-100 text-success-900 dark:bg-success-900 dark:text-success-100"
                    : outcome && isSelected
                      ? "border-danger-500 bg-danger-100 text-danger-900 dark:bg-danger-900 dark:text-danger-100"
                      : "border-warning-300 bg-white hover:bg-warning-50 dark:border-warning-800 dark:bg-zinc-900 dark:hover:bg-warning-950"
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
          <label
            htmlFor="short-answer-input"
            className="text-label text-zinc-600 dark:text-zinc-300"
          >
            Type your answer, then check it — or answer out loud:
          </label>
          <textarea
            id="short-answer-input"
            value={typedAnswer}
            onChange={(e) => setTypedAnswer(e.target.value)}
            rows={2}
            placeholder="Write your answer here..."
            className="rounded-lg border-2 border-warning-300 bg-white p-3 text-body text-zinc-900 focus:border-warning-500 focus:outline-none dark:border-warning-800 dark:bg-zinc-900 dark:text-zinc-100"
          />
          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="solid"
              tone="warning"
              onClick={checkTypedAnswer}
              disabled={!typedAnswer.trim()}
            >
              Check my answer
            </Button>
            <VoiceAnswerButton onTranscript={(text) => setTypedAnswer(text)} />
          </div>
        </div>
      )}

      {question.type !== "multiple-choice" && checked && !outcome && (
        <div className="flex flex-col gap-3 rounded-lg border-2 border-warning-300 bg-white p-4 dark:border-warning-800 dark:bg-zinc-900">
          <p className="text-label text-zinc-500 dark:text-zinc-400">You wrote:</p>
          <p className="rounded bg-zinc-100 p-2 text-body text-zinc-800 dark:bg-zinc-800 dark:text-zinc-100">
            {typedAnswer}
          </p>
          <p className="text-label text-zinc-500 dark:text-zinc-400">Reference answer:</p>
          <p className="text-body font-medium text-zinc-800 dark:text-zinc-100">
            {String(question.correctAnswer)}
          </p>
          <p className="text-label text-zinc-600 dark:text-zinc-300">
            Did you get it right?
          </p>
          <div className="flex gap-2">
            <Button
              variant="solid"
              tone="success"
              onClick={() => submitShortAnswerSelfAssessment(true)}
            >
              ✅ I got it right
            </Button>
            <Button
              variant="solid"
              tone="danger"
              onClick={() => submitShortAnswerSelfAssessment(false)}
            >
              ❌ I got it wrong
            </Button>
          </div>
        </div>
      )}

      {outcome === "correct" && (
        <div className="flex flex-col gap-2 rounded-lg border-2 border-success-300 bg-success-50 p-4 dark:border-success-800 dark:bg-success-950/40">
          <Badge tone="success">✓ Nice work</Badge>
          <p className="text-label font-semibold text-warning-700 dark:text-warning-300">
            ⭐ Earning XP toward finishing this lesson
          </p>
          <p className="text-body text-zinc-700 dark:text-zinc-200">
            {question.explanation}
          </p>
          <Button variant="solid" tone="success" onClick={goNext} className="self-start">
            Next →
          </Button>
        </div>
      )}

      {outcome === "incorrect" && (
        <div className="flex flex-col gap-2 rounded-lg border-2 border-danger-300 bg-danger-50 p-4 dark:border-danger-800 dark:bg-danger-950/40">
          <Badge tone="danger">✗ Not quite</Badge>
          <p className="text-body text-zinc-700 dark:text-zinc-200">
            {question.explanation}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="solid" tone="danger" onClick={tryAgain}>
              🔁 Try again
            </Button>
            <button
              type="button"
              onClick={goNext}
              className="text-label text-zinc-500 underline hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
            >
              Skip to next →
            </button>
          </div>
        </div>
      )}
    </Card>
  );
}
