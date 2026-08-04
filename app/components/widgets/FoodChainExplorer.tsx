"use client";

import { useState } from "react";
import { Badge, Card } from "../ui";

interface TrophicLevel {
  id: string;
  name: string;
  role: string;
  example: string;
  /** Percent of the previous level's energy that reaches this level; null for Producer, which has no previous step. */
  energyPct: number | null;
}

const LEVELS: TrophicLevel[] = [
  {
    id: "producer",
    name: "Producer",
    role: "Makes its own food using energy captured from sunlight.",
    example: "Grass",
    energyPct: null,
  },
  {
    id: "primary-consumer",
    name: "Primary Consumer",
    role: "Eats producers to get energy.",
    example: "Rabbit",
    energyPct: 10,
  },
  {
    id: "secondary-consumer",
    name: "Secondary Consumer",
    role: "Eats primary consumers to get energy.",
    example: "Fox",
    energyPct: 10,
  },
  {
    id: "decomposer",
    name: "Decomposer",
    role: "Breaks down dead organisms and waste, returning nutrients to the soil.",
    example: "Fungi and bacteria",
    energyPct: 10,
  },
];

/**
 * Shows the "most energy is lost at each step" point visually rather than
 * just in text: a full-width bar for the previous level next to a bar
 * shrunk to the actual passed-on percentage, so the loss is seen, not just
 * read. Producer has no previous step, so it gets its own "energy enters
 * here" visual instead of a comparison.
 */
function EnergyFlowVisual({ level, previousName }: { level: TrophicLevel; previousName: string }) {
  if (level.energyPct === null) {
    return (
      <div
        className="flex h-16 w-full items-center justify-center rounded-lg border-2 border-success-200 bg-success-50 dark:border-success-900 dark:bg-success-950"
        role="img"
        aria-label="Producers capture energy directly from sunlight, the starting point of the food chain."
      >
        <span className="text-label font-semibold text-success-800 dark:text-success-200">
          ☀️ Energy enters the food chain here
        </span>
      </div>
    );
  }

  const lostPct = 100 - level.energyPct;

  return (
    <div
      className="flex flex-col gap-2 rounded-lg border-2 border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900"
      role="img"
      aria-label={`Energy bar shrinks to about ${level.energyPct}% of the ${previousName}'s energy — the rest is lost as heat.`}
    >
      <div className="flex flex-col gap-1">
        <span className="text-label text-zinc-500 dark:text-zinc-400">
          Energy in the {previousName.toLowerCase()}
        </span>
        <div className="h-4 w-full rounded-full bg-warning-400" />
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-label text-zinc-500 dark:text-zinc-400">
          Energy passed on (~{level.energyPct}%) — ~{lostPct}% lost as heat
        </span>
        <div
          className="h-4 rounded-full bg-warning-400"
          style={{ width: `${level.energyPct}%` }}
        />
      </div>
    </div>
  );
}

/**
 * Standalone, reusable "tap to reveal" food chain explorer (BL-051): tapping
 * a trophic level reveals its role, an example organism, and a visual
 * showing how much of the previous level's energy actually reaches it —
 * directly correcting the "energy fully transfers" misconception. Takes no
 * props, like BodySystemExplorer and EnergyTransformationExplorer.
 */
export function FoodChainExplorer() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = LEVELS[selectedIndex];
  const previous = selectedIndex > 0 ? LEVELS[selectedIndex - 1] : undefined;

  return (
    <Card tone="success">
      <Badge tone="success" icon="🦊">
        Food Chain Explorer
      </Badge>

      <div className="flex flex-wrap gap-2">
        {LEVELS.map((level, index) => {
          const isSelected = level.id === selected.id;
          return (
            <button
              key={level.id}
              type="button"
              onClick={() => setSelectedIndex(index)}
              aria-pressed={isSelected}
              className={`rounded-full border-2 px-4 py-2 text-label font-semibold transition-transform hover:scale-105 ${
                isSelected
                  ? "border-success-600 bg-success-100 text-success-800 dark:border-success-400 dark:bg-success-900 dark:text-success-200"
                  : "border-zinc-200 bg-white/60 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-200"
              }`}
            >
              {level.name}
            </button>
          );
        })}
      </div>

      <EnergyFlowVisual level={selected} previousName={previous?.name ?? ""} />

      <div aria-live="polite" className="flex flex-col gap-1">
        <p className="text-body text-zinc-700 dark:text-zinc-200">
          <span data-testid="level-name" className="font-bold">
            {selected.name}
          </span>{" "}
          · <span data-testid="level-example">{selected.example}</span>
        </p>
        <p data-testid="level-role" className="text-label text-zinc-600 dark:text-zinc-300">
          {selected.role}
        </p>
        <p data-testid="energy-note" className="text-label text-zinc-600 dark:text-zinc-300">
          {selected.energyPct === null
            ? "Producers don't receive energy from a previous step — they capture it directly from sunlight."
            : `Only about ${selected.energyPct}% of the energy in the ${previous?.name.toLowerCase()} passes on to the ${selected.name.toLowerCase()}. The rest is lost as heat.`}
        </p>
      </div>
    </Card>
  );
}
