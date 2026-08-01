import { roadmapItems } from "../lib/sample-data";
import { roadmapStatusToCardStatus, STATUS_COLORS } from "../lib/status-colors";

export default function RoadmapPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">Roadmap</h1>
      <p className="mt-2 max-w-2xl text-base text-slate-600">
        Roadmap — the backlog laid out across sprints, showing what&apos;s planned, in
        progress, and done.
      </p>

      <ul className="mt-8 space-y-3">
        {roadmapItems.map((item) => {
          const colors = STATUS_COLORS[roadmapStatusToCardStatus(item.status)];
          return (
            <li
              key={item.title}
              className="flex items-start justify-between gap-4 rounded-lg bg-white p-4 shadow-sm"
            >
              <div>
                <h2 className="font-semibold text-slate-900">{item.title}</h2>
                <p className="mt-1 text-sm text-slate-600">{item.description}</p>
              </div>
              <span
                className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${colors.badge}`}
              >
                {item.status}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
