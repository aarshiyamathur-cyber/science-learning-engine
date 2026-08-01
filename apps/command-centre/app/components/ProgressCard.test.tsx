import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { ProgressCard } from "./ProgressCard";

describe("ProgressCard", () => {
  test("renders its label and value", () => {
    render(<ProgressCard label="Automation Ratio" value="82%" status="good" />);

    expect(screen.getByText("Automation Ratio")).toBeInTheDocument();
    expect(screen.getByText("82%")).toBeInTheDocument();
  });

  test("renders a numeric value", () => {
    render(<ProgressCard label="Open Blockers" value={0} status="neutral" />);

    expect(screen.getByText("Open Blockers")).toBeInTheDocument();
    expect(screen.getByText("0")).toBeInTheDocument();
  });
});
