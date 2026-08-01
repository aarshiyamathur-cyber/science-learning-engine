# ADR 0006 — Use `node:sqlite` instead of `better-sqlite3`

- **Date:** 2026-08-01
- **Status:** Accepted

## Decision

Implement learner-progress persistence (BL-017, superseding BL-013/ADR 0004) using Node's built-in `node:sqlite` module (`DatabaseSync`), not `better-sqlite3` as originally planned in the project brief and backlog.

## Reason

`better-sqlite3` is a native addon requiring compilation via `node-gyp`, which in turn requires Visual Studio Build Tools ("Desktop development with C++"). That toolchain is not installed on the development machine and is a heavy, unrelated install just to get a database working. `node:sqlite` ships inside Node.js itself (stable as of the Node version this project runs on) with an equivalent synchronous API, zero extra dependencies, and no native compilation step — a better fit for "local-first, no cloud dependency, no paid service" and for keeping the toolchain approachable.

`@types/node` was bumped from `^20` to `^24` to get `node:sqlite`'s type declarations, matching the actual Node runtime version already in use.

## Alternatives considered

- **`better-sqlite3`:** rejected for this environment — requires a C++ build toolchain not present, and installing one just for a demo-scale SQLite database is disproportionate.
- **Drizzle ORM (over either driver):** not rejected outright, just unnecessary at this scale — a handful of tables (learner profile, mastery state, attempt records) with simple CRUD doesn't need a query-builder/ORM layer yet. Can be revisited if the schema grows significantly.
- **`sql.js` (WASM-compiled SQLite):** avoided — adds a WASM dependency and async-loading complexity for no benefit over a module already built into the runtime.

## Impact

`packages/learning-engine/src/persistence.ts` uses `node:sqlite`'s `DatabaseSync` directly. Any future package needing SQLite should follow the same pattern rather than reaching for `better-sqlite3`, unless a concrete need (e.g. a runtime without `node:sqlite` support) justifies revisiting this.
