import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import type { ResolvedLessonStep } from "@aarshiya/curriculum-schema";
import { LessonPlayer } from "./LessonPlayer";

const mcQuestion: ResolvedLessonStep = {
  type: "question",
  question: {
    id: "q-1",
    conceptId: "sci-y7-matter",
    prompt: "Which of these is matter?",
    type: "multiple-choice",
    options: ["A rock", "A shadow"],
    correctAnswer: "A rock",
    difficulty: 0.2,
    hint: "Think about which one has mass and takes up space.",
    explanation: "A rock has mass and takes up space; a shadow does not.",
  },
};

const shortAnswerQuestion: ResolvedLessonStep = {
  type: "question",
  question: {
    id: "q-2",
    conceptId: "sci-y7-matter",
    prompt: "Why is air matter?",
    type: "short-answer",
    correctAnswer: "It has mass and takes up space.",
    difficulty: 0.4,
    hint: "Think about what happens when you blow up a balloon.",
    explanation: "Air has mass and takes up space, even though you can't see it.",
  },
};

function buildSteps(steps: ResolvedLessonStep[]): ResolvedLessonStep[] {
  return steps;
}

describe("LessonPlayer", () => {
  test("walks through explanation, example, interactive, and summary steps", () => {
    const onComplete = vi.fn();
    render(
      <LessonPlayer
        steps={buildSteps([
          { type: "explanation", body: "Matter has mass and takes up space." },
          { type: "example", body: "Water and rock are both matter." },
          {
            type: "interactive",
            widget: "particle-state-explorer",
            prompt: "Try tapping the states below.",
          },
          { type: "summary", body: "That's what matter is." },
        ])}
        onAnswer={vi.fn()}
        onComplete={onComplete}
      />,
    );

    expect(screen.getByText("Matter has mass and takes up space.")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Next →" }));

    expect(screen.getByText("Water and rock are both matter.")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Next →" }));

    expect(screen.getByText("Try tapping the states below.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Solid" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Next →" }));

    expect(screen.getByText("That's what matter is.")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Finish lesson 🎉" }));
    expect(onComplete).toHaveBeenCalledOnce();
  });

  test("shows an unknown-widget message for an unregistered widget id", () => {
    render(
      <LessonPlayer
        steps={buildSteps([
          { type: "interactive", widget: "not-a-real-widget", prompt: "Try it." },
        ])}
        onAnswer={vi.fn()}
        onComplete={vi.fn()}
      />,
    );

    expect(screen.getByText(/Unknown widget/)).toBeInTheDocument();
  });

  test("multiple-choice: correct answer shows feedback and reports the answer", () => {
    const onAnswer = vi.fn();
    render(
      <LessonPlayer steps={buildSteps([mcQuestion])} onAnswer={onAnswer} onComplete={vi.fn()} />,
    );

    fireEvent.click(screen.getByRole("button", { name: "A rock" }));

    expect(onAnswer).toHaveBeenCalledWith({ questionId: "q-1", correct: true });
    expect(screen.getByText("✓ Nice work")).toBeInTheDocument();
    expect(
      screen.getByText("A rock has mass and takes up space; a shadow does not."),
    ).toBeInTheDocument();
  });

  test("multiple-choice: incorrect answer offers try again, which resets the question", () => {
    const onAnswer = vi.fn();
    render(
      <LessonPlayer steps={buildSteps([mcQuestion])} onAnswer={onAnswer} onComplete={vi.fn()} />,
    );

    fireEvent.click(screen.getByRole("button", { name: "A shadow" }));
    expect(onAnswer).toHaveBeenCalledWith({ questionId: "q-1", correct: false });
    expect(screen.getByText("✗ Not quite")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "🔁 Try again" }));
    expect(screen.queryByText("✗ Not quite")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "A rock" })).toBeInTheDocument();
  });

  test("reveals a hint on request before the question is answered", () => {
    render(
      <LessonPlayer steps={buildSteps([mcQuestion])} onAnswer={vi.fn()} onComplete={vi.fn()} />,
    );

    expect(
      screen.queryByText("💡 Think about which one has mass and takes up space."),
    ).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "💡 Need a hint?" }));
    expect(
      screen.getByText("💡 Think about which one has mass and takes up space."),
    ).toBeInTheDocument();
  });

  test("hint control disappears once the question is answered", () => {
    render(
      <LessonPlayer steps={buildSteps([mcQuestion])} onAnswer={vi.fn()} onComplete={vi.fn()} />,
    );

    fireEvent.click(screen.getByRole("button", { name: "A rock" }));
    expect(screen.queryByRole("button", { name: "💡 Need a hint?" })).not.toBeInTheDocument();
  });

  test("short-answer: type, check, and self-assess as correct", () => {
    const onAnswer = vi.fn();
    render(
      <LessonPlayer
        steps={buildSteps([shortAnswerQuestion])}
        onAnswer={onAnswer}
        onComplete={vi.fn()}
      />,
    );

    fireEvent.change(screen.getByLabelText(/Type your answer/), {
      target: { value: "It has mass." },
    });
    fireEvent.click(screen.getByRole("button", { name: "Check my answer" }));

    expect(screen.getByText("It has mass and takes up space.")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "✅ I got it right" }));

    expect(onAnswer).toHaveBeenCalledWith({ questionId: "q-2", correct: true });
    expect(screen.getByText("✓ Nice work")).toBeInTheDocument();
  });

  test("short-answer: self-assess as incorrect offers try again", () => {
    const onAnswer = vi.fn();
    render(
      <LessonPlayer
        steps={buildSteps([shortAnswerQuestion])}
        onAnswer={onAnswer}
        onComplete={vi.fn()}
      />,
    );

    fireEvent.change(screen.getByLabelText(/Type your answer/), {
      target: { value: "I don't know." },
    });
    fireEvent.click(screen.getByRole("button", { name: "Check my answer" }));
    fireEvent.click(screen.getByRole("button", { name: "❌ I got it wrong" }));

    expect(onAnswer).toHaveBeenCalledWith({ questionId: "q-2", correct: false });
    expect(screen.getByText("✗ Not quite")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "🔁 Try again" }));
    expect(screen.getByLabelText(/Type your answer/)).toHaveValue("");
  });
});
