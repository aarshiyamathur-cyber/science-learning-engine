import "@testing-library/jest-dom/vitest";
import { fireEvent, render, within } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { EarthSunMoonExplorer } from "./EarthSunMoonExplorer";

describe("EarthSunMoonExplorer", () => {
  test("starts on Seasons mode showing Summer (December)", () => {
    const { container } = render(<EarthSunMoonExplorer />);
    const screen = within(container);
    expect(screen.getByRole("button", { name: "Seasons" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByTestId("season-name")).toHaveTextContent("Summer (December)");
    expect(screen.getByTestId("season-tilt")).toHaveTextContent("tilted toward the Sun");
  });

  test("clicking Winter (June) shows the hemisphere tilted away from the Sun", () => {
    const { container } = render(<EarthSunMoonExplorer />);
    const screen = within(container);
    fireEvent.click(screen.getByRole("button", { name: "Winter (June)" }));
    expect(screen.getByTestId("season-name")).toHaveTextContent("Winter (June)");
    expect(screen.getByTestId("season-tilt")).toHaveTextContent("tilted away from the Sun");
    expect(screen.getByTestId("season-length")).toHaveTextContent("Short days");
  });

  test("clicking Autumn (March) shows a side-on axis, not distance-driven, explanation", () => {
    const { container } = render(<EarthSunMoonExplorer />);
    const screen = within(container);
    fireEvent.click(screen.getByRole("button", { name: "Autumn (March)" }));
    expect(screen.getByTestId("season-tilt")).toHaveTextContent("side-on to the Sun");
    expect(screen.getByTestId("season-tilt")).not.toHaveTextContent("distance");
  });

  test("each season shows a distinct day-length note", () => {
    const { container } = render(<EarthSunMoonExplorer />);
    const screen = within(container);
    const summer = screen.getByTestId("season-length").textContent;

    fireEvent.click(screen.getByRole("button", { name: "Winter (June)" }));
    const winter = screen.getByTestId("season-length").textContent;

    fireEvent.click(screen.getByRole("button", { name: "Spring (September)" }));
    const spring = screen.getByTestId("season-length").textContent;

    expect(new Set([summer, winter, spring]).size).toBe(3);
  });

  test("switching to Moon Phases mode starts on New Moon", () => {
    const { container } = render(<EarthSunMoonExplorer />);
    const screen = within(container);
    fireEvent.click(screen.getByRole("button", { name: "Moon Phases" }));
    expect(screen.getByRole("button", { name: "Moon Phases" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByTestId("phase-name")).toHaveTextContent("New Moon");
    expect(screen.getByTestId("phase-visible")).toHaveTextContent("None of the Moon's sunlit half is visible");
  });

  test("clicking Full Moon shows the entire sunlit half visible, not a shadow", () => {
    const { container } = render(<EarthSunMoonExplorer />);
    const screen = within(container);
    fireEvent.click(screen.getByRole("button", { name: "Moon Phases" }));
    fireEvent.click(screen.getByRole("button", { name: "Full Moon" }));
    expect(screen.getByTestId("phase-name")).toHaveTextContent("Full Moon");
    expect(screen.getByTestId("phase-visible")).toHaveTextContent("All of the Moon's sunlit half is visible");
    expect(screen.getByTestId("phase-detail")).not.toHaveTextContent("shadow");
  });

  test("First Quarter and Third Quarter both show half-lit but are distinct phases", () => {
    const { container } = render(<EarthSunMoonExplorer />);
    const screen = within(container);
    fireEvent.click(screen.getByRole("button", { name: "Moon Phases" }));

    fireEvent.click(screen.getByRole("button", { name: "First Quarter" }));
    const firstQuarterDetail = screen.getByTestId("phase-detail").textContent;

    fireEvent.click(screen.getByRole("button", { name: "Third Quarter" }));
    const thirdQuarterDetail = screen.getByTestId("phase-detail").textContent;

    expect(screen.getByTestId("phase-visible")).toHaveTextContent("Half of the Moon's sunlit half is visible");
    expect(firstQuarterDetail).not.toEqual(thirdQuarterDetail);
  });

  test("aria-pressed toggles to the newly selected phase", () => {
    const { container } = render(<EarthSunMoonExplorer />);
    const screen = within(container);
    fireEvent.click(screen.getByRole("button", { name: "Moon Phases" }));
    const newMoonButton = screen.getByRole("button", { name: "New Moon" });
    const fullMoonButton = screen.getByRole("button", { name: "Full Moon" });
    expect(newMoonButton).toHaveAttribute("aria-pressed", "true");
    expect(fullMoonButton).toHaveAttribute("aria-pressed", "false");

    fireEvent.click(fullMoonButton);
    expect(fullMoonButton).toHaveAttribute("aria-pressed", "true");
    expect(newMoonButton).toHaveAttribute("aria-pressed", "false");
  });
});
