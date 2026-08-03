"use client";

import { useState } from "react";
import { Badge, Card } from "../ui";

type Classification = "metal" | "non-metal";

interface ElementInfo {
  symbol: string;
  name: string;
  atomicNumber: number;
  classification: Classification;
  /** Row (period) and column (group) position in the standard periodic table layout. */
  period: number;
  group: number;
}

const METAL_COLOR = "#f59e0b"; // amber-500, matches tone="warning"
const NON_METAL_COLOR = "#0ea5e9"; // sky-500, matches tone="info"

/**
 * The first 20 elements, positioned by their real period (row) and group
 * (column). Groups 3-12 (the transition metals) have no elements in this
 * range, so those columns render as empty gaps in the grid — the gap
 * itself shows learners that a whole block of the table is being skipped
 * for now, rather than silently compressing the layout.
 *
 * Simplification for a Year 7-10 audience: boron (B) and silicon (Si) are
 * classed as metalloids in full chemistry, but this widget only offers a
 * "metal" / "non-metal" choice. They're grouped here as non-metal since
 * neither conducts electricity well, matching a typical simplified
 * school-level treatment of the first 20 elements.
 */
const ELEMENTS: ElementInfo[] = [
  {
    symbol: "H",
    name: "Hydrogen",
    atomicNumber: 1,
    classification: "non-metal",
    period: 1,
    group: 1,
  },
  {
    symbol: "He",
    name: "Helium",
    atomicNumber: 2,
    classification: "non-metal",
    period: 1,
    group: 18,
  },
  {
    symbol: "Li",
    name: "Lithium",
    atomicNumber: 3,
    classification: "metal",
    period: 2,
    group: 1,
  },
  {
    symbol: "Be",
    name: "Beryllium",
    atomicNumber: 4,
    classification: "metal",
    period: 2,
    group: 2,
  },
  {
    symbol: "B",
    name: "Boron",
    atomicNumber: 5,
    classification: "non-metal",
    period: 2,
    group: 13,
  },
  {
    symbol: "C",
    name: "Carbon",
    atomicNumber: 6,
    classification: "non-metal",
    period: 2,
    group: 14,
  },
  {
    symbol: "N",
    name: "Nitrogen",
    atomicNumber: 7,
    classification: "non-metal",
    period: 2,
    group: 15,
  },
  {
    symbol: "O",
    name: "Oxygen",
    atomicNumber: 8,
    classification: "non-metal",
    period: 2,
    group: 16,
  },
  {
    symbol: "F",
    name: "Fluorine",
    atomicNumber: 9,
    classification: "non-metal",
    period: 2,
    group: 17,
  },
  {
    symbol: "Ne",
    name: "Neon",
    atomicNumber: 10,
    classification: "non-metal",
    period: 2,
    group: 18,
  },
  {
    symbol: "Na",
    name: "Sodium",
    atomicNumber: 11,
    classification: "metal",
    period: 3,
    group: 1,
  },
  {
    symbol: "Mg",
    name: "Magnesium",
    atomicNumber: 12,
    classification: "metal",
    period: 3,
    group: 2,
  },
  {
    symbol: "Al",
    name: "Aluminium",
    atomicNumber: 13,
    classification: "metal",
    period: 3,
    group: 13,
  },
  {
    symbol: "Si",
    name: "Silicon",
    atomicNumber: 14,
    classification: "non-metal",
    period: 3,
    group: 14,
  },
  {
    symbol: "P",
    name: "Phosphorus",
    atomicNumber: 15,
    classification: "non-metal",
    period: 3,
    group: 15,
  },
  {
    symbol: "S",
    name: "Sulfur",
    atomicNumber: 16,
    classification: "non-metal",
    period: 3,
    group: 16,
  },
  {
    symbol: "Cl",
    name: "Chlorine",
    atomicNumber: 17,
    classification: "non-metal",
    period: 3,
    group: 17,
  },
  {
    symbol: "Ar",
    name: "Argon",
    atomicNumber: 18,
    classification: "non-metal",
    period: 3,
    group: 18,
  },
  {
    symbol: "K",
    name: "Potassium",
    atomicNumber: 19,
    classification: "metal",
    period: 4,
    group: 1,
  },
  {
    symbol: "Ca",
    name: "Calcium",
    atomicNumber: 20,
    classification: "metal",
    period: 4,
    group: 2,
  },
];

