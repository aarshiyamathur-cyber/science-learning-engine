import "@testing-library/jest-dom/vitest";
import { fireEvent, render, within } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { PeriodicTableExplorer } from "./PeriodicTableExplorer";

describe("PeriodicTableExplorer", () => {
  test("starts showing Hydrogen's details", () => {
    const { container } = render(<PeriodicTableExplorer />);
    const screen = within(container);
    expect(screen.getByTestId("element-name")).toHaveTextContent("Hydrogen");
    expect(screen.getByTestId("element-atomic-number")).toHaveTextContent("1");
    expect(screen.getByTestId("element-classification")).toHaveTextContent("Non-metal");
  });

  test("clicking a metal tile updates the displayed info", () => {
    const { container } = render(<PeriodicTableExplorer />);
    const screen = within(container);
    fireEvent.click(screen.getByRole("button", { name: /^Na/ }));
    expect(screen.getByTestId("element-name")).toHaveTextContent("Sodium");
    expect(screen.getByTestId("element-atomic-number")).toHaveTextContent("11");
    expect(screen.getByTestId("element-classification")).toHaveTextContent("Metal");
  });

  test("clicking a non-metal tile updates the displayed info", () => {
    const { container } = render(<PeriodicTableExplorer />);
    const screen = within(container);
    fireEvent.click(screen.getByRole("button", { name: /^Cl/ }));
    expect(screen.getByTestId("element-name")).toHaveTextContent("Chlorine");
    expect(screen.getByTestId("element-atomic-number")).toHaveTextContent("17");
    expect(screen.getByTestId("element-classification")).toHaveTextContent("Non-metal");
  });
});
