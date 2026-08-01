import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Badge, Button, Card, ProgressBar } from "./index";

describe("ui primitives", () => {
  test("Badge renders its label and icon", () => {
    render(
      <Badge tone="success" icon="✓">
        Nice work
      </Badge>,
    );
    expect(screen.getByText("Nice work")).toBeInTheDocument();
    expect(screen.getByText("✓")).toBeInTheDocument();
  });

  test("Card renders its children", () => {
    render(
      <Card tone="danger">
        <p>Not quite</p>
      </Card>,
    );
    expect(screen.getByText("Not quite")).toBeInTheDocument();
  });

  test("Button forwards click handling and disabled state", () => {
    render(
      <Button variant="solid" tone="brand" disabled>
        Check my answer
      </Button>,
    );
    const button = screen.getByRole("button", { name: "Check my answer" });
    expect(button).toBeDisabled();
  });

  test("ProgressBar clamps value into a 0-100% label", () => {
    render(<ProgressBar value={1.5} />);
    expect(screen.getByText("100% mastered")).toBeInTheDocument();
  });
});
