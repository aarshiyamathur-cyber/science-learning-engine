"use client";

import { useState } from "react";
import { Badge, Card } from "../ui";

interface TrophicLevel {
  id: string;
  name: string;
  role: string;
  example: string;
  /**
   * Percent of the previous level's energy that reaches this level via
   * predation; null for Producer (captures energy directly from sunlight,
   * no previous step) and Decomposer (breaks down dead matter from every
   * level of the chain, not a single 10%-transfer step from the level
   * before it).
   */
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
    energyPct: null,
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
  if (level.id === "producer") {
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

  if (level.id === "decomposer") {
    return (
      <div
        className="flex h-16 w-full items-center justify-center rounded-lg border-2 border-zinc-200 bg-zinc-50 p-4 text-center dark:border-zinc-800 dark:bg-zinc-900"
        role="img"
        aria-label="Decomposers break down dead matter from every level of the food chain, not just one step before them, and return nutrients to the soil."
      >
        <span className="text-label font-semibold text-zinc-700 dark:text-zinc-200">
          ♻️ Breaks down dead matter from every level, returning nutrients to the soil
        </span>
      </div>
    );
  }

  const energyPct = level.energyPct as number;
  const lostPct = 100 - energyPct;

  return (
    <div
      className="flex flex-col gap-2 rounded-lg border-2 border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900"
      role="img"
      aria-label={`Energy bar shrinks to about ${energyPct}% of the ${previousName}'s energy — the rest is lost as heat.`}
    >
      <div className="flex flex-col gap-1">
        <span className="text-label text-zinc-500 dark:text-zinc-400">
          Energy in the {previousName.toLowerCase()}
        </span>
        <div className="h-4 w-full rounded-full bg-warning-500" />
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-label text-zinc-500 dark:text-zinc-400">
          Energy passed on (~{energyPct}%) — ~{lostPct}% lost as heat
        </span>
        <div
          className="h-4 rounded-full bg-warning-500"
          style={{ width: `${energyPct}%` }}
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
          {selected.id === "producer"
            ? "Producers don't receive energy from a previous step — they capture it directly from sunlight."
            : selected.id === "decomposer"
              ? "Decomposers break down dead matter from every level of the food chain — not just the level before them — recycling nutrients back into the soil."
              : `Only about ${selected.energyPct}% of the energy in the ${previous?.name.toLowerCase()} passes on to the ${selected.name.toLowerCase()}. The rest is lost as heat.`}
        </p>
      </div>
    </Card>
  );
}
