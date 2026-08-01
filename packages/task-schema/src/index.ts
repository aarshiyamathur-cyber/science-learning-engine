import { z } from "zod";

/**
 * Task data model, per the Engineering Operating Agreement
 * (management/OPERATING_AGREEMENT.md). Structured YAML replaces hand-
 * maintained Markdown tables as the source of truth going forward — the
 * historical Markdown record (management/TASK_LEDGER.md, docs/backlog/backlog.md)
 * is frozen as-is, not retroactively migrated. Human-readable views are
 * generated from this schema instead (see scripts/generate-task-views.ts).
 */

export const TaskTierSchema = z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3)]);
export type TaskTier = z.infer<typeof TaskTierSchema>;

export const TaskRiskSchema = z.enum(["low", "medium", "high"]);
export type TaskRisk = z.infer<typeof TaskRiskSchema>;

export const TaskStatusSchema = z.enum([
  "not-started",
  "dispatched",
  "in-progress",
  "awaiting-review",
  "done",
]);
export type TaskStatus = z.infer<typeof TaskStatusSchema>;

export const TaskSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  /** Groups tasks the way Markdown section headers used to (e.g. "Sprint 6", "Product Command Centre"). */
  initiative: z.string().min(1),
  tier: TaskTierSchema,
  risk: TaskRiskSchema,
  status: TaskStatusSchema,
  assignedBy: z.string().min(1),
  /** Who actually implemented it once known — "Claude", "OpenClaw", or unset while not-started. */
  owner: z.string().optional(),
  dependsOn: z.array(z.string()).default([]),
  filesTouched: z.array(z.string()).default([]),
  acceptanceCriteria: z.string().min(1),
  /** Review notes once reviewed — absent until a Claude review has happened. */
  reviewed: z.string().optional(),
  accepted: z.boolean().default(false),
  /** Free-text qualitative reasoning — the thing structure must never crowd out. */
  notes: z.string().optional(),
});
export type Task = z.infer<typeof TaskSchema>;
