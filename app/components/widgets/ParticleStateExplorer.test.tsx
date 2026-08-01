import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { ParticleStateExplorer } from "./ParticleStateExplorer";

describe("ParticleStateExplorer", () => {
  test("starts in the Solid state with its caption", () => {
    render(<ParticleStateExplorer />);
    expect(
      screen.getByText(/Particles are packed tightly and only vibrate in place/),
    ).toBeInTheDocument();
  });

  test("tapping Gas updates the caption", () => {
    render(<ParticleStateExplorer />);

    fireEvent.click(screen.getByRole("button", { name: "Gas" }));

    expect(
      screen.getByText(/Particles spread far apart and move quickly in every direction/),
    ).toBeInTheDocument();
  });

  test("tapping Liquid updates the caption", () => {
    render(<ParticleStateExplorer />);

    fireEvent.click(screen.getByRole("button", { name: "Liquid" }));

    expect(
      screen.getByText(/Particles stay close together but slide and drift/),
    ).toBeInTheDocument();
  });
});
