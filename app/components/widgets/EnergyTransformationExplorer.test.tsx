import "@testing-library/jest-dom/vitest";
import { fireEvent, render, within } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { EnergyTransformationExplorer } from "./EnergyTransformationExplorer";

describe("EnergyTransformationExplorer", () => {
  test("starts on the torch scenario", () => {
    const { container } = render(<EnergyTransformationExplorer />);
    const screen = within(container);
    expect(screen.getByTestId("energy-chain")).toHaveTextContent(
      "Chemical energy (battery) → Electrical energy → Light energy + heat",
    );
    expect(screen.getByTestId("scenario-caption")).toHaveTextContent(
      "The battery's stored chemical energy becomes electricity",
    );
  });

  test("clicking Swinging pendulum shows its chain, caption, and the animated potential/kinetic visual", () => {
    const { container } = render(<EnergyTransformationExplorer />);
    const screen = within(container);
    fireEvent.click(screen.getByRole("button", { name: "Swinging pendulum" }));
    expect(screen.getByTestId("energy-chain")).toHaveTextContent(
      "Gravitational potential energy (at the top) → Kinetic energy (at the bottom)",
    );
    expect(screen.getByTestId("scenario-caption")).toHaveTextContent(
      "energy shifts between potential and kinetic",
    );
    expect(
      screen.getByRole("img", {
        name: "A pendulum swinging back and forth, with a potential energy bar and a kinetic energy bar that trade height as it swings",
      }),
    ).toBeInTheDocument();
  });

  test("clicking Rubbing your hands together shows its chain and caption", () => {
    const { container } = render(<EnergyTransformationExplorer />);
    const screen = within(container);
    fireEvent.click(screen.getByRole("button", { name: "Rubbing your hands together" }));
    expect(screen.getByTestId("energy-chain")).toHaveTextContent(
      "Kinetic energy (moving hands) → Heat (thermal energy)",
    );
    expect(screen.getByTestId("scenario-caption")).toHaveTextContent(
      "transformed into heat you can feel",
    );
  });

  test("clicking a scenario marks it pressed and others not", () => {
    const { container } = render(<EnergyTransformationExplorer />);
    const screen = within(container);
    const pendulumButton = screen.getByRole("button", { name: "Swinging pendulum" });
    const torchButton = screen.getByRole("button", { name: "Torch" });

    expect(torchButton).toHaveAttribute("aria-pressed", "true");
    fireEvent.click(pendulumButton);
    expect(pendulumButton).toHaveAttribute("aria-pressed", "true");
    expect(torchButton).toHaveAttribute("aria-pressed", "false");
  });
});
