import "@testing-library/jest-dom/vitest";
import { fireEvent, render, within } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { ForceFrictionSimulator } from "./ForceFrictionSimulator";

describe("ForceFrictionSimulator", () => {
  test("starts on ice with low friction", () => {
    const { container } = render(<ForceFrictionSimulator />);
    const screen = within(container);
    expect(screen.getByTestId("friction-level")).toHaveTextContent("Low friction");
    expect(screen.getByTestId("surface-caption")).toHaveTextContent(
      "Ice barely opposes the block's motion",
    );
  });

  test("clicking Wood floor shows medium friction and its caption", () => {
    const { container } = render(<ForceFrictionSimulator />);
    const screen = within(container);
    fireEvent.click(screen.getByRole("button", { name: "Wood floor" }));
    expect(screen.getByTestId("friction-level")).toHaveTextContent("Medium friction");
    expect(screen.getByTestId("surface-caption")).toHaveTextContent(
      "A wood floor opposes the block's motion more than ice does",
    );
  });

  test("clicking Rough carpet shows high friction and its caption", () => {
    const { container } = render(<ForceFrictionSimulator />);
    const screen = within(container);
    fireEvent.click(screen.getByRole("button", { name: "Rough carpet" }));
    expect(screen.getByTestId("friction-level")).toHaveTextContent("High friction");
    expect(screen.getByTestId("surface-caption")).toHaveTextContent(
      "Rough carpet strongly opposes the block's motion",
    );
  });

  test("clicking a surface marks it pressed and others not", () => {
    const { container } = render(<ForceFrictionSimulator />);
    const screen = within(container);
    const carpetButton = screen.getByRole("button", { name: "Rough carpet" });
    const iceButton = screen.getByRole("button", { name: "Ice" });

    expect(iceButton).toHaveAttribute("aria-pressed", "true");
    fireEvent.click(carpetButton);
    expect(carpetButton).toHaveAttribute("aria-pressed", "true");
    expect(iceButton).toHaveAttribute("aria-pressed", "false");
  });
});
