import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import ReleaseCentrePage from "./page";
import { releases } from "../lib/sample-data";

describe("ReleaseCentrePage", () => {
  test("renders every release with its name, status badge, and url note", () => {
    render(<ReleaseCentrePage />);

    for (const release of releases) {
      expect(screen.getByText(release.name)).toBeInTheDocument();
    }

    const uniqueUrlNotes = [...new Set(releases.map((release) => release.urlNote))];
    for (const urlNote of uniqueUrlNotes) {
      const matchCount = releases.filter((release) => release.urlNote === urlNote).length;
      expect(screen.getAllByText(urlNote)).toHaveLength(matchCount);
    }

    const liveCount = releases.filter((release) => release.status === "Live").length;
    const inProgressCount = releases.filter((release) => release.status === "In progress").length;

    expect(screen.getAllByText("Live")).toHaveLength(liveCount);
    expect(screen.getAllByText("In progress")).toHaveLength(inProgressCount);
  });

  test("renders the page title", () => {
    render(<ReleaseCentrePage />);

    expect(screen.getByRole("heading", { name: "Release Centre" })).toBeInTheDocument();
  });
});
