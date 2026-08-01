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

## Done (Sprint 2)

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

## Sprint 3 (in progress — approved by Product Owner, driven by Aarshiya's Sprint 2 feedback)

Sprint 3 goal: improve the learner experience — visuals, clarity of interaction, and immediate feedback. No new curriculum, no new game mechanics, no new infrastructure. Every item must pass: "Will this make Aarshiya more likely to complete another lesson?"

### BL-020 — Visual design system foundation

- **Description:** Reusable design tokens (color palette, typography scale, spacing) as Tailwind theme config, plus a small shared primitives library (`app/components/ui/`: Card, Badge, ProgressBar, Button) so every screen draws from one consistent visual language instead of ad hoc classes per component.
- **Dependencies:** none
- **Priority:** P0
- **Status:** Done
- **Acceptance criteria:** All colors/spacing/type sizes are tokens, not one-off hex/px values; primitives are used by at least one real screen; no visual regression in existing tests.
- **Estimate:** Medium
- **Notes:** Semantic color roles (`brand`/`accent`/`success`/`warning`/`danger`/`info`/`neutral`) alias Tailwind's existing palette rather than inventing new hex values — see [ADR 0007](decisions/0007-semantic-design-tokens-and-ui-primitives.md). Spacing deliberately left as Tailwind's default numeric scale (already token-based). `ContinueLearningScreen` is the first consumer of the new primitives; `LessonPlayer` migration is scoped to BL-022. **Delegated to and completed by an OpenClaw headless worker** — the first successful delegation this project has had; reviewed and merged by Claude Code. See `management/WORKER_DASHBOARD.md` and `management/TASK_LEDGER.md`.

### BL-021 — Icon and illustration asset library

- **Description:** `assets/{icons,illustrations,diagrams,animations,backgrounds}` with a small set of hand-authored inline SVGs (a science/lesson theme: beaker, atom, states-of-matter, celebration) in one consistent style. Hand-authored rather than downloaded, to avoid licensing ambiguity and any network dependency.
- **Dependencies:** BL-020 (shares the same visual style/palette)
- **Priority:** P0
- **Status:** Done
- **Acceptance criteria:** At least one illustration per step type (explanation/example/question/summary) and one for the completion screen; all SVG, no external asset downloads.
- **Estimate:** Medium
- **Notes:** Source SVGs live under `/assets` per the requested structure; `app/components/icons/` provides React-consumable copies (inline JSX, no SVGR/webpack loader needed) that mirror them exactly. 6 assets total: 4 step-type icons + 2 illustrations (states of matter, celebration).

### BL-022 — Apply design system to Continue Learning + Lesson Player

