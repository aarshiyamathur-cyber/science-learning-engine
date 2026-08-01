interface ProgressBarProps {
  /** 0..1 */
  value: number;
  label?: (pct: number) => string;
}

export function ProgressBar({ value, label }: ProgressBarProps) {
  const pct = Math.round(Math.max(0, Math.min(1, value)) * 100);
  return (
    <div className="flex flex-col gap-1">
      <div className="h-3 w-full overflow-hidden rounded-full bg-white/60 dark:bg-zinc-800">
        <div
          className="h-full rounded-full bg-gradient-to-r from-brand-400 to-success-500 transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="text-label font-medium text-brand-900 dark:text-brand-200">
        {label ? label(pct) : `${pct}% mastered`}
      </p>
    </div>
  );
}
