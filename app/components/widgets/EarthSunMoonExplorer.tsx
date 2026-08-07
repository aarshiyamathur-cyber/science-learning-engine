"use client";

import { useState } from "react";
import { Badge, Card } from "../ui";

type SeasonId = "summer" | "autumn" | "winter" | "spring";
type PhaseId = "new" | "first-quarter" | "full" | "third-quarter";
type Mode = "seasons" | "moon-phases";

interface Season {
  id: SeasonId;
  label: string;
  /** Offset of this orbit position from the Sun, used only to place the dot. */
  position: { x: number; y: number };
  tiltNote: string;
  dayLength: string;
  /** Hemisphere shading for the tilted Earth split-circle: the half tilted toward the Sun is lit (amber), the half tilted away is dim (indigo); both are the same neutral tone at an equinox. */
  nearSunColor: string;
  farSunColor: string;
}

const SEASONS: Season[] = [
  {
    id: "summer",
    label: "Summer (December)",
    position: { x: 0, y: -70 },
    tiltNote: "The Southern Hemisphere is tilted toward the Sun.",
    dayLength: "Long days and the most direct sunlight of the year.",
    nearSunColor: "#f59e0b",
    farSunColor: "#312e81",
  },
  {
    id: "autumn",
    label: "Autumn (March)",
    position: { x: 70, y: 0 },
    tiltNote: "Earth's axis is side-on to the Sun — neither hemisphere is tilted toward or away.",
    dayLength: "Day and night are close to equal, and days are getting shorter.",
    nearSunColor: "#94a3b8",
    farSunColor: "#94a3b8",
  },
  {
    id: "winter",
    label: "Winter (June)",
    position: { x: 0, y: 70 },
    tiltNote: "The Southern Hemisphere is tilted away from the Sun.",
    dayLength: "Short days and the least direct sunlight of the year.",
    nearSunColor: "#312e81",
    farSunColor: "#0ea5e9",
  },
  {
    id: "spring",
    label: "Spring (September)",
    position: { x: -70, y: 0 },
    tiltNote: "Earth's axis is side-on to the Sun — neither hemisphere is tilted toward or away.",
    dayLength: "Day and night are close to equal, and days are getting longer.",
    nearSunColor: "#94a3b8",
    farSunColor: "#94a3b8",
  },
];

interface MoonPhase {
  id: PhaseId;
  label: string;
  position: { x: number; y: number };
  litSide: "none" | "right" | "full" | "left";
  visibleFraction: string;
  detail: string;
}

const MOON_PHASES: MoonPhase[] = [
  {
    id: "new",
    label: "New Moon",
    position: { x: -55, y: 0 },
    litSide: "none",
    visibleFraction: "None of the Moon's sunlit half is visible from Earth.",
    detail: "The Moon sits between Earth and the Sun, so its sunlit half faces away from us — we see its dark side.",
  },
  {
    id: "first-quarter",
    label: "First Quarter",
    position: { x: 0, y: -55 },
    litSide: "right",
    visibleFraction: "Half of the Moon's sunlit half is visible — a half-lit disc.",
    detail: "The Moon has moved a quarter of the way around its orbit, so we see exactly half of its lit side.",
  },
  {
    id: "full",
    label: "Full Moon",
    position: { x: 55, y: 0 },
    litSide: "full",
    visibleFraction: "All of the Moon's sunlit half is visible — a fully-lit disc.",
    detail: "Earth is roughly between the Moon and the Sun, so the Moon's entire sunlit half faces us.",
  },
  {
    id: "third-quarter",
    label: "Third Quarter",
    position: { x: 0, y: 55 },
    litSide: "left",
    visibleFraction: "Half of the Moon's sunlit half is visible — a half-lit disc, lit on the opposite side to First Quarter.",
    detail: "The Moon has moved three-quarters of the way around its orbit, so again we see half of its lit side.",
  },
];

/**
 * Sun at centre, the four season positions marked around its orbit, and the
 * selected Earth drawn larger with its axis split into two shaded halves —
 * an even split (grey) at the equinoxes, a high-contrast split (amber vs.
 * indigo) at the solstices — so "which hemisphere gets more direct light"
 * is seen, not just read.
 */
