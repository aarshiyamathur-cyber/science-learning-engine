import "@testing-library/jest-dom/vitest";
import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import {
  AtomicStructureIllustration,
  CelebrationIllustration,
  ChangesOfStateIllustration,
  ExampleIcon,
  ExplanationIcon,
  ParticleModelIllustration,
  PeriodicTableIllustration,
  QuestionIcon,
  StatesOfMatterIllustration,
  SummaryIcon,
} from "./index";

describe("step icons and illustrations", () => {
  for (const [name, Icon] of Object.entries({
    ExplanationIcon,
    ExampleIcon,
    QuestionIcon,
    SummaryIcon,
    StatesOfMatterIllustration,
    CelebrationIllustration,
    ParticleModelIllustration,
    ChangesOfStateIllustration,
    AtomicStructureIllustration,
    PeriodicTableIllustration,
  })) {
    test(`${name} renders an svg element`, () => {
      const { container } = render(<Icon data-testid={name} />);
      expect(container.querySelector("svg")).toBeInTheDocument();
    });
  }
});
