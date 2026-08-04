"use client";

import { useState } from "react";
import { Badge, Card } from "../ui";

interface OrganInfo {
  name: string;
  role: string;
}

interface SystemInfo {
  id: string;
  name: string;
  function: string;
  color: string;
  organs: OrganInfo[];
}

const SYSTEMS: SystemInfo[] = [
  {
    id: "digestive",
    name: "Digestive system",
    function: "Breaks down food into nutrients the body can use.",
    color: "#f59e0b", // amber-500
    organs: [
      { name: "Stomach", role: "Breaks down food" },
      { name: "Small intestine", role: "Absorbs nutrients" },
    ],
  },
  {
    id: "circulatory",
    name: "Circulatory system",
    function: "Carries blood, oxygen, and nutrients around the body.",
    color: "#ef4444", // red-500
    organs: [
      { name: "Heart", role: "Pumps blood" },
      { name: "Blood vessels", role: "Carry blood around the body" },
    ],
  },
  {
    id: "respiratory",
    name: "Respiratory system",
    function: "Brings oxygen into the body and removes carbon dioxide.",
    color: "#0ea5e9", // sky-500
    organs: [
      { name: "Lungs", role: "Exchange oxygen and carbon dioxide" },
      { name: "Diaphragm", role: "Drives breathing" },
    ],
  },
];

/**
 * Each system gets a distinct shape (its visual role) in its own colour, so
 * the three systems stay visually distinguishable at a glance rather than
 * relying on colour alone — same "shape carries meaning" split used by
 * CellStructureExplorer.
 */
function SystemIcon({ systemId, color }: { systemId: string; color: string }) {
  switch (systemId) {
    case "digestive":
      return (
        <svg viewBox="0 0 32 32" width={32} height={32} aria-hidden>
          <path
            d="M11 5c0 4 8 2 8 6s-8 2-8 6 8 2 8 6"
            fill="none"
            stroke={color}
            strokeWidth={3}
            strokeLinecap="round"
          />
        </svg>
      );
    case "circulatory":
      return (
        <svg viewBox="0 0 32 32" width={32} height={32} aria-hidden>
          <path
            d="M16 27C6 20 3 14 3 10a6 6 0 0 1 11-3.3A6 6 0 0 1 25 10c0 4-3 10-9 17z"
            fill={color}
          />
        </svg>
      );
    case "respiratory":
      return (
        <svg viewBox="0 0 32 32" width={32} height={32} aria-hidden>
          <line x1={16} y1={4} x2={16} y2={14} stroke={color} strokeWidth={2} />
          <ellipse cx={10} cy={21} rx={6} ry={9} fill={color} />
          <ellipse cx={22} cy={21} rx={6} ry={9} fill={color} />
        </svg>
      );
    default:
      return null;
  }
}

/**
 * Standalone, reusable "tap to reveal" organ-system explorer (BL-050):
 * tapping a system reveals its main function and the key organs within it,
 * each with a one-phrase role. Takes no props, like CellStructureExplorer
 * and PeriodicTableExplorer.
 */
export function BodySystemExplorer() {
  const [selected, setSelected] = useState<SystemInfo>(SYSTEMS[0]);

  return (
    <Card tone="brand">
      <Badge tone="brand" icon="🫁">
        Body System Explorer
      </Badge>

      <div className="flex flex-wrap gap-2">
        {SYSTEMS.map((system) => {
          const isSelected = system.id === selected.id;
          return (
            <button
              key={system.id}
              type="button"
              onClick={() => setSelected(system)}
              aria-pressed={isSelected}
              className={`flex flex-col items-center justify-center gap-1 rounded-lg border-2 p-2 text-center transition-transform hover:scale-105 ${
                isSelected
                  ? "border-zinc-900 dark:border-zinc-50"
                  : "border-zinc-200 dark:border-zinc-800"
              }`}
              style={{ backgroundColor: `${system.color}1a` }}
            >
              <SystemIcon systemId={system.id} color={system.color} />
              <span className="text-label font-semibold text-zinc-900 dark:text-zinc-50">
                {system.name}
              </span>
            </button>
          );
        })}
      </div>

      <p
        aria-live="polite"
        className="text-center text-body text-zinc-700 dark:text-zinc-200"
      >
        <span data-testid="system-name" className="font-bold">
          {selected.name}
        </span>{" "}
        · <span data-testid="system-function">{selected.function}</span>
      </p>

      <ul className="flex flex-col gap-1" data-testid="system-organs">
        {selected.organs.map((organ) => (
          <li
            key={organ.name}
            data-testid={`organ-${organ.name}`}
            className="text-label text-zinc-600 dark:text-zinc-300"
          >
            <span className="font-semibold text-zinc-900 dark:text-zinc-50">{organ.name}</span> —{" "}
            {organ.role}
          </li>
        ))}
      </ul>
    </Card>
  );
}
