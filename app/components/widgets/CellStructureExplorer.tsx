"use client";

import { useState } from "react";
import { Badge, Card } from "../ui";

type Group = "shared" | "plant-only";

interface StructureInfo {
  id: string;
  name: string;
  function: string;
  group: Group;
}

const SHARED_COLOR = "#0ea5e9"; // sky-500, matches tone="info"
const PLANT_ONLY_COLOR = "#10b981"; // emerald-500, matches tone="success"

const GROUP_META: Record<Group, { label: string; tone: "info" | "success"; color: string }> = {
  shared: { label: "Both plant and animal cells", tone: "info", color: SHARED_COLOR },
  "plant-only": { label: "Plant cells only", tone: "success", color: PLANT_ONLY_COLOR },
};

const STRUCTURES: StructureInfo[] = [
  {
    id: "cell-membrane",
    name: "Cell membrane",
    function: "Controls which substances can enter and leave the cell.",
    group: "shared",
  },
  {
    id: "nucleus",
    name: "Nucleus",
    function: "Controls the cell's activities, a bit like a control centre.",
    group: "shared",
  },
  {
    id: "cytoplasm",
    name: "Cytoplasm",
    function: "The gel-like substance where the cell's processes take place.",
    group: "shared",
  },
  {
    id: "cell-wall",
    name: "Cell wall",
    function: "A rigid outer layer that supports and protects the cell.",
    group: "plant-only",
  },
  {
    id: "chloroplast",
    name: "Chloroplast",
    function: "Captures sunlight so the cell can make its own food.",
    group: "plant-only",
  },
  {
    id: "large-vacuole",
    name: "Large vacuole",
    function: "A fluid-filled sac that stores water and keeps the cell firm.",
    group: "plant-only",
  },
];

/**
 * Each structure gets a distinct shape (its visual role), rendered in its
 * group's colour (shared vs. plant-only) so shape and colour reinforce each
 * other — the same "shape carries meaning, colour carries category" split
 * used by PeriodicTableExplorer's metal/non-metal tiles.
 */
function StructureIcon({ structureId, color }: { structureId: string; color: string }) {
  switch (structureId) {
    case "cell-membrane":
      return (
        <svg viewBox="0 0 32 32" width={32} height={32} aria-hidden>
          <circle cx={16} cy={16} r={12} fill="none" stroke={color} strokeWidth={3} />
        </svg>
      );
    case "nucleus":
      return (
        <svg viewBox="0 0 32 32" width={32} height={32} aria-hidden>
          <circle cx={16} cy={16} r={9} fill={color} />
        </svg>
      );
    case "cytoplasm":
      return (
        <svg viewBox="0 0 32 32" width={32} height={32} aria-hidden>
          <ellipse cx={16} cy={16} rx={13} ry={9} fill={color} opacity={0.35} />
          <circle cx={12} cy={14} r={1.5} fill={color} />
          <circle cx={20} cy={17} r={1.5} fill={color} />
          <circle cx={16} cy={11} r={1.5} fill={color} />
        </svg>
      );
    case "cell-wall":
      return (
        <svg viewBox="0 0 32 32" width={32} height={32} aria-hidden>
          <rect x={5} y={5} width={22} height={22} fill="none" stroke={color} strokeWidth={4} />
        </svg>
      );
    case "chloroplast":
      return (
        <svg viewBox="0 0 32 32" width={32} height={32} aria-hidden>
          <ellipse cx={16} cy={16} rx={11} ry={7} fill={color} />
        </svg>
      );
    case "large-vacuole":
      return (
        <svg viewBox="0 0 32 32" width={32} height={32} aria-hidden>
          <circle cx={16} cy={16} r={13} fill={color} opacity={0.3} stroke={color} strokeWidth={2} />
        </svg>
      );
    default:
      return null;
  }
}

/**
 * Standalone, reusable "tap to reveal" cell-structure explorer (BL-049):
 * tapping a structure reveals its function and whether it's found in both
 * plant and animal cells or only plant cells. Every icon is rendered in its
 * group's colour (shared vs. plant-only) so the visual itself groups the
 * three plant-only structures together, distinct from the three shared
 * ones — not just the caption text. Takes no props, like
 * PeriodicTableExplorer and ParticleStateExplorer.
 */
export function CellStructureExplorer() {
  const [selected, setSelected] = useState<StructureInfo>(STRUCTURES[0]);
  const meta = GROUP_META[selected.group];

  return (
    <Card tone="brand">
      <Badge tone="brand" icon="🔬">
        Cell Structure Explorer
      </Badge>

      <div className="flex flex-wrap gap-2">
        {STRUCTURES.map((structure) => {
          const isSelected = structure.id === selected.id;
          const structureColor = GROUP_META[structure.group].color;
          return (
            <button
              key={structure.id}
              type="button"
              onClick={() => setSelected(structure)}
              aria-pressed={isSelected}
              className={`flex flex-col items-center justify-center gap-1 rounded-lg border-2 p-2 text-center transition-transform hover:scale-105 ${
                isSelected
                  ? "border-zinc-900 dark:border-zinc-50"
                  : "border-zinc-200 dark:border-zinc-800"
              }`}
              style={{ backgroundColor: `${structureColor}1a` }}
            >
              <StructureIcon structureId={structure.id} color={structureColor} />
              <span className="text-label font-semibold text-zinc-900 dark:text-zinc-50">
                {structure.name}
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center gap-4 text-label text-zinc-600 dark:text-zinc-300">
        <span className="flex items-center gap-1.5">
          <span
            aria-hidden
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: SHARED_COLOR }}
          />
          Both plant and animal cells
        </span>
        <span className="flex items-center gap-1.5">
          <span
            aria-hidden
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: PLANT_ONLY_COLOR }}
          />
          Plant cells only
        </span>
      </div>

      <p
        aria-live="polite"
        className="text-center text-body text-zinc-700 dark:text-zinc-200"
      >
        <span data-testid="structure-name" className="font-bold">
          {selected.name}
        </span>{" "}
        · <span data-testid="structure-function">{selected.function}</span>
      </p>
      <div className="flex justify-center">
        <Badge tone={meta.tone}>
          <span data-testid="structure-group">{meta.label}</span>
        </Badge>
      </div>
    </Card>
  );
}
