# Inbox

Product Owner instructions land here. **Read this file before starting any work session.**

## Active directives (most recent first)

### 2026-08-03 — Product Owner Directive: both worktrees dedicated to curriculum, explicit allocation

- **Both OpenClaw worktrees dedicated to the Science Learning Engine.** No worktree allocated to engineering infrastructure, workflow optimisation, dashboard enhancements, or process improvements unless explicitly authorised.
- **Worktree 1 (`openclaw/aarshiya-auto`, agent `aarshiya-dev`) — Curriculum Development.** Current focus: Sprint 6 — Atomic Structure (complete remaining lessons/assessments, illustrations, feedback, question bank entries, QA). When Sprint 6 is accepted, immediately begin Sprint 7 — Periodic Table.
- **Worktree 2 (`openclaw/command-centre`, repurposed) — Curriculum Enhancement.** Improve existing lessons, add educational illustrations, improve learner experience/engagement/explanations, expand the reusable question bank, QA on completed topics. Supports Worktree 1 where required. Command Centre product work on this worktree is superseded — no further Command Centre features being built here.
- **Explicitly frozen:** Command Centre enhancements, dashboard improvements, engineering workflow, task system redesign, YAML migration, infrastructure improvements, process optimisation.
- **KPIs:** primary = completed curriculum topics; secondary = Question Bank growth. Engineering metrics no longer primary.
- **Claude's role:** task allocation, preventing worktree conflicts (no two worktrees touching the same file concurrently), integration, code review, merge management. Maximise parallel curriculum delivery.
- **Stop condition:** continue uninterrupted through Sprint 6 and Sprint 7. Produce one consolidated Product Briefing only after both topics reach the Definition of Done — no intermediate review stop.

### 2026-08-03 — Product Owner Decision: Sprint 5 accepted, Sprint 6 authorised to continue through Sprint 7

