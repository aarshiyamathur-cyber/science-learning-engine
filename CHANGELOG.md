# Changelog

All notable changes to this project are recorded here. Format loosely follows [Keep a Changelog](https://keepachangelog.com/).

## [Unreleased] — Sprint 3: learner-experience polish — 2026-08-01

### Added

- Semantic design-token layer in `app/globals.css` (BL-020): color roles `brand`/`accent`/`success`/`warning`/`danger`/`info`/`neutral`, each aliasing an existing Tailwind color ramp, plus a named typography scale (`text-display` … `text-caption`) aliasing Tailwind's existing type scale.
- `app/components/ui/` shared primitives library: `Card`, `Badge`, `Button`, `ProgressBar`, all driven by the new `tone` roles instead of raw color names.
- `ContinueLearningScreen` reworked to use the new primitives (first real-screen usage).
- ADR 0007 documenting the design-token/primitives approach.

## [Unreleased] — Sprint 0: engineering foundation — 2026-07-30

### Added

- Next.js 16 (App Router) + TypeScript + Tailwind CSS scaffold.
- npm workspaces (`/packages`, `/workers`).
- `@aarshiya/curriculum-schema` — Zod schemas for Concept, Lesson, AssessmentQuestion, KnowledgeGraph.
- `@aarshiya/ollama-client` — local Ollama HTTP client, defaulting to `llama3:latest`.
- Curriculum data folders (`/curriculum/{concepts,lessons,assessments,graph}`) with two placeholder example concepts and a validation script (`npm run validate:curriculum`).
- Vitest (unit) and Playwright (e2e) test setup, each with a passing sample test.
- ESLint (`eslint-config-next`) + Prettier, reconciled via `eslint-config-prettier`.
- Engineering documentation: architecture overview, backlog, assumptions, ADRs 0001–0005.

### Decisions

See [docs/decisions](docs/decisions) for the full rationale behind each choice made this sprint.
