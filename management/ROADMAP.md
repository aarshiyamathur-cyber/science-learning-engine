# Product Roadmap

_Master Product Charter v2.0 (2026-08-04) supersedes all previous sprint directives — see `management/INBOX.md`. Vision: the best Year 9 Science learning experience possible for Aarshiya. **Phase 1 mission: complete every NSW Year 9 Science topic to production quality**, continuing autonomously — see Stop Conditions below. Phase 2 (product evolution beyond the curriculum) does not begin automatically; see the Phase 2 section at the end of this file._

**KPI: completed science topics Aarshiya can learn from — not engineering progress. Secondary KPI: Question Bank growth.**

| Sprint | Topic | Status |
| --- | --- | --- |
| Sprint 5 | Complete Matter | ✅ Done — accepted by Product Owner 2026-08-03 |
| Sprint 6 | Atomic Structure | ✅ Done — Definition of Done met 2026-08-03 |
| Sprint 7 | Periodic Table | ✅ Done — Definition of Done met 2026-08-03 |
| Sprint 8 | Chemical Reactions | ✅ Done — Definition of Done met 2026-08-03 |
| Sprint 9 | Forces | ✅ Done — Definition of Done met 2026-08-04 |
| Sprint 10 | Energy | ✅ Done — Definition of Done met 2026-08-04 |
| Sprint 11 | Cells | ✅ Done — Definition of Done met 2026-08-04 |
| Sprint 12 | Body Systems | ✅ Done — Definition of Done met 2026-08-04 |
| Sprint 13 | Ecosystems | ✅ Done — Definition of Done met 2026-08-04 |
| Sprint 14 | Genetics & Reproduction | ⬜ Not started |
| Sprint 15 | Plate Tectonics | ⬜ Not started |
| Sprint 16 | The Solar System & Universe | ⬜ Not started — last topic before Phase 1 completion is assessed |

## Phase 1 scope confirmed 2026-08-04

Sprint 8-12 covered the Chemical World and Physical World strands plus two Living World topics (Cells, Body Systems). Product Owner confirmed (2026-08-04) that Phase 1 requires full 4-strand NSW coverage, not just the original 5-sprint list: Sprint 13 (Ecosystems) and Sprint 14 (Genetics & Reproduction) round out Living World; Sprint 15 (Plate Tectonics) and Sprint 16 (The Solar System & Universe) cover Earth and Space, previously untouched. Phase 1 completion is assessed after Sprint 16 against the charter's success criteria (all topics implemented, visuals across every lesson, Question Bank covers the curriculum, Aarshiya can complete the entire course) — not assumed automatically.

## Sprint 12 — Body Systems (Definition of Done met 2026-08-04)

**Scope:** organ systems as groups of organs working together; main function of the digestive, circulatory, and respiratory systems; key organs within each; systems working together rather than in isolation; breathing vs. cellular respiration — Year 7-10 appropriate, no biochemistry, no anatomy beyond the organs listed, no nervous/immune/excretory system detail.

