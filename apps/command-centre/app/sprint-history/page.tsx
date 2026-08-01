import { PageHeader } from "../components/PageHeader";
import { SampleDataNotice } from "../components/SampleDataNotice";
import { TaskSplitBar } from "../components/TaskSplitBar";
import { sprintHistory } from "../lib/sample-data";
import { roadmapStatusToCardStatus, STATUS_COLORS } from "../lib/status-colors";

export default function SprintHistoryPage() {
  return (
    <div>
      <PageHeader
        title="Sprint History"
        description="Sprint History — a record of completed sprints, what shipped in each, and how work was split between OpenClaw and Claude."
      />
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
              <TaskSplitBar openClawTasks={sprint.openClawTasks} claudeTasks={sprint.claudeTasks} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
