import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import QuestionBankPage from "./page";
import { conceptQuestionBreakdown, questionBankSummary } from "../lib/sample-data";

describe("QuestionBankPage", () => {
  test("renders the summary progress cards", () => {
    render(<QuestionBankPage />);

    expect(screen.getByText("Total Questions")).toBeInTheDocument();
    expect(screen.getByText(String(questionBankSummary.totalQuestions))).toBeInTheDocument();
  });

  test("renders every concept row with its question counts", () => {
    render(<QuestionBankPage />);

    for (const row of conceptQuestionBreakdown) {
      expect(screen.getByText(row.concept)).toBeInTheDocument();
    }
  });

  test("renders the page title", () => {
    render(<QuestionBankPage />);

    expect(screen.getByRole("heading", { name: "Question Bank" })).toBeInTheDocument();
  });
});