const PERIODS = [1, 2, 3, 4] as const;
const GROUPS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18] as const;

const ELEMENTS_BY_POSITION = new Map<string, ElementInfo>(
  ELEMENTS.map((element) => [`${element.period}-${element.group}`, element]),
);

const CLASSIFICATION_META: Record<Classification, { label: string; color: string }> = {
  metal: { label: "Metal", color: METAL_COLOR },
  "non-metal": { label: "Non-metal", color: NON_METAL_COLOR },
};

/**
 * Standalone, reusable periodic table explorer (BL-044): a grid of the
 * first 20 elements arranged by real period (row) and group (column), with
 * gaps where the transition-metal columns would sit. Tapping a tile reveals
 * its name, atomic number, and metal/non-metal classification. Takes no
 * props — like AtomBuilder and ParticleStateExplorer, it needs no
 * lesson-specific data to be dropped anywhere.
 */
export function PeriodicTableExplorer() {
  const [selected, setSelected] = useState<ElementInfo>(ELEMENTS[0]);

  return (
    <Card tone="brand">
      <Badge tone="brand" icon="🧪">
        Periodic Table Explorer
      </Badge>

      <div
        className="grid gap-1.5"
        style={{ gridTemplateColumns: `repeat(${GROUPS.length}, minmax(0, 1fr))` }}
      >
        {PERIODS.flatMap((period) =>
          GROUPS.map((group) => {
            const element = ELEMENTS_BY_POSITION.get(`${period}-${group}`);
            if (!element) {
              return <div key={`${period}-${group}`} aria-hidden />;
            }
            const isSelected = element.symbol === selected.symbol;
            const meta = CLASSIFICATION_META[element.classification];
            return (
              <button
                key={element.symbol}
                type="button"
                onClick={() => setSelected(element)}
                aria-pressed={isSelected}
                className={`flex flex-col items-center justify-center gap-0.5 rounded-lg border-2 p-2 text-center transition-transform hover:scale-105 ${
                  isSelected
                    ? "border-zinc-900 dark:border-zinc-50"
                    : "border-zinc-200 dark:border-zinc-800"
                }`}
                style={{ backgroundColor: `${meta.color}33` }}
              >
                <span className="text-label font-bold text-zinc-900 dark:text-zinc-50">
                  {element.symbol}
                </span>
                <span className="text-[10px] text-zinc-600 dark:text-zinc-300">
                  {element.atomicNumber}
                </span>
              </button>
            );
          }),
        )}
      </div>

      <div className="flex flex-wrap items-center gap-4 text-label text-zinc-600 dark:text-zinc-300">
        <span className="flex items-center gap-1.5">
          <span
            aria-hidden
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: METAL_COLOR }}
          />
          Metal
        </span>
        <span className="flex items-center gap-1.5">
          <span
            aria-hidden
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: NON_METAL_COLOR }}
          />
          Non-metal
        </span>
      </div>

      <p
        aria-live="polite"
        className="text-center text-body text-zinc-700 dark:text-zinc-200"
      >
        <span data-testid="element-name" className="font-bold">
          {selected.name}
        </span>{" "}
        · Atomic number{" "}
        <span data-testid="element-atomic-number">{selected.atomicNumber}</span> ·{" "}
        <span data-testid="element-classification">
          {CLASSIFICATION_META[selected.classification].label}
        </span>
      </p>
    </Card>
  );
}
