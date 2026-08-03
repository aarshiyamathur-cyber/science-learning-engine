# Product Roadmap

_Frozen 2026-08-01 per Product Owner directive; extended 2026-08-03 through Sprint 12 with standing autonomous-execution authorisation — see `management/INBOX.md`'s 2026-08-03 "autonomous multi-sprint execution" directive. Mission: complete the NSW Year 9 Science Learning Engine. Continue executing without a per-sprint approval stop; see Stop Conditions below._

**KPI: completed science topics Aarshiya can learn from — not engineering progress. Secondary KPI: Question Bank growth.**

| Sprint | Topic | Status |
| --- | --- | --- |
| Sprint 5 | Complete Matter | ✅ Done — accepted by Product Owner 2026-08-03 |
| Sprint 6 | Atomic Structure | ✅ Done — Definition of Done met 2026-08-03 |
| Sprint 7 | Periodic Table | ✅ Done — Definition of Done met 2026-08-03 |
| Sprint 8 | Chemical Reactions | ✅ Done — Definition of Done met 2026-08-03 |
| Sprint 9 | Forces | ✅ Done — Definition of Done met 2026-08-04 |
| Sprint 10 | Energy | ✅ Done — Definition of Done met 2026-08-04 |
| Sprint 11 | Cells | ⬜ Not started |
| Sprint 12 | Body Systems | ⬜ Not started |

## Stop conditions (2026-08-03 directive — the only reasons to pause and ask)

1. A genuine architectural blocker.
2. A product decision that cannot reasonably be inferred.
3. Four additional curriculum topics (i.e. Sprints 8-11) have reached the Definition of Done.
4. A critical production issue.

Otherwise: continue autonomously, update the repository continuously, and provide a concise Product Brief only at major milestones — not a full briefing after every sprint.

## Worktree allocation (2026-08-03 directive)

- **Worktree 1 (`openclaw/aarshiya-auto`) — primary curriculum implementation:** lessons, interactions, assessments, question bank entries.
- **Worktree 2 (`openclaw/command-centre`, repurposed) — learner experience:** illustrations, educational graphics, diagrams, UI polish, accessibility, QA, revision questions.

OpenClaw is now the primary implementation team; Claude maximises delegation and only codes directly for architecture changes, when OpenClaw is blocked, or when integration can't be delegated.

## Visual learning standard (DEC-009 — now a permanent product requirement, not a one-off decision)

Every new lesson: a hero illustration, supporting diagrams/graphics, short readable text blocks, at least one meaningful interaction where appropriate. No long text-heavy lessons. Illustrations must teach a concept, never just decorate. Enabled by the new `illustration` lesson-step type (see `management/DECISIONS.md` and `management/TASK_LEDGER.md`).

## Sprint 5 — Definition of Done (all met)

- [x] Every lesson complete
- [x] Every explanation complete
- [x] Every assessment complete
- [x] Every answer has meaningful feedback
- [x] Appropriate illustrations throughout
- [x] At least one meaningful interaction in the topic (particle-state-explorer, used in all 3 lessons)
- [x] Navigation polished
- [x] Mobile/iPad friendly
- [x] No placeholder content
- [x] QA completed (live click-through found and fixed 2 real bugs)

## Sprint 6 — Atomic Structure (Definition of Done met 2026-08-03)

**Scope:** structure of the atom, protons, neutrons, electrons, atomic number, mass number, electron shells, simple atomic models.

**In flight (dispatched to OpenClaw, not yet reviewed/merged):**
- BL-040 — Atomic Structure lesson + assessment, written from scratch
- BL-041 — Atomic Structure illustration

**Architecture already in place (Claude, since these touch shared files):**
- `atom-builder` widget (built Sprint 4, unused until now) registered in `LessonPlayer`'s widget registry
- New concept `sci-y7-atomic-structure` added to the knowledge graph and the app's topic sequence, gated behind completing Matter

**Resolved 2026-08-03 (DEC-006):** Product Owner accepted the existing button-based `AtomBuilder` widget as the Version 1 interaction for atomic structure. Drag-and-drop particle/electron placement is not being built now — recorded as a future enhancement only.

