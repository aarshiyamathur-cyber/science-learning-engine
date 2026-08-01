"use client";

import { useState } from "react";
import { Badge, Button, Card } from "../ui";
import type { Tone } from "../ui/tone";

const PROTON_COLOR = "#f43f5e"; // rose-500, matches tone="danger"
const NEUTRON_COLOR = "#a1a1aa"; // zinc-400, matches tone="neutral"
const ELECTRON_COLOR = "#0ea5e9"; // sky-500, matches tone="info"

const VIEWBOX_SIZE = 240;
const CENTER = VIEWBOX_SIZE / 2;
const NUCLEON_RADIUS = 5;
const ELECTRON_RADIUS = 4;
const SHELL_RADII = [40, 64, 88] as const;
const SHELL_CAPACITY = [2, 8] as const; // shell 1 max 2, shell 2 max 8, remainder into shell 3

/** Packs nucleons into a roughly circular cluster using a sunflower spiral, so any count avoids overlap. */
function nucleonPositions(count: number, packRadius: number): { x: number; y: number }[] {
  const positions: { x: number; y: number }[] = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const r = packRadius * Math.sqrt((i + 0.5) / count);
    const angle = i * goldenAngle;
    positions.push({ x: r * Math.cos(angle), y: r * Math.sin(angle) });
  }
  return positions;
}

/** Simplified shell filling for a Year 7-10 audience: 2, then 8, then everything else. */
function shellElectronCounts(electronCount: number): [number, number, number] {
  const shell1 = Math.min(electronCount, SHELL_CAPACITY[0]);
  const shell2 = Math.min(Math.max(electronCount - SHELL_CAPACITY[0], 0), SHELL_CAPACITY[1]);
  const shell3 = Math.max(electronCount - SHELL_CAPACITY[0] - SHELL_CAPACITY[1], 0);
  return [shell1, shell2, shell3];
}

function shellDotPositions(count: number, radius: number): { x: number; y: number }[] {
  const positions: { x: number; y: number }[] = [];
  for (let i = 0; i < count; i++) {
    const angle = (2 * Math.PI * i) / count - Math.PI / 2;
    positions.push({ x: radius * Math.cos(angle), y: radius * Math.sin(angle) });
  }
  return positions;
}

interface ParticleControlProps {
  label: string;
  tone: Tone;
  color: string;
  count: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

function ParticleControl({
  label,
  tone,
  color,
  count,
  onIncrement,
  onDecrement,
}: ParticleControlProps) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border-2 border-zinc-200 bg-white/60 px-3 py-2 dark:border-zinc-800 dark:bg-zinc-900/60">
      <span className="flex items-center gap-2 text-label font-semibold text-zinc-700 dark:text-zinc-200">
        <span aria-hidden className="h-3 w-3 rounded-full" style={{ backgroundColor: color }} />
        {label}
      </span>
      <div className="flex items-center gap-2">
        <Button
          variant="solid"
          tone={tone}
          aria-label={`Remove ${label.toLowerCase()}`}
          onClick={onDecrement}
          disabled={count === 0}
        >
          −
        </Button>
        <span
          data-testid={`${label.toLowerCase()}-count`}
          className="w-6 text-center text-body font-bold text-zinc-900 dark:text-zinc-50"
        >
          {count}
        </span>
        <Button variant="solid" tone={tone} aria-label={`Add ${label.toLowerCase()}`} onClick={onIncrement}>
          +
        </Button>
      </div>
    </div>
  );
}

/**
 * Standalone, reusable atom-building widget (BL-028): +/- controls for
 * protons/neutrons/electrons with a live SVG model. Takes no props — it
 * needs no lesson-specific or curriculum-specific data to be dropped
 * anywhere, the same way LessonPlayer (BL-016) needs no science knowledge.
 */
export function AtomBuilder() {
  const [protons, setProtons] = useState(0);
  const [neutrons, setNeutrons] = useState(0);
  const [electrons, setElectrons] = useState(0);

  const nucleonCount = protons + neutrons;
  const packRadius = nucleonCount > 0 ? Math.min(34, 10 + Math.sqrt(nucleonCount) * 4) : 0;
  const nucleonDots = nucleonPositions(nucleonCount, packRadius);
  const protonDots = nucleonDots.slice(0, protons);
  const neutronDots = nucleonDots.slice(protons);

  const shellCounts = shellElectronCounts(electrons);
  const charge = protons - electrons;
  const chargeLabel = charge === 0 ? "neutral" : charge > 0 ? `+${charge}` : `${charge}`;

  return (
    <Card tone="brand">
      <Badge tone="brand" icon="⚛️">
        Atom Builder
      </Badge>

      <svg
        viewBox={`0 0 ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}`}
        className="mx-auto h-56 w-56"
        role="img"
        aria-label={`Atom model with ${protons} protons, ${neutrons} neutrons, and ${electrons} electrons`}
      >
        <g transform={`translate(${CENTER} ${CENTER})`}>
          {shellCounts.map((count, shellIndex) =>
            count > 0 ? (
              <circle
                key={`shell-${shellIndex}`}
                r={SHELL_RADII[shellIndex]}
                fill="none"
                stroke={ELECTRON_COLOR}
                strokeOpacity={0.3}
                strokeWidth={1.5}
                strokeDasharray="4 3"
              />
            ) : null,
          )}
          {shellCounts.flatMap((count, shellIndex) =>
            shellDotPositions(count, SHELL_RADII[shellIndex]).map((pos, i) => (
              <circle
                key={`electron-${shellIndex}-${i}`}
                cx={pos.x}
                cy={pos.y}
                r={ELECTRON_RADIUS}
                fill={ELECTRON_COLOR}
              />
            )),
          )}
          {neutronDots.map((pos, i) => (
            <circle key={`neutron-${i}`} cx={pos.x} cy={pos.y} r={NUCLEON_RADIUS} fill={NEUTRON_COLOR} />
          ))}
          {protonDots.map((pos, i) => (
            <circle key={`proton-${i}`} cx={pos.x} cy={pos.y} r={NUCLEON_RADIUS} fill={PROTON_COLOR} />
          ))}
        </g>
      </svg>

      <p aria-live="polite" className="text-center text-label text-zinc-600 dark:text-zinc-300">
        Mass number {protons + neutrons} · Charge {chargeLabel}
      </p>

      <div className="flex flex-col gap-2">
        <ParticleControl
          label="Protons"
          tone="danger"
          color={PROTON_COLOR}
          count={protons}
          onIncrement={() => setProtons((p) => p + 1)}
          onDecrement={() => setProtons((p) => Math.max(0, p - 1))}
        />
        <ParticleControl
          label="Neutrons"
          tone="neutral"
          color={NEUTRON_COLOR}
          count={neutrons}
          onIncrement={() => setNeutrons((n) => n + 1)}
          onDecrement={() => setNeutrons((n) => Math.max(0, n - 1))}
        />
        <ParticleControl
          label="Electrons"
          tone="info"
          color={ELECTRON_COLOR}
          count={electrons}
          onIncrement={() => setElectrons((e) => e + 1)}
          onDecrement={() => setElectrons((e) => Math.max(0, e - 1))}
        />
      </div>
    </Card>
  );
}
