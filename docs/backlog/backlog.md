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
- **Status:** Done
- **Estimate:** Medium
- **Notes:** Verified via live browser walkthrough rather than needing new visual changes — BL-033's per-lesson illustrations plus the existing Sprint 3 design system already satisfied the bar. Checked: mobile (375px) and tablet (768px) viewports (no horizontal overflow, 48px tap targets), dark mode (correct contrast/colors), and the topic list's visual hierarchy (title → XP → per-lesson cards with illustration/badge/progress/action).

### BL-036 — Final QA: full live click-through, no placeholders/TODOs

- **Description:** Click through every interaction across all 3 Matter lessons live (not just typecheck/lint/test), verify progress/XP tracking end-to-end across lessons, confirm nothing is a placeholder or has a TODO left in it.
- **Dependencies:** BL-032, BL-033, BL-034, BL-035
- **Priority:** P0
- **Status:** Done
- **Estimate:** Medium
- **Notes:** Full live click-through of all three lessons end-to-end: explanation → example → interactive widget → all 5 questions each (mixed multiple-choice/short-answer) → summary → finish, including hint reveal, wrong-answer retry, and self-assessment for short-answer questions. Confirmed mastery scoring and XP accumulate correctly (50 + 50 = 100 XP across two lessons). Repo-wide grep confirmed no TODOs/placeholders remain. Found and fixed two real bugs neither caught by typecheck/lint/64 unit tests: (1) a newly-unlocked lesson stayed "Locked" until a manual page reload — fixed with `router.refresh()` after lesson completion; (2) the `AarshiyaAppServer` Scheduled Task was silently exiting on every start due to `$ErrorActionPreference = "Stop"` treating benign npm/next stderr output as fatal under PowerShell 5.1 — fixed by removing that setting. Learner-progress database reset to a clean state before handoff.

## Sprint 6

### BL-040 — Write the Atomic Structure lesson and assessment

- **Description:** This concept (`sci-y7-atomic-structure`) currently has zero lesson content and zero questions. Write it from scratch: protons, neutrons, and electrons, where each is found (nucleus vs shells), atomic number vs mass number, and simplified electron shell filling (2, then 8, then remainder) — matching the quality bar of the Matter topic lessons, and reusing the already-registered `atom-builder` widget for an interactive step.
- **Dependencies:** none
- **Priority:** P0
- **Status:** Done
- **Acceptance criteria:** New `curriculum/lessons/lesson-atomic-structure-intro.yaml` and `curriculum/assessments/assessment-atomic-structure-quiz.yaml`; `sci-y7-atomic-structure.yaml`'s `lessonRefs`/`assessmentRefs` populated; reuses the existing `atom-builder` widget for an interactive step; 5 questions with hints and explanations covering the concept's learning objectives and directly targeting both misconceptions ("atoms are indivisible", "mass number is atomic number"); `validate:curriculum`/`typecheck`/`lint`/`vitest run` all pass.
- **Estimate:** Medium
- **Notes:** Built `lesson-atomic-structure-intro.yaml` (explanation → example (carbon) → interactive `atom-builder` step (build sodium) → 5 questions → summary) covering nucleus/shell structure, atomic number, mass number, and simplified 2/8/remainder shell filling. `assessment-atomic-structure-quiz.yaml` has 5 questions (mixed multiple-choice/short-answer, difficulty 0.1-0.6): q-atomic-structure-01 targets the "atoms are indivisible" idea by describing internal structure, q-atomic-structure-03 directly targets "mass number is atomic number" by requiring the learner to add protons and neutrons, and q-atomic-structure-05 is a true/false question directly stating and correcting the indivisibility misconception. Populated `sci-y7-atomic-structure.yaml`'s `lessonRefs`/`assessmentRefs`; no other fields changed. `validate:curriculum`, `typecheck`, `lint`, and `vitest run` (64/64 tests, 10 files) all pass.

### BL-041 — Atomic Structure illustration

