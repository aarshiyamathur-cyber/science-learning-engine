# ADR 0002 — npm workspaces for `/packages` and `/workers`

- **Date:** 2026-07-30
- **Status:** Accepted

## Decision

Use npm workspaces (`"workspaces": ["packages/*", "workers/*"]` in the root `package.json`) so code under `/packages` and `/workers` is installed, type-checked, and tested as part of the same repo without publishing to a registry.

## Reason

The brief's "everything is reusable" principle means the codebase will accumulate many small, independently-testable units (curriculum schema, game systems, the Ollama client, future learning-engine pieces). Workspaces let each live as a real package with its own `package.json` and dependency boundary, importable from the app via a stable name (`@aarshiya/curriculum-schema`) instead of relative-path spaghetti (`../../../packages/curriculum-schema/src`), while still sharing one `node_modules`, one lockfile, and one CI run.

## Alternatives considered

- **Everything in one flat `/lib` folder with relative imports:** simpler to set up, but relative imports get unwieldy as the number of reusable units grows, and there's no natural place to put a package-local test or dependency.
- **A monorepo tool (Turborepo, Nx):** adds real value at a much larger scale (many packages, need for build caching/task orchestration) — premature for a two-package repo. Revisit if `/packages` and `/workers` grow past a handful of units and build times become a problem.
- **pnpm/yarn workspaces:** functionally similar; npm was already the brief's stated package manager, so no reason to introduce a second tool.

## Impact

Every new reusable unit gets its own `package.json` under `/packages` or `/workers` and is added as a workspace dependency where consumed (see `packages/curriculum-schema` and `workers/ollama-client` for the pattern). `npm install` at the root handles everything.
