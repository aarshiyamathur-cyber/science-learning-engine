import "@testing-library/jest-dom/vitest";
import { fireEvent, render, within } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { CellStructureExplorer } from "./CellStructureExplorer";

describe("CellStructureExplorer", () => {
  test("starts showing the cell membrane's details", () => {
    const { container } = render(<CellStructureExplorer />);
    const screen = within(container);
    expect(screen.getByTestId("structure-name")).toHaveTextContent("Cell membrane");
    expect(screen.getByTestId("structure-function")).toHaveTextContent(
      "Controls which substances can enter and leave the cell.",
    );
    expect(screen.getByTestId("structure-group")).toHaveTextContent(
      "Both plant and animal cells",
    );
  });

  test("clicking a shared structure shows it is found in both plant and animal cells", () => {
    const { container } = render(<CellStructureExplorer />);
    const screen = within(container);
    fireEvent.click(screen.getByRole("button", { name: /Nucleus/ }));
    expect(screen.getByTestId("structure-name")).toHaveTextContent("Nucleus");
    expect(screen.getByTestId("structure-group")).toHaveTextContent(
      "Both plant and animal cells",
    );
  });

  test("clicking a plant-only structure shows it is found in plant cells only", () => {
    const { container } = render(<CellStructureExplorer />);
    const screen = within(container);
    fireEvent.click(screen.getByRole("button", { name: /Chloroplast/ }));
    expect(screen.getByTestId("structure-name")).toHaveTextContent("Chloroplast");
    expect(screen.getByTestId("structure-function")).toHaveTextContent(
      "Captures sunlight so the cell can make its own food.",
    );
    expect(screen.getByTestId("structure-group")).toHaveTextContent("Plant cells only");
  });

  test("all three plant-only structures are marked as plant cells only", () => {
    const { container } = render(<CellStructureExplorer />);
    const screen = within(container);
    for (const name of [/Cell wall/, /Chloroplast/, /Large vacuole/]) {
      fireEvent.click(screen.getByRole("button", { name }));
      expect(screen.getByTestId("structure-group")).toHaveTextContent("Plant cells only");
    }
  });

  test("aria-pressed toggles to the newly selected structure", () => {
    const { container } = render(<CellStructureExplorer />);
    const screen = within(container);
    const cytoplasmButton = screen.getByRole("button", { name: /Cytoplasm/ });
    const membraneButton = screen.getByRole("button", { name: /Cell membrane/ });
    expect(membraneButton).toHaveAttribute("aria-pressed", "true");
    expect(cytoplasmButton).toHaveAttribute("aria-pressed", "false");

    fireEvent.click(cytoplasmButton);
    expect(cytoplasmButton).toHaveAttribute("aria-pressed", "true");
    expect(membraneButton).toHaveAttribute("aria-pressed", "false");
  });
});
