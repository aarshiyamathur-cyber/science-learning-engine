export interface TaskSplitBarProps {
  openClawTasks: number;
  claudeTasks: number;
}

/**
 * Two-segment horizontal bar showing the OpenClaw/Claude task split for a
 * sprint at a glance, alongside the existing text summary.
 */
export function TaskSplitBar({ openClawTasks, claudeTasks }: TaskSplitBarProps) {
  const total = openClawTasks + claudeTasks;
  const openClawPercent = total === 0 ? 0 : (openClawTasks / total) * 100;
  const claudePercent = total === 0 ? 0 : 100 - openClawPercent;

  return (
    <div
      role="img"
      aria-label={`${openClawTasks} OpenClaw / ${claudeTasks} Claude`}
      className="mt-2 flex h-2 w-full overflow-hidden rounded-full bg-slate-100"
    >
      {openClawTasks > 0 && (
        <div className="bg-slate-700" style={{ width: `${openClawPercent}%` }} />
      )}
      {claudeTasks > 0 && (
        <div className="bg-emerald-500" style={{ width: `${claudePercent}%` }} />
      )}
    </div>
  );
}
