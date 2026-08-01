import "@testing-library/jest-dom/vitest";
import { fireEvent, render, within } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { AtomBuilder } from "./index";

const PROTON_COLOR = "#f43f5e";
const NEUTRON_COLOR = "#a1a1aa";
const ELECTRON_COLOR = "#0ea5e9";

describe("AtomBuilder", () => {
  test("starts every particle count at 0", () => {
    const { container } = render(<AtomBuilder />);
    const screen = within(container);
    expect(screen.getByTestId("protons-count")).toHaveTextContent("0");
    expect(screen.getByTestId("neutrons-count")).toHaveTextContent("0");
    expect(screen.getByTestId("electrons-count")).toHaveTextContent("0");
    expect(
      screen.getByRole("img", { name: "Atom model with 0 protons, 0 neutrons, and 0 electrons" }),
    ).toBeInTheDocument();
  });

  test("clicking + on protons immediately updates the count and the visual model", () => {
    const { container } = render(<AtomBuilder />);
    const screen = within(container);
    fireEvent.click(screen.getByRole("button", { name: "Add protons" }));
    expect(screen.getByTestId("protons-count")).toHaveTextContent("1");
    expect(container.querySelectorAll(`circle[fill="${PROTON_COLOR}"]`)).toHaveLength(1);
    expect(screen.getByText("Mass number 1 · Charge +1")).toBeInTheDocument();
  });

  test("clicking + on neutrons immediately updates the count and the visual model", () => {
    const { container } = render(<AtomBuilder />);
    const screen = within(container);
    fireEvent.click(screen.getByRole("button", { name: "Add neutrons" }));
    fireEvent.click(screen.getByRole("button", { name: "Add neutrons" }));
    expect(screen.getByTestId("neutrons-count")).toHaveTextContent("2");
    expect(container.querySelectorAll(`circle[fill="${NEUTRON_COLOR}"]`)).toHaveLength(2);
    expect(screen.getByText("Mass number 2 · Charge neutral")).toBeInTheDocument();
  });

  test("clicking + on electrons immediately updates the count and the visual model", () => {
    const { container } = render(<AtomBuilder />);
    const screen = within(container);
    fireEvent.click(screen.getByRole("button", { name: "Add electrons" }));
    expect(screen.getByTestId("electrons-count")).toHaveTextContent("1");
    expect(container.querySelectorAll(`circle[fill="${ELECTRON_COLOR}"]`)).toHaveLength(1);
    expect(screen.getByText("Mass number 0 · Charge -1")).toBeInTheDocument();
  });

  test("clicking - decrements a count, and the button disables at 0", () => {
    const { container } = render(<AtomBuilder />);
    const screen = within(container);
    const removeButton = screen.getByRole("button", { name: "Remove protons" });
    expect(removeButton).toBeDisabled();

    fireEvent.click(screen.getByRole("button", { name: "Add protons" }));
    fireEvent.click(screen.getByRole("button", { name: "Add protons" }));
    expect(screen.getByTestId("protons-count")).toHaveTextContent("2");
    expect(removeButton).not.toBeDisabled();

    fireEvent.click(removeButton);
    expect(screen.getByTestId("protons-count")).toHaveTextContent("1");
  });

  test("electrons overflow into a second shell once the first shell's capacity of 2 is exceeded", () => {
    const { container } = render(<AtomBuilder />);
    const screen = within(container);
    const addElectron = screen.getByRole("button", { name: "Add electrons" });

    fireEvent.click(addElectron);
    fireEvent.click(addElectron);
    expect(
      screen.getByRole("img", { name: "Atom model with 0 protons, 0 neutrons, and 2 electrons" }),
    ).toBeInTheDocument();

    fireEvent.click(addElectron);
    expect(screen.getByTestId("electrons-count")).toHaveTextContent("3");
    expect(
      screen.getByRole("img", { name: "Atom model with 0 protons, 0 neutrons, and 3 electrons" }),
    ).toBeInTheDocument();
  });
});
