import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { Nav } from "./Nav";

vi.mock("next/navigation", () => ({
  usePathname: () => "/roadmap",
}));

describe("Nav", () => {
  test("renders all 6 nav links with the correct hrefs", () => {
    render(<Nav />);

    const expected = [
      ["Executive Dashboard", "/"],
      ["Roadmap", "/roadmap"],
      ["Sprint History", "/sprint-history"],
      ["Release Centre", "/release-centre"],
      ["Question Bank", "/question-bank"],
      ["Engineering Dashboard", "/engineering"],
    ] as const;

    for (const [label, href] of expected) {
      expect(screen.getByRole("link", { name: label })).toHaveAttribute("href", href);
    }
  });

  test("marks the active route's link as current", () => {
    render(<Nav />);

    expect(screen.getByRole("link", { name: "Roadmap" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(screen.getByRole("link", { name: "Executive Dashboard" })).not.toHaveAttribute(
      "aria-current",
    );
  });
});
