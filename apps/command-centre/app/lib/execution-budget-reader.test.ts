import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

describe("getExecutionBudget", () => {
  let root: string;

  beforeEach(() => {
    root = mkdtempSync(join(tmpdir(), "execution-budget-"));
    // The reader resolves paths as process.cwd()/../../management/*, matching
    // apps/command-centre being two directories below the repo root.
    const cwd = join(root, "apps", "command-centre");
    mkdirSync(cwd, { recursive: true });
    mkdirSync(join(root, "management"), { recursive: true });
    vi.spyOn(process, "cwd").mockReturnValue(cwd);
    // The module computes its file paths from process.cwd() once, at import
    // time — without resetting the module registry, a second dynamic import
    // in a later test would reuse paths captured under the previous test's
    // mocked cwd.
    vi.resetModules();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    rmSync(root, { recursive: true, force: true });
  });

  it("computes dispatched count and elapsed minutes for a finished task", async () => {
    writeFileSync(
      join(root, "management", "execution-budget.yaml"),
      "dailyTaskCap: 10\ndailyMinutesCap: 100\n",
    );
    writeFileSync(
      join(root, "management", "execution-log.jsonl"),
      [
        JSON.stringify({ event: "start", taskId: "BL-100", tier: 2, at: "2026-08-02T01:00:00Z" }),
        JSON.stringify({ event: "finish", taskId: "BL-100", at: "2026-08-02T01:10:00Z" }),
      ].join("\n") + "\n",
    );

    const { getExecutionBudget } = await import("./execution-budget-reader");
    const result = getExecutionBudget(new Date("2026-08-02T02:00:00Z"));

    expect(result.tasksDispatchedToday).toBe(1);
    expect(result.minutesUsedToday).toBe(10);
    expect(result.tasksInProgress).toBe(0);
    expect(result.tasksRemaining).toBe(9);
    expect(result.minutesRemaining).toBe(90);
  });

  it("counts an unfinished task as in progress, using elapsed time so far", async () => {
    writeFileSync(
      join(root, "management", "execution-budget.yaml"),
      "dailyTaskCap: 5\ndailyMinutesCap: 60\n",
    );
    writeFileSync(
      join(root, "management", "execution-log.jsonl"),
      JSON.stringify({ event: "start", taskId: "BL-101", tier: 2, at: "2026-08-02T01:00:00Z" }) +
        "\n",
    );

    const { getExecutionBudget } = await import("./execution-budget-reader");
    const result = getExecutionBudget(new Date("2026-08-02T01:15:00Z"));

    expect(result.tasksInProgress).toBe(1);
    expect(result.minutesUsedToday).toBe(15);
  });

  it("ignores tasks started on a previous day", async () => {
    writeFileSync(
      join(root, "management", "execution-budget.yaml"),
      "dailyTaskCap: 5\ndailyMinutesCap: 60\n",
    );
    writeFileSync(
      join(root, "management", "execution-log.jsonl"),
      JSON.stringify({ event: "start", taskId: "BL-099", tier: 2, at: "2026-08-01T01:00:00Z" }) +
        "\n",
    );

    const { getExecutionBudget } = await import("./execution-budget-reader");
    const result = getExecutionBudget(new Date("2026-08-02T01:15:00Z"));

    expect(result.tasksDispatchedToday).toBe(0);
    expect(result.minutesUsedToday).toBe(0);
  });
});
