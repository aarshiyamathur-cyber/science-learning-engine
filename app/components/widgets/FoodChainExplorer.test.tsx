import "@testing-library/jest-dom/vitest";
import { fireEvent, render, within } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { FoodChainExplorer } from "./FoodChainExplorer";

describe("FoodChainExplorer", () => {
  test("starts showing the Producer with no previous-step energy note", () => {
    const { container } = render(<FoodChainExplorer />);
    const screen = within(container);
    expect(screen.getByTestId("level-name")).toHaveTextContent("Producer");
    expect(screen.getByTestId("level-example")).toHaveTextContent("Grass");
    expect(screen.getByTestId("level-role")).toHaveTextContent(
      "Makes its own food using energy captured from sunlight.",
    );
    expect(screen.getByTestId("energy-note")).toHaveTextContent(
      "Producers don't receive energy from a previous step",
    );
  });

  test("clicking Primary Consumer shows its role, example, and the ~10% energy note", () => {
    const { container } = render(<FoodChainExplorer />);
    const screen = within(container);
    fireEvent.click(screen.getByRole("button", { name: "Primary Consumer" }));
    expect(screen.getByTestId("level-name")).toHaveTextContent("Primary Consumer");
    expect(screen.getByTestId("level-example")).toHaveTextContent("Rabbit");
    expect(screen.getByTestId("energy-note")).toHaveTextContent(
      "Only about 10% of the energy in the producer passes on to the primary consumer",
    );
    expect(screen.getByTestId("energy-note")).toHaveTextContent("lost as heat");
  });

  test("clicking Secondary Consumer shows its role, example, and energy note", () => {
    const { container } = render(<FoodChainExplorer />);
    const screen = within(container);
    fireEvent.click(screen.getByRole("button", { name: "Secondary Consumer" }));
    expect(screen.getByTestId("level-name")).toHaveTextContent("Secondary Consumer");
    expect(screen.getByTestId("level-example")).toHaveTextContent("Fox");
    expect(screen.getByTestId("energy-note")).toHaveTextContent(
      "Only about 10% of the energy in the primary consumer passes on to the secondary consumer",
    );
  });

  test("clicking Decomposer shows its role, example, and energy note", () => {
    const { container } = render(<FoodChainExplorer />);
    const screen = within(container);
    fireEvent.click(screen.getByRole("button", { name: "Decomposer" }));
    expect(screen.getByTestId("level-name")).toHaveTextContent("Decomposer");
    expect(screen.getByTestId("level-example")).toHaveTextContent("Fungi and bacteria");
    expect(screen.getByTestId("level-role")).toHaveTextContent(
      "Breaks down dead organisms and waste, returning nutrients to the soil.",
    );
  });

  test("aria-pressed toggles to the newly selected level", () => {
    const { container } = render(<FoodChainExplorer />);
    const screen = within(container);
    const producerButton = screen.getByRole("button", { name: "Producer" });
    const decomposerButton = screen.getByRole("button", { name: "Decomposer" });
    expect(producerButton).toHaveAttribute("aria-pressed", "true");
    expect(decomposerButton).toHaveAttribute("aria-pressed", "false");

    fireEvent.click(decomposerButton);
    expect(decomposerButton).toHaveAttribute("aria-pressed", "true");
    expect(producerButton).toHaveAttribute("aria-pressed", "false");
  });
});
