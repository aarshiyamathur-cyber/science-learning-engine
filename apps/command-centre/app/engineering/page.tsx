import { ProgressCard } from "../components/ProgressCard";
import { getEngineeringMetrics } from "../lib/repository-reader";

// Reads management/TASK_LEDGER.md from disk on every request; without this,
// Next.js statically prerenders the page at build time and the numbers
// shown would freeze at whatever the ledger said during `next build`.
export const dynamic = "force-dynamic";

export default function EngineeringDashboardPage() {
  const metrics = getEngineeringMetrics();

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">
        Engineering Dashboard
      </h1>
      <p className="mt-2 max-w-2xl text-base text-slate-600">
        Engineering Dashboard — build health, test coverage, and delegated-task status
        across the codebase.
      </p>
      <div className="mt-4 inline-block rounded-md bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-800">
        ✓ Live data — read directly from management/TASK_LEDGER.md
      </div>

      <section className="mt-8">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Automation Statistics
        </h2>
        <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <ProgressCard label="Total Tasks" value={metrics.totalTasks} status="neutral" />
          <ProgressCard label="OpenClaw Tasks" value={metrics.openClawTasks} status="good" />
          <ProgressCard label="Claude Tasks" value={metrics.claudeTasks} status="neutral" />
          <ProgressCard
            label="Automation Ratio"
            value={metrics.automationRatio}
            status="good"
          />
        </div>
      </section>
    </div>
  );
}
