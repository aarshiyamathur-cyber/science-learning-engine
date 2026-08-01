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

## Done (Sprint 1, partial)

### BL-010 — Core domain models: Learner profile & attempt record

- **Description:** `packages/learning-engine` with typed models for `LearnerProfile`, `MasteryState` (per concept), and `AttemptRecord` (a single quiz/assessment attempt).
- **Dependencies:** BL-002
- **Priority:** P0
- **Status:** Done
- **Acceptance criteria:** Zod schemas + TypeScript types; unit tests for valid/invalid shapes, consistent with `@aarshiya/curriculum-schema` conventions.
- **Estimate:** TBD
- **Notes:** Foundation for BL-013 and BL-014 (both since superseded — see below). Extended further in BL-017 for Sprint 2.

## Next (Sprint 2 — approved by Product Owner via `management/CURRENT_SPRINT.md`)

Sprint 2 goal: the first playable learning loop — one complete, reusable learning experience (not a science game, not multiple systems).

### BL-015 — Concept Engine: `xpReward` field

- **Description:** Add `xpReward` to the existing `ConceptSchema` in `@aarshiya/curriculum-schema`. The rest of Sprint 2's "Concept Engine" ask (id, title, description, learningObjectives, prerequisites, masteryThreshold) already exists — see [ADR 0003](decisions/0003-curriculum-as-yaml-plus-zod.md).
- **Dependencies:** BL-002
- **Priority:** P0
- **Status:** Done
- **Acceptance criteria:** `xpReward` is a non-negative number, required; existing example concepts and tests updated; `validate:curriculum` still passes.
- **Estimate:** Small

### BL-016 — Lesson Engine: step schema + generic renderer

- **Description:** A `LessonStep` schema (discriminated union: `explanation`, `example`, `question`, `summary`) added to `@aarshiya/curriculum-schema`, a loader that resolves a `Lesson`'s ordered steps, and a generic React component that renders any step sequence from data alone — no hardcoded science content in the component.
- **Dependencies:** BL-002, BL-003
- **Priority:** P0
- **Status:** Done
- **Acceptance criteria:** Renders all four step types from a data-only `Lesson` object; unit tests for the schema/loader; a component test confirming no step type requires component changes to add new content.
- **Estimate:** TBD
- **Notes:** Supersedes BL-012 (lesson model runtime loader) — same area, now scoped to what Sprint 2 actually needs. Rendering verified in a real browser, not just unit tests — see `management/TASK_LEDGER.md`.

### BL-017 — Learner Progress: extend model + minimal persistence

- **Description:** Extend `LearnerProfile` (BL-010) with `completedLessons`, `xp`, `score`, and `lastCompletedAt`; wire up SQLite to persist `LearnerProfile`, `MasteryState`, and `AttemptRecord`.
- **Dependencies:** BL-010
- **Priority:** P0
- **Status:** Done
- **Acceptance criteria:** CRUD for the three model types against a temp SQLite file; schema designed so future adaptive-learning fields can be added without a breaking migration.
- **Estimate:** TBD
- **Notes:** Supersedes BL-013 — see [ADR 0004](decisions/0004-defer-sqlite-persistence.md) for why persistence was deferred until now. Implemented with Node's built-in `node:sqlite`, not `better-sqlite3` as originally planned — see [ADR 0006](decisions/0006-node-sqlite-over-better-sqlite3.md).

### BL-018 — Minimal "Continue Learning" screen

- **Description:** One screen: app name, "Continue Learning," the concept title ("Matter"), a progress indicator, and a "Start Lesson" button that opens the BL-016 lesson renderer. No animation, maps, avatars, coins, or achievements.
- **Dependencies:** BL-016, BL-017
- **Priority:** P0
- **Status:** Done
- **Acceptance criteria:** Renders real data from BL-017 (not mock state); "Start Lesson" completes a full lesson run and updates persisted progress.
- **Estimate:** TBD
- **Notes:** Full lesson flow walked through in a real browser and re-verified against a production build; two real bugs were found and fixed this way (see `management/TASK_LEDGER.md`) that typecheck/lint/unit tests didn't catch.

### BL-019 — Sample content: "Matter" concept + lesson

- **Description:** One real concept ("Matter") and one lesson (explanation, example, five questions, summary) as curriculum YAML, validated by the existing pipeline. Demonstration content only, not real curriculum authoring.
- **Dependencies:** BL-016
- **Priority:** P0
- **Status:** Done
- **Acceptance criteria:** Passes `npm run validate:curriculum`; exercised end-to-end through BL-018.
- **Estimate:** Small

## Later / Deferred

### BL-011 — Knowledge graph traversal engine

- **Description:** Given the concept graph (prerequisites/unlocks edges from `@aarshiya/curriculum-schema`), provide traversal operations: cycle detection, "what's unlocked given a set of mastered concepts," topological ordering.
- **Dependencies:** BL-002
- **Priority:** P2
- **Status:** Not started
- **Acceptance criteria:** Pure functions, no I/O; unit tests including a cyclic-graph rejection case.
- **Estimate:** TBD
- **Notes:** Deferred — not needed for a single-concept demo (Sprint 2 has no "what's next" navigation yet).

### BL-014 — Progression engine v0

- **Description:** Given a `LearnerProfile` and the knowledge graph, compute per-concept mastery against `masteryThreshold` from a stream of `AttemptRecord`s, and recommend the next unlocked concept(s).
- **Dependencies:** BL-011, BL-017
- **Priority:** P2
- **Status:** Not started
- **Acceptance criteria:** TBD — scoring model needs Product Owner input before finalizing.
- **Estimate:** TBD
- **Notes:** Deferred alongside BL-011 for the same reason; this is the core of the learning engine long-term per the project vision.

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
