import { describe, expect, test } from "vitest";
import { getEngineeringMetrics, parseTaskOwners } from "./repository-reader";

describe("parseTaskOwners", () => {
  test("extracts owners from a markdown table, classifying by the OpenClaw substring", () => {
    const markdown = `
## Some Sprint

| Task ID | Title | Owner |
| ------- | ----- | ----- |
| T-1     | Foo   | **OpenClaw** (headless Claude Code worker) |
| T-2     | Bar   | Claude |
`;

    expect(parseTaskOwners(markdown)).toEqual(["OpenClaw", "Claude"]);
  });

  test("locates Task ID and Owner columns by header even when their order differs between tables", () => {
    const markdown = `
| Owner | Task ID |
| ----- | ------- |
| Claude | T-1 |

| Task ID | Owner |
| ------- | ----- |
| T-2 | OpenClaw |
`;

    expect(parseTaskOwners(markdown)).toEqual(["Claude", "OpenClaw"]);
  });

  test("skips separator rows and rows without a Task ID", () => {
    const markdown = `
| Task ID | Owner |
| ------- | ----- |
|         | Claude |
| T-1     | Claude |
`;

    expect(parseTaskOwners(markdown)).toEqual(["Claude"]);
  });
});

describe("getEngineeringMetrics", () => {
  test("computes real, positive totals from the repo's actual TASK_LEDGER.md", () => {
    const metrics = getEngineeringMetrics();

    expect(metrics.totalTasks).toBeGreaterThan(0);
    expect(metrics.openClawTasks).toBeGreaterThan(0);
    expect(metrics.claudeTasks).toBeGreaterThan(0);
    expect(metrics.openClawTasks + metrics.claudeTasks).toBe(metrics.totalTasks);
    expect(metrics.automationRatio).toMatch(/^\d{1,3}%$/);
  });

  test("returns a per-owner breakdown that sums to the total", () => {
    const metrics = getEngineeringMetrics();

    const sum = metrics.ownerBreakdown.reduce((acc, entry) => acc + entry.count, 0);
    expect(sum).toBe(metrics.totalTasks);
  });
});
