"use client";

import { useState } from "react";
import { Badge, Card } from "../ui";

type ReactionId = "vinegar-baking-soda" | "iron-oxygen" | "fuel-oxygen";
type VisualKind = "gas" | "colour-change" | "combustion";

interface ReactionPreset {
  id: ReactionId;
  label: string;
  wordEquation: string;
  sign: string;
  caption: string;
  visual: VisualKind;
}

const REACTIONS: ReactionPreset[] = [
  {
    id: "vinegar-baking-soda",
    label: "Vinegar + Baking Soda",
    wordEquation: "vinegar + baking soda -> carbon dioxide gas + water + sodium acetate",
    sign: "Gas produced",
    caption: "Watch the bubbles — a gas escaping is one of the clearest signs a reaction has happened.",
    visual: "gas",
  },
  {
    id: "iron-oxygen",
    label: "Iron + Oxygen",
    wordEquation: "iron + oxygen -> iron oxide (rust)",
    sign: "Colour change",
    caption: "Watch the colour shift from grey to reddish-brown — iron and oxygen have combined into rust.",
    visual: "colour-change",
  },
  {
    id: "fuel-oxygen",
    label: "Fuel + Oxygen",
    wordEquation: "fuel + oxygen -> carbon dioxide + water + energy (heat and light)",
    sign: "Temperature change / light produced",
    caption: "Watch the flame flicker — burning releases energy as heat and light.",
    visual: "combustion",
  },
];

const BUBBLE_OFFSETS = [10, 28, 46, 64, 82] as const;

function ReactionVisual({ visual }: { visual: VisualKind }) {
  if (visual === "gas") {
    return (
      <div
        className="relative h-32 w-full overflow-hidden rounded-lg border-2 border-info-200 bg-info-50 dark:border-info-900 dark:bg-zinc-900"
        role="img"
        aria-label="Bubbles of gas rising, showing a chemical reaction producing gas"
      >
        {BUBBLE_OFFSETS.map((left, i) => (
          <span
            key={left}
            className="absolute bottom-1 h-3 w-3 rounded-full bg-info-500"
            style={{
              left: `${left}%`,
              animationName: "bubble-rise",
              animationDuration: "1.6s",
              animationTimingFunction: "ease-out",
              animationIterationCount: "infinite",
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
      </div>
    );
  }

  if (visual === "colour-change") {
    return (
      <div
        className="flex h-32 w-full items-center justify-center rounded-lg border-2 border-warning-200 bg-white dark:border-warning-900 dark:bg-zinc-900"
        role="img"
        aria-label="A metal surface shifting colour from grey to reddish-brown as it rusts"
      >
        <span
          className="h-16 w-16 rounded-full"
          style={{
            animationName: "rust-shift",
            animationDuration: "3s",
            animationTimingFunction: "ease-in-out",
            animationIterationCount: "infinite",
          }}
        />
      </div>
    );
  }

  return (
    <div
      className="flex h-32 w-full items-center justify-center rounded-lg border-2 border-danger-200 bg-zinc-900"
      role="img"
      aria-label="A flame flickering, showing heat and light released by combustion"
    >
      <span
        className="h-14 w-10 rounded-t-full rounded-b-lg bg-gradient-to-t from-danger-600 via-warning-500 to-warning-300"
        style={{
          animationName: "flame-flicker",
          animationDuration: "0.9s",
          animationTimingFunction: "ease-in-out",
          animationIterationCount: "infinite",
          boxShadow: "0 0 24px 6px rgba(245, 158, 11, 0.5)",
        }}
      />
    </div>
  );
}

/**
 * Standalone, reusable reaction simulator (BL-046): tapping one of three
 * preset reactant pairs reveals its word equation, the sign of reaction it
 * demonstrates, and a small visual tied directly to that sign (bubbles for
 * gas, a colour-shifting circle for rusting, a flickering flame for
 * combustion). Takes no props — like AtomBuilder and PeriodicTableExplorer,
 * it needs no lesson-specific data to be dropped anywhere.
 */
export function ReactionSimulator() {
  const [selectedId, setSelectedId] = useState<ReactionId>(REACTIONS[0].id);
  const selected = REACTIONS.find((r) => r.id === selectedId) ?? REACTIONS[0];

  return (
    <Card tone="brand">
      <Badge tone="brand" icon="⚗️">
        Reaction Simulator
      </Badge>

      <div className="flex flex-wrap gap-2">
        {REACTIONS.map((reaction) => (
          <button
            key={reaction.id}
            type="button"
            onClick={() => setSelectedId(reaction.id)}
            aria-pressed={reaction.id === selectedId}
            className={`rounded-full border-2 px-4 py-2 text-label font-semibold transition-transform hover:scale-105 ${
              reaction.id === selectedId
                ? "border-brand-600 bg-brand-100 text-brand-800 dark:border-brand-400 dark:bg-brand-900 dark:text-brand-200"
                : "border-zinc-200 bg-white/60 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-200"
            }`}
          >
            {reaction.label}
          </button>
        ))}
      </div>

      <ReactionVisual visual={selected.visual} />

      <div aria-live="polite" className="flex flex-col gap-1">
        <p data-testid="word-equation" className="text-body font-bold text-zinc-900 dark:text-zinc-50">
          {selected.wordEquation}
        </p>
        <p className="text-label text-zinc-600 dark:text-zinc-300">
          Sign of reaction: <span data-testid="reaction-sign" className="font-semibold">{selected.sign}</span>
        </p>
        <p className="text-label text-zinc-600 dark:text-zinc-300">{selected.caption}</p>
      </div>
    </Card>
  );
}
