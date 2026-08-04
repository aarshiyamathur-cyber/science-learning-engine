import "@testing-library/jest-dom/vitest";
import { fireEvent, render, within } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { InheritanceExplorer } from "./InheritanceExplorer";

describe("InheritanceExplorer", () => {
  test("starts showing Eye colour as Inherited, passed to offspring", () => {
    const { container } = render(<InheritanceExplorer />);
    const screen = within(container);
    expect(screen.getByTestId("scenario-name")).toHaveTextContent("Eye colour");
    expect(screen.getByTestId("classification-label")).toHaveTextContent("Inherited");
    expect(screen.getByTestId("group-label")).toHaveTextContent("Passed to offspring");
  });

  test("clicking the scar scenario shows Acquired, not passed to offspring", () => {
    const { container } = render(<InheritanceExplorer />);
    const screen = within(container);
    fireEvent.click(screen.getByRole("button", { name: "A scar from a cut" }));
    expect(screen.getByTestId("scenario-name")).toHaveTextContent("A scar from a cut");
    expect(screen.getByTestId("classification-label")).toHaveTextContent("Acquired");
    expect(screen.getByTestId("group-label")).toHaveTextContent("Not passed to offspring");
    expect(screen.getByTestId("scenario-explanation")).toHaveTextContent("not because of their genes");
  });

  test("clicking the strawberry runner scenario shows Asexual reproduction, one parent identical", () => {
    const { container } = render(<InheritanceExplorer />);
    const screen = within(container);
    fireEvent.click(screen.getByRole("button", { name: "A strawberry plant runner" }));
    expect(screen.getByTestId("scenario-name")).toHaveTextContent("A strawberry plant runner");
    expect(screen.getByTestId("classification-label")).toHaveTextContent("Asexual reproduction");
    expect(screen.getByTestId("group-label")).toHaveTextContent("One parent, genetically identical");
  });

  test("clicking the dog breeding scenario shows Sexual reproduction, two parents varied", () => {
    const { container } = render(<InheritanceExplorer />);
    const screen = within(container);
    fireEvent.click(screen.getByRole("button", { name: "Two dogs breeding puppies" }));
    expect(screen.getByTestId("scenario-name")).toHaveTextContent("Two dogs breeding puppies");
    expect(screen.getByTestId("classification-label")).toHaveTextContent("Sexual reproduction");
    expect(screen.getByTestId("group-label")).toHaveTextContent("Two parents, genetically varied");
    expect(screen.getByTestId("scenario-explanation")).toHaveTextContent("genetically different");
  });

  test("aria-pressed toggles to the newly selected scenario", () => {
    const { container } = render(<InheritanceExplorer />);
    const screen = within(container);
    const eyeColourButton = screen.getByRole("button", { name: "Eye colour" });
    const dogButton = screen.getByRole("button", { name: "Two dogs breeding puppies" });
    expect(eyeColourButton).toHaveAttribute("aria-pressed", "true");
    expect(dogButton).toHaveAttribute("aria-pressed", "false");

    fireEvent.click(dogButton);
    expect(dogButton).toHaveAttribute("aria-pressed", "true");
    expect(eyeColourButton).toHaveAttribute("aria-pressed", "false");
  });
});
