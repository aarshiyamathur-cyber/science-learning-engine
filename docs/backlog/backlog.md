# Backlog

Each item: unique ID, title, description, dependencies, priority, status, acceptance criteria, estimate, notes.

## Done (Sprint 0)

### BL-001 — Repository & tooling foundation

- **Description:** Next.js 16 + TypeScript + Tailwind app scaffolded; ESLint, Prettier, Vitest, Playwright configured; npm workspaces set up for `/packages` and `/workers`.
- **Dependencies:** none
- **Priority:** P0
- **Status:** Done
- **Acceptance criteria:** `npm run build`, `npm run lint`, `npm run typecheck`, `npm test` all pass locally.
- **Estimate:** —
- **Notes:** See [ADR 0001](decisions/0001-initial-tech-stack.md).

### BL-002 — Curriculum schema package

- **Description:** `@aarshiya/curriculum-schema` with Zod schemas for Concept, Lesson, AssessmentQuestion, KnowledgeGraph.
- **Dependencies:** BL-001
- **Priority:** P0
- **Status:** Done
- **Acceptance criteria:** Schemas cover every field listed in the project brief (id, title, description, objectives, misconceptions, prerequisites, unlocks, mastery threshold, revision strategy, lesson/assessment refs); unit tests cover valid and invalid input.
- **Estimate:** —
- **Notes:** See [ADR 0003](decisions/0003-curriculum-as-yaml-plus-zod.md).

### BL-003 — Curriculum validation pipeline

- **Description:** `npm run validate:curriculum` loads every YAML file under `/curriculum` and validates it against the schema, including cross-references (lesson/assessment → concept id, graph edges → concept id).
- **Dependencies:** BL-002
- **Priority:** P0
- **Status:** Done
- **Acceptance criteria:** Script exits non-zero with a clear file-level error message on invalid data; exits 0 with a summary count on success.
- **Estimate:** —
- **Notes:** Two example concepts included to exercise the pipeline end-to-end; not real curriculum content.

### BL-004 — Local AI worker (Ollama)

- **Description:** `@aarshiya/ollama-client` wraps the local Ollama HTTP API, defaulting to `llama3:latest`.
- **Dependencies:** BL-001
- **Priority:** P1
- **Status:** Done
- **Acceptance criteria:** `generate()` and `chat()` helpers; throws a typed `OllamaUnavailableError` when the local server isn't reachable rather than crashing; unit-tested with a mocked `fetch`.
- **Estimate:** —
- **Notes:** See [ADR 0005](decisions/0005-local-ollama-as-default-ai-backend.md).

## Next (Sprint 1 — approved by Product Owner via `management/CURRENT_SPRINT.md`)

Sprint 1 goal: build the curriculum and learning engine foundation (core models, knowledge graph, lesson model, learner profile, progression engine). No gameplay/UI work this sprint.

### BL-010 — Core domain models: Learner profile & attempt record

- **Description:** `packages/learning-engine` with typed models for `LearnerProfile`, `MasteryState` (per concept), and `AttemptRecord` (a single quiz/assessment attempt).
- **Dependencies:** BL-002
- **Priority:** P0
- **Status:** Not started
- **Acceptance criteria:** Zod schemas + TypeScript types; unit tests for valid/invalid shapes, consistent with `@aarshiya/curriculum-schema` conventions.
- **Estimate:** TBD
- **Notes:** Foundation for BL-013 and BL-014.

### BL-011 — Knowledge graph traversal engine

- **Description:** Given the concept graph (prerequisites/unlocks edges from `@aarshiya/curriculum-schema`), provide traversal operations: cycle detection, "what's unlocked given a set of mastered concepts," topological ordering.
- **Dependencies:** BL-002
- **Priority:** P0
- **Status:** Not started
- **Acceptance criteria:** Pure functions, no I/O; unit tests including a cyclic-graph rejection case.
- **Estimate:** TBD
- **Notes:** Operates on data already defined by the curriculum schema; no new data format.

### BL-012 — Lesson model runtime loader

- **Description:** A loader that reads validated Lesson YAML (via the existing `validate:curriculum` pipeline) and returns typed `Lesson` objects ready for consumption by any future UI or engine code.
- **Dependencies:** BL-003
- **Priority:** P1
- **Status:** Not started
- **Acceptance criteria:** Given a curriculum directory, returns an indexed map of lessons by id; throws a typed error on an unresolvable reference.
- **Estimate:** TBD

### BL-013 — Learner profile persistence

- **Description:** Wire up SQLite (via `better-sqlite3` or Drizzle) to persist `LearnerProfile`, `MasteryState`, and `AttemptRecord` from BL-010.
- **Dependencies:** BL-010
- **Priority:** P1
- **Status:** Not started
- **Acceptance criteria:** CRUD for the three model types; unit tests against a temp SQLite file.
- **Estimate:** TBD
- **Notes:** Supersedes the original BL-005 placeholder now that the concrete state to persist is defined — see [ADR 0004](decisions/0004-defer-sqlite-persistence.md).

### BL-014 — Progression engine v0

- **Description:** Given a `LearnerProfile` and the knowledge graph, compute per-concept mastery against `masteryThreshold` from a stream of `AttemptRecord`s, and recommend the next unlocked concept(s).
- **Dependencies:** BL-011, BL-013
- **Priority:** P1
- **Status:** Not started
- **Acceptance criteria:** TBD — scoring model needs Product Owner input before finalizing.
- **Estimate:** TBD
- **Notes:** Supersedes the original BL-007 placeholder; this is the core of the learning engine per the project vision.

## Later / Deferred (not in Sprint 1 scope)

### BL-006 — First reusable UI component: Quiz Card

- **Description:** A reusable quiz-card component driven entirely by an `AssessmentQuestion` object.
- **Dependencies:** BL-002
- **Priority:** P2
- **Status:** Not started
- **Acceptance criteria:** Renders multiple-choice and short-answer question types; no question content hardcoded in the component.
- **Estimate:** TBD
- **Notes:** Deferred — Sprint 1 is engine-only, no gameplay/UI work per `management/CURRENT_SPRINT.md`.

### BL-008 — Resolve npm audit findings

- **Description:** 12 high-severity advisories reported by `npm audit` on the initial dependency set (all transitive dev dependencies from `create-next-app`/tooling as of Sprint 0).
- **Dependencies:** none
- **Priority:** P2
- **Status:** Not started
- **Acceptance criteria:** `npm audit` clean, or documented as accepted risk with reasoning.
- **Estimate:** Small
- **Notes:** Not blocking — no user-facing surface exists yet.

### BL-009 — Git hooks for lint/format-on-commit

- **Description:** Husky + lint-staged (or equivalent) to run lint/format checks pre-commit.
- **Dependencies:** BL-001
- **Priority:** P3
- **Status:** Not started
- **Acceptance criteria:** TBD
- **Estimate:** Small
- **Notes:** Deliberately not added in Sprint 0 to avoid tooling for its own sake before there's a commit habit to enforce.
