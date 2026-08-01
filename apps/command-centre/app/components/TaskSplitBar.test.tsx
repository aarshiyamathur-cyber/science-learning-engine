import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { TaskSplitBar } from "./TaskSplitBar";

describe("TaskSplitBar", () => {
  test("renders a labeled bar describing the split", () => {
    render(<TaskSplitBar openClawTasks={1} claudeTasks={5} />);

    expect(screen.getByRole("img", { name: "1 OpenClaw / 5 Claude" })).toBeInTheDocument();
  });

  test("handles an all-Claude split without rendering an empty OpenClaw segment", () => {
    render(<TaskSplitBar openClawTasks={0} claudeTasks={6} />);

    expect(screen.getByRole("img", { name: "0 OpenClaw / 6 Claude" })).toBeInTheDocument();
  });
});
