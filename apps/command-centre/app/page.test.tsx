import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import ExecutiveDashboardPage from "./page";
import { progressMetrics } from "./lib/sample-data";

describe("ExecutiveDashboardPage", () => {
  test("renders all expected progress card labels", () => {
    render(<ExecutiveDashboardPage />);

    for (const metric of progressMetrics) {
      expect(screen.getByText(metric.label)).toBeInTheDocument();
    }
  });

  test("renders the page title", () => {
    render(<ExecutiveDashboardPage />);

    expect(screen.getByRole("heading", { name: "Executive Dashboard" })).toBeInTheDocument();
  });
});
