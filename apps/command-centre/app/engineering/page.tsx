import { PageHeader } from "../components/PageHeader";
import { ProgressCard } from "../components/ProgressCard";
import { Section } from "../components/Section";
import { getExecutionBudget } from "../lib/execution-budget-reader";
import { getEngineeringMetrics } from "../lib/repository-reader";

// Reads management/TASK_LEDGER.md and management/execution-log.jsonl from
// disk on every request; without this, Next.js statically prerenders the
// page at build time and the numbers shown would freeze at whatever those
// files said during `next build`.
export const dynamic = "force-dynamic";

export default function EngineeringDashboardPage() {
  const metrics = getEngineeringMetrics();
  const budget = getExecutionBudget();

  return (
    <div>
      <PageHeader
        title="Engineering Dashboard"
        description="Engineering Dashboard — build health, test coverage, and delegated-task status across the codebase."
      />
      <div className="mt-4 inline-block rounded-md bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-800">
        ✓ Live data — read directly from management/TASK_LEDGER.md
      </div>

      <Section title="Automation Statistics">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <ProgressCard label="Total Tasks" value={metrics.totalTasks} status="neutral" />
          <ProgressCard label="OpenClaw Tasks" value={metrics.openClawTasks} status="good" />
          <ProgressCard label="Claude Tasks" value={metrics.claudeTasks} status="neutral" />
          <ProgressCard
            label="Automation Ratio"
            value={metrics.automationRatio}
            status="good"
          />
        </div>
      </Section>

      <Section title="Execution Budget">
        <p className="mb-3 text-sm text-slate-600">
          A measurable proxy, not real Claude Code usage/quota data — no API exists for
          that. This tracks tasks dispatched and wall-clock execution minutes against a
          Sponsor-set daily cap (see <code>management/execution-budget.yaml</code>).
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <ProgressCard
            label="Tasks Dispatched Today"
            value={`${budget.tasksDispatchedToday} / ${budget.dailyTaskCap}`}
            status={budget.tasksRemaining > 0 ? "good" : "warning"}
          />
          <ProgressCard
            label="Minutes Used Today"
            value={`${budget.minutesUsedToday} / ${budget.dailyMinutesCap}`}
            status={budget.minutesRemaining > 0 ? "good" : "warning"}
          />
          <ProgressCard label="Tasks In Progress" value={budget.tasksInProgress} status="neutral" />
          <ProgressCard label="Tasks Remaining Today" value={budget.tasksRemaining} status="neutral" />
        </div>
      </Section>
    </div>
  );
}
