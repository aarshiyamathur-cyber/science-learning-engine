import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// Without this, each component test's rendered DOM accumulates across tests
// in the same file — a later `getByRole`/`getByText` can match elements left
// over from an earlier test and fail with "found multiple elements."
afterEach(() => {
  cleanup();
});