**Prerequisite:** `sci-y7-cells` (the Cells lesson's own summary already introduced "cells → tissues → organs → organ systems").

**First sprint QA'd under the charter's expanded Worktree 3 scope:** the QA worker did its own live Playwright click-through of every lesson step (including all three BodySystemExplorer systems, a deliberate wrong answer, a hint reveal, both short-answer self-assessments) as part of its dispatch, not just automated checks — reducing Claude's own post-merge verification to a lighter spot-check (build + checks + a content read) rather than a full re-run, per the charter's intent.

**Definition of Done met 2026-08-04:** `validate:curriculum`/`typecheck`/`lint`/`vitest` (111/111)/`build` all pass; QA worker's live click-through confirmed XP increment, completion state, no console errors, no mobile overflow; Claude's independent spot-check confirmed content accuracy and a clean production deploy. No placeholders/TODOs.

**Note:** a real, recurring reliability risk was found and flagged (not fixed at the system level) during this sprint's QA pass — see DEC-012. The QA worktree has had its files mass-deleted twice now by something outside the dispatched worker's own commands, very likely low disk space (~21GB free of 238GB on C:) triggering an automated cleanup tool. No data was lost (git history intact both times), but this needs the Sponsor's attention before it causes a worse-timed loss.

## Sprint 13 — Ecosystems (Definition of Done met 2026-08-04)

**Scope:** ecosystems as biotic + abiotic parts interacting; producers/consumers/decomposers in a food chain; energy flow and loss at each step; adaptations for survival — Year 7-10 appropriate, no numeric energy-pyramid calculations beyond an illustrative "~10%" figure, no complex food web modelling.

**Prerequisite:** `sci-y7-body-systems` (continuing the linear sequence).

**Delivered via the 3-worktree pipeline, with a real QA-found bug fixed before merge:** `lesson-ecosystems-intro.yaml` (hero → biotic/abiotic → food chains → energy-flow illustration → grass/rabbit/fox example → `FoodChainExplorer` widget → adaptations → 5 questions → summary), `assessment-ecosystems-quiz.yaml` (both misconceptions directly targeted). The QA worker caught and fixed two real defects in `FoodChainExplorer` before merging: an undefined `bg-warning-400` Tailwind token that would have rendered the energy bars with no visible fill, and a conceptually wrong model where Decomposer reused the sequential "10% predation transfer" pattern from Secondary Consumer — decomposers break down dead matter from every trophic level, not a fixed share from the one level before them.

**Incident during this sprint's QA pass (see DEC-013):** the QA worker's dispatched session ended (Telegram: "still running... will report back") before its own live-browser-test step and merge decision completed — a worse occurrence of the recurring file-deletion pattern (DEC-012) than the previous two, since this time real committed work existed only in the local worktree, unpushed anywhere. Claude found this, immediately pushed the branch to preserve it, then completed verification manually (automated checks + a full live click-through, requiring direct DB manipulation to unlock the prerequisite chain for a test profile) before merging to master.

**Definition of Done met 2026-08-04:** `validate:curriculum`/`typecheck`/`lint`/`vitest` (118/118)/`build` all pass, live click-through of all 12 lesson steps confirming both fixes render correctly (energy bars visibly proportioned, Decomposer's corrected "every level" text), mastery/XP confirmed, mobile (375px, no overflow), no placeholders/TODOs. Test profiles created during verification were deleted from the live database afterward.

## Stop conditions (2026-08-04 charter — the only reasons to pause and ask)

1. A genuine curriculum ambiguity (e.g. what exactly constitutes "every NSW Year 9 Science topic" beyond the pre-approved Sprint 8-12 list — to be assessed once Sprint 12 ships, not guessed at now).
2. A major architectural blocker.
3. Production is blocked.
4. Phase 1 is complete.

Otherwise: continue autonomously, update the repository continuously, and provide a concise Product Brief only every 4 completed topics, a major milestone, an architectural blocker, or a production issue — not a full briefing after every sprint.

## Worktree allocation (2026-08-04 charter, formalising the existing 3-worktree pipeline)

- **Worktree 1 (`openclaw/aarshiya-auto`) — Curriculum:** lessons, interactions, assessments, question bank entries.
- **Worktree 2 (`openclaw/command-centre`, repurposed) — Learner Experience:** illustrations, educational graphics, diagrams, UI polish, accessibility, revision experience.
- **Worktree 3 (`openclaw/reviewer`) — QA:** testing, review, regression, bug fixing, integration. Broader than "review before merge" — dispatches should include live browser click-through testing itself (Playwright), not just automated checks, so Claude's own post-merge QA can stay light (a spot-check, not a full re-run).

OpenClaw is the primary implementation team, target 80%+ of engineering work. Claude (Engineering Lead) maximises delegation and only codes directly for architecture changes, when OpenClaw is blocked, or when integration can't be delegated.

## Engineering priority order (2026-08-04 charter)

Curriculum > Learner Experience > Visual Learning > Question Bank > QA.

## Explicitly frozen during Phase 1 (2026-08-04 charter, unless explicitly authorised)

Workflow redesign, dashboard enhancements, orchestration, infrastructure optimisation, startup features, monetisation, teacher portal, parent portal, analytics, gamification, achievements, badges, multiplayer, multi-subject support.

## Phase 2 (does not begin automatically)

Once Phase 1 is complete (every NSW Year 9 topic implemented, visuals across every lesson, Question Bank covers the curriculum, Aarshiya can complete the entire course): create `product/PHASE2.md` cataloguing future ideas only (AI Tutor, voice, adaptive/personalised revision, gamification, virtual science lab, teacher/parent tools, analytics, accessibility, Year 10 expansion, commercial/deployment concerns) — purpose/learner benefit/effort/priority/dependencies per idea. Do not build any Phase 2 feature during Phase 1.

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

**Definition of Done met 2026-08-04:** `validate:curriculum`/`typecheck`/`lint`/`vitest` (91/91)/`build` all pass, live click-through of all 11 lesson steps including all 3 widget scenarios, mastery/XP confirmed (400 XP total), mobile (375px, no overflow), no placeholders/TODOs.

## Sprint 11 — Cells (Definition of Done met 2026-08-04)

**Scope:** all living things are made of cells; structures common to most cells (cell membrane, cytoplasm, nucleus); how plant cells differ from animal cells (cell wall, chloroplasts, large vacuole); levels of organisation (cells → tissues → organs → organ systems) — Year 7-10 appropriate, no organelle-level detail beyond what's listed, no cellular respiration/photosynthesis chemistry, no mitosis.

**Prerequisite:** `sci-y7-energy` (continuing the linear topic sequence). First biology topic in the app — everything through Sprint 10 was chemistry/physics.

**Delivered via the 3-worktree pipeline:** `lesson-cells-intro.yaml` (hero illustration → what a cell is → common structures → plant-vs-animal illustration → leaf/skin cell example → `CellStructureExplorer` widget → levels of organisation → 5 questions → summary), `assessment-cells-quiz.yaml` (both misconceptions — "bigger organisms have bigger cells" and "plant and animal cells are identical" — directly and precisely targeted), a new `CellStructureExplorer` widget (6 tappable structures, colour-coded blue-for-shared vs. green-for-plant-only with a legend and badge). Reviewer paid particular attention to biological accuracy as the first non-physics/chemistry topic, and correctly scoped out organelle/respiration/mitosis detail not in the concept file. Independently re-verified by Claude afterward.

**Definition of Done met 2026-08-04:** `validate:curriculum`/`typecheck`/`lint`/`vitest` (98/98)/`build` all pass, live click-through of all 12 lesson steps including the widget's shared-vs-plant-only distinction, mastery/XP confirmed (450 XP total), mobile (375px, no overflow), no placeholders/TODOs. **This is the 4th of 4 additional topics — the 2026-08-03 directive's stop condition is now reached. See the Product Brief for the check-in summary.**

## Engineering capacity

OpenClaw is now the primary implementation team (2026-08-03 directive) — both worktrees dedicated to learner-facing development (see Worktree allocation above). Claude's role is architecture, delegation, integration, review, merge, and quality — not primary implementation, except where a task genuinely can't be delegated (schema/shared-file changes, final QA, architectural blockers).

## Command Centre

MVP complete (CC-001 through CC-006), deployed, frozen. No further Command Centre work without explicit Product Owner approval — see `management/COMMAND_CENTRE.md`.
