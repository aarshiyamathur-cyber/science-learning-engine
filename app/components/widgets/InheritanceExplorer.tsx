"use client";

import { useState } from "react";
import { Badge, Card } from "../ui";

type Classification = "inherited" | "acquired" | "asexual" | "sexual";

interface Scenario {
  id: string;
  label: string;
  icon: string;
  classification: Classification;
  explanation: string;
}

interface ClassificationMeta {
  label: string;
  groupLabel: string;
  color: string;
}

/**
 * Every classification gets its own colour and short "group label", used
 * both on the scenario buttons (so the two pairs are visually grouped
 * before tapping) and on the reveal panel — the same colour-by-meaning
 * pattern as BodySystemExplorer, applied here to directly reinforce both
 * misconception corrections rather than just stating them in text.
 */
const CLASSIFICATION_META: Record<Classification, ClassificationMeta> = {
  inherited: {
    label: "Inherited",
    groupLabel: "Passed to offspring",
    color: "#059669", // emerald-600 (success)
  },
  acquired: {
    label: "Acquired",
    groupLabel: "Not passed to offspring",
    color: "#e11d48", // rose-600 (danger)
  },
  asexual: {
    label: "Asexual reproduction",
    groupLabel: "One parent, genetically identical",
    color: "#0ea5e9", // sky-500 (info)
  },
  sexual: {
    label: "Sexual reproduction",
    groupLabel: "Two parents, genetically varied",
    color: "#7c3aed", // violet-600 (accent)
  },
};

const TRAIT_SCENARIOS: Scenario[] = [
  {
    id: "eye-colour",
    label: "Eye colour",
    icon: "👁️",
    classification: "inherited",
    explanation:
      "Eye colour is controlled by genes passed from parents to their child, so it's inherited — not something the child develops from experience.",
  },
  {
    id: "scar",
    label: "A scar from a cut",
    icon: "🩹",
    classification: "acquired",
    explanation:
      "A scar forms because of an injury that happened during a person's life, not because of their genes, so it's acquired, not inherited.",
  },
];

const REPRODUCTION_SCENARIOS: Scenario[] = [
  {
    id: "strawberry-runner",
    label: "A strawberry plant runner",
    icon: "🍓",
    classification: "asexual",
    explanation:
      "A runner grows from a single parent plant with no mixing of genes, so the new plant is a genetically identical clone of its parent.",
  },
  {
    id: "dog-breeding",
    label: "Two dogs breeding puppies",
    icon: "🐶",
    classification: "sexual",
    explanation:
      "Puppies get a mix of genes from both their mother and father, so each puppy ends up genetically different from its parents and from each other.",
  },
];

function ScenarioButton({
  scenario,
  isSelected,
  onSelect,
}: {
  scenario: Scenario;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const meta = CLASSIFICATION_META[scenario.classification];
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={isSelected}
      className={`flex flex-1 flex-col items-center justify-center gap-1 rounded-lg border-2 p-3 text-center transition-transform hover:scale-105 ${
        isSelected ? "border-zinc-900 dark:border-zinc-50" : "border-zinc-200 dark:border-zinc-800"
      }`}
      style={{ backgroundColor: `${meta.color}1a` }}
    >
      <span aria-hidden className="text-2xl">
        {scenario.icon}
      </span>
      <span className="text-label font-semibold text-zinc-900 dark:text-zinc-50">
        {scenario.label}
      </span>
    </button>
  );
}

/**
 * Standalone, reusable "tap to reveal" widget (BL-052): tapping one of four
 * scenarios reveals whether it's inherited/acquired (eye colour vs. a scar)
 * or asexual/sexual reproduction (a strawberry runner vs. dog breeding),
 * colour-coded by group so the two misconception corrections — acquired
 * traits aren't inherited, and asexual reproduction doesn't produce
 * variation — are shown visually, not just stated in text. Takes no props,
 * like BodySystemExplorer and FoodChainExplorer.
 */
export function InheritanceExplorer() {
  const allScenarios = [...TRAIT_SCENARIOS, ...REPRODUCTION_SCENARIOS];
  const [selectedId, setSelectedId] = useState(allScenarios[0].id);
  const selected = allScenarios.find((scenario) => scenario.id === selectedId) ?? allScenarios[0];
  const meta = CLASSIFICATION_META[selected.classification];

  return (
    <Card tone="brand">
      <Badge tone="brand" icon="🧬">
        Inheritance Explorer
      </Badge>

      <div className="flex flex-col gap-1">
        <span className="text-label font-semibold text-zinc-600 dark:text-zinc-300">
          Trait or experience?
        </span>
        <div className="flex flex-wrap gap-2">
          {TRAIT_SCENARIOS.map((scenario) => (
            <ScenarioButton
              key={scenario.id}
              scenario={scenario}
              isSelected={scenario.id === selectedId}
              onSelect={() => setSelectedId(scenario.id)}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-label font-semibold text-zinc-600 dark:text-zinc-300">
          How did it reproduce?
        </span>
        <div className="flex flex-wrap gap-2">
          {REPRODUCTION_SCENARIOS.map((scenario) => (
            <ScenarioButton
              key={scenario.id}
              scenario={scenario}
              isSelected={scenario.id === selectedId}
              onSelect={() => setSelectedId(scenario.id)}
            />
          ))}
        </div>
      </div>

      <div
        aria-live="polite"
        className="flex flex-col gap-2 rounded-lg border-2 p-4"
        style={{ backgroundColor: `${meta.color}1a`, borderColor: meta.color }}
      >
        <p className="text-body text-zinc-700 dark:text-zinc-200">
          <span data-testid="scenario-name" className="font-bold">
            {selected.label}
          </span>{" "}
          ·{" "}
          <span data-testid="classification-label" className="font-bold" style={{ color: meta.color }}>
            {meta.label}
          </span>
        </p>
        <p data-testid="group-label" className="text-label font-semibold text-zinc-600 dark:text-zinc-300">
          {meta.groupLabel}
        </p>
        <p data-testid="scenario-explanation" className="text-label text-zinc-600 dark:text-zinc-300">
          {selected.explanation}
        </p>
      </div>
    </Card>
  );
}
