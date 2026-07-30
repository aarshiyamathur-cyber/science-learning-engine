# Tests

Shared test infrastructure that doesn't belong next to a single package:

- `e2e/` — Playwright end-to-end specs (whole-app user flows).
- `fixtures/` — shared sample curriculum data and test fixtures reused across packages.

Unit tests for a package live alongside its source (e.g. `packages/curriculum-schema/src/index.test.ts`), not here.
