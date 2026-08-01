import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import RoadmapPage from "./page";
import { roadmapItems } from "../lib/sample-data";

describe("RoadmapPage", () => {
  test("renders every roadmap item with its status badge text", () => {
    render(<RoadmapPage />);

    for (const item of roadmapItems) {
      expect(screen.getByText(item.title)).toBeInTheDocument();
    }

    const doneCount = roadmapItems.filter((item) => item.status === "Done").length;
    const inProgressCount = roadmapItems.filter((item) => item.status === "In progress").length;

    expect(screen.getAllByText("Done")).toHaveLength(doneCount);
    expect(screen.getAllByText("In progress")).toHaveLength(inProgressCount);
  });
});
