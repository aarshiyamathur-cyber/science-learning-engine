import { PageHeader } from "./components/PageHeader";
import { ProgressCard } from "./components/ProgressCard";
import { SampleDataNotice } from "./components/SampleDataNotice";
import { Section } from "./components/Section";
import { blockers, programStatus, progressMetrics } from "./lib/sample-data";

export default function ExecutiveDashboardPage() {
  return (
    <div>
      <PageHeader
        title="Executive Dashboard"
        description="Executive Dashboard — high-level program status at a glance: current sprint, automation ratio, and what's blocking."
      />
      <SampleDataNotice />

      <section className="mt-8">
        <h2 className="text-lg font-semibold text-slate-900">{programStatus.initiativeName}</h2>
        <p className="mt-1 text-sm text-slate-600">{programStatus.statusSummary}</p>
      </section>

      <Section title="Key Metrics">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {progressMetrics.map((metric) => (
            <ProgressCard
              key={metric.label}
              label={metric.label}
              value={metric.value}
              status={metric.status}
            />
          ))}
        </div>
      </Section>

      <Section title="What's Blocking">
        <div className="rounded-lg bg-white p-4 shadow-sm">
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
      </Section>
    </div>
  );
}
