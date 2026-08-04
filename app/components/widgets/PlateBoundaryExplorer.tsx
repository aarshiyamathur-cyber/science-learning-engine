"use client";

import { useState } from "react";
import { Badge, Card } from "../ui";

type BoundaryId = "convergent" | "divergent" | "transform";

interface Boundary {
  id: BoundaryId;
  name: string;
  icon: string;
  color: string;
  movement: string;
  effect: string;
  example: string;
}

const BOUNDARIES: Boundary[] = [
  {
    id: "convergent",
    name: "Convergent (Colliding)",
    icon: "🏔️",
    color: "#e11d48", // rose-600 (danger)
    movement: "Two plates push toward each other.",
    effect: "Pushes up mountains, or forces one plate under the other — often producing volcanoes.",
    example: "The Himalayas are still rising as the India and Eurasia plates collide.",
  },
  {
    id: "divergent",
    name: "Divergent (Separating)",
    icon: "🌊",
    color: "#0ea5e9", // sky-500 (info)
    movement: "Two plates pull apart from each other.",
    effect: "New crust forms in the gap between them, sometimes with volcanic activity.",
    example: "The Mid-Atlantic Ridge is new ocean floor forming as plates spread apart.",
  },
  {
    id: "transform",
    name: "Transform (Sliding Past)",
    icon: "⚡",
    color: "#d97706", // amber-600 (warning)
    movement: "Two plates slide past each other in opposite directions.",
    effect: "Mainly causes earthquakes, with little to no volcanic activity.",
    example: "California's San Andreas Fault is a transform boundary that causes earthquakes.",
  },
];

/**
 * Two "plate" blocks with an arrow pair whose direction matches the
 * boundary's movement — showing the collision/separation/slide visually,
 * not just naming it, so the "every boundary is the same" misconception
 * has something concrete to contrast against.
 */
function BoundaryVisual({ boundary }: { boundary: Boundary }) {
  const arrows: Record<BoundaryId, { left: string; right: string; label: string }> = {
    convergent: { left: "→", right: "←", label: "The two plates move toward each other." },
    divergent: { left: "←", right: "→", label: "The two plates move apart from each other." },
    transform: { left: "↑", right: "↓", label: "The two plates slide past each other in opposite directions." },
  };
  const { left, right, label } = arrows[boundary.id];

  return (
    <div
      className="flex h-20 w-full items-center justify-center gap-1 rounded-lg border-2 border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900"
      role="img"
      aria-label={label}
    >
      <div
        className="flex h-14 flex-1 items-center justify-center rounded-md text-2xl font-bold text-white"
        style={{ backgroundColor: boundary.color }}
      >
        {left}
      </div>
      <div
        className="flex h-14 flex-1 items-center justify-center rounded-md text-2xl font-bold text-white"
        style={{ backgroundColor: boundary.color }}
      >
        {right}
      </div>
    </div>
  );
}

/**
 * Standalone, reusable "tap to reveal" widget (BL-053): tapping one of the
 * three plate boundary types reveals a distinct visual (arrow directions
 * matching the plates' motion) plus its movement and effect, directly
 * correcting the "every boundary produces the same effect" misconception.
 * Takes no props, like InheritanceExplorer and FoodChainExplorer.
 */
export function PlateBoundaryExplorer() {
  const [selectedId, setSelectedId] = useState<BoundaryId>(BOUNDARIES[0].id);
  const selected = BOUNDARIES.find((boundary) => boundary.id === selectedId) ?? BOUNDARIES[0];

  return (
    <Card tone="brand">
      <Badge tone="brand" icon="🌍">
        Plate Boundary Explorer
      </Badge>

      <div className="flex flex-wrap gap-2">
        {BOUNDARIES.map((boundary) => {
          const isSelected = boundary.id === selected.id;
          return (
            <button
              key={boundary.id}
              type="button"
              onClick={() => setSelectedId(boundary.id)}
              aria-pressed={isSelected}
              className={`flex flex-1 flex-col items-center justify-center gap-1 rounded-lg border-2 p-3 text-center transition-transform hover:scale-105 ${
                isSelected ? "border-zinc-900 dark:border-zinc-50" : "border-zinc-200 dark:border-zinc-800"
              }`}
              style={{ backgroundColor: `${boundary.color}1a` }}
            >
              <span aria-hidden className="text-2xl">
                {boundary.icon}
              </span>
              <span className="text-label font-semibold text-zinc-900 dark:text-zinc-50">
                {boundary.name}
              </span>
            </button>
          );
        })}
      </div>

      <BoundaryVisual boundary={selected} />

      <div
        aria-live="polite"
        className="flex flex-col gap-2 rounded-lg border-2 p-4"
        style={{ backgroundColor: `${selected.color}1a`, borderColor: selected.color }}
      >
        <p className="text-body text-zinc-700 dark:text-zinc-200">
          <span data-testid="boundary-name" className="font-bold" style={{ color: selected.color }}>
            {selected.name}
          </span>
        </p>
        <p data-testid="boundary-movement" className="text-label text-zinc-600 dark:text-zinc-300">
          {selected.movement}
        </p>
        <p data-testid="boundary-effect" className="text-label font-semibold text-zinc-700 dark:text-zinc-200">
          {selected.effect}
        </p>
        <p data-testid="boundary-example" className="text-label text-zinc-600 dark:text-zinc-300">
          {selected.example}
        </p>
      </div>
    </Card>
  );
}
