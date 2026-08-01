import { PageHeader } from "../components/PageHeader";
import { SampleDataNotice } from "../components/SampleDataNotice";
import { releases } from "../lib/sample-data";
import { releaseStatusToCardStatus, STATUS_COLORS } from "../lib/status-colors";

export default function ReleaseCentrePage() {
  return (
    <div>
      <PageHeader
        title="Release Centre"
        description="Release Centre — tracks what has been built, reviewed, merged, and deployed, and what is still pending release."
      />
      <SampleDataNotice />

      <ul className="mt-8 space-y-3">
        {releases.map((release) => {
          const colors = STATUS_COLORS[releaseStatusToCardStatus(release.status)];
          return (
            <li
              key={release.name}
              className="flex items-start justify-between gap-4 rounded-lg bg-white p-4 shadow-sm"
            >
              <div>
                <h2 className="font-semibold text-slate-900">{release.name}</h2>
                <p className="mt-1 text-sm text-slate-600">{release.description}</p>
                <p className="mt-2 text-xs text-slate-500">{release.urlNote}</p>
              </div>
              <span
                className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${colors.badge}`}
              >
                {release.status}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
