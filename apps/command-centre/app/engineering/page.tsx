import { PageHeader } from "../components/PageHeader";
import { ProgressCard } from "../components/ProgressCard";
import { Section } from "../components/Section";
import { getEngineeringMetrics } from "../lib/repository-reader";

// Reads management/TASK_LEDGER.md from disk on every request; without this,
// Next.js statically prerenders the page at build time and the numbers
// shown would freeze at whatever the ledger said during `next build`.
export const dynamic = "force-dynamic";

export default function EngineeringDashboardPage() {
  const metrics = getEngineeringMetrics();

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
    </div>
  );
}
