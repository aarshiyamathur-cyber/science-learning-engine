import { appendFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Appends a start/finish event to management/execution-log.jsonl, the data
 * source behind the Command Centre's Execution Budget panel (see
 * management/OPERATING_AGREEMENT.md). Append-only by design — no line is
 * ever rewritten, so a start and its matching finish are two separate lines
 * paired by taskId when the log is read.
 *
 * Usage:
 *   tsx scripts/log-execution.ts start <taskId> <tier>
 *   tsx scripts/log-execution.ts finish <taskId>
 */

const LOG_PATH = join(process.cwd(), "management", "execution-log.jsonl");

const [event, taskId, tierArg] = process.argv.slice(2);

if (event !== "start" && event !== "finish") {
  console.error('First argument must be "start" or "finish".');
  process.exit(1);
}
if (!taskId) {
  console.error("Task id is required.");
  process.exit(1);
}

const at = new Date().toISOString();

if (event === "start") {
  const tier = Number(tierArg);
  if (!Number.isFinite(tier)) {
    console.error("start requires a numeric tier, e.g.: log-execution.ts start BL-040 2");
    process.exit(1);
  }
  appendFileSync(LOG_PATH, `${JSON.stringify({ event, taskId, tier, at })}\n`);
} else {
  appendFileSync(LOG_PATH, `${JSON.stringify({ event, taskId, at })}\n`);
}

console.log(`Logged ${event} for ${taskId} at ${at}`);
