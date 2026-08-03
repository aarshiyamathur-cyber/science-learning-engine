import "@testing-library/jest-dom/vitest";
import { fireEvent, render, within } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { ReactionSimulator } from "./ReactionSimulator";

describe("ReactionSimulator", () => {
  test("starts on the vinegar + baking soda reaction", () => {
    const { container } = render(<ReactionSimulator />);
    const screen = within(container);
    expect(screen.getByTestId("word-equation")).toHaveTextContent(
      "vinegar + baking soda -> carbon dioxide gas + water + sodium acetate",
    );
    expect(screen.getByTestId("reaction-sign")).toHaveTextContent("Gas produced");
  });

  test("clicking Iron + Oxygen shows its word equation and sign of reaction", () => {
    const { container } = render(<ReactionSimulator />);
    const screen = within(container);
    fireEvent.click(screen.getByRole("button", { name: "Iron + Oxygen" }));
    expect(screen.getByTestId("word-equation")).toHaveTextContent(
      "iron + oxygen -> iron oxide (rust)",
    );
    expect(screen.getByTestId("reaction-sign")).toHaveTextContent("Colour change");
  });

  test("clicking Fuel + Oxygen shows its word equation and sign of reaction", () => {
    const { container } = render(<ReactionSimulator />);
    const screen = within(container);
    fireEvent.click(screen.getByRole("button", { name: "Fuel + Oxygen" }));
    expect(screen.getByTestId("word-equation")).toHaveTextContent(
      "fuel + oxygen -> carbon dioxide + water + energy (heat and light)",
    );
    expect(screen.getByTestId("reaction-sign")).toHaveTextContent(
      "Temperature change / light produced",
    );
  });

  test("clicking a reactant pair marks it pressed and others not", () => {
    const { container } = render(<ReactionSimulator />);
    const screen = within(container);
    const ironButton = screen.getByRole("button", { name: "Iron + Oxygen" });
    const vinegarButton = screen.getByRole("button", { name: "Vinegar + Baking Soda" });

    expect(vinegarButton).toHaveAttribute("aria-pressed", "true");
    fireEvent.click(ironButton);
    expect(ironButton).toHaveAttribute("aria-pressed", "true");
    expect(vinegarButton).toHaveAttribute("aria-pressed", "false");
  });
});
