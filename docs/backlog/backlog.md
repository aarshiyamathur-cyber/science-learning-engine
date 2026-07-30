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

## Next (proposed for Sprint 1 — pending Product Owner approval)

### BL-005 — SQLite persistence layer

- **Description:** Wire up SQLite (likely via `better-sqlite3` or Drizzle) for learner progress, mastery state, and attempt history.
- **Dependencies:** BL-002
- **Priority:** P1
- **Status:** Not started
- **Acceptance criteria:** TBD once the first piece of runtime state (e.g. quiz attempts) is defined.
- **Estimate:** TBD
- **Notes:** Deferred from Sprint 0 — see [ADR 0004](decisions/0004-defer-sqlite-persistence.md).

### BL-006 — First reusable UI component: Quiz Card

- **Description:** A reusable quiz-card component driven entirely by an `AssessmentQuestion` object.
- **Dependencies:** BL-002
- **Priority:** P1
- **Status:** Not started
- **Acceptance criteria:** Renders multiple-choice and short-answer question types; no question content hardcoded in the component.
- **Estimate:** TBD
- **Notes:** First proof that "curriculum is data" holds at the UI layer.

### BL-007 — Learning engine v0: mastery tracking

- **Description:** Given a stream of attempt results, compute per-concept mastery against `masteryThreshold`.
- **Dependencies:** BL-005
- **Priority:** P2
- **Status:** Not started
- **Acceptance criteria:** TBD
- **Estimate:** TBD
- **Notes:** Core of the learning engine; needs Product Owner input on scoring model.

### BL-008 — Resolve npm audit findings

- **Description:** 12 high-severity advisories reported by `npm audit` on the initial dependency set (all transitive dev dependencies from `create-next-app`/tooling as of Sprint 0).
- **Dependencies:** none
- **Priority:** P2
- **Status:** Not started
- **Acceptance criteria:** `npm audit` clean, or documented as accepted risk with reasoning.
- **Estimate:** Small
- **Notes:** Not blocking Sprint 0 — no user-facing surface exists yet.

### BL-009 — Git hooks for lint/format-on-commit

- **Description:** Husky + lint-staged (or equivalent) to run lint/format checks pre-commit.
- **Dependencies:** BL-001
- **Priority:** P3
- **Status:** Not started
- **Acceptance criteria:** TBD
- **Estimate:** Small
- **Notes:** Deliberately not added in Sprint 0 to avoid tooling for its own sake before there's a commit habit to enforce.
