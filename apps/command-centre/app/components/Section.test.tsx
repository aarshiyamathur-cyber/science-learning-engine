import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Section } from "./Section";

describe("Section", () => {
  test("renders the title label and its children", () => {
    render(
      <Section title="Key Metrics">
        <p>Some content</p>
      </Section>,
    );

    expect(screen.getByText("Key Metrics")).toBeInTheDocument();
    expect(screen.getByText("Some content")).toBeInTheDocument();
  });
});
