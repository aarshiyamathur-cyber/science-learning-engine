import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import SprintHistoryPage from "./page";
import { sprintHistory } from "../lib/sample-data";

describe("SprintHistoryPage", () => {
  test("renders every sprint with its name and automation-ratio breakdown", () => {
    render(<SprintHistoryPage />);

    for (const sprint of sprintHistory) {
      expect(screen.getByText(sprint.name)).toBeInTheDocument();
      expect(
        screen.getByText(`${sprint.openClawTasks} OpenClaw / ${sprint.claudeTasks} Claude`),
      ).toBeInTheDocument();
    }
  });

  test("renders the page title", () => {
    render(<SprintHistoryPage />);

    expect(screen.getByRole("heading", { name: "Sprint History" })).toBeInTheDocument();
  });
});
