"use client";

import { useState } from "react";
import { Badge, Card } from "../ui";

type ScenarioId = "torch" | "pendulum" | "hand-rub";

interface ScenarioPreset {
  id: ScenarioId;
  label: string;
  chain: string[];
  caption: string;
}

const SCENARIOS: ScenarioPreset[] = [
  {
    id: "torch",
    label: "Torch",
    chain: ["Chemical energy (battery)", "Electrical energy", "Light energy + heat"],
    caption:
      "The battery's stored chemical energy becomes electricity, then light — with some always escaping as heat.",
  },
  {
    id: "pendulum",
    label: "Swinging pendulum",
    chain: ["Gravitational potential energy (at the top)", "Kinetic energy (at the bottom)"],
    caption:
      "As the pendulum swings, energy shifts between potential and kinetic — but the total amount never changes.",
  },
  {
    id: "hand-rub",
    label: "Rubbing your hands together",
    chain: ["Kinetic energy (moving hands)", "Heat (thermal energy)"],
    caption: "The energy of your moving hands doesn't disappear — it's transformed into heat you can feel.",
  },
];

function ChainVisual({ chain }: { chain: string[] }) {
  return (
    <div
      className="flex flex-wrap items-center gap-2 rounded-lg border-2 border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900"
      role="img"
      aria-label={`Energy transformation chain: ${chain.join(" to ")}`}
    >
      {chain.map((stage, i) => (
        <span key={stage} className="flex items-center gap-2">
          <span className="rounded-full border-2 border-brand-300 bg-white px-3 py-1.5 text-label font-semibold text-brand-800 dark:border-brand-700 dark:bg-zinc-950 dark:text-brand-200">
            {stage}
          </span>
          {i < chain.length - 1 && (
            <span aria-hidden className="text-lg font-bold text-zinc-400 dark:text-zinc-600">
              →
            </span>
          )}
        </span>
      ))}
    </div>
  );
}

/**
 * The pendulum's potential and kinetic bars animate on the same cycle but a
 * quarter-period out of phase (see pendulum-* keyframes), so their heights
 * visibly trade off as the bob swings — making conservation of energy
 * visible rather than just stated in the caption.
 */
function PendulumVisual() {
  return (
    <div
      className="flex h-32 w-full items-end justify-center gap-6 rounded-lg border-2 border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900"
      role="img"
      aria-label="A pendulum swinging back and forth, with a potential energy bar and a kinetic energy bar that trade height as it swings"
    >
      <div className="flex flex-col items-center gap-1">
        <div className="flex h-20 w-6 items-end overflow-hidden rounded-t-md bg-zinc-200 dark:bg-zinc-800">
          <div
            className="h-full w-full origin-bottom rounded-t-md bg-warning-500"
            style={{
              animationName: "pendulum-potential-bar",
              animationDuration: "2.4s",
              animationTimingFunction: "ease-in-out",
              animationIterationCount: "infinite",
            }}
          />
        </div>
        <span className="text-label font-semibold text-zinc-600 dark:text-zinc-300">Potential</span>
      </div>

      <div className="flex h-20 w-16 items-start justify-center">
        <div
          className="h-16 w-0.5 origin-top bg-zinc-400 dark:bg-zinc-500"
          style={{
            animationName: "pendulum-swing",
            animationDuration: "2.4s",
            animationTimingFunction: "ease-in-out",
            animationIterationCount: "infinite",
          }}
        >
          <span className="-ml-1.5 block h-4 w-4 rounded-full bg-brand-600 dark:bg-brand-400" />
        </div>
      </div>

      <div className="flex flex-col items-center gap-1">
        <div className="flex h-20 w-6 items-end overflow-hidden rounded-t-md bg-zinc-200 dark:bg-zinc-800">
          <div
            className="h-full w-full origin-bottom rounded-t-md bg-info-500"
            style={{
              animationName: "pendulum-kinetic-bar",
              animationDuration: "2.4s",
              animationTimingFunction: "ease-in-out",
              animationIterationCount: "infinite",
            }}
          />
        </div>
        <span className="text-label font-semibold text-zinc-600 dark:text-zinc-300">Kinetic</span>
      </div>
    </div>
  );
}

/**
 * Standalone, reusable energy transformation explorer (BL-048): tapping one
 * of three preset everyday scenarios reveals its energy transformation
 * chain, a caption reinforcing that energy is transformed rather than
 * destroyed, and a visual — connected chain badges for torch and hand
 * rubbing, an animated swinging bob with trading potential/kinetic bars for
 * the pendulum. Takes no props, like ReactionSimulator and
 * ForceFrictionSimulator, so it can be dropped into any lesson without
 * lesson-specific data.
 */
export function EnergyTransformationExplorer() {
  const [selectedId, setSelectedId] = useState<ScenarioId>(SCENARIOS[0].id);
  const selected = SCENARIOS.find((s) => s.id === selectedId) ?? SCENARIOS[0];

  return (
    <Card tone="brand">
      <Badge tone="brand" icon="⚡">
        Energy Transformation Explorer
      </Badge>

      <div className="flex flex-wrap gap-2">
        {SCENARIOS.map((scenario) => (
          <button
            key={scenario.id}
            type="button"
            onClick={() => setSelectedId(scenario.id)}
            aria-pressed={scenario.id === selectedId}
            className={`rounded-full border-2 px-4 py-2 text-label font-semibold transition-transform hover:scale-105 ${
              scenario.id === selectedId
                ? "border-brand-600 bg-brand-100 text-brand-800 dark:border-brand-400 dark:bg-brand-900 dark:text-brand-200"
                : "border-zinc-200 bg-white/60 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-200"
            }`}
          >
            {scenario.label}
          </button>
        ))}
      </div>

      {selected.id === "pendulum" ? <PendulumVisual /> : <ChainVisual chain={selected.chain} />}

      <div aria-live="polite" className="flex flex-col gap-1">
        <p data-testid="energy-chain" className="text-body font-bold text-zinc-900 dark:text-zinc-50">
          {selected.chain.join(" → ")}
        </p>
        <p data-testid="scenario-caption" className="text-label text-zinc-600 dark:text-zinc-300">
          {selected.caption}
        </p>
      </div>
    </Card>
  );
}