- **Description:** New hand-authored SVG illustration for the "Atomic Structure" topic (`sci-y7-atomic-structure`), matching the existing inline-SVG style (see `app/components/icons/Illustrations.tsx`, BL-021/BL-033). No external/downloaded assets.
- **Dependencies:** none
- **Priority:** P1
- **Status:** Done
- **Acceptance criteria:** New illustration exported from `app/components/icons`, following the existing component/export pattern; wired into the topic-list card for `sci-y7-atomic-structure` via `LESSON_ILLUSTRATIONS`; covered by a render test; no licensing questions (hand-authored only).
- **Estimate:** Small
- **Notes:** Added `AtomicStructureIllustration` to `app/components/icons/Illustrations.tsx` — a small proton/neutron cluster nucleus (`#f43f5e` rose, `#a1a1aa` zinc, matching `AtomBuilder`'s neutron color) with three dashed orbital rings and electron dots (`#0ea5e9` sky), all in the existing token palette. Exported from `app/components/icons/index.ts`, wired into `ContinueLearningScreen.tsx`'s `LESSON_ILLUSTRATIONS` lookup keyed by `sci-y7-atomic-structure`, and covered by a new render test in `app/components/icons/index.test.tsx`. `typecheck`, `lint`, `vitest run` (65/65 tests, 10 files), and `build` all pass.

### BL-042 — Grow the Atomic Structure question bank

- **Description:** Per the 2026-08-03 Product Owner directive making the Question Bank a tracked secondary KPI, extend `assessment-atomic-structure-quiz.yaml`'s reusable question bank beyond the 5 questions written for BL-040: distinguishing protons/neutrons/electrons by charge, computing electron count from atomic number via the neutral-atom rule, and shell-filling applied to a different electron count. Bank-only additions for revision/spaced-repetition — the lesson's tested 5-question flow is unchanged.
- **Dependencies:** BL-040
- **Priority:** P1
- **Status:** Done
- **Acceptance criteria:** 3 new questions (`q-atomic-structure-06` through `08`) appended to `assessment-atomic-structure-quiz.yaml`, each with `hint` and `explanation`, mixed multiple-choice/short-answer, difficulty 0.1-0.5; `lesson-atomic-structure-intro.yaml` unchanged (still references only questions 01-05); `validate:curriculum`/`typecheck`/`lint`/`vitest run` all pass.
- **Estimate:** Small
- **Notes:** q-atomic-structure-06 asks which particle carries a negative charge; q-atomic-structure-07 requires deriving electron count (17) from atomic number using the neutral-atom rule; q-atomic-structure-08 applies the 2/8/remainder shell-filling rule to 17 electrons, distinct from q-atomic-structure-04's 13-electron example. Delegated to and completed by an OpenClaw headless worker; `validate:curriculum`, `typecheck`, `lint`, and `vitest run` (65/65 tests, 10 files) all pass.

### BL-043 — Sprint 6 final QA: live click-through, 2 real bugs found and fixed

- **Description:** Full live Playwright click-through of the Atomic Structure lesson (matching the BL-036 bar for Matter): explanation → example → atom-builder interactive → all 5 questions (deliberate wrong answer, retry, hint reveal) → summary → finish, plus a 375px mobile viewport check and topic-list unlock/XP verification.
- **Dependencies:** BL-040, BL-041, BL-042
- **Priority:** P0
- **Status:** Done
- **Acceptance criteria:** Every interaction verified live in a real browser; no placeholders/TODOs repo-wide; navigation, mobile, and XP/mastery tracking confirmed working.
- **Estimate:** Medium
- **Notes:** Found and fixed two real bugs neither typecheck/lint/65 unit tests caught: (1) `ContinueLearningScreen` still hardcoded "Matter"/"Back to Matter" as the topic-list heading and back-navigation label, left over from before the topic list grew to span multiple topics — changed to topic-agnostic "Science Course"/"Back to topic list". (2) A fresh `next build`/`next dev` failed repo-wide with "Unknown module type" for every `@aarshiya/*` workspace package, a pre-existing environment issue unrelated to any content change (reproduced on unmodified symlinks) — fixed via `transpilePackages` in `next.config.ts` (see DEC-008). This mattered because the live `AarshiyaAppServer`'s on-disk `.next` build had gone stale; without the fix no future code change could have been redeployed. Rebuilt, restarted the live server, and re-verified both fixes with a real browser click-through. `validate:curriculum`, `typecheck`, `lint`, `vitest run` (65/65 tests, 10 files), and `build` all pass.

**Sprint 6 (Atomic Structure) Definition of Done met 2026-08-03 — proceeding immediately to Sprint 7 per Product Owner directive, no review stop in between.**

## Product Command Centre

### CC-001 — Command Centre framework, navigation, and routing

- **Description:** Scaffold a new, fully independent Next.js app at `apps/command-centre/` — an internal dashboard for the Product Owner and Engineering Lead to track this project (separate from the learning app at the repo root). Framework, navigation shell, and routing only; page content is a later worker's job.
- **Dependencies:** none
- **Priority:** P0
- **Status:** Done
- **Acceptance criteria:** New workspace at `apps/command-centre/` with its own `package.json`, `tsconfig.json`, `next.config.ts`, and `eslint.config.mjs` (Next 16.x App Router, React 19.x, TypeScript, Tailwind v4), running on port 3001 via `dev`/`start` scripts so it doesn't collide with the root app's port 3000; a persistent nav shell (`app/components/Nav.tsx`) present on every page linking to `/`, `/roadmap`, `/sprint-history`, `/release-centre`, `/question-bank`, `/engineering`, with the active route visually indicated; each of the 6 routes is a real page component with an `<h1>` title and one sentence of genuine descriptive text (no "TODO"/"Coming soon"); basic Tailwind visual design (spacing, type hierarchy, distinct nav/content colours); `dev`, `build`, `start`, `lint`, `typecheck`, `test` scripts all present and passing; at least one Vitest + Testing Library test asserting all 6 nav links render with correct hrefs; `README.md` explaining what the app is and how to run it; root `npm install` picks up the new workspace and root `typecheck`/`lint`/`vitest run` remain unaffected (still 62 tests, 10 files).
- **Estimate:** Medium
- **Notes:** New workspace `apps/command-centre/` (package name `@aarshiya/command-centre`) mirrors the root app's Next/React/Tailwind versions but is otherwise fully self-contained — own `vitest.config.ts`/`vitest.setup.ts` mirroring the root's pattern, own `.gitignore` (root `.gitignore`'s `/.next/` pattern is anchored to the repo root and doesn't cover nested app build output, so a scoped one was added). Nav is a client component (`usePathname`) rendering the 6 links with `aria-current="page"` on the active route. Root `vitest.config.ts` had its `exclude` list extended with `apps/**` so the root test runner doesn't also pick up this app's tests (each app runs its own suite independently) — this was the one change made outside `apps/command-centre` itself, needed to keep the root suite at exactly 62 tests/10 files as required. All 6 pages are static placeholder text only, per scope — no data-fetching or metrics logic. `typecheck`/`lint`/`build`/`test` all pass inside `apps/command-centre`; root `npm install`/`typecheck`/`lint`/`vitest run` (62/62 tests, 10 files) all still pass.

### CC-002 — Executive Dashboard, Roadmap, Progress cards

- **Description:** Build real content for the Executive Dashboard (`/`) and Roadmap (`/roadmap`) pages scaffolded by CC-001, plus a reusable `ProgressCard` component. Executive Dashboard shows the current initiative name/status, a row of progress-metric cards (Automation Ratio, Tasks Completed, Tasks In Progress, Open Blockers), and a "what's blocking" section. Roadmap shows a chronological list of sprints/initiatives each with a status badge (Done/In progress/Not started) and one-line description. Backed by typed sample data (a later worker's "repository reader" will replace it with live data without restructuring the pages).
- **Dependencies:** CC-001
- **Priority:** P0
- **Status:** Done
- **Acceptance criteria:** `app/lib/sample-data.ts` exports typed interfaces (`ProgramStatus`, `ProgressMetric`, `Blocker`, `RoadmapItem`) and sample consts; `app/components/ProgressCard.tsx` is a reusable component taking `label`, `value`, and optional `status`; Executive Dashboard renders the initiative name/status, a responsive grid of `ProgressCard`s for each sample metric, and a blocking section with an empty state; Roadmap renders every sample roadmap item with title, description, and a colour-coded status badge; a single status-colour convention (green/amber/gray for good/warning/neutral, shared via `app/lib/status-colors.ts`) is used consistently across both pages; Vitest + Testing Library tests cover `ProgressCard` rendering label/value, the dashboard rendering all progress card labels, and the roadmap rendering every item with its status badge text; no network or filesystem access, sample data only.
- **Estimate:** Small
- **Notes:** Added `app/lib/sample-data.ts` (typed sample data), `app/lib/status-colors.ts` (shared status→colour mapping used by both `ProgressCard` and the roadmap badges), `app/components/ProgressCard.tsx` + `.test.tsx`, rewrote `app/page.tsx` and `app/roadmap/page.tsx`, added `app/page.test.tsx` and `app/roadmap/page.test.tsx`. Did not touch `Nav.tsx` or any other route. `typecheck`/`lint`/`build`/`vitest run` all pass inside `apps/command-centre` (7 tests, up from 2 — Nav's 2 plus 5 new); root `typecheck`/`lint`/`vitest run` still pass unchanged at 62/62 tests, 10 files.

### CC-003 — Sprint History, Release Centre, Question Bank dashboard

- **Description:** Build real content for the three remaining Command Centre routes scaffolded by CC-001: Sprint History (`/sprint-history`) lists past sprints with a date range, one-line summary, status badge, and OpenClaw-vs-Claude task split; Release Centre (`/release-centre`) lists releases/deployments with a Live/In progress status badge, a one-line description, and an honest "not yet public" URL note (no fabricated URLs); Question Bank (`/question-bank`) summarizes the assessment question bank with top-line `ProgressCard` totals (total questions, multiple-choice count, short-answer count, concepts covered) and a per-concept breakdown table. Backed by typed sample data extending `app/lib/sample-data.ts`, same pattern as CC-002.
- **Dependencies:** CC-001, CC-002
- **Priority:** P0
- **Status:** Done
- **Acceptance criteria:** `app/lib/sample-data.ts` gains typed exports (`SprintHistoryEntry`/`sprintHistory`, `ReleaseStatus`/`ReleaseEntry`/`releases`, `QuestionBankSummary`/`questionBankSummary`, `ConceptQuestionBreakdown`/`conceptQuestionBreakdown`); `app/lib/status-colors.ts` gains a `releaseStatusToCardStatus` mapping reusing the existing `STATUS_COLORS` palette (no new colours introduced); all three pages follow the established h1 → descriptive paragraph → `SampleDataNotice` → sectioned h2 content structure; Sprint History and Release Centre render list items with colour-coded status badges; Question Bank renders `ProgressCard` summary tiles plus a concept breakdown table; Vitest + Testing Library tests cover all three pages asserting sprint names, release names, and concept breakdown numbers render; no network or filesystem access, sample data only.
- **Estimate:** Small
- **Notes:** Rewrote `app/sprint-history/page.tsx`, `app/release-centre/page.tsx`, `app/question-bank/page.tsx`; added matching `.test.tsx` for each; extended `app/lib/sample-data.ts` and `app/lib/status-colors.ts` only (no new data-fetching mechanism, no changes to `Nav.tsx` or any other route). Question Bank's sample numbers mirror the real current curriculum content (Matter/Particle Model/States of Matter, 5 questions each, 3 multiple-choice + 2 short-answer per concept) for realism, per the task's "realistic sample data" instruction — still static, not read from the filesystem. `typecheck`/`lint`/`build`/`vitest run` all pass inside `apps/command-centre` (14 tests across 7 files, up from 7 across 4); root `typecheck`/`lint`/`vitest run` still pass unchanged at 64/64 tests, 10 files.

### CC-004 — Engineering Dashboard, repository reader, automation statistics

- **Description:** Build real content for the Engineering Dashboard (`/engineering`) route scaffolded by CC-001 — the one Command Centre page backed by live data instead of `app/lib/sample-data.ts`. Adds a server-side `app/lib/repository-reader.ts` module that reads `management/TASK_LEDGER.md` from disk, parses every markdown table row across every section, classifies each row's Owner column as OpenClaw or Claude, and computes total/OpenClaw/Claude task counts plus an automation ratio. The page is a Server Component rendered on-demand (`force-dynamic`) so the numbers reflect the ledger's current contents on every request, not whatever it said at build time.
- **Dependencies:** CC-001
- **Priority:** P0
- **Status:** Done
- **Acceptance criteria:** `app/lib/repository-reader.ts` reads the real ledger file via `fs.readFileSync`/`path.join(process.cwd(), ...)`, locates each table's "Task ID"/"Owner" columns by header (column order/count varies between historical sections) rather than assuming fixed positions, and exports `getEngineeringMetrics()` returning total/OpenClaw/Claude counts, a formatted automation-ratio percentage, and a per-owner breakdown — no hardcoded/sample numbers; `app/engineering/page.tsx` is a Server Component (no `SampleDataNotice`) rendering a row of `ProgressCard`s (Total Tasks, OpenClaw Tasks, Claude Tasks, Automation Ratio) plus a live-data note, marked `export const dynamic = "force-dynamic"` so it isn't statically prerendered; `app/lib/repository-reader.test.ts` covers the parser (owner classification, header-driven column lookup, separator/empty-row handling) plus sanity checks against the real ledger; `app/engineering/page.test.tsx` asserts the page renders without crashing and shows the expected labels.
- **Estimate:** Small
- **Notes:** Verified the numbers are real (not zero/frozen) by building and running a production server on a scratch port and fetching `/engineering` directly — confirmed matching the ledger's actual row counts (15 total, 8 OpenClaw, 7 Claude, 53% at time of verification) and that the route builds as `ƒ (Dynamic)`, not `○ (Static)` (first build was static and silently would have frozen the numbers at build time — the exact class of bug the `BL-018` browser-walkthrough note warns about). `typecheck`/`lint`/`build`/`vitest run` all pass inside `apps/command-centre` (22 tests across 9 files, up from 14 across 7); root `typecheck`/`lint`/`vitest run` still pass unchanged at 64/64 tests, 10 files (root `.next` build artifact excluded from root lint via its own `.gitignore`, not part of the repo).

### CC-005 — Visual design, responsive layout, progress bars

- **Description:** Presentation-layer polish pass across all six Command Centre pages. Extracted the repeated ad hoc heading/label Tailwind classes into shared components — `PageHeader` (title + description) and `Section` (uppercase label + content wrapper) — and applied them on every page in place of raw duplicated classes. Made the `Nav` sidebar responsive: below the `md:` breakpoint it collapses from a fixed `w-64` column into a horizontally-scrollable top bar instead of crowding a phone-width viewport, with `layout.tsx`'s body switching `flex-col`/`md:flex-row` to match. Added a small two-segment `TaskSplitBar` component (styled divs, no charting library) next to the existing OpenClaw/Claude text summary on the Sprint History page so the split is visible at a glance.
- **Dependencies:** CC-001, CC-002, CC-003, CC-004
- **Priority:** P1
- **Status:** Done
- **Acceptance criteria:** Every page (`/`, `/roadmap`, `/sprint-history`, `/release-centre`, `/question-bank`, `/engineering`) renders its title/description via `PageHeader` and its labeled sections via `Section` instead of raw repeated classes; `Nav` and the root layout use `md:` breakpoints so the app is usable at a 375px mobile width (verified by inspecting rendered markup); `TaskSplitBar` renders a two-color proportional bar (with an `aria-label` describing the split) beside each sprint's OpenClaw/Claude text on Sprint History; no data files (`sample-data.ts`, `repository-reader.ts`) or routes changed; no charting library added; new `PageHeader.test.tsx`, `Section.test.tsx`, `TaskSplitBar.test.tsx` cover the new components, existing page tests updated where needed and still pass.
- **Estimate:** Small
- **Notes:** `typecheck`/`lint`/`vitest run`/`build` all pass inside `apps/command-centre` (26 tests across 12 files, up from 22 across 9); manually ran the dev server and fetched every route's rendered HTML to confirm `PageHeader`/`Section`/`TaskSplitBar` markup and the responsive `Nav`/body classes are present after the refactor. Root `typecheck`/`lint`/`vitest run` still pass unchanged at 64/64 tests, 10 files (the `apps/command-centre/.next` build artifact from the local `npm run build` verification was removed before the root lint check, since it isn't part of the repo).

### CC-006 — Deploy Command Centre with its own public URL

- **Description:** Give the Command Centre a live, publicly reachable URL, following the same supervised-process pattern already proven for the main learning app rather than inventing a new deployment approach.
- **Dependencies:** CC-001 through CC-005
- **Priority:** P0
- **Status:** Done
- **Acceptance criteria:** Command Centre production server (port 3001) and a Cloudflare quick tunnel both run as Windows Scheduled Tasks with restart-on-failure, mirroring `AarshiyaAppServer`/`AarshiyaTunnel`; the tunnel script auto-records the current URL into `management/COMMAND_CENTRE.md` and commits/pushes it on every restart, since quick tunnels mint a new hostname each time; verified live.
- **Estimate:** Small
- **Notes:** Added `scripts/deploy/start-command-centre-server.ps1` and `start-command-centre-tunnel.ps1`, and extended `register-startup-tasks.ps1` to register `AarshiyaCommandCentreServer`/`AarshiyaCommandCentreTunnel` alongside the existing main-app tasks. This is explicitly **not** a permanent URL — per the Engineering Operating Agreement, a genuinely permanent address needs a Cloudflare account with a named tunnel on an owned domain, or a hosting-platform account (e.g. Vercel), both of which require the Sponsor to create an account; this automation doesn't do that on their behalf. The current URL is stable only for as long as the underlying process keeps running without crashing or the machine restarting — same durability characteristic the main app's URL has had all along. Done directly by Claude (not delegated), since deployment/infrastructure is always High Risk per the Operating Agreement's risk classification.

**Command Centre MVP complete and frozen per Product Owner directive (2026-08-01) — no further Command Centre work without explicit approval.**

## Sprint 6 (Atomic Structure — underway, per Product Owner directive 2026-08-01)

### BL-040 — Atomic Structure lesson + assessment, written from scratch

- **Description:** `sci-y7-atomic-structure` has no lesson/assessment content yet. Write it from scratch: protons/neutrons/electrons, atomic number vs. mass number, simplified electron shells, reusing the `atom-builder` widget (built Sprint 4, unused until now).
- **Dependencies:** none
- **Priority:** P0
- **Status:** Dispatched
- **Acceptance criteria:** New `curriculum/lessons/lesson-atomic-structure-intro.yaml` and `curriculum/assessments/assessment-atomic-structure-quiz.yaml`; `sci-y7-atomic-structure.yaml`'s `lessonRefs`/`assessmentRefs` populated; interactive step reuses `atom-builder`; 4-5 questions with hints/explanations targeting both listed misconceptions; `validate:curriculum`/`typecheck`/`lint`/`vitest run` all pass.
- **Estimate:** Medium

### BL-041 — Atomic Structure illustration

- **Description:** New hand-authored SVG illustration for the Atomic Structure topic card, matching the existing per-lesson illustration pattern.
- **Dependencies:** none
- **Priority:** P1
- **Status:** Dispatched
- **Acceptance criteria:** New illustration exported from `app/components/icons`, wired into `ContinueLearningScreen`'s per-conceptId lookup; hand-authored only, existing colour palette.
- **Estimate:** Small

## Sprint 7

### BL-044 — Write the Periodic Table lesson, assessment, and PeriodicTableExplorer widget

- **Description:** `sci-y7-periodic-table` (already wired into the knowledge graph as a prerequisite-gated concept after Atomic Structure) had zero lesson content, zero questions, and no interactive widget. Write it from scratch: elements ordered by atomic number (not alphabetically), groups vs periods, metals vs non-metals, and a new reusable `PeriodicTableExplorer` widget covering the first 20 elements.
- **Dependencies:** none
- **Priority:** P0
- **Status:** Done
- **Acceptance criteria:** New `app/components/widgets/PeriodicTableExplorer.tsx` — a standalone, curriculum-agnostic widget with no required props, showing a period/group grid of the first 20 elements (H-Ca) that reveals name/atomic number/metal-or-non-metal on tap; new `curriculum/lessons/lesson-periodic-table-intro.yaml` and `curriculum/assessments/assessment-periodic-table-quiz.yaml`; `sci-y7-periodic-table.yaml`'s `lessonRefs`/`assessmentRefs` populated; lesson's interactive step references widget id `periodic-table-explorer` (registration in `LessonPlayer`'s `WIDGET_REGISTRY` left for Claude's review, per directive); 5 questions with hints and explanations covering the concept's learning objectives and directly targeting both misconceptions ("periodic-table-is-alphabetical", "groups-and-periods-reversed"); `validate:curriculum`/`typecheck`/`lint`/`vitest run` all pass; new unit tests for the widget.
- **Estimate:** Medium
- **Notes:** `PeriodicTableExplorer.tsx` renders all 18 groups as grid columns so groups 3-12 (transition metals, out of scope for this range) show as visible empty gaps rather than being silently compressed out of the layout — reinforces "these columns are skipped for now" visually. Boron and silicon are classed as metalloids in full chemistry but simplified to "non-metal" here (documented as a code comment only, not in learner-facing text) since this widget only offers a binary metal/non-metal choice, matching a typical simplified Year 7-10 treatment. `lesson-periodic-table-intro.yaml` follows the sibling Atomic Structure lesson's structure (explanation → example comparing sodium and potassium's shared group-1 behaviour → interactive `periodic-table-explorer` step → 5 questions → summary). `assessment-periodic-table-quiz.yaml`'s q-periodic-table-01 targets the alphabetical misconception directly, q-periodic-table-02 targets the group/period mix-up directly, and q-periodic-table-05 requires deriving both period and metal/non-metal classification from atomic number alone. 3 new unit tests (initial state, clicking a metal tile, clicking a non-metal tile). Delegated to and completed by an OpenClaw headless worker; `validate:curriculum`, `typecheck`, `lint`, and `vitest run` (68/68 tests, 11 files) all pass.

### BL-045 — Register PeriodicTableExplorer widget, add topic illustration, final live QA

- **Description:** Shared-file wiring BL-044's worker deliberately left for review: register `"periodic-table-explorer"` in `LessonPlayer`'s `WIDGET_REGISTRY`, add a topic-card illustration, then verify the full lesson live end-to-end.
- **Dependencies:** BL-044
- **Priority:** P0
- **Status:** Done
- **Acceptance criteria:** Widget registered and reachable from the real lesson flow; new illustration wired into the per-conceptId lookup; every interaction verified live in a real browser; mastery/XP and mobile confirmed; no placeholders/TODOs.
- **Estimate:** Small
- **Notes:** Added `PeriodicTableIllustration` (metal/non-metal tile grid, same token palette as the other topic illustrations) to `app/components/icons/Illustrations.tsx`, exported and wired into `ContinueLearningScreen.tsx`'s `LESSON_ILLUSTRATIONS` lookup, covered by a new render test. Full live Playwright click-through of all 9 lesson steps (explanation → example → widget tile interaction → 5 questions, including hint reveal and a deliberate wrong-answer retry → summary → finish): confirmed 100% mastery and 250 XP (200 carried over + 50 for this lesson), and no horizontal overflow at a 375px mobile viewport. `validate:curriculum`, `typecheck`, `lint`, `vitest run` (69/69 tests, 11 files), and `build` all pass. Live `AarshiyaAppServer` rebuilt and restarted; both this and BL-044's content verified live afterward.

**Sprint 7 (Periodic Table) Definition of Done met 2026-08-03 — both Sprint 6 and Sprint 7 now complete. Stopped, awaiting Product Review per the 2026-08-03 worktree-allocation directive.**

## Sprint 8

### BL-046 — Write the Chemical Reactions lesson, assessment, and ReactionSimulator widget

- **Description:** `sci-y7-chemical-reactions` (already wired into the knowledge graph as a prerequisite-gated concept after Atomic Structure) had zero lesson content, zero questions, and no interactive widget. Write it from scratch per the new permanent visual-learning standard (hero illustration, short text blocks, supporting diagram, meaningful interaction): reactants vs products, signs of a reaction, conservation of mass, and a new reusable `ReactionSimulator` widget covering three preset reactions (vinegar + baking soda, iron + oxygen rusting, fuel + oxygen combustion).
- **Dependencies:** none
- **Priority:** P0
- **Status:** Done
- **Acceptance criteria:** New `app/components/widgets/ReactionSimulator.tsx` — a standalone, curriculum-agnostic widget with no required props, offering 3 tappable reactant pairs that each reveal a word equation, the sign of reaction demonstrated, and a visual tied directly to that sign (bubbles for gas, a colour-shifting circle for rusting, a flickering flame for combustion); new `curriculum/lessons/lesson-chemical-reactions-intro.yaml` (illustration → short explanation → short explanation → illustration → example → interactive `reaction-simulator` → 5 questions → summary) and `curriculum/assessments/assessment-chemical-reactions-quiz.yaml`; `sci-y7-chemical-reactions.yaml`'s `lessonRefs`/`assessmentRefs` populated; lesson references illustration ids `chemical-reaction-hero` and `conservation-of-mass` and widget id `reaction-simulator` (registration in `LessonPlayer`'s registries left for Claude's review, per directive); 5 questions with hints and explanations covering the concept's learning objectives and directly targeting both misconceptions ("burning-destroys-matter", "reaction-is-just-mixing"); `validate:curriculum`/`typecheck`/`lint`/`vitest run` all pass; new unit tests for the widget.
- **Estimate:** Medium
- **Notes:** Every explanation/example step body is 2-4 sentences, noticeably shorter than earlier lessons' single long paragraphs, per the new visual-learning standard. `ReactionSimulator.tsx` reuses the existing `@keyframes` pattern from `ParticleStateExplorer` (BL-027), adding three new animations to `app/globals.css` (`bubble-rise`, `rust-shift`, `flame-flicker`) each tied directly to the specific sign of reaction being taught, not decorative motion. q-chemical-reactions-01 targets the reaction-is-just-mixing misconception (melting vs. reacting), q-chemical-reactions-04 and q-chemical-reactions-05 target the burning-destroys-matter misconception directly (where the "missing" mass actually goes, and a sealed-container mass-conservation prediction). 4 new unit tests (initial state, clicking each of the other two reactant pairs, aria-pressed toggling). Delegated to and completed by an OpenClaw headless worker; `validate:curriculum`, `typecheck`, `lint`, and `vitest run` (77/77 tests, 12 files) all pass. **Reviewed by OpenClaw reviewer worker** (headless, independent review — read all new content in full, verified against both misconceptions, re-ran validate:curriculum/typecheck/lint/vitest/build before merging). **Accepted: Yes.** Illustration/widget registry wiring (`LessonPlayer.tsx`, `ContinueLearningScreen.tsx`) done by the reviewer per directive; merged to master alongside CE-002.

## Curriculum Enhancement

### CE-001 — Grow question banks for the Matter topic

- **Description:** Per the 2026-08-03 Product Owner directive, the reusable question bank is now a tracked secondary KPI that keeps growing even for already-shipped topics. Added 2 new bank-only questions (not new lesson steps) to each of the three Matter-topic assessment files — `assessment-matter-quiz.yaml`, `assessment-particle-model-quiz.yaml`, `assessment-states-of-matter-quiz.yaml` — covering learning-objective/misconception angles the existing 5 questions per file didn't yet test.
- **Dependencies:** none
- **Priority:** P1
- **Status:** Done
- **Acceptance criteria:** Each of the three assessment files gains exactly 2 new questions (ids continuing existing numbering, e.g. `q-matter-06`/`07`), mixing multiple-choice and short-answer, difficulty 0.1-0.7, each with `hint` and `explanation`; the three lesson files' 5-question flows are unchanged (bank-only additions); `validate:curriculum`, `typecheck`, `lint`, and `vitest run` all pass.
- **Estimate:** Small
- **Notes:** `q-matter-06`/`07` add a "which of these is matter" distractor question (shadow/sound/idea vs. steam) and a direct "name the three states" short-answer. `q-particle-model-06`/`07` add a gas-compressibility application question and a solid particle-arrangement (not just movement) short-answer. `q-states-of-matter-06`/`07` add a freezing-in-particle-energy-terms question (complementing the existing melting question) and a least-to-most particle-energy ordering short-answer. No lesson files, schema, or application code touched — pure curriculum-data addition within `curriculum/assessments/`. Delegated to and completed by an OpenClaw headless worker in a dedicated worktree; `validate:curriculum`, `typecheck`, `lint`, and `vitest run` (65/65 tests, 10 files) all pass.

## Sprint 8 support

### CE-002 — Chemical Reactions illustrations

- **Description:** Per the 2026-08-03 permanent visual-learning standard, every lesson needs a hero illustration plus supporting diagrams rendered inside the lesson flow itself via the new `illustration` lesson-step type. Added two new hand-authored SVG illustrations for the in-flight "Chemical Reactions" lesson (Sprint 8), matching the existing inline-SVG style (see `app/components/icons/Illustrations.tsx`).
- **Dependencies:** none
- **Priority:** P1
- **Status:** Done
- **Acceptance criteria:** `ChemicalReactionHeroIllustration` (a flask mid-reaction: rising gas bubbles plus a colour shift through the liquid, teaching "something changed") and `ConservationOfMassIllustration` (before/after atom-dot clusters with an arrow between them, same count and colours on both sides, rearranged) added to `app/components/icons/Illustrations.tsx` and exported from `app/components/icons/index.ts` under those exact names; hand-authored inline SVG only, existing hex palette, no external assets; each is interpretable without its caption; render tests added; `typecheck`/`lint`/`vitest run` all pass.
- **Estimate:** Small
- **Notes:** Built in a dedicated worktree, scoped strictly to `app/components/icons/`, in parallel with a second worker writing the actual "Chemical Reactions" lesson content — neither `curriculum/`, `LessonPlayer.tsx`, nor `ContinueLearningScreen.tsx` touched here; wiring into the `ILLUSTRATION_REGISTRY` and the lesson content itself is left for Claude's review, per the same pattern as every previous topic's illustrations (e.g. BL-041, BL-033). `ChemicalReactionHeroIllustration` uses two stacked liquid-colour trapezoids (sky blue lower, rose upper) inside a beaker outline, with amber/emerald bubbles rising through and above the neck — a two-tone liquid rather than an SVG gradient element, consistent with "no gradients or filters beyond what's already used". `ConservationOfMassIllustration` shows 2 sky + 2 violet dots loosely scattered on the left and the same 4 dots paired into two bonded-looking pairs on the right, joined by a line-and-triangle arrow; no text baked into the SVG. `typecheck`, `lint`, and `vitest run` (75/75 tests, 11 files) all pass. **Reviewed by OpenClaw reviewer worker** (headless, independent review — read all new content in full, verified against both misconceptions, re-ran validate:curriculum/typecheck/lint/vitest/build before merging). **Accepted: Yes.** Registry wiring done by the reviewer per directive; merged to master alongside BL-046.

## Sprint 9

### BL-047 — Write the Forces lesson, assessment, and ForceFrictionSimulator widget

- **Description:** `sci-y7-forces` (already wired into the knowledge graph as an Atomic-Structure/Chemical-Reactions-adjacent architecture prerequisite) had zero lesson content, zero questions, and no interactive widget. Write it from scratch per the visual-learning standard (hero illustration, short text blocks, supporting diagram, meaningful interaction): what a force is, balanced vs. unbalanced forces, friction, gravity, and a new reusable `ForceFrictionSimulator` widget covering three preset surfaces (ice, wood floor, rough carpet).
- **Dependencies:** none
- **Priority:** P0
- **Status:** Done
- **Acceptance criteria:** New `app/components/widgets/ForceFrictionSimulator.tsx` — a standalone, curriculum-agnostic widget with no required props, offering 3 tappable surface options that each "push" a block a distance tied directly to how strongly that surface's friction opposes motion (far on ice, barely at all on rough carpet), showing the friction level (low/medium/high) and a caption explaining that friction opposes motion and is stronger on rougher surfaces; new `curriculum/lessons/lesson-forces-intro.yaml` (illustration → short explanation → short explanation → illustration → example → interactive `force-friction-simulator` → short explanation → 5 questions → summary) and `curriculum/assessments/assessment-forces-quiz.yaml`; `sci-y7-forces.yaml`'s `lessonRefs`/`assessmentRefs` populated; lesson references illustration ids `forces-hero` and `balanced-unbalanced-forces` and widget id `force-friction-simulator` (registration in `LessonPlayer`'s registries left for reviewer, per directive); 5 questions with hints and explanations covering the concept's learning objectives and directly targeting both misconceptions ("constant-force-needed", "heavier-falls-faster"); `validate:curriculum`/`typecheck`/`lint`/`vitest run` all pass; new unit tests for the widget.
- **Estimate:** Medium
- **Notes:** Every explanation/example step body is 2-4 sentences per the visual-learning standard. `ForceFrictionSimulator.tsx` reuses the existing `@keyframes` pattern (BL-027/BL-046), adding two new animations to `app/globals.css` (`friction-slide`, parameterized per-instance via a `--slide-distance` CSS custom property, and `push-pulse` for the "Push!" label) rather than one animation per preset, since all three surfaces share the same sliding motion at different distances. q-forces-02 targets the constant-force-needed misconception directly (a puck on frictionless ice needs no ongoing push to keep moving at constant speed), and q-forces-04 targets the heavier-falls-faster misconception directly (a bowling ball and tennis ball dropped together land at the same time). 4 new unit tests (initial state on ice, clicking each of the other two surfaces, aria-pressed toggling). Delegated to and completed by an OpenClaw headless worker in a dedicated worktree; `validate:curriculum`, `typecheck`, `lint`, and `vitest run` (83/83 tests, 13 files) all pass. Built in parallel with a second worker producing the `forces-hero` and `balanced-unbalanced-forces` illustrations (`app/components/icons/`) — neither that directory nor `LessonPlayer.tsx` touched here; registry wiring left for the reviewer worker, per the same pattern as BL-046/CE-002. **Reviewed by OpenClaw reviewer worker** (headless, independent review — read all new content in full, verified scientific accuracy at Year 7-10 level, confirmed both misconceptions are directly targeted with correct explanations, confirmed every question has a hint and explanation, confirmed step bodies are genuinely short, re-ran validate:curriculum/typecheck/lint/vitest/build before merging). **Accepted: Yes.** Registry wiring done by the reviewer per directive; merged to master alongside CE-003.

### CE-003 — Forces illustrations

- **Description:** Per the 2026-08-03 permanent visual-learning standard, every lesson needs a hero illustration plus supporting diagrams rendered inside the lesson flow itself via the `illustration` lesson-step type. Added two new hand-authored SVG illustrations for the in-flight "Forces" lesson (Sprint 9), matching the existing inline-SVG style (see `app/components/icons/Illustrations.tsx`).
- **Dependencies:** none
- **Priority:** P1
- **Status:** Done
- **Acceptance criteria:** `ForcesHeroIllustration` (a box driven from its original dashed outline to a displaced position by a push arrow, with motion streaks showing the movement, teaching "a force is a push or pull acting on an object") and `BalancedUnbalancedForcesIllustration` (the same object shown twice: equal-length opposing arrows keeping it centred on one side vs. visibly unequal-length opposing arrows on the other, teaching balanced vs. unbalanced forces) added to `app/components/icons/Illustrations.tsx` and exported from `app/components/icons/index.ts` under those exact names; hand-authored inline SVG only, existing hex palette, no external assets, no text baked into either SVG; each is interpretable without its caption; render tests added; `typecheck`/`lint`/`vitest run` all pass.
- **Estimate:** Small
- **Notes:** Built in a dedicated worktree, scoped strictly to `app/components/icons/`, in parallel with a second worker writing the actual "Forces" lesson content — neither `curriculum/`, `LessonPlayer.tsx`, nor `ContinueLearningScreen.tsx` touched here; wiring into the `ILLUSTRATION_REGISTRY` and the lesson content itself is left for the reviewer, per the same pattern as CE-002/BL-046. `ForcesHeroIllustration` uses a dashed zinc outline for the object's original position, a solid amber box at its displaced position, and dashed zinc motion-streak lines between them, driven by a sky-blue arrow. `BalancedUnbalancedForcesIllustration` reuses the same amber box shape on both sides: left/balanced has two equal-length (28px) opposing arrows (sky + violet) with the box centred; right/unbalanced has a short (~17px) weak arrow and a long (~43px) strong arrow of the same two colours. Delegated to and completed by an OpenClaw headless worker; `typecheck`, `lint`, and `vitest run` (81/81 tests, 12 files) all pass. **Reviewed by OpenClaw reviewer worker** (headless, independent review — read the SVG source directly and verified both illustrations are interpretable without a caption. Correction to the original submission notes: the unbalanced panel's box is not actually displaced/offset — geometry check shows it sits centred between the two arrow tips just as in the balanced panel; only the arrow-length asymmetry differs. That asymmetry alone is sufficient to convey "unbalanced," so this did not block acceptance, but it is not the "box shifted toward the direction of the strong arrow" originally claimed). **Accepted: Yes.** Registry wiring done by the reviewer per directive; merged to master alongside BL-047.

## Sprint 10

### BL-048 — Write the Energy lesson, assessment, and EnergyTransformationExplorer widget

- **Description:** `sci-y7-energy` (already wired into the knowledge graph as a Forces-adjacent architecture prerequisite) had zero lesson content, zero questions, and no interactive widget. Write it from scratch per the visual-learning standard (hero illustration, short text blocks, supporting diagram, meaningful interaction): common energy forms, conservation of energy, everyday transformation chains, and a new reusable `EnergyTransformationExplorer` widget covering three preset scenarios (torch, swinging pendulum, rubbing hands together).
- **Dependencies:** none
- **Priority:** P0
- **Status:** Done
- **Acceptance criteria:** New `app/components/widgets/EnergyTransformationExplorer.tsx` — a standalone, curriculum-agnostic widget with no required props, offering 3 tappable everyday scenarios that each reveal an energy-transformation chain and a caption reinforcing that energy is transformed rather than destroyed, with the pendulum scenario additionally showing an animated visual making the potential/kinetic energy trade-off visible (not just stated in text); new `curriculum/lessons/lesson-energy-intro.yaml` (illustration → short explanation → short explanation → illustration → example → interactive `energy-transformation-explorer` → 5 questions → summary) and `curriculum/assessments/assessment-energy-quiz.yaml`; `sci-y7-energy.yaml`'s `lessonRefs`/`assessmentRefs` populated; lesson references illustration ids `energy-hero` and `energy-transformation` and widget id `energy-transformation-explorer` (registration in `LessonPlayer`'s registries left for reviewer, per directive); 5 questions with hints and explanations covering the concept's learning objectives and directly targeting both misconceptions ("energy-gets-used-up", "stillness-means-no-energy"); `validate:curriculum`/`typecheck`/`lint`/`vitest run` all pass; new unit tests for the widget.
- **Estimate:** Medium
- **Notes:** Every explanation/example step body is 2-4 sentences per the visual-learning standard. `EnergyTransformationExplorer.tsx` reuses the existing `@keyframes` pattern (BL-027/BL-046/BL-047), adding three new animations to `app/globals.css` (`pendulum-swing`, `pendulum-potential-bar`, `pendulum-kinetic-bar`) synced on the same cycle a quarter-period out of phase, so the potential/kinetic bars visibly trade height as the bob swings rather than the trade-off only being described in the caption. q-energy-01/02 target the energy-gets-used-up misconception directly (conservation definition, and a wind-up toy car's "used up" energy actually becoming heat and sound), and q-energy-03/05 target the stillness-means-no-energy misconception directly (a held-up ball and a stretched spring both storing energy while stationary). 4 new unit tests (initial state on torch, clicking the pendulum scenario including its animated visual, clicking the hand-rubbing scenario, aria-pressed toggling). Delegated to and completed by an OpenClaw headless worker in a dedicated worktree; `validate:curriculum`, `typecheck`, `lint`, and `vitest run` (89/89 tests, 14 files) all pass. Built in parallel with a second worker producing the `energy-hero` and `energy-transformation` illustrations (`app/components/icons/`) — neither that directory nor `LessonPlayer.tsx` touched here; registry wiring left for the reviewer worker, per the same pattern as BL-047/CE-003. **Reviewed by OpenClaw reviewer worker** (headless, independent review — read all new content in full: the lesson, the quiz, the concept file, and the widget source and its test. Verified the physics: conservation of energy is stated correctly (never created/destroyed, only transformed, some always becomes heat), no numeric/joule calculations. Both misconceptions are correctly targeted — q-energy-01/02 for "energy-gets-used-up", q-energy-03/05 for "stillness-means-no-energy" — and the potential/kinetic energy question and the pendulum widget correctly describe maximum potential energy at the top of the swing and maximum kinetic energy at the bottom; checked the `pendulum-potential-bar`/`pendulum-kinetic-bar` CSS keyframes directly and confirmed the bars peak at the correct phase of the swing. All 5 questions have both hint and explanation. Explanation/example step bodies are genuinely 2-4 sentences. No placeholders. Re-ran `validate:curriculum`/`typecheck`/`lint`/`vitest run`/`next build` before merging — all pass). **Accepted: Yes.** Registry wiring done by the reviewer per directive; merged to master alongside CE-004.

### CE-004 — Energy illustrations

- **Description:** Per the 2026-08-03 permanent visual-learning standard, every lesson needs a hero illustration plus supporting diagrams rendered inside the lesson flow itself via the `illustration` lesson-step type. Added two new hand-authored SVG illustrations for the in-flight "Energy" lesson (Sprint 10), matching the existing inline-SVG style (see `app/components/icons/Illustrations.tsx`).
- **Dependencies:** none
- **Priority:** P1
- **Status:** Done
- **Acceptance criteria:** `EnergyHeroIllustration` (a glowing lightbulb with a zigzag filament and radiating light rays, teaching "energy actively producing an effect") and `EnergyTransformationIllustration` (three linked stages - a battery, a lightning bolt, and a sun burst - joined by two arrows, teaching "energy changes from one form to another in sequence") added to `app/components/icons/Illustrations.tsx` and exported from `app/components/icons/index.ts` under those exact names; hand-authored inline SVG only, existing hex palette, no external assets, no text baked into either SVG; each is interpretable without its caption; render tests added; `typecheck`/`lint`/`vitest run` all pass.
- **Estimate:** Small
- **Notes:** Built in a dedicated worktree, scoped strictly to `app/components/icons/`, in parallel with a second worker writing the actual "Energy" lesson content — neither `curriculum/`, `LessonPlayer.tsx`, nor `ContinueLearningScreen.tsx` touched here; wiring into the `ILLUSTRATION_REGISTRY` and the lesson content itself is left for the reviewer, per the same pattern as CE-002/CE-003. `EnergyHeroIllustration` uses an amber circle for the bulb glass, a zinc base, a rose zigzag filament, and 5 amber rays at different angles. `EnergyTransformationIllustration` chains an emerald battery, a violet lightning bolt, and an amber sun burst (with its own short rays), joined by two zinc arrows, echoing `ConservationOfMassIllustration`'s before/after arrow pattern but with three linked stages instead of two. Delegated to and completed by an OpenClaw headless worker; `typecheck`, `lint`, and `vitest run` (87/87 tests, 13 files) all pass. **Reviewed by OpenClaw reviewer worker** (headless, independent review — read the SVG source directly. `EnergyHeroIllustration` is interpretable without a caption as energy actively producing an effect (a glowing bulb with radiating rays); `EnergyTransformationIllustration` is interpretable without a caption as a multi-stage transformation chain (three linked stages joined by arrows). No text baked into either SVG, existing hex palette only). **Accepted: Yes.** Registry wiring done by the reviewer per directive; merged to master alongside BL-048.

## Sprint 11

### BL-049 — Write the Cells lesson, assessment, and CellStructureExplorer widget

- **Description:** `sci-y7-cells` (the first biology topic in the app, added as an architecture prerequisite in Sprint 11) had zero lesson content, zero questions, and no interactive widget. Write it from scratch per the visual-learning standard (hero illustration, short text blocks, supporting diagram, meaningful interaction): what a cell is, the structures common to most cells (membrane, cytoplasm, nucleus), the plant-only structures (cell wall, chloroplast, large vacuole), levels of organisation, and a new reusable `CellStructureExplorer` widget.
- **Dependencies:** none
- **Priority:** P0
- **Status:** Done
- **Acceptance criteria:** New `app/components/widgets/CellStructureExplorer.tsx` — a standalone, curriculum-agnostic widget with no required props, offering 6 tappable structures (cell membrane, nucleus, cytoplasm, cell wall, chloroplast, large vacuole) that each reveal a one-sentence function and whether the structure is found in both plant and animal cells or plant cells only, with each structure's icon rendered in a colour tied to its group so the plant-only trio is visually distinct from the shared trio, not just stated in text; new `curriculum/lessons/lesson-cells-intro.yaml` (illustration → short explanation → short explanation → illustration → example → interactive `cell-structure-explorer` → 5 questions → summary) and `curriculum/assessments/assessment-cells-quiz.yaml`; `sci-y7-cells.yaml`'s `lessonRefs`/`assessmentRefs` populated; lesson references illustration ids `cells-hero` and `plant-vs-animal-cell` and widget id `cell-structure-explorer` (registration in `LessonPlayer`'s registries left for reviewer, per directive); 5 questions with hints and explanations covering the concept's learning objectives and directly targeting both misconceptions ("bigger-organism-bigger-cells", "plant-animal-cells-same"); `validate:curriculum`/`typecheck`/`lint`/`vitest run` all pass; new unit tests for the widget.
- **Estimate:** Medium
- **Notes:** Every explanation/example step body is 2-4 sentences per the visual-learning standard. `CellStructureExplorer.tsx` follows `PeriodicTableExplorer`'s "shape carries meaning, colour carries category" pattern: each structure has a distinct SVG shape (a ring for the membrane, a filled circle for the nucleus, a translucent blob for cytoplasm, a thick-bordered square for the cell wall, an oval for the chloroplast, a large translucent circle for the vacuole), rendered in its group's colour (sky for shared, emerald for plant-only). q-cells-03 targets the bigger-organism-bigger-cells misconception directly (an elephant vs. a mouse — more cells, not bigger ones), and q-cells-04 targets the plant-animal-cells-same misconception directly (requiring the learner to name a plant-only structure). 5 new unit tests (initial state on the cell membrane, selecting a shared structure, selecting a plant-only structure, all three plant-only structures reporting "Plant cells only", aria-pressed toggling). Delegated to and completed by an OpenClaw headless worker in a dedicated worktree; `validate:curriculum`, `typecheck`, `lint`, and `vitest run` (96/96 tests, 15 files) all pass. Built in parallel with a second worker producing the `cells-hero` and `plant-vs-animal-cell` illustrations (`app/components/icons/`) — neither that directory nor `LessonPlayer.tsx` touched here; registry wiring left for the reviewer worker, per the same pattern as BL-048/CE-004. **Reviewed by OpenClaw reviewer worker** (headless, independent review — read the lesson, quiz, concept file, widget source, and widget test in full. Verified biology: membrane/cytoplasm/nucleus functions correctly described; cell wall/chloroplast/vacuole correctly scoped as plant-only; no organelle detail beyond scope (no mitochondria/ribosomes/ER/Golgi), no respiration/photosynthesis chemistry, no mitosis. Both misconceptions are correctly and directly targeted — q-cells-03 correctly states larger organisms have more cells, not bigger ones; q-cells-04 requires naming a plant-only structure. Levels of organisation (cell → tissue → organ → organ system) stated in the correct order in both the lesson and q-cells-05. All 5 questions have both hint and explanation. Explanation/example step bodies are genuinely 2-4 sentences. No placeholders. Re-ran `validate:curriculum`/`typecheck`/`lint`/`vitest run`/`next build` before merging — all pass). **Accepted: Yes.** Registry wiring done by the reviewer per directive; merged to master alongside CE-005.

### CE-005 — Cells illustrations

- **Description:** Per the 2026-08-03 permanent visual-learning standard, every lesson needs a hero illustration plus supporting diagrams rendered inside the lesson flow itself via the `illustration` lesson-step type. Added two new hand-authored SVG illustrations for the in-flight "Cells" lesson (Sprint 11), the first biology topic in the app, matching the existing inline-SVG style (see `app/components/icons/Illustrations.tsx`).
- **Dependencies:** none
- **Priority:** P1
- **Status:** Done
- **Acceptance criteria:** `CellsHeroIllustration` (an outer membrane outline, an off-centre filled nucleus, and several small scattered organelle dots, teaching "this is what a living cell looks like") and `PlantVsAnimalCellIllustration` (a rounded animal cell with membrane + nucleus only, beside a boxy walled plant cell with membrane, nucleus, chloroplasts, and a large vacuole, teaching the structural contrast between the two) added to `app/components/icons/Illustrations.tsx` and exported from `app/components/icons/index.ts` under those exact names; hand-authored inline SVG only, existing hex palette, no external assets, no text baked into either SVG; each is interpretable without its caption; render tests added; `typecheck`/`lint`/`vitest run` all pass.
- **Estimate:** Small
- **Notes:** Built in a dedicated worktree, scoped strictly to `app/components/icons/`, in parallel with a second worker writing the actual "Cells" lesson content — neither `curriculum/`, `LessonPlayer.tsx`, nor `ContinueLearningScreen.tsx` touched here; wiring into the `ILLUSTRATION_REGISTRY` and the lesson content itself is left for the reviewer, per the same pattern as CE-002/CE-003/CE-004. `CellsHeroIllustration` uses a sky-blue oval outline for the membrane, a violet circle off-centre for the nucleus, and five small amber/emerald/rose dots scattered around it for organelles. `PlantVsAnimalCellIllustration` pairs a sky-blue irregular blob outline (animal cell membrane) with a violet nucleus on the left against a zinc rounded-rectangle outline (rigid cell wall) containing a sky-blue inset membrane rectangle, a violet nucleus, two small emerald chloroplast ovals, and one larger amber vacuole ellipse on the right — the rounded-vs-boxy outline plus the extra internal shapes on the plant side carry the contrast without labels. Delegated to and completed by an OpenClaw headless worker; `typecheck`, `lint`, and `vitest run` (93/93 tests, 14 files) all pass. **Reviewed by OpenClaw reviewer worker** (headless, independent review — read the SVG source directly. `CellsHeroIllustration` is interpretable without a caption as a recognisable cell diagram (membrane outline, off-centre nucleus, scattered organelle dots); `PlantVsAnimalCellIllustration` is interpretable without a caption as a plant-vs-animal contrast via shape (rounded vs. boxy walled outline) and extra structures (chloroplasts, vacuole) on the plant side only. No text baked into either SVG, existing hex palette only). **Accepted: Yes.** Registry wiring done by the reviewer per directive; merged to master alongside BL-049.

## Sprint 12

### BL-050 — Write the Body Systems lesson, assessment, and BodySystemExplorer widget

- **Description:** `sci-y7-body-systems` (added as an architecture prerequisite in Sprint 12, continuing the cells → tissues → organs → organ systems progression) had zero lesson content, zero questions, and no interactive widget. Write it from scratch per the visual-learning standard: what an organ system is, the main function and key organs of the digestive, circulatory, and respiratory systems, how those systems work together rather than in isolation, and the distinction between breathing and (cellular) respiration.
- **Dependencies:** none
- **Priority:** P0
- **Status:** Done
- **Acceptance criteria:** New `app/components/widgets/BodySystemExplorer.tsx` — a standalone, curriculum-agnostic widget with no required props, offering 3 tappable organ systems (digestive, circulatory, respiratory) that each reveal their main function and their key organs with a one-phrase role, each system visually distinguished by a distinct shape/colour; new `curriculum/lessons/lesson-body-systems-intro.yaml` (illustration → explanation → explanation → illustration → example → interactive `body-system-explorer` → explanation → 5 questions → summary) and `curriculum/assessments/assessment-body-systems-quiz.yaml`; `sci-y7-body-systems.yaml`'s `lessonRefs`/`assessmentRefs` populated; lesson references illustration ids `body-systems-hero` and `systems-working-together` and widget id `body-system-explorer` (registration in `LessonPlayer`'s registries left for the QA worker, per directive); 5 questions with hints and explanations covering the concept's learning objectives and directly targeting both misconceptions ("systems-work-in-isolation", "breathing-is-respiration"); `validate:curriculum`/`typecheck`/`lint`/`vitest run` all pass; new unit tests for the widget.
- **Estimate:** Medium
- **Notes:** Every explanation/example step body is 2-4 sentences per the visual-learning standard. q-body-systems-04 targets the systems-work-in-isolation misconception directly (a student claim that the circulatory and respiratory systems never interact, requiring an example showing otherwise). q-body-systems-05 targets the breathing-is-respiration misconception directly (a student claim that breathing and respiration are the same thing). Delegated to and completed by an OpenClaw headless worker in a dedicated worktree. Built in parallel with a second worker producing the `body-systems-hero` and `systems-working-together` illustrations (`app/components/icons/`) — neither that directory nor `LessonPlayer.tsx` touched here; registry wiring left for the QA worker, per the same pattern as BL-048/CE-004 and BL-049/CE-005. **Reviewed by OpenClaw QA worker** (headless, independent review + live browser click-through of every lesson step). Verified biology: digestive/circulatory/respiratory functions and organs correctly described; no biochemistry (no enzymes, no ATP, no chemical equations), no anatomy beyond the organs listed in the concept file, no nervous/immune/excretory system content in scope; breathing (mechanical air movement) correctly distinguished from cellular respiration (the chemical energy-release process in cells) in both the lesson and q-body-systems-05. Both misconceptions are correctly and directly targeted. All 5 questions have both hint and explanation. Explanation/example step bodies are genuinely 2-4 sentences. No placeholders. Re-ran `validate:curriculum`/`typecheck`/`lint`/`vitest run`/`next build` before merging — all pass. Live headless-Chromium click-through of the full lesson confirmed: hero illustration, both explanation steps, mid-lesson illustration, example, the `BodySystemExplorer` widget (all three systems show distinct function/organ text), the breathing-vs-respiration explanation, all 5 questions (including hint reveal, one deliberate wrong answer confirming the "Try again" flow, and both short-answer self-assessments), and the summary all rendered and worked correctly; XP increased from 50 to 100 on completion and the lesson showed as Completed on the topic list afterward; no console errors during the flow; no horizontal overflow at a 375px mobile viewport. **Accepted: Yes.** Registry wiring done by the QA worker per directive; merged to master alongside CE-006.

### CE-006 — Body Systems illustrations

- **Description:** Per the 2026-08-03 permanent visual-learning standard, every lesson needs a hero illustration plus supporting diagrams rendered inside the lesson flow itself via the `illustration` lesson-step type. Added two new hand-authored SVG illustrations for the in-flight "Body Systems" lesson (Sprint 12), matching the existing inline-SVG style (see `app/components/icons/Illustrations.tsx`).
- **Dependencies:** none
- **Priority:** P1
- **Status:** Done
- **Acceptance criteria:** `BodySystemsHeroIllustration` (a simplified rounded head + torso outline with a rose heart shape, two sky-blue lung shapes, and an amber intestine loop glowing inside it, teaching "systems inside a body, working") and `SystemsWorkingTogetherIllustration` (a sky-blue lung shape connected to a rose heart shape by a vessel path with amber dots and an arrowhead travelling along it, and a second path/dots continuing on from the heart, teaching that oxygen moves from the lungs to the heart and on to the rest of the body) added to `app/components/icons/Illustrations.tsx` and exported from `app/components/icons/index.ts` under those exact names; hand-authored inline SVG only, existing hex palette, no external assets, no text baked into either SVG; each is interpretable without its caption; render tests added; `typecheck`/`lint`/`vitest run` all pass.
- **Estimate:** Small
- **Notes:** Built in a dedicated worktree, scoped strictly to `app/components/icons/`, in parallel with a second worker writing the actual "Body Systems" lesson content — neither `curriculum/`, `LessonPlayer.tsx`, nor `ContinueLearningScreen.tsx` touched here; wiring into the `ILLUSTRATION_REGISTRY` and the lesson content itself is left for the QA worker, per the same pattern as CE-002/CE-003/CE-004/CE-005. `BodySystemsHeroIllustration` uses a zinc outline for the head and torso (no anatomical detail) with a rose heart, two sky-blue lung shapes either side of it, and an amber looping intestine shape in the lower torso, all rendered as if glowing inside the outline. `SystemsWorkingTogetherIllustration` pairs a single sky-blue lung shape with a rose heart shape joined by a zinc vessel path carrying amber dots and an arrowhead into the heart, plus a second shorter zinc path/dots/arrowhead continuing on from the heart, so the connection and direction of flow — not just the two organs in isolation — carries the concept. Delegated to and completed by an OpenClaw headless worker; `typecheck`, `lint`, and `vitest run` (107/107 tests, 16 files) all pass. **Reviewed by OpenClaw QA worker** (headless, independent review — read the SVG source directly. `BodySystemsHeroIllustration` is interpretable without a caption as a recognisable body diagram (head + torso outline with heart, lungs, and intestine glowing inside); `SystemsWorkingTogetherIllustration` is interpretable without a caption as an oxygen-delivery flow via the connecting vessel path, direction arrows, and travelling dots between lung and heart shapes. No text baked into either SVG, existing hex palette only). **Accepted: Yes.** Registry wiring done by the QA worker per directive; merged to master alongside BL-050.

## Sprint 13

### BL-051 — Write the Ecosystems lesson, assessment, and FoodChainExplorer widget

- **Description:** `sci-y7-ecosystems` (added as an architecture prerequisite in Sprint 13) had zero lesson content, zero questions, and no interactive widget. Write it from scratch per the visual-learning standard: biotic/abiotic parts of an ecosystem, the roles of producers, consumers, and decomposers in a food chain, how energy flows through a food chain and why most is lost as heat at each step, and how adaptations help an organism survive in its environment.
- **Dependencies:** none
- **Priority:** P0
- **Status:** Done
- **Acceptance criteria:** New `app/components/widgets/FoodChainExplorer.tsx` — a standalone, curriculum-agnostic widget with no required props, offering 4 tappable trophic levels (Producer, Primary Consumer, Secondary Consumer, Decomposer) in order, each revealing its role in one short sentence, an example organism, and (for every level after Producer) a visual energy-flow comparison — a full-width bar for the previous level next to a bar shrunk to the actual passed-on percentage (~10%) — making the "most energy is lost at each step" point visible, not just stated; new `curriculum/lessons/lesson-ecosystems-intro.yaml` (illustration → explanation → explanation → illustration → example → interactive `food-chain-explorer` → explanation → 5 questions → summary) and `curriculum/assessments/assessment-ecosystems-quiz.yaml`; `sci-y7-ecosystems.yaml`'s `lessonRefs`/`assessmentRefs` populated; lesson references illustration ids `ecosystem-hero` and `food-chain-energy-flow` and widget id `food-chain-explorer` (registration in `LessonPlayer`'s registries left for the QA worker, per directive); 5 questions with hints and explanations covering the concept's learning objectives and directly targeting both misconceptions ("energy-fully-transfers", "producers-dont-count"); `validate:curriculum`/`typecheck`/`lint`/`vitest run` all pass; new unit tests for the widget.
- **Estimate:** Medium
- **Notes:** Every explanation/example step body is 2-4 sentences per the visual-learning standard. q-ecosystems-03 targets the producers-dont-count misconception directly (a student claim that plants aren't part of a food chain since they don't eat anything). q-ecosystems-04 targets the energy-fully-transfers misconception directly (a student claim that all of a rabbit's energy passes completely to the fox that eats it). Delegated to and completed by an OpenClaw headless worker in a dedicated worktree. Built in parallel with a second worker producing the `ecosystem-hero` and `food-chain-energy-flow` illustrations (`app/components/icons/`) — neither that directory nor `LessonPlayer.tsx` touched here; registry wiring left for the QA worker, per the same pattern as BL-049/CE-005 and BL-050/CE-006. **Reviewed by OpenClaw QA worker** (headless, independent review + live browser click-through of every lesson step). During review, found and fixed two real defects in `FoodChainExplorer.tsx`: the energy-comparison bars used `bg-warning-400`, a Tailwind color shade never defined in `app/globals.css`'s `--color-warning-*` token ramp (only 50/100/200/300/500/600/700/800/900/950 exist), so the bars would have rendered with no fill at all — the core "see the energy loss, not just read it" point of the widget — fixed to `bg-warning-500`; and the Decomposer level incorrectly reused the predation-style "10% passed on, 90% lost as heat" transfer model from the secondary consumer specifically, which misrepresents decomposition (decomposers break down dead matter from every trophic level, not a sequential inheritance from the one consumer before them) — fixed with dedicated decomposer copy and visual, no percentage claim. **Accepted: Yes.**

### CE-007 — Ecosystems illustrations

- **Description:** Per the permanent visual-learning standard, every lesson needs a hero illustration plus supporting diagrams rendered inside the lesson flow itself via the `illustration` lesson-step type. Added two new hand-authored SVG illustrations for the in-flight "Ecosystems" lesson (Sprint 13), matching the existing inline-SVG style (see `app/components/icons/Illustrations.tsx`).
- **Dependencies:** none
- **Priority:** P1
- **Status:** Done
- **Acceptance criteria:** `EcosystemHeroIllustration` (an amber sun with radiating rays, an emerald tree with a zinc trunk, and a rose rabbit-like animal sharing one scene, teaching that an ecosystem is living things and their energy source together in miniature) and `FoodChainEnergyFlowIllustration` (a left-to-right chain of sun → producer → herbivore → carnivore linked by zinc arrows, each stage noticeably smaller than the last, teaching that most energy is lost at every step of a food chain) added to `app/components/icons/Illustrations.tsx` and exported from `app/components/icons/index.ts` under those exact names; hand-authored inline SVG only, existing hex palette, no external assets, no text baked into either SVG; each is interpretable without its caption; render tests added; `typecheck`/`lint`/`vitest run` all pass.
- **Estimate:** Small
- **Notes:** Built in a dedicated worktree, scoped strictly to `app/components/icons/`, in parallel with a second worker writing the actual "Ecosystems" lesson content — neither `curriculum/`, `LessonPlayer.tsx`, nor `ContinueLearningScreen.tsx` touched here; wiring into the `ILLUSTRATION_REGISTRY` and the lesson content itself (ids `ecosystem-hero` and `food-chain-energy-flow`) is left for the QA worker, per the same pattern as CE-004/CE-005/CE-006. `EcosystemHeroIllustration` places the sun top-left with short rays, an emerald three-lobed tree canopy on a zinc trunk centre-left, and a rose rounded-body-plus-head-plus-ears rabbit shape bottom-right, all within one scene. `FoodChainEnergyFlowIllustration` runs sun (amber, r13) → zinc arrow → producer (emerald foliage circle + zinc stem, r10) → zinc arrow → herbivore (violet body + two round ears, r7) → zinc arrow → carnivore (rose body + two pointed ears + a short tail, r4.5), with each stage's radius strictly smaller than the one before it so the energy-loss progression reads without any caption. Delegated to and completed by an OpenClaw headless worker; `typecheck`, `lint`, and `vitest run` (113/113 tests, 17 files — 111 baseline + 2 new render tests) all pass. **Reviewed by OpenClaw QA worker** (headless, independent review + live browser click-through — read the SVG source directly. `EcosystemHeroIllustration` is interpretable without a caption as a scene of living things (tree, animal) and their energy source (sun) together. `FoodChainEnergyFlowIllustration` is interpretable without a caption: sun (r13) → producer (r10) → herbivore (r7) → carnivore (r4.5) is a genuinely decreasing size progression, not four same-sized icons, so the energy-loss point reads visually. No text baked into either SVG, existing hex palette only). **Accepted: Yes.** Registry wiring done by the QA worker per directive; merged to master alongside BL-051.

## Sprint 14

### BL-052 — Write the Genetics & Reproduction lesson, assessment, and InheritanceExplorer widget

- **Description:** `sci-y7-genetics-reproduction` (added as an architecture prerequisite in Sprint 14) had zero lesson content, zero questions, and no interactive widget. Write it from scratch per the visual-learning standard: genes as units of inherited information carried on chromosomes, inherited versus acquired characteristics, and sexual versus asexual reproduction and the genetic variation each produces (or doesn't).
- **Dependencies:** none
- **Priority:** P0
- **Status:** Done
- **Acceptance criteria:** New `app/components/widgets/InheritanceExplorer.tsx` — a standalone, curriculum-agnostic widget with no required props, offering 4 tappable scenarios grouped into two colour-coded pairs (Eye colour / A scar from a cut → Inherited/Passed to offspring vs. Acquired/Not passed to offspring; A strawberry plant runner / Two dogs breeding puppies → Asexual reproduction/One parent, genetically identical vs. Sexual reproduction/Two parents, genetically varied), each reveal showing a classification badge, a colour-matched group label, and a one-sentence explanation, so both misconception corrections are shown visually via consistent colour-coding, not just stated in text; new `curriculum/lessons/lesson-genetics-reproduction-intro.yaml` (illustration → explanation → explanation → illustration → example → interactive `inheritance-explorer` → explanation → 5 questions → summary) and `curriculum/assessments/assessment-genetics-reproduction-quiz.yaml`; `sci-y7-genetics-reproduction.yaml`'s `lessonRefs`/`assessmentRefs` populated; lesson references illustration ids `genetics-hero` and `sexual-vs-asexual-reproduction` and widget id `inheritance-explorer` (registration in `LessonPlayer`'s registries left for the QA worker, per directive); 5 questions with hints and explanations covering the concept's learning objectives and directly targeting both misconceptions ("acquired-traits-inherited", "asexual-produces-variation"); `validate:curriculum`/`typecheck`/`lint`/`vitest run` all pass; new unit tests for the widget.
- **Estimate:** Medium
- **Notes:** Every explanation/example step body is 2-4 sentences per the visual-learning standard. q-genetics-reproduction-02 targets the acquired-traits-inherited misconception directly (a student claim that muscle built through exercise will make their future children more muscular). q-genetics-reproduction-04 targets the asexual-produces-variation misconception directly (a claim that a strawberry runner produces a plant genetically different from its parent, like sexual reproduction would). Delegated to and completed by an OpenClaw headless worker in a dedicated worktree. Built in parallel with a second worker producing the `genetics-hero` and `sexual-vs-asexual-reproduction` illustrations (`app/components/icons/`) — neither that directory nor `LessonPlayer.tsx` touched here; registry wiring left for the QA worker, per the same pattern as BL-050/CE-006 and BL-051/CE-007. `typecheck`, `lint`, and `vitest run` (123/123 tests, 19 files — 118 baseline + 5 new widget tests) all pass. **Reviewed by OpenClaw QA worker** (headless, independent review + live browser click-through of every lesson step: hero illustration → both inherited/acquired explanations → mid-lesson illustration → example → the `InheritanceExplorer` widget (all 4 scenarios tapped, each showing distinct inherited/acquired/asexual/sexual classification text) → variation-matters explanation → all 5 questions, one answered incorrectly on purpose and one hint revealed → summary → finish, on a scratch test learner via the "Testing as" control, never touching Aarshiya's real profile. Confirmed XP increased 0 → 50 and the lesson showed Completed afterward. No console errors; no horizontal overflow at 375px, on the topic list or inside the lesson. Content re-verified directly against source: no molecular/DNA-base-pair detail, no Punnett squares, no meiosis/mitosis mechanics; both misconceptions correctly and directly targeted with the right directionality; every question has both a hint and an explanation). **Accepted: Yes.**

### CE-008 — Genetics & Reproduction illustrations

- **Description:** Per the permanent visual-learning standard, every lesson needs a hero illustration plus supporting diagrams rendered inside the lesson flow itself via the `illustration` lesson-step type. Added two new hand-authored SVG illustrations for the in-flight "Genetics & Reproduction" lesson (Sprint 14), matching the existing inline-SVG style (see `app/components/icons/Illustrations.tsx`).
- **Dependencies:** none
- **Priority:** P1
- **Status:** Done
- **Acceptance criteria:** `GeneticsHeroIllustration` (a twisted double helix - two intertwined sky/violet strands linked by six alternating amber/emerald/rose cross-rungs like base pairs, teaching that genetic material is passed between generations) and `SexualVsAsexualReproductionIllustration` (a single scene split by a dashed divider: on one side a single violet parent shape with an arrow to an identical violet offspring shape, on the other side two differently-coloured parent shapes (amber and sky) with arrows converging on one offspring shape split into an amber half and a sky half, visually showing a blended mix of both parents) added to `app/components/icons/Illustrations.tsx` and exported from `app/components/icons/index.ts` under those exact names; hand-authored inline SVG only, existing hex palette, no external assets, no text baked into either SVG; each is interpretable without its caption; render tests added; `typecheck`/`lint`/`vitest run` all pass.
- **Estimate:** Small
- **Notes:** Built in a dedicated worktree, scoped strictly to `app/components/icons/`, in parallel with a second worker writing the actual "Genetics & Reproduction" lesson content — neither `curriculum/`, `LessonPlayer.tsx`, nor `ContinueLearningScreen.tsx` touched here; wiring into the `ILLUSTRATION_REGISTRY` and the lesson content itself (ids `genetics-hero` and `sexual-vs-asexual-reproduction`) is left for the QA worker, per the same pattern as CE-005/CE-006/CE-007. `GeneticsHeroIllustration` traces two opposite-phase wavy paths (sky and violet) crossing between x=35 and x=145 over six vertical levels, with a horizontal rung at each level alternating amber/emerald/rose to suggest base pairs along a double helix. `SexualVsAsexualReproductionIllustration` uses a dashed centre divider: the asexual side is one violet circle with a down arrow to a second, identically sized and coloured violet circle (a clone); the sexual side is an amber circle and a sky circle each with a converging arrow to a single offspring circle built from two semicircle paths (amber left half, sky right half), so the blended-colour offspring reads as a mix of both parents without any label. Delegated to and completed by an OpenClaw headless worker; `typecheck`, `lint`, and `vitest run` (120/120 tests, 18 files — 118 baseline + 2 new render tests) all pass. **Reviewed by OpenClaw QA worker** (headless, independent review + live browser click-through — read the SVG source directly. `GeneticsHeroIllustration` is interpretable without a caption as a double helix (two intertwined strands with alternating cross-rungs), the standard visual shorthand for genetic material. `SexualVsAsexualReproductionIllustration` is interpretable without a caption: one parent shape → one identically-coloured offspring shape on one side, versus two differently-coloured parent shapes → one blended two-tone offspring shape on the other, so the "one parent, identical" vs. "two parents, mixed" contrast reads visually. No text baked into either SVG, existing hex palette only). **Accepted: Yes.** Registry wiring done by the QA worker per directive; merged to master alongside BL-052.

## Sprint 15

### CE-009 — Plate Tectonics illustrations

- **Description:** Per the permanent visual-learning standard, every lesson needs a hero illustration plus supporting diagrams rendered inside the lesson flow itself via the `illustration` lesson-step type. Added two new hand-authored SVG illustrations for the in-flight "Plate Tectonics" lesson (Sprint 15, Earth and Space strand), matching the existing inline-SVG style (see `app/components/icons/Illustrations.tsx`).
- **Dependencies:** none
- **Priority:** P1
- **Status:** Done
- **Acceptance criteria:** `PlateTectonicsHeroIllustration` (an Earth cross-section: a rose core and an amber mantle drawn as nested filled discs, wrapped by a thin outer ring broken into four alternating sky/emerald arcs with visible gaps between them, teaching that the crust is a shell of separate rigid plate segments sitting over the continuous mantle and core) and `PlateBoundaryTypesIllustration` (three side-by-side boundary scenes distinguished entirely by arrow direction: convergent arrows push toward each other into an uplifted amber ridge, divergent arrows pull apart around a wedge of new amber material filling the gap, and transform arrows run parallel to a vertical boundary line in opposite directions with no bump or gap) added to `app/components/icons/Illustrations.tsx` and exported from `app/components/icons/index.ts` under those exact names; hand-authored inline SVG only, existing hex palette, no external assets, no text baked into either SVG; each is interpretable without its caption; render tests added; `typecheck`/`lint`/`vitest run` all pass.
- **Estimate:** Small
- **Notes:** Built in a dedicated worktree, scoped strictly to `app/components/icons/`, in parallel with a second worker writing the actual "Plate Tectonics" lesson content — neither `curriculum/`, `LessonPlayer.tsx`, nor `ContinueLearningScreen.tsx` touched here; wiring into the `ILLUSTRATION_REGISTRY` and the lesson content itself (ids `plate-tectonics-hero` and `plate-boundary-types`) is left for the QA worker, per the same pattern as CE-006/CE-007/CE-008. `PlateTectonicsHeroIllustration` nests a small rose core circle inside a larger amber mantle circle, both centred at (90,60), with four separate 54-radius stroke arcs (alternating sky and emerald, 70 degrees each with 20-degree gaps) wrapping the outside as distinct crust plate segments. `PlateBoundaryTypesIllustration` splits the canvas into three dashed-divider panels: the convergent panel shows two plate blocks with an amber uplift triangle between them and arrows pointing toward each other; the divergent panel shows two plate blocks with an amber wedge filling the gap between them and arrows pointing apart; the transform panel shows two same-height plate blocks against a dashed vertical fault line with vertical arrows on each block pointing in opposite directions, parallel to the boundary rather than toward or away from it. Delegated to and completed by an OpenClaw headless worker; `typecheck`, `lint`, and `vitest run` (127/127 tests, 19 files — 125 baseline + 2 new render tests) all pass.

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
