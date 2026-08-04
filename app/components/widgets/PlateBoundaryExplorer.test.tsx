import "@testing-library/jest-dom/vitest";
import { fireEvent, render, within } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { PlateBoundaryExplorer } from "./PlateBoundaryExplorer";

describe("PlateBoundaryExplorer", () => {
  test("starts showing the Convergent boundary", () => {
    const { container } = render(<PlateBoundaryExplorer />);
    const screen = within(container);
    expect(screen.getByTestId("boundary-name")).toHaveTextContent("Convergent (Colliding)");
    expect(screen.getByTestId("boundary-effect")).toHaveTextContent("mountains");
  });

  test("clicking Divergent shows new crust forming, sometimes volcanic", () => {
    const { container } = render(<PlateBoundaryExplorer />);
    const screen = within(container);
    fireEvent.click(screen.getByRole("button", { name: "Divergent (Separating)" }));
    expect(screen.getByTestId("boundary-name")).toHaveTextContent("Divergent (Separating)");
    expect(screen.getByTestId("boundary-effect")).toHaveTextContent("New crust forms");
    expect(screen.getByTestId("boundary-example")).toHaveTextContent("Mid-Atlantic Ridge");
  });

  test("clicking Transform shows earthquakes with little to no volcanic activity", () => {
    const { container } = render(<PlateBoundaryExplorer />);
    const screen = within(container);
    fireEvent.click(screen.getByRole("button", { name: "Transform (Sliding Past)" }));
    expect(screen.getByTestId("boundary-name")).toHaveTextContent("Transform (Sliding Past)");
    expect(screen.getByTestId("boundary-effect")).toHaveTextContent("earthquakes");
    expect(screen.getByTestId("boundary-effect")).toHaveTextContent("little to no volcanic activity");
    expect(screen.getByTestId("boundary-example")).toHaveTextContent("San Andreas Fault");
  });

  test("each boundary type shows a distinct effect, correcting the same-effect-everywhere misconception", () => {
    const { container } = render(<PlateBoundaryExplorer />);
    const screen = within(container);
    const convergentEffect = screen.getByTestId("boundary-effect").textContent;

    fireEvent.click(screen.getByRole("button", { name: "Divergent (Separating)" }));
    const divergentEffect = screen.getByTestId("boundary-effect").textContent;

    fireEvent.click(screen.getByRole("button", { name: "Transform (Sliding Past)" }));
    const transformEffect = screen.getByTestId("boundary-effect").textContent;

    expect(new Set([convergentEffect, divergentEffect, transformEffect]).size).toBe(3);
  });

  test("aria-pressed toggles to the newly selected boundary", () => {
    const { container } = render(<PlateBoundaryExplorer />);
    const screen = within(container);
    const convergentButton = screen.getByRole("button", { name: "Convergent (Colliding)" });
    const transformButton = screen.getByRole("button", { name: "Transform (Sliding Past)" });
    expect(convergentButton).toHaveAttribute("aria-pressed", "true");
    expect(transformButton).toHaveAttribute("aria-pressed", "false");

    fireEvent.click(transformButton);
    expect(transformButton).toHaveAttribute("aria-pressed", "true");
    expect(convergentButton).toHaveAttribute("aria-pressed", "false");
  });
});