**Resolved:** "Identify atoms from atomic number" is covered via assessment questions in BL-040 (e.g. `q-atomic-structure-02`/`03`), not a separate mechanic.

**Definition of Done met 2026-08-03 (BL-043):** live click-through of every interaction (hints, wrong-answer retry, atom-builder widget, all 5 questions, summary), 8-question bank, navigation lock/unlock and mobile (375px) confirmed, no placeholders/TODOs. Two real bugs found during QA and fixed — see `management/TASK_LEDGER.md` BL-043 and DEC-008. Sprint 6 is complete.

## Question Bank policy

Every lesson contributes reusable questions with concept, difficulty, correct answer, explanation, hint, and curriculum reference — already the standard for every question written since BL-030 (hint field became required). Not postponed; grows with each topic. Real counts visible on the Command Centre's Question Bank page (currently sample data — will move to reading real curriculum data in a later, explicitly-approved Command Centre task, not before). **No standalone Question Bank project is authorised (DEC-007, 2026-08-03)** — this remains a by-product of normal lesson authoring, not a dedicated initiative.

## Sprint 7 — Periodic Table (Definition of Done met 2026-08-03)

**Scope:** elements as organised by atomic number; groups and periods; metals vs. non-metals; using the periodic table to predict basic properties — Year 7-10 appropriate, no advanced chemistry (no orbital notation, no ionisation energy trends beyond a simple mention if it fits naturally).

