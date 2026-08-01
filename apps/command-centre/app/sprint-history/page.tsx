import { SampleDataNotice } from "../components/SampleDataNotice";
import { sprintHistory } from "../lib/sample-data";
import { roadmapStatusToCardStatus, STATUS_COLORS } from "../lib/status-colors";

export default function SprintHistoryPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">Sprint History</h1>
      <p className="mt-2 max-w-2xl text-base text-slate-600">
        Sprint History — a record of completed sprints, what shipped in each, and how
        work was split between OpenClaw and Claude.
      </p>
      <SampleDataNotice />

      <ul className="mt-8 space-y-3">
        {sprintHistory.map((sprint) => {
          const colors = STATUS_COLORS[roadmapStatusToCardStatus(sprint.status)];
          return (
            <li key={sprint.name} className="rounded-lg bg-white p-4 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-semibold text-slate-900">{sprint.name}</h2>
                  <p className="text-sm text-slate-500">{sprint.dateRange}</p>
                </div>
                <span
                  className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${colors.badge}`}
                >
                  {sprint.status}
                </span>
              </div>
              <p className="mt-2 text-sm text-slate-600">{sprint.summary}</p>
              <p className="mt-2 text-sm font-medium text-slate-700">
                {sprint.openClawTasks} OpenClaw / {sprint.claudeTasks} Claude
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
