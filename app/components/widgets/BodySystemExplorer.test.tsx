import "@testing-library/jest-dom/vitest";
import { fireEvent, render, within } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { BodySystemExplorer } from "./BodySystemExplorer";

describe("BodySystemExplorer", () => {
  test("starts showing the digestive system's details", () => {
    const { container } = render(<BodySystemExplorer />);
    const screen = within(container);
    expect(screen.getByTestId("system-name")).toHaveTextContent("Digestive system");
    expect(screen.getByTestId("system-function")).toHaveTextContent(
      "Breaks down food into nutrients the body can use.",
    );
    expect(screen.getByTestId("organ-Stomach")).toHaveTextContent("Breaks down food");
    expect(screen.getByTestId("organ-Small intestine")).toHaveTextContent("Absorbs nutrients");
  });

  test("clicking the circulatory system shows its function and organs", () => {
    const { container } = render(<BodySystemExplorer />);
    const screen = within(container);
    fireEvent.click(screen.getByRole("button", { name: /Circulatory system/ }));
    expect(screen.getByTestId("system-name")).toHaveTextContent("Circulatory system");
    expect(screen.getByTestId("system-function")).toHaveTextContent(
      "Carries blood, oxygen, and nutrients around the body.",
    );
    expect(screen.getByTestId("organ-Heart")).toHaveTextContent("Pumps blood");
    expect(screen.getByTestId("organ-Blood vessels")).toHaveTextContent(
      "Carry blood around the body",
    );
  });

  test("clicking the respiratory system shows its function and organs", () => {
    const { container } = render(<BodySystemExplorer />);
    const screen = within(container);
    fireEvent.click(screen.getByRole("button", { name: /Respiratory system/ }));
    expect(screen.getByTestId("system-name")).toHaveTextContent("Respiratory system");
    expect(screen.getByTestId("system-function")).toHaveTextContent(
      "Brings oxygen into the body and removes carbon dioxide.",
    );
    expect(screen.getByTestId("organ-Lungs")).toHaveTextContent(
      "Exchange oxygen and carbon dioxide",
    );
    expect(screen.getByTestId("organ-Diaphragm")).toHaveTextContent("Drives breathing");
  });

  test("aria-pressed toggles to the newly selected system", () => {
    const { container } = render(<BodySystemExplorer />);
    const screen = within(container);
    const digestiveButton = screen.getByRole("button", { name: /Digestive system/ });
    const respiratoryButton = screen.getByRole("button", { name: /Respiratory system/ });
    expect(digestiveButton).toHaveAttribute("aria-pressed", "true");
    expect(respiratoryButton).toHaveAttribute("aria-pressed", "false");

    fireEvent.click(respiratoryButton);
    expect(respiratoryButton).toHaveAttribute("aria-pressed", "true");
    expect(digestiveButton).toHaveAttribute("aria-pressed", "false");
  });
});
