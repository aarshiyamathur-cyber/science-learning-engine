"use client";

import { useState } from "react";
import { Button } from "../ui";

type MatterState = "solid" | "liquid" | "gas";

/** Hand-placed layouts (percent within the container) — deterministic, no per-render randomness. */
const POSITIONS: Record<MatterState, { x: number; y: number }[]> = {
  solid: [
    { x: 20, y: 25 },
    { x: 40, y: 25 },
    { x: 60, y: 25 },
    { x: 80, y: 25 },
    { x: 20, y: 50 },
    { x: 40, y: 50 },
    { x: 60, y: 50 },
    { x: 80, y: 50 },
    { x: 20, y: 75 },
    { x: 40, y: 75 },
    { x: 60, y: 75 },
    { x: 80, y: 75 },
  ],
  liquid: [
    { x: 30, y: 35 },
    { x: 45, y: 25 },
    { x: 60, y: 30 },
    { x: 70, y: 40 },
    { x: 25, y: 55 },
    { x: 40, y: 60 },
    { x: 55, y: 65 },
    { x: 68, y: 58 },
    { x: 35, y: 75 },
    { x: 50, y: 78 },
    { x: 65, y: 72 },
    { x: 50, y: 45 },
  ],
  gas: [
    { x: 10, y: 15 },
    { x: 35, y: 10 },
    { x: 60, y: 12 },
    { x: 85, y: 18 },
    { x: 15, y: 40 },
    { x: 45, y: 35 },
    { x: 75, y: 42 },
    { x: 90, y: 50 },
    { x: 12, y: 70 },
    { x: 40, y: 75 },
    { x: 68, y: 80 },
    { x: 88, y: 85 },
  ],
};

const STATE_META: Record<
  MatterState,
  { label: string; caption: string; animationName: string; animationDuration: string }
> = {
  solid: {
    label: "Solid",
    caption: "Particles are packed tightly and only vibrate in place.",
    animationName: "particle-jitter-solid",
    animationDuration: "2s",
  },
  liquid: {
    label: "Liquid",
    caption: "Particles stay close together but slide and drift past each other.",
    animationName: "particle-jitter-liquid",
    animationDuration: "1.4s",
  },
  gas: {
    label: "Gas",
    caption: "Particles spread far apart and move quickly in every direction.",
    animationName: "particle-jitter-gas",
    animationDuration: "0.6s",
  },
};

/**
 * Reusable, generic states-of-matter simulator (BL-027, Sprint 4). Tapping a
 * state re-arranges and re-animates a fixed set of particles — a learner-
 * initiated interaction, not an autoplay animation. Takes no lesson-specific
 * props: the three states of matter are inherent to what this widget is,
 * the same way a Button component inherently has a small fixed set of
 * variants rather than being infinitely configurable.
 */
export function ParticleStateExplorer() {
  const [state, setState] = useState<MatterState>("solid");
  const meta = STATE_META[state];

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-2">
        {(Object.keys(STATE_META) as MatterState[]).map((s) => (
          <Button
            key={s}
            variant="solid"
            tone={s === state ? "accent" : "neutral"}
            onClick={() => setState(s)}
          >
            {STATE_META[s].label}
          </Button>
        ))}
      </div>

      <div className="relative h-48 w-full overflow-hidden rounded-lg border-2 border-accent-200 bg-white dark:border-accent-900 dark:bg-zinc-900">
        {POSITIONS[state].map((pos, i) => (
          <span
            key={i}
            className="absolute h-3 w-3 rounded-full bg-accent-500 transition-[left,top] duration-700 ease-in-out"
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              animationName: meta.animationName,
              animationDuration: meta.animationDuration,
              animationTimingFunction: "ease-in-out",
              animationIterationCount: "infinite",
              animationDelay: `${(i % 4) * 0.12}s`,
            }}
          />
        ))}
      </div>

      <p className="text-label text-zinc-600 dark:text-zinc-300">{meta.caption}</p>
    </div>
  );
}
