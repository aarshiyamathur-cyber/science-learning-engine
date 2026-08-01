import { ProgressCard } from "./components/ProgressCard";
import { SampleDataNotice } from "./components/SampleDataNotice";
import { blockers, programStatus, progressMetrics } from "./lib/sample-data";

export default function ExecutiveDashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">
        Executive Dashboard
      </h1>
      <p className="mt-2 max-w-2xl text-base text-slate-600">
        Executive Dashboard — high-level program status at a glance: current sprint,
        automation ratio, and what&apos;s blocking.
      </p>
      <SampleDataNotice />

      <section className="mt-8">
        <h2 className="text-lg font-semibold text-slate-900">{programStatus.initiativeName}</h2>
        <p className="mt-1 text-sm text-slate-600">{programStatus.statusSummary}</p>
      </section>

      <section className="mt-8">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Key Metrics
        </h2>
        <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {progressMetrics.map((metric) => (
            <ProgressCard
              key={metric.label}
              label={metric.label}
              value={metric.value}
              status={metric.status}
            />
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          What&apos;s Blocking
        </h2>
        <div className="mt-3 rounded-lg bg-white p-4 shadow-sm">
          {blockers.length === 0 ? (
            <p className="text-sm text-slate-600">No blockers.</p>
          ) : (
            <ul className="space-y-2">
              {blockers.map((blocker) => (
                <li key={blocker.title} className="text-sm text-slate-700">
                  <span className="font-medium text-slate-900">{blocker.title}:</span>{" "}
                  {blocker.detail}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}
