import fs from "node:fs";
import path from "node:path";

/**
 * Reads real engineering metrics from management/TASK_LEDGER.md — the one
 * data source on this page that isn't sample data. Every other dashboard
 * page in this app reads from lib/sample-data.ts; this module is the
 * "later task" those pages' comments refer to.
 */

export type TaskOwner = "OpenClaw" | "Claude";

export interface OwnerBreakdown {
  owner: TaskOwner;
  count: number;
}

export interface EngineeringMetrics {
  totalTasks: number;
  openClawTasks: number;
  claudeTasks: number;
  automationRatio: string;
  ownerBreakdown: OwnerBreakdown[];
}

const TASK_LEDGER_PATH = path.join(process.cwd(), "..", "..", "management", "TASK_LEDGER.md");

function classifyOwner(ownerCell: string): TaskOwner {
  return ownerCell.toLowerCase().includes("openclaw") ? "OpenClaw" : "Claude";
}

function isSeparatorRow(cells: string[]): boolean {
  return cells.length > 0 && cells.every((cell) => /^:?-+:?$/.test(cell));
}

function splitRow(line: string): string[] {
  const trimmed = line.trim();
  const withoutEdges = trimmed.replace(/^\|/, "").replace(/\|$/, "");
  return withoutEdges.split("|").map((cell) => cell.trim());
}

/**
 * Parses every markdown table row across every section of TASK_LEDGER.md,
 * returning the owner of each real task row. Table column order/count vary
 * between historical sections, so each table's own header row is used to
 * locate the "Task ID" and "Owner" columns rather than assuming fixed
 * positions.
 */
export function parseTaskOwners(markdown: string): TaskOwner[] {
  const owners: TaskOwner[] = [];

  let taskIdIndex = -1;
  let ownerIndex = -1;

  for (const rawLine of markdown.split("\n")) {
    if (!rawLine.trim().startsWith("|")) continue;

    const cells = splitRow(rawLine);
    if (isSeparatorRow(cells)) continue;

    const headerTaskIdIndex = cells.findIndex((cell) => cell.toLowerCase() === "task id");
    if (headerTaskIdIndex !== -1) {
      taskIdIndex = headerTaskIdIndex;
      ownerIndex = cells.findIndex((cell) => cell.toLowerCase() === "owner");
      continue;
    }

    if (taskIdIndex === -1 || ownerIndex === -1) continue;
    if (taskIdIndex >= cells.length || ownerIndex >= cells.length) continue;

    const taskId = cells[taskIdIndex];
    if (!taskId) continue;

    owners.push(classifyOwner(cells[ownerIndex]));
  }

  return owners;
}

function formatPercentage(numerator: number, denominator: number): string {
  if (denominator === 0) return "0%";
  return `${Math.round((numerator / denominator) * 100)}%`;
}

export function getEngineeringMetrics(): EngineeringMetrics {
  const markdown = fs.readFileSync(TASK_LEDGER_PATH, "utf-8");
  const owners = parseTaskOwners(markdown);

  const openClawTasks = owners.filter((owner) => owner === "OpenClaw").length;
  const claudeTasks = owners.filter((owner) => owner === "Claude").length;
  const totalTasks = owners.length;

  return {
    totalTasks,
    openClawTasks,
    claudeTasks,
    automationRatio: formatPercentage(openClawTasks, totalTasks),
    ownerBreakdown: [
      { owner: "OpenClaw", count: openClawTasks },
      { owner: "Claude", count: claudeTasks },
    ],
  };
}