function SeasonOrbitDiagram({ selected }: { selected: Season }) {
  const cx = 110;
  const cy = 110;
  const r = 30;
  const tiltAngle = -23;

  return (
    <svg
      viewBox="0 0 220 220"
      width="100%"
      height={220}
      role="img"
      aria-label={`${selected.label}: ${selected.tiltNote} ${selected.dayLength}`}
    >
      {SEASONS.filter((season) => season.id !== selected.id).map((season) => (
        <circle
          key={season.id}
          cx={cx + season.position.x}
          cy={cy + season.position.y}
          r={7}
          fill="#a1a1aa"
          opacity={0.5}
        />
      ))}

      <line
        x1={cx}
        y1={cy}
        x2={cx + selected.position.x}
        y2={cy + selected.position.y}
        stroke="#f59e0b"
        strokeWidth={2}
        strokeDasharray="4 3"
      />

      <circle cx={cx} cy={cy} r={16} fill="#f59e0b" />

      <g transform={`rotate(${tiltAngle} ${cx + selected.position.x} ${cy + selected.position.y})`}>
        <path
          d={`M ${cx + selected.position.x} ${cy + selected.position.y - r} A ${r} ${r} 0 0 1 ${cx + selected.position.x} ${cy + selected.position.y + r} Z`}
          fill={selected.nearSunColor}
        />
        <path
          d={`M ${cx + selected.position.x} ${cy + selected.position.y - r} A ${r} ${r} 0 0 0 ${cx + selected.position.x} ${cy + selected.position.y + r} Z`}
          fill={selected.farSunColor}
        />
      </g>
    </svg>
  );
}

/**
 * Sun fixed to one side, Earth at the centre, and the four phase positions
 * marked around Earth's orbit. The selected Moon is drawn larger with a
 * shaded circle showing exactly the fraction of its sunlit half visible
 * from Earth — a concrete contrast to "it's Earth's shadow."
 */
function MoonOrbitDiagram({ selected }: { selected: MoonPhase }) {
  const cx = 110;
  const cy = 110;
  const r = 22;
  const sunX = 20;

  return (
    <svg
      viewBox="0 0 220 220"
      width="100%"
      height={220}
      role="img"
      aria-label={`${selected.label}: ${selected.visibleFraction} ${selected.detail}`}
    >
      <line x1={sunX + 14} y1={cy} x2={cx - 14} y2={cy} stroke="#f59e0b" strokeWidth={2} strokeDasharray="4 3" />
      <circle cx={sunX} cy={cy} r={14} fill="#f59e0b" />
      <circle cx={cx} cy={cy} r={14} fill="#0ea5e9" />

      {MOON_PHASES.filter((phase) => phase.id !== selected.id).map((phase) => (
        <circle
          key={phase.id}
          cx={cx + phase.position.x}
          cy={cy + phase.position.y}
          r={6}
          fill="#a1a1aa"
          opacity={0.5}
        />
      ))}

      <g>
        <circle
          cx={cx + selected.position.x}
          cy={cy + selected.position.y}
          r={r}
          fill={selected.litSide === "none" ? "#312e81" : "#e5e7eb"}
          stroke="#71717a"
          strokeWidth={1}
        />
        {selected.litSide === "right" && (
          <path
            d={`M ${cx + selected.position.x} ${cy + selected.position.y - r} A ${r} ${r} 0 0 1 ${cx + selected.position.x} ${cy + selected.position.y + r} Z`}
            fill="#fde68a"
          />
        )}
        {selected.litSide === "left" && (
          <path
            d={`M ${cx + selected.position.x} ${cy + selected.position.y - r} A ${r} ${r} 0 0 0 ${cx + selected.position.x} ${cy + selected.position.y + r} Z`}
            fill="#fde68a"
          />
        )}
        {selected.litSide === "full" && (
          <circle cx={cx + selected.position.x} cy={cy + selected.position.y} r={r} fill="#fde68a" />
        )}
      </g>
    </svg>
  );
}

/**
 * Standalone, reusable widget (BL-054) with no required props, matching the
 * PlateBoundaryExplorer pattern: a mode toggle switches between two
 * "tap to reveal" explorers — Seasons (why the Southern Hemisphere's
 * seasons are caused by axial tilt, not distance from the Sun) and Moon
 * Phases (why phases are caused by orbital position, not Earth's shadow) —
 * each showing a distinct visual per position, not just a text swap.
 */