**Prerequisite:** `sci-y7-atomic-structure` (atomic number is the periodic table's ordering principle).

**Delivered (BL-044, OpenClaw-delegated + BL-045, Claude):** `lesson-periodic-table-intro.yaml` (explanation → example (Na/K vs. Cl) → interactive `periodic-table-explorer` → 5 questions → summary), `assessment-periodic-table-quiz.yaml` (both misconceptions directly targeted), a new standalone `PeriodicTableExplorer` widget (first 20 elements, real period/group grid with transition-metal columns left as visual gaps, metal/non-metal classification), and a new topic illustration.

**Definition of Done met 2026-08-03:** full live click-through of all 9 lesson steps (explanation, example, widget interaction, 5 questions with hint/retry, summary, finish), mastery/XP confirmed (100% mastered, 250 XP total), mobile (375px, no overflow) confirmed, no placeholders/TODOs, `validate:curriculum`/`typecheck`/`lint`/`vitest` (69/69)/`build` all pass. Sprint 7 is complete.

**Both Sprint 6 and Sprint 7 met the Definition of Done 2026-08-03 — that was the review stop point before the 2026-08-03 autonomous-execution directive superseded per-sprint review stops. Continuing directly into Sprint 8.**

## Sprint 8 — Chemical Reactions (Definition of Done met 2026-08-03)

**Scope:** what a chemical reaction is (reactants → products), signs a reaction has happened (colour change, gas produced, precipitate, temperature change), conservation of mass, simple word equations — Year 7-10 appropriate, no balancing numeric equations or reaction-rate kinetics.

**Prerequisite:** `sci-y7-atomic-structure` (a reaction rearranges atoms into new substances; mass is conserved because atom counts don't change).

**First topic built under the new visual-learning standard and the 3-worktree pipeline:** `lesson-chemical-reactions-intro.yaml` opens with a hero illustration step, uses two short (2-3 sentence) explanation steps instead of one long paragraph, a second mid-lesson illustration step (conservation of mass), a short example, and a new `ReactionSimulator` widget (3 preset reactant pairs, each with a visual tied directly to its specific sign of reaction — bubbles for gas, a colour-shifting circle for rusting, a flickering flame for combustion). `assessment-chemical-reactions-quiz.yaml` directly targets both misconceptions.

**Delegated across 3 worktrees for the first time:** Worktree 1 (BL-046) wrote the lesson/assessment/widget; Worktree 2 (CE-002) wrote the two new illustrations in parallel against ids specified up front; a new third worktree (`openclaw/reviewer`) independently reviewed both branches for scientific accuracy and conflicts, did the registry wiring, ran the full check suite including a production build, and merged to master itself — the first fully OpenClaw-reviewed-and-merged sprint, with Claude doing an independent re-verification (checks + content spot-check + live browser click-through) afterward rather than reviewing the original diff by hand.

**Definition of Done met 2026-08-03:** independently re-verified by Claude — `validate:curriculum`/`typecheck`/`lint`/`vitest` (79/79)/`build` all pass, live click-through of all 12 lesson steps (hero illustration, 2 short explanations, mid-lesson illustration, example, widget interaction across all 3 reactant pairs, 5 questions, summary, finish), mastery/XP confirmed (300 XP total), mobile (375px, no overflow), no placeholders/TODOs.

## Sprint 9 — Forces (Definition of Done met 2026-08-04)

**Scope:** what a force is (push/pull), balanced vs. unbalanced forces, friction as a force opposing motion, gravity — Year 7-10 appropriate, no numeric force calculations or vector-magnitude formalism.

**Prerequisite:** `sci-y7-chemical-reactions` (continuing the linear topic sequence).

**Delivered via the 3-worktree pipeline:** `lesson-forces-intro.yaml` (hero illustration → 2 short explanations → mid-lesson illustration → tug-of-war example → `ForceFrictionSimulator` widget → gravity explanation → 5 questions → summary), `assessment-forces-quiz.yaml` (both misconceptions — "constant force needed to keep moving" and "heavier objects fall faster" — directly and correctly targeted), a new `ForceFrictionSimulator` widget (3 surfaces, each sliding a visibly different distance tied to its friction level), and two new illustrations. Reviewed, wired, and merged to master by the Worktree 3 reviewer, which also caught and corrected an inaccurate self-reported claim in the illustration worker's own notes rather than repeating it — independently re-verified by Claude afterward.

**Definition of Done met 2026-08-04:** `validate:curriculum`/`typecheck`/`lint`/`vitest` (85/85)/`build` all pass, live click-through of all 12 lesson steps including all 3 friction surfaces (visibly different slide distances confirmed), mastery/XP confirmed (350 XP total), mobile (375px, no overflow), no placeholders/TODOs.

## Sprint 10 — Energy (Definition of Done met 2026-08-04)

**Scope:** what energy is, common forms (kinetic, potential, thermal, light, sound, chemical, electrical), conservation of energy, everyday energy transformations — Year 7-10 appropriate, no joules/numeric calculations, no formal thermodynamics beyond "some energy always ends up as heat".

**Prerequisite:** `sci-y7-forces` (continuing the linear topic sequence).

**Delivered via the 3-worktree pipeline:** `lesson-energy-intro.yaml` (hero illustration → forms of energy → conservation → transformation illustration → falling-ball example → `EnergyTransformationExplorer` widget → 5 questions → summary), `assessment-energy-quiz.yaml` (both misconceptions — "energy gets used up/disappears" and "a stationary object has no energy" — directly and correctly targeted), a new `EnergyTransformationExplorer` widget (3 scenarios including an animated pendulum showing the potential/kinetic trade-off), and two new illustrations. Reviewer specifically verified the pendulum's potential-at-top/kinetic-at-bottom physics was correct before merging (an easy place to get subtly wrong) — independently re-verified live by Claude afterward, including watching the animation.

**Definition of Done met 2026-08-04:** `validate:curriculum`/`typecheck`/`lint`/`vitest` (91/91)/`build` all pass, live click-through of all 11 lesson steps including all 3 widget scenarios, mastery/XP confirmed (400 XP total), mobile (375px, no overflow), no placeholders/TODOs. **This is the 3rd of 4 additional topics toward the 2026-08-03 directive's stop condition — one more (Sprint 11, Cells) before the mandated check-in.**

## Engineering capacity

OpenClaw is now the primary implementation team (2026-08-03 directive) — both worktrees dedicated to learner-facing development (see Worktree allocation above). Claude's role is architecture, delegation, integration, review, merge, and quality — not primary implementation, except where a task genuinely can't be delegated (schema/shared-file changes, final QA, architectural blockers).

## Command Centre

MVP complete (CC-001 through CC-006), deployed, frozen. No further Command Centre work without explicit Product Owner approval — see `management/COMMAND_CENTRE.md`.
