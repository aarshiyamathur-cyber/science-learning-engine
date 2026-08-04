import "@testing-library/jest-dom/vitest";
import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import {
  AtomicStructureIllustration,
  BalancedUnbalancedForcesIllustration,
  BodySystemsHeroIllustration,
  CelebrationIllustration,
  CellsHeroIllustration,
  ChangesOfStateIllustration,
  ChemicalReactionHeroIllustration,
  ConservationOfMassIllustration,
  EcosystemHeroIllustration,
  EnergyHeroIllustration,
  EnergyTransformationIllustration,
  ExampleIcon,
  ExplanationIcon,
  FoodChainEnergyFlowIllustration,
  ForcesHeroIllustration,
  GeneticsHeroIllustration,
  ParticleModelIllustration,
  PeriodicTableIllustration,
  PlantVsAnimalCellIllustration,
  PlateBoundaryTypesIllustration,
  PlateTectonicsHeroIllustration,
  QuestionIcon,
  SexualVsAsexualReproductionIllustration,
  StatesOfMatterIllustration,
  SummaryIcon,
  SystemsWorkingTogetherIllustration,
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
    ChemicalReactionHeroIllustration,
    ConservationOfMassIllustration,
    ForcesHeroIllustration,
    BalancedUnbalancedForcesIllustration,
    EnergyHeroIllustration,
    EnergyTransformationIllustration,
    EcosystemHeroIllustration,
    FoodChainEnergyFlowIllustration,
    CellsHeroIllustration,
    PlantVsAnimalCellIllustration,
    BodySystemsHeroIllustration,
    SystemsWorkingTogetherIllustration,
    GeneticsHeroIllustration,
    SexualVsAsexualReproductionIllustration,
    PlateTectonicsHeroIllustration,
    PlateBoundaryTypesIllustration,
  })) {
    test(`${name} renders an svg element`, () => {
      const { container } = render(<Icon data-testid={name} />);
      expect(container.querySelector("svg")).toBeInTheDocument();
    });
  }
});
