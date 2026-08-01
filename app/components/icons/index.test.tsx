import "@testing-library/jest-dom/vitest";
import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import {
  CelebrationIllustration,
  ExampleIcon,
  ExplanationIcon,
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
  })) {
    test(`${name} renders an svg element`, () => {
      const { container } = render(<Icon data-testid={name} />);
      expect(container.querySelector("svg")).toBeInTheDocument();
    });
  }
});
