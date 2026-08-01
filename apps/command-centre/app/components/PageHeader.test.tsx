import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { PageHeader } from "./PageHeader";

describe("PageHeader", () => {
  test("renders the title as a heading and the description", () => {
    render(<PageHeader title="Roadmap" description="The backlog laid out across sprints." />);

    expect(screen.getByRole("heading", { name: "Roadmap" })).toBeInTheDocument();
    expect(screen.getByText("The backlog laid out across sprints.")).toBeInTheDocument();
  });
});
