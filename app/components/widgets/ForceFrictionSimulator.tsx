"use client";

import { useState, type CSSProperties } from "react";
import { Badge, Card } from "../ui";

type SurfaceId = "ice" | "wood-floor" | "rough-carpet";

interface SurfacePreset {
  id: SurfaceId;
  label: string;
  frictionLevel: string;
  /** How far (px) the block slides before friction stops it — inversely
   * related to how strongly the surface opposes motion. */
  slideDistance: number;
  caption: string;
}

const SURFACES: SurfacePreset[] = [
  {
    id: "ice",
    label: "Ice",
    frictionLevel: "Low friction",
    slideDistance: 210,
    caption:
      "Ice barely opposes the block's motion, so it keeps sliding a long way before friction finally stops it.",
  },
  {
    id: "wood-floor",
    label: "Wood floor",
    frictionLevel: "Medium friction",
    slideDistance: 105,
    caption:
      "A wood floor opposes the block's motion more than ice does, so it slides a moderate distance before stopping.",
  },
  {
    id: "rough-carpet",
    label: "Rough carpet",
    frictionLevel: "High friction",
    slideDistance: 24,
    caption:
      "Rough carpet strongly opposes the block's motion, so it stops almost immediately after being pushed.",
  },
];

/**
 * Standalone, reusable friction simulator (BL-047): tapping one of three
 * preset surfaces "pushes" a block across it, sliding a distance tied
 * directly to how much friction opposes it — far on ice, barely at all on
 * rough carpet — alongside its friction level and a caption. Takes no
 * props, like ReactionSimulator and ParticleStateExplorer, so it can be
 * dropped into any lesson without lesson-specific data.
 */
export function ForceFrictionSimulator() {
  const [selectedId, setSelectedId] = useState<SurfaceId>(SURFACES[0].id);
  const [pushCount, setPushCount] = useState(0);
  const selected = SURFACES.find((s) => s.id === selectedId) ?? SURFACES[0];
  const pushKey = `${selectedId}-${pushCount}`;

  function handlePush(id: SurfaceId) {
    setSelectedId(id);
    setPushCount((n) => n + 1);
  }

  return (
    <Card tone="brand">
      <Badge tone="brand" icon="🧊">
        Friction Simulator
      </Badge>

      <div className="flex flex-wrap gap-2">
        {SURFACES.map((surface) => (
          <button
            key={surface.id}
            type="button"
            onClick={() => handlePush(surface.id)}
            aria-pressed={surface.id === selectedId}
            className={`rounded-full border-2 px-4 py-2 text-label font-semibold transition-transform hover:scale-105 ${
              surface.id === selectedId
                ? "border-brand-600 bg-brand-100 text-brand-800 dark:border-brand-400 dark:bg-brand-900 dark:text-brand-200"
                : "border-zinc-200 bg-white/60 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-200"
            }`}
          >
            {surface.label}
          </button>
        ))}
      </div>

      <div
        className="relative h-24 w-full overflow-hidden rounded-lg border-2 border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900"
        role="img"
        aria-label={`A block pushed across ${selected.label.toLowerCase()}, showing ${selected.frictionLevel.toLowerCase()}`}
      >
        <span
          key={`push-label-${pushKey}`}
          className="absolute top-2 left-2 text-label font-bold text-brand-700 dark:text-brand-300"
          style={{
            animationName: "push-pulse",
            animationDuration: "0.9s",
            animationTimingFunction: "ease-out",
          }}
        >
          Push!
        </span>
        <span
          key={`block-${pushKey}`}
          className="absolute top-1/2 left-3 h-8 w-8 -translate-y-1/2 rounded-md bg-brand-600 dark:bg-brand-400"
          style={
            {
              "--slide-distance": `${selected.slideDistance}px`,
              animationName: "friction-slide",
              animationDuration: "0.9s",
              animationTimingFunction: "ease-out",
              animationFillMode: "forwards",
            } as CSSProperties
          }
        />
      </div>

      <div aria-live="polite" className="flex flex-col gap-1">
        <p className="text-label text-zinc-600 dark:text-zinc-300">
          Friction level:{" "}
          <span data-testid="friction-level" className="font-semibold">
            {selected.frictionLevel}
          </span>
        </p>
        <p data-testid="surface-caption" className="text-label text-zinc-600 dark:text-zinc-300">
          {selected.caption}
        </p>
      </div>
    </Card>
  );
}
