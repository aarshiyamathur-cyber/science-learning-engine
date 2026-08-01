import type { CardStatus } from "../lib/sample-data";
import { STATUS_COLORS } from "../lib/status-colors";

export interface ProgressCardProps {
  label: string;
  value: string | number;
  status?: CardStatus;
}

export function ProgressCard({ label, value, status = "neutral" }: ProgressCardProps) {
  const colors = STATUS_COLORS[status];

  return (
    <div
      className={`rounded-lg border-l-4 bg-white p-4 shadow-sm ${colors.accent}`}
    >
      <div className="text-sm font-medium text-slate-500">{label}</div>
      <div className="mt-1 text-2xl font-bold tracking-tight text-slate-900">{value}</div>
    </div>
  );
}