export function EarthSunMoonExplorer() {
  const [mode, setMode] = useState<Mode>("seasons");
  const [seasonId, setSeasonId] = useState<SeasonId>(SEASONS[0].id);
  const [phaseId, setPhaseId] = useState<PhaseId>(MOON_PHASES[0].id);

  const selectedSeason = SEASONS.find((season) => season.id === seasonId) ?? SEASONS[0];
  const selectedPhase = MOON_PHASES.find((phase) => phase.id === phaseId) ?? MOON_PHASES[0];

  return (
    <Card tone="info">
      <Badge tone="info" icon="🌏">
        Earth, Sun & Moon Explorer
      </Badge>

      <div className="flex gap-2">
        {(
          [
            { id: "seasons" as const, name: "Seasons" },
            { id: "moon-phases" as const, name: "Moon Phases" },
          ]
        ).map((tab) => {
          const isSelected = tab.id === mode;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setMode(tab.id)}
              aria-pressed={isSelected}
              className={`flex-1 rounded-full border-2 px-4 py-2 text-label font-semibold transition-transform hover:scale-105 ${
                isSelected
                  ? "border-info-600 bg-info-100 text-info-800 dark:border-info-400 dark:bg-info-900 dark:text-info-200"
                  : "border-zinc-200 bg-white/60 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-200"
              }`}
            >
              {tab.name}
            </button>
          );
        })}
      </div>

      {mode === "seasons" ? (
        <>
          <div className="flex flex-wrap gap-2">
            {SEASONS.map((season) => {
              const isSelected = season.id === selectedSeason.id;
              return (
                <button
                  key={season.id}
                  type="button"
                  onClick={() => setSeasonId(season.id)}
                  aria-pressed={isSelected}
                  className={`flex-1 rounded-lg border-2 p-2 text-center text-label font-semibold transition-transform hover:scale-105 ${
                    isSelected ? "border-zinc-900 dark:border-zinc-50" : "border-zinc-200 dark:border-zinc-800"
                  } text-zinc-900 dark:text-zinc-50`}
                >
                  {season.label}
                </button>
              );
            })}
          </div>

          <SeasonOrbitDiagram selected={selectedSeason} />

          <div aria-live="polite" className="flex flex-col gap-1">
            <p className="text-body text-zinc-700 dark:text-zinc-200">
              <span data-testid="season-name" className="font-bold">
                {selectedSeason.label}
              </span>
            </p>
            <p data-testid="season-tilt" className="text-label text-zinc-600 dark:text-zinc-300">
              {selectedSeason.tiltNote}
            </p>
            <p data-testid="season-length" className="text-label font-semibold text-zinc-700 dark:text-zinc-200">
              {selectedSeason.dayLength}
            </p>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-wrap gap-2">
            {MOON_PHASES.map((phase) => {
              const isSelected = phase.id === selectedPhase.id;
              return (
                <button
                  key={phase.id}
                  type="button"
                  onClick={() => setPhaseId(phase.id)}
                  aria-pressed={isSelected}
                  className={`flex-1 rounded-lg border-2 p-2 text-center text-label font-semibold transition-transform hover:scale-105 ${
                    isSelected ? "border-zinc-900 dark:border-zinc-50" : "border-zinc-200 dark:border-zinc-800"
                  } text-zinc-900 dark:text-zinc-50`}
                >
                  {phase.label}
                </button>
              );
            })}
          </div>

          <MoonOrbitDiagram selected={selectedPhase} />

          <div aria-live="polite" className="flex flex-col gap-1">
            <p className="text-body text-zinc-700 dark:text-zinc-200">
              <span data-testid="phase-name" className="font-bold">
                {selectedPhase.label}
              </span>
            </p>
            <p data-testid="phase-visible" className="text-label text-zinc-600 dark:text-zinc-300">
              {selectedPhase.visibleFraction}
            </p>
            <p data-testid="phase-detail" className="text-label font-semibold text-zinc-700 dark:text-zinc-200">
              {selectedPhase.detail}
            </p>
          </div>
        </>
      )}
    </Card>
  );
}
