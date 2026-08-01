import type { ReactNode } from "react";
import { TONE_CLASSES, type Tone } from "./tone";

interface CardProps {
  tone?: Tone;
  className?: string;
  children: ReactNode;
}

export function Card({ tone = "neutral", className = "", children }: CardProps) {
  return (
    <div
      className={`flex flex-col gap-4 rounded-2xl border-2 p-6 shadow-md ${TONE_CLASSES[tone].card} ${className}`}
    >
      {children}
    </div>
  );
}
