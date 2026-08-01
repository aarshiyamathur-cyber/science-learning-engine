import fs from "node:fs";
import path from "node:path";

/**
 * Reads the real Execution Budget from management/execution-log.jsonl and
 * management/execution-budget.yaml (see management/OPERATING_AGREEMENT.md).
 *
 * This is deliberately a measurable proxy, not real Claude Code usage/quota
 * data — there is no API this project can call for that. What's tracked
 * instead: how many tasks were dispatched today, and how many wall-clock
 * minutes of headless/review execution they've consumed, against a
 * Sponsor-set daily cap.
 */

export interface ExecutionBudget {
  dailyTaskCap: number;
  dailyMinutesCap: number;
  tasksDispatchedToday: number;
  minutesUsedToday: number;
  tasksInProgress: number;
  tasksRemaining: number;
  minutesRemaining: number;
}

const LOG_PATH = path.join(process.cwd(), "..", "..", "management", "execution-log.jsonl");
const CONFIG_PATH = path.join(process.cwd(), "..", "..", "management", "execution-budget.yaml");

interface LogEvent {
  event: "start" | "finish";
  taskId: string;
  tier?: number;
  at: string;
}

function parseBudgetConfig(raw: string): { dailyTaskCap: number; dailyMinutesCap: number } {
  const dailyTaskCap = Number(raw.match(/^dailyTaskCap:\s*(\d+)/m)?.[1] ?? 0);
  const dailyMinutesCap = Number(raw.match(/^dailyMinutesCap:\s*(\d+)/m)?.[1] ?? 0);
  return { dailyTaskCap, dailyMinutesCap };
}

function parseLogEvents(raw: string): LogEvent[] {
  return raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => JSON.parse(line) as LogEvent);
}

function isToday(isoTimestamp: string, now: Date): boolean {
  return isoTimestamp.slice(0, 10) === now.toISOString().slice(0, 10);
}

export function getExecutionBudget(now: Date = new Date()): ExecutionBudget {
  const { dailyTaskCap, dailyMinutesCap } = parseBudgetConfig(
    fs.readFileSync(CONFIG_PATH, "utf-8"),
  );
  const events = parseLogEvents(fs.readFileSync(LOG_PATH, "utf-8"));

  const startsToday = events.filter((e) => e.event === "start" && isToday(e.at, now));
  const finishesByTaskId = new Map(
    events.filter((e) => e.event === "finish").map((e) => [e.taskId, e.at]),
  );

  let minutesUsedToday = 0;
  let tasksInProgress = 0;

  for (const start of startsToday) {
    const finishedAt = finishesByTaskId.get(start.taskId);
    const endTime = finishedAt ? new Date(finishedAt) : now;
    minutesUsedToday += (endTime.getTime() - new Date(start.at).getTime()) / 60_000;
    if (!finishedAt) tasksInProgress += 1;
  }

  return {
    dailyTaskCap,
    dailyMinutesCap,
    tasksDispatchedToday: startsToday.length,
    minutesUsedToday: Math.round(minutesUsedToday),
    tasksInProgress,
    tasksRemaining: Math.max(0, dailyTaskCap - startsToday.length),
    minutesRemaining: Math.max(0, dailyMinutesCap - Math.round(minutesUsedToday)),
  };
}