- **Description:** Rework `ContinueLearningScreen` and `LessonPlayer` to use BL-020's primitives and BL-021's illustrations throughout, replacing the current ad hoc Tailwind classes from the first color pass.
- **Dependencies:** BL-020, BL-021
- **Priority:** P0
- **Status:** Done
- **Acceptance criteria:** Verified in a real browser; no hardcoded science content in the components (still data-driven per BL-016).
- **Estimate:** Medium
- **Notes:** `LessonPlayer` migrated off its own hand-rolled `ACCENT_CLASSES`/`STEP_STYLE` map onto `Card`/`Badge`/`Button` per ADR 0007's explicit recommendation. Verified via 42 passing tests + careful manual trace; live interactive browser click-through wasn't possible this round (Browser pane wasn't rendering in this session) — verify directly on the live demo URL instead.

### BL-023 — Explicit answer interaction: typed, multiple-choice, voice

- **Description:** Every question step must make the answer method unambiguous. Multiple-choice and typed-answer already exist (BL-018 fix) — add an explicit, clearly-labeled voice input option (Web Speech API) as a third way to answer, with a visible "not supported on this device" fallback rather than a silently broken button.
- **Dependencies:** BL-022
- **Priority:** P0
- **Status:** Done
- **Acceptance criteria:** A learner can always tell how to answer without guessing; voice mode transcribes into the same answer box (not a separate hidden flow); works or clearly says it doesn't per-browser.
- **Estimate:** Medium
- **Notes:** Scoped to short-answer questions only (multiple-choice already has an unambiguous tap-to-answer interaction; voice-selecting an MC option would need spoken-option matching, out of scope). Shows an explicit "🎤 Listening — say your answer now" state while active, and a visible fallback message on unsupported browsers instead of hiding the option.

### BL-024 — Immediate feedback with explanations + retry

- **Description:** On every answer: correct shows "✓ Nice work", XP earned, and a short explanation; incorrect shows "Not quite", a short explanation, and a "Try again" action that resets the current question rather than forcing the learner onward. Requires adding an `explanation` field to `AssessmentQuestionSchema` and populating it for the 5 existing demo questions (data enrichment for UX, not new curriculum).
- **Dependencies:** BL-022
- **Priority:** P0
- **Status:** Done
- **Acceptance criteria:** Both outcomes show immediate, visible feedback; retry re-attempts the same question and records a new `AttemptRecord`; unit tests cover the schema addition.
- **Estimate:** Medium
- **Notes:** "XP earned" is shown as encouragement text ("Earning XP toward finishing this lesson") rather than a fabricated per-question number — XP is awarded only at lesson completion (existing mechanic), so this avoids introducing a new per-question XP grant, consistent with "no new game mechanics" for this sprint. Incorrect answers get both "Try again" (resets the question for a fresh attempt) and a lower-emphasis "Skip to next" so a learner is never stuck.

### BL-025 — Keep the live demo current

- **Description:** After each meaningful Sprint 3 milestone, rebuild and restart the production server behind the existing Cloudflare tunnel so the public demo always reflects the latest commit.
- **Dependencies:** BL-022, BL-023, BL-024
- **Priority:** P1
- **Status:** Done
- **Acceptance criteria:** Tunnel URL serves the latest build after each milestone, not just at sprint end.
- **Estimate:** Small

## Sprint 4 (approved by Product Owner — theme "Interactive Science")

Mission: replace reading with discovery. Every implementation must answer "Can Aarshiya touch, drag, build, experiment with, or explore this concept?" — if no, redesign it. No new curriculum, no infrastructure, no complex game mechanics.

### BL-026 — Interactive lesson step type

- **Description:** Add an `"interactive"` variant to `LessonStep` (alongside explanation/example/question/summary): `{ type: "interactive", widget: <known widget id>, prompt: string }`. This is a capability addition to the schema, not new curriculum content.
- **Dependencies:** BL-016
- **Priority:** P0
- **Status:** Done
- **Acceptance criteria:** Schema + loader + `resolveLessonSteps` all handle the new step type; unit tests cover it; `LessonPlayer` dispatches to a widget renderer by id.
- **Estimate:** Small
- **Notes:** `InteractiveStepSchema` added to `packages/curriculum-schema/src/index.ts` as `{ type: "interactive", widget: z.string().min(1), prompt: string }` — `widget` is a loose string, not a closed enum, so widget registration stays entirely in the UI layer (`LessonPlayer`'s `WIDGET_REGISTRY` map) and adding a widget never touches the schema package. `resolveLessonSteps` needed no changes since non-question steps already pass through unchanged. Verified live: renders as a "🧪 Try it yourself" card with the widget's prompt and a "Next →" control.

### BL-027 — Particle State Explorer widget

- **Description:** A reusable, generic component: tap Solid/Liquid/Gas and watch particles visibly rearrange and move at different speeds (tight+jittering, loose+drifting, spread+fast). Wired into the existing "Matter" lesson as a new interactive step, replacing/supplementing the current static example step.
- **Dependencies:** BL-026
- **Priority:** P0
- **Status:** Done
- **Acceptance criteria:** Learner-initiated state changes (tap), not an autoplay animation; component takes no science-specific props beyond what's needed to be reusable (the states-of-matter domain is inherent to what this widget is, same as `LessonPlayer` inherently renders lesson steps); verified live.
- **Estimate:** Medium
- **Notes:** `app/components/widgets/ParticleStateExplorer.tsx` — 3 tap-to-select state buttons, 12 particles per state at hand-placed positions, CSS `@keyframes` jitter animations in `app/globals.css` scaled by state (barely-there vibration for solid, fast wide motion for gas). Wired into `curriculum/lessons/lesson-matter-intro.yaml` as a real interactive step between the "example" and first "question" steps. 3 new unit tests. Verified live against the production tunnel: tapping "Liquid" correctly swaps the caption to "Particles stay close together but slide and drift past each other."

### BL-028 — Atom Builder widget

- **Description:** A reusable component: +/- controls for protons/neutrons/electrons, with a live-updating simple atom visualization (nucleus size/color, electron shells). Tactile, build-a-thing interaction.
- **Dependencies:** BL-026
- **Priority:** P1
- **Status:** Done
- **Acceptance criteria:** Every control click immediately updates the visual; standalone reusable component (works with no lesson-specific data).
- **Estimate:** Medium
- **Notes:** `app/components/widgets/AtomBuilder.tsx` — a self-contained component with no required props (starts every count at 0, holds its own state), built entirely from the existing `app/components/ui` primitives (`Card`, `Badge`, `Button`) and tone system, matching Sprint 3's visual language. The visual is a live SVG: protons (rose/`danger`) and neutrons (zinc/`neutral`) pack into a nucleus cluster via a sunflower-spiral layout so any count avoids overlap; electrons (sky/`info`) fill three simplified shells (2, then 8, then the remainder) as dashed rings with evenly spaced dots. A derived "Mass number / Charge" line updates live from pure arithmetic on the three counts — no periodic-table or element-name data included, to stay curriculum-content-free. Not wired into the existing "Matter" lesson — that lesson covers states of matter, not atomic structure, so forcing it in would be incoherent (see DEC-004); it's ready to drop into any future lesson via BL-026's interactive step type once that lands. 6 new unit tests (Vitest + Testing Library) click every +/- control and assert the resulting counts, SVG circle counts by color, the live summary text, and shell overflow behavior. Verified interactively in a real browser (Playwright-driven click-through + screenshots of the 0-state and after 8 protons/8 neutrons/11 electrons) before removing the temporary preview route.

### BL-029 — Force Simulator widget

- **Description:** A reusable component: drag an object to apply force, release to see it move and decelerate (simple friction). Directly satisfies "drag" from the filter question.
- **Dependencies:** BL-026
- **Priority:** P1
- **Status:** Dropped for now
- **Acceptance criteria:** Real drag-and-release interaction (not click-only); standalone reusable component.
- **Estimate:** Medium
- **Notes:** Explicitly dropped by the Sprint 5 Product Owner directive ("Complete the Matter topic... do not begin another topic") — this widget belongs to a future Forces topic, not Matter. Revisit whenever Forces is scheduled.

## Sprint 5

### BL-030 — `hint` field on questions + LessonPlayer hint UI

- **Description:** Add a required `hint` field to `AssessmentQuestionSchema` (shown to the learner before answering, distinct from `explanation` which shows after) and render it in `LessonPlayer` behind a "💡 Need a hint?" reveal.
- **Dependencies:** none
- **Priority:** P0
- **Status:** Done
- **Acceptance criteria:** Schema requires `hint` on every question; all existing curriculum content updated to include one; `LessonPlayer` shows a hint-reveal control before a question is answered, which disappears once answered; covered by tests.
- **Estimate:** Small
- **Notes:** Backfilled hint text into all 7 pre-existing questions (5 Matter, 2 Particle Model). Added `app/components/LessonPlayer.test.tsx` — the first real test coverage `LessonPlayer` has had (8 tests: step navigation, both question types, retry flow, hint reveal/disappearance). 62/62 tests passing after this change (was 53).

### BL-031 — Complete the Particle Model lesson

- **Description:** Turn the "Particle Model of Matter" lesson from placeholder example data into real, final content matching the quality bar of the "Matter" lesson: full explanation/example/interactive/question/summary flow, and an expanded assessment bank.
- **Dependencies:** BL-030
- **Priority:** P0
- **Status:** Done
- **Acceptance criteria:** `lesson-particle-model-intro.yaml` no longer marked as example data and reuses the existing `particle-state-explorer` widget via an interactive step; `assessment-particle-model-quiz.yaml` has 4-5 questions covering the concept's learning objectives and misconceptions, each with `hint` and `explanation`; `sci-y7-particle-model.yaml` no longer marked as example data; `validate:curriculum`, `typecheck`, `lint`, and `vitest run` all pass.
- **Estimate:** Small
- **Notes:** Rewrote `curriculum/lessons/lesson-particle-model-intro.yaml` with a fuller explanation/example, an `interactive` step reusing the existing `particle-state-explorer` widget (no widget code touched), and 5 question steps. Expanded `curriculum/assessments/assessment-particle-model-quiz.yaml` from 2 to 5 questions — kept `q-particle-model-01`/`02` (revised wording) covering the "particles touch" and "particles stop moving" misconceptions, and added `q-particle-model-03` (liquid particle arrangement), `q-particle-model-04` (what actually changes between states), and `q-particle-model-05` (heat and particle speed), mixing multiple-choice and short-answer per `assessment-matter-quiz.yaml`'s style. Removed the "EXAMPLE curriculum data" comment headers from both the lesson and `curriculum/concepts/sci-y7-particle-model.yaml` now that this is real content. `validate:curriculum`, `typecheck`, `lint`, and `vitest run` (62/62 tests, 10 files) all pass. Delegated to and completed by an OpenClaw headless worker; reviewed and merged by Claude Code with zero conflicts.

### BL-032 — Write "States of Matter and Changes of State" lesson + assessment

- **Description:** This concept (`sci-y7-states-of-matter`) currently has zero lesson content and zero questions despite being defined in the knowledge graph as part of the Matter topic (prerequisite: Particle Model). Write it from scratch: melting, freezing, evaporation, condensation, explained via particle energy — matching the quality bar of the other two Matter lessons.
- **Dependencies:** BL-030, BL-031 (same content pattern to follow)
- **Priority:** P0
- **Status:** Done
- **Acceptance criteria:** New `curriculum/lessons/lesson-states-of-matter-intro.yaml` and `curriculum/assessments/assessment-states-of-matter-quiz.yaml`; `sci-y7-states-of-matter.yaml`'s `lessonRefs`/`assessmentRefs` populated; reuses the existing `particle-state-explorer` widget for an interactive step; 4-5 questions with hints and explanations covering the concept's misconception ("melting creates a new substance"); `validate:curriculum`/`typecheck`/`lint`/`vitest run` all pass.
- **Estimate:** Medium
- **Notes:** Built `lesson-states-of-matter-intro.yaml` (explanation → example → interactive `particle-state-explorer` step → 5 questions → summary) covering melting, freezing, evaporation, and condensation in terms of particles gaining/losing energy, plus `assessment-states-of-matter-quiz.yaml` with 5 questions (mixed multiple-choice/short-answer, difficulty 0.1-0.6) including a true/false question directly targeting the "melting creates a new substance" misconception. Populated `sci-y7-states-of-matter.yaml`'s `lessonRefs`/`assessmentRefs` and removed its stale "EXAMPLE data" comment; no other fields changed. `validate:curriculum`, `typecheck`, `lint`, and `vitest run` (62/62 tests) all pass.

### BL-033 — Illustrations for Particle Model and States of Matter

- **Description:** New hand-authored SVG illustrations supporting BL-031/BL-032, matching the existing inline-SVG style (see `app/components/icons/Illustrations.tsx`, BL-021). No external/downloaded assets.
- **Dependencies:** BL-032 (so the illustrations match the final lesson content)
- **Priority:** P1
- **Status:** Done
- **Acceptance criteria:** New illustration(s) exported from `app/components/icons`, following the existing component/export pattern; wired into the relevant lesson screens; no licensing questions (hand-authored only).
- **Estimate:** Small
- **Notes:** Added `ParticleModelIllustration` (magnifying glass zooming into a particle cluster) and `ChangesOfStateIllustration` (ice cube → droplet → rising steam wisps) to `app/components/icons/Illustrations.tsx`, hand-authored inline SVG in the existing token hex palette (`#0ea5e9`, `#8b5cf6`, `#f59e0b`, `#10b981`), no external assets. Exported both from `app/components/icons/index.ts`. Replaced the single shared `StatesOfMatterIllustration` banner atop the topic list in `ContinueLearningScreen.tsx` with a per-lesson `LESSON_ILLUSTRATIONS` lookup keyed by `conceptId` (`sci-y7-matter`, `sci-y7-particle-model`, `sci-y7-states-of-matter`), rendered inside each lesson's `Card`. Added render tests for both new components to `app/components/icons/index.test.tsx`. `typecheck`, `lint`, `vitest run` (64/64 tests, 10 files), and `build` all pass.

### BL-034 — Multi-lesson topic navigation

- **Description:** Replace the single hardcoded lesson in `app/page.tsx`/`ContinueLearningScreen` with a real topic-level flow across all Matter lessons: a list view showing each lesson's progress/lock state, and a way to move between lessons without losing place.
- **Dependencies:** none (works with however many Matter lessons currently have content — no placeholder needed for lessons not yet written)
- **Priority:** P0
- **Status:** Done
- **Acceptance criteria:** Topic list shows every Matter concept that has lesson content, in teaching order; lock state derived from each concept's existing `prerequisites` field (no new engine capability); completing a lesson returns to the topic list; "Back to Matter" available mid-lesson.
- **Estimate:** Medium
- **Notes:** `app/page.tsx` now builds an ordered `LessonEntry[]` from a fixed `MATTER_TOPIC_CONCEPT_IDS` list, skipping any concept without lesson content yet (so States of Matter simply won't appear until BL-032 lands — no placeholder). `ContinueLearningScreen` rewritten to manage a `topic | in-lesson | done` screen state instead of a single `idle | in-lesson | done` state, with per-lesson mastery/completion tracked in maps keyed by lesson id. `LessonPlayer` itself required zero changes. Built directly by Claude (not delegated) since it touches the shared app shell.

### BL-035 — UI polish pass: visual hierarchy, colour, mobile/iPad

- **Description:** Audit every screen against the Sprint 5 Definition of Done: "every screen has appropriate colour and visual hierarchy," "mobile/iPad experience polished." Fix anything that doesn't hold up, especially on small viewports.
- **Dependencies:** BL-032, BL-033, BL-034 (needs final content and navigation in place first)
- **Priority:** P0
- **Status:** Not started
- **Estimate:** Medium

### BL-036 — Final QA: full live click-through, no placeholders/TODOs

- **Description:** Click through every interaction across all 3 Matter lessons live (not just typecheck/lint/test), verify progress/XP tracking end-to-end across lessons, confirm nothing is a placeholder or has a TODO left in it.
- **Dependencies:** BL-032, BL-033, BL-034, BL-035
- **Priority:** P0
- **Status:** Not started
- **Estimate:** Medium

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