- **Sprint 5 formally accepted.**
- **Sprint 6 authorised to continue** (was stopped awaiting review as of 2026-08-02).
- **Decision 1 — AtomBuilder accepted for Version 1.** The existing button-based `AtomBuilder` widget (used in BL-040's shipped lesson) is accepted as-is. Do not replace it with drag-and-drop. Drag-and-drop is recorded as a future enhancement, not built now. See DEC-006.
- **Decision 2 — no separate Question Bank project.** Do not pause Sprint 6 to redesign the Question Bank. Continue generating reusable questions, hints, explanations, and curriculum mappings as part of normal lesson development — this was already the standing practice since BL-030. No separate Question Bank initiative is authorised. See DEC-007.
- **Engineering priority:** complete Atomic Structure to the existing Definition of Done, then proceed immediately to Sprint 7 (Periodic Table) with **no stop for Product Review between Sprint 6 and Sprint 7** — only stop once Sprint 7 reaches the same review point.
- **Capacity reaffirmed:** 80% curriculum delivery / 20% infrastructure and maintenance. No further Command Centre enhancements authorised.
- **KPI reaffirmed:** completed curriculum topics remains primary.
- Continue updating `management/ROADMAP.md` and `management/DASHBOARD.md` throughout, not just at sprint end.

### 2026-08-01 — Product Owner Directive: frozen roadmap (Sprint 5/6/7) + stop conditions

- Architecture discussion closed; project priority is delivering curriculum.
- **Roadmap frozen:** Sprint 5 (Matter, complete) → Sprint 6 (Atomic Structure) → Sprint 7 (Periodic Table). Do not change it without explicit approval.
- Command Centre: finish MVP only, deploy it, then stop. (Done — see below.)
- Engineering capacity: 80% learner-facing / 20% infrastructure (reaffirms the freeze directive below).
- **Sprint 6 scope:** structure of the atom — protons, neutrons, electrons, atomic number, mass number, electron shells, simple atomic models. Learning interactions requested: build an atom, drag particles into place, place electrons into shells, identify atoms from atomic number.
- **Question Bank policy:** every question needs concept/difficulty/correct answer/explanation/hint/curriculum reference; the bank should grow continuously.
- OpenClaw remains the primary implementer; Claude limited to architecture/delegation/integration/review/merge/quality.
- **Stop conditions:** (1) Command Centre MVP deployed, (2) Matter complete, (3) Atomic Structure underway. Then update the repository, the Product Roadmap, and the Engineering Dashboard, and wait for Product Review.
- **Status: all three stop conditions met** as of 2026-08-02. Command Centre deployed (`management/COMMAND_CENTRE.md`). Matter complete (Sprint 5). Atomic Structure underway — BL-040 (lesson + assessment) and BL-041 (illustration) merged to master, 65/65 tests passing. See `management/ROADMAP.md` for full detail. **Stopped and awaiting Product Review** — do not begin Sprint 7 or resume paused infrastructure work without explicit approval.
- **Open question carried into Sprint 6:** the requested "drag particles into place" / "place electrons into shells" interactions are NOT satisfied by the existing button-based `AtomBuilder` widget used in the shipped lesson — flagged in `management/ROADMAP.md` for a Product Owner decision, not unilaterally built.

### 2026-08-01 — Product Owner Decision: infrastructure freeze, curriculum-first

Effective immediately:
- **80% of engineering capacity to learner-facing work, 20% maximum to infrastructure.**
- **Command Centre is frozen at its current MVP** (CC-001 through CC-006, all done and deployed) — "good enough" until at least three curriculum topics have shipped. No further Command Centre enhancements without explicit Product Owner approval.
- **No further work on:** orchestration improvements, dashboard enhancements, workflow optimisation, task system redesign, process automation — unless explicitly approved. (The YAML task-model work from the Engineering Operating Agreement's steps 3-5 is paused, not abandoned — see the commit pausing `packages/task-schema`.)
- **All OpenClaw workers/worktrees redirect to Aarshiya's application.** Both managed worktrees (`openclaw/aarshiya-auto`, `openclaw/command-centre`) are now dispatched against curriculum/app work, not Command Centre work.
- **KPI is completed curriculum topics Aarshiya can use, not engineering progress.**
- **Immediate priority:** Matter topic is complete (Sprint 5). Begin the next topic: **Atomic Structure.**

### 2026-08-01 — Sprint 5 directive: Complete the "Matter" topic (supersedes Sprint 4 remainder)

- **Mission:** finish the "Matter" topic end-to-end — all three concepts (Matter, Particle Model, States of Matter), not just the one already-polished lesson. Do not begin another science topic. Do not add infrastructure. Do not redesign the learning engine.
- **Definition of Done:** all Matter lessons and questions complete; every question has both explanations and hints; every screen has appropriate colour/visual hierarchy; illustrations where they help understanding; every interaction tested; navigation polished; progress tracking and XP work; mobile/iPad experience polished; no placeholders; no TODOs.
- **Engineering strategy:** break work into independent tasks, delegate as much implementation as possible to OpenClaw. Claude's role: review, integrate, merge, maintain architecture and quality — not sole implementer.
- **This explicitly drops BL-029 (Force Simulator)** from the active plan — it belongs to a future Forces topic, not Matter, and building it now would violate "do not begin another topic."
- **Stop condition:** stop only when the Matter topic is complete and ready for Aarshiya to use end-to-end. Produce a Product Owner Briefing at the end covering what was completed, what OpenClaw implemented vs. Claude, tests, known issues, and Sprint 6 recommendations.
- Status: in progress — see `management/CURRENT_SPRINT.md` for the live task breakdown.

### 2026-08-01 — Delegation-first operating model + public URL priority

- Claude Code's role: Engineering Manager / Technical Lead, not sole implementer.
- OpenClaw is the engineering workforce; Claude breaks work into tasks, delegates implementation to OpenClaw, reviews every OpenClaw contribution before integration, and only implements directly what can't reasonably be delegated.
- Target: **70% of implementation work delegated to OpenClaw** for implementation-heavy sprints.
- Management files (`management/*.md`) are a live dashboard — update continuously, not just at sprint end.
- **Highest priority: deliver the first playable lesson Aarshiya can use on her iPad through a public URL.** Every future sprint must produce something Aarshiya can actually test.
- Status: acknowledged. Actual OpenClaw delegation and any public-URL exposure are currently **blocked by a network outage on the dev machine** (DHCP/IPv4 failure — see `management/DASHBOARD.md` Blockers). Both git push and any headless Claude Code / tunnel approach need this machine's internet connection restored first.

### 2026-08-01 — Sprint 2 approved: first playable learning loop

- Deliverables: Concept Engine (`xpReward` field), Lesson Engine (data-driven step renderer), Learner Progress (extended model + persistence), Minimal UI (one screen), Sample Content ("Matter" concept + lesson + 5 questions).
- Engineering rules: build incrementally, keep architecture clean, write tests, keep everything reusable, don't anticipate future features.
- Do not begin Sprint 3 after this one — stop for Product review.
- End of sprint: update `management/DASHBOARD.md`, `management/CURRENT_SPRINT.md`, `management/DECISIONS.md`, `docs/product-owner-briefing.md` (including a "Demo Instructions" section).
- Status: BL-015–BL-019 implemented, tested, and walked through in a real browser (see `management/TASK_LEDGER.md`). Not yet pushed to GitHub (network outage). Demo instructions and public URL still pending.

## How to use this file

Product Owner directives get appended here as they arrive. Claude Code reads this file at the start of a work session and reconciles it against `management/CURRENT_SPRINT.md`, then acts. Resolved/superseded directives can be trimmed once acted on and reflected in `management/OUTBOX.md` and `management/DECISIONS.md`.
