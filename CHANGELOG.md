# Changelog

All notable changes to this project are recorded here. Format loosely follows [Keep a Changelog](https://keepachangelog.com/).

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
