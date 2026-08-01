# Changelog

All notable changes to this project are recorded here. Format loosely follows [Keep a Changelog](https://keepachangelog.com/).

## [Unreleased] — Sprint 4: interactive science — 2026-08-01

### Added

- `AtomBuilder` widget (BL-028): a standalone, reusable component with +/- controls for protons/neutrons/electrons and a live-updating SVG atom model (nucleus cluster colored by particle type, electrons filling three simplified shells of 2/8/remainder). Needs no lesson-specific or curriculum-specific data to use; built entirely from the existing `app/components/ui` primitives and tone system. Not wired into the existing "Matter" lesson — see DEC-004.

## [Unreleased] — Sprint 3: learner-experience polish — 2026-08-01

### Added

- Semantic design-token layer in `app/globals.css` (BL-020): color roles `brand`/`accent`/`success`/`warning`/`danger`/`info`/`neutral`, each aliasing an existing Tailwind color ramp, plus a named typography scale (`text-display` … `text-caption`) aliasing Tailwind's existing type scale.
- `app/components/ui/` shared primitives library: `Card`, `Badge`, `Button`, `ProgressBar`, all driven by the new `tone` roles instead of raw color names.
- `ContinueLearningScreen` reworked to use the new primitives (first real-screen usage).
- ADR 0007 documenting the design-token/primitives approach.
- Asset library (BL-021): 6 hand-authored SVGs under `/assets` (4 step-type icons, 2 illustrations) with React-consumable copies in `app/components/icons/`.
- `LessonPlayer` migrated onto the design system (BL-022): illustrations on the Continue Learning and completion screens.
- Explicit voice-answer mode for short-answer questions (BL-023), via the Web Speech API, with a visible "listening" state and a visible fallback message on unsupported browsers.
- `explanation` field on `AssessmentQuestion` and immediate correct/incorrect feedback with a "Try again" retry path (BL-024).

### Fixed

- Short-answer questions previously had no way to actually type an answer before self-assessing — direct feedback from Aarshiya's first use of the app.

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
