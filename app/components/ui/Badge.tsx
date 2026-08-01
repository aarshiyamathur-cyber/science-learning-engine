import type { ReactNode } from "react";
import { TONE_CLASSES, type Tone } from "./tone";

interface BadgeProps {
  tone?: Tone;
  icon?: ReactNode;
  children: ReactNode;
}

export function Badge({ tone = "neutral", icon, children }: BadgeProps) {
  return (
    <span
      className={`inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-label font-semibold ${TONE_CLASSES[tone].badge}`}
    >
      {icon && <span aria-hidden>{icon}</span>}
      {children}
    </span>
  );
}
