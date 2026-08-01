import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import EngineeringDashboardPage from "./page";
import { getEngineeringMetrics } from "../lib/repository-reader";

describe("EngineeringDashboardPage", () => {
  test("renders without crashing and shows the page title", () => {
    render(<EngineeringDashboardPage />);

    expect(
      screen.getByRole("heading", { name: "Engineering Dashboard" }),
    ).toBeInTheDocument();
  });

  test("renders the metric labels and live-data note", () => {
    render(<EngineeringDashboardPage />);

    expect(screen.getByText("Total Tasks")).toBeInTheDocument();
    expect(screen.getByText("OpenClaw Tasks")).toBeInTheDocument();
    expect(screen.getByText("Claude Tasks")).toBeInTheDocument();
    expect(screen.getByText("Automation Ratio")).toBeInTheDocument();
    expect(screen.getByText(/Live data/)).toBeInTheDocument();
    expect(screen.queryByText(/Sample data/)).not.toBeInTheDocument();
  });

  test("renders the real computed metric values", () => {
    const metrics = getEngineeringMetrics();
    render(<EngineeringDashboardPage />);

    expect(screen.getByText(String(metrics.totalTasks))).toBeInTheDocument();
    expect(screen.getByText(metrics.automationRatio)).toBeInTheDocument();
  });
});
