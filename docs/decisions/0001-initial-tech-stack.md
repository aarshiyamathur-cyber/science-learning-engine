# ADR 0001 — Initial technology stack

- **Date:** 2026-07-30
- **Status:** Accepted

## Decision

TypeScript, React, Next.js (App Router), Tailwind CSS, Node.js, npm, Vitest, Playwright, ESLint, Prettier. Curriculum content as YAML.

## Reason

This was the project brief's stated preference, and no discovered constraint argues against it. It's a mainstream, well-documented stack with strong typing and a mature testing story, which matters for a codebase expected to run for years with intermittent engineering attention.

## Alternatives considered

- **Remix / SvelteKit / plain Vite+React:** all viable, but Next.js's App Router gives file-based routing and server components out of the box, and the brief already named it — switching would need a concrete reason, which wasn't present.
- **Jest instead of Vitest:** Vitest has faster iteration (native ESM/Vite transform, no separate ts-jest config) and integrates with the same Vite tooling as the rest of the frontend stack.
- **YAML vs JSON for curriculum data:** YAML chosen for human-editability (comments, multi-line strings for descriptions) since curriculum content will be hand-authored/reviewed far more often than machine-generated.

## Impact

Locks in a conventional, well-supported stack. Revisit only if a specific pain point emerges (e.g. Next.js's App Router conventions proving awkward for the game/curriculum split) — not preemptively.
