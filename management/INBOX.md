# Inbox

Product Owner instructions land here. **Read this file before starting any work session.**

## Active directives (most recent first)

### 2026-08-04 — Product Owner Directive: Master Product Charter v2.0 (supersedes all previous sprint directives)

- **Vision:** the best Year 9 Science learning experience possible for Aarshiya — the complete NSW Year 9 Science curriculum, understood, enjoyed, mastered. Everything else is secondary.
- **Phase 1 mission:** complete every NSW Year 9 Science topic to production quality. Continue autonomously; do not stop after every sprint. Stop only for: a genuine curriculum ambiguity, a major architectural blocker, production blocked, or Phase 1 complete.
- **Org (formalised):** Sponsor = Sudeep. Product Owner = Alex (ChatGPT). Engineering Lead = Claude (architecture/planning/delegation/review/integration/quality/product alignment — not primary implementer). Engineering Team = OpenClaw, target 80%+ of engineering work.
- **Worktree allocation (confirms the existing 3-worktree pipeline, formalises Worktree 3's scope):** Worktree 1 = Curriculum (lessons, interactions, assessments, question bank). Worktree 2 = Learner Experience (illustrations, graphics, diagrams, UI polish, accessibility, revision experience). Worktree 3 = QA (testing, review, regression, bug fixing, integration) — broader than "review before merge" alone; going forward its dispatches should include live browser-based click-through testing itself, not just automated checks.
- **Product standard per topic (reaffirms DEC-009 + existing DoD):** curriculum coverage, hero illustration, supporting graphics, readable explanations, meaningful interactions, assessment, feedback, hints, reusable Question Bank entries, curriculum mapping, mobile/iPad support.
- **Question Bank:** grows continuously via normal lesson authoring, no separate project (reaffirms DEC-007).
- **Engineering priority order:** Curriculum > Learner Experience > Visual Learning > Question Bank > QA.
- **Explicitly frozen during Phase 1** (unless authorised): workflow redesign, dashboard enhancements, orchestration, infrastructure optimisation, startup features, monetisation, teacher portal, parent portal, analytics, gamification, achievements, badges, multiplayer, multi-subject support.
- **Reporting:** Product Briefs only every 4 completed topics, a major milestone, an architectural blocker, or a production issue — not after every sprint.
- **Phase 1 success:** all NSW Year 9 Science topics implemented, visuals across every lesson, Question Bank covers the curriculum, Aarshiya can complete the entire course.
- **Phase 2 (does not begin automatically):** once Phase 1 is complete, prepare recommendations only — create `product/PHASE2.md` cataloguing future ideas (AI Tutor, voice, adaptive/personalised revision, gamification, virtual science lab, teacher/parent tools, analytics, accessibility, Year 10 expansion, commercial/deployment concerns), each with purpose/learner benefit/effort/priority/dependencies. Do not build any Phase 2 feature — maintain the backlog only.
- **Final principle:** every engineering decision answers "does this help Aarshiya learn science better?" If yes, build it. If no, record it in `product/PHASE2.md` and keep building curriculum.
- **Immediate implication for scope:** the previously-approved Sprint 8-12 list (Chemical Reactions, Forces, Energy, Cells, Body Systems) remains valid and unambiguous — proceed with Sprint 12 (Body Systems) immediately. What "every NSW Year 9 Science topic" requires beyond Sprint 12 will be assessed once Body Systems ships, flagging genuine scope ambiguity then rather than guessing now.

### 2026-08-03 — Product Owner Directive: autonomous multi-sprint execution, roadmap through Sprint 12

Product vision, roadmap, and operating model now considered stable. Engineering authorised to continue building without waiting for Product approval after every sprint.

- **Mission:** complete the NSW Year 9 Science Learning Engine. Roadmap approved; execute until instructed otherwise.
- **Roadmap:** Sprint 8 Chemical Reactions → Sprint 9 Forces → Sprint 10 Energy → Sprint 11 Cells → Sprint 12 Body Systems → continue through remaining NSW Year 9 topics. Do not pause after each sprint.
- **OpenClaw is now the primary implementation team.** Both worktrees dedicated to learner-facing development:
  - Worktree 1 (`openclaw/aarshiya-auto`) — primary curriculum implementation: lessons, interactions, assessments, question bank entries.
  - Worktree 2 (`openclaw/command-centre`, repurposed) — learner experience: illustrations, educational graphics, diagrams, UI polish, accessibility, QA, revision questions.
  - Claude maximises delegation; only becomes primary coder for architecture changes, when OpenClaw is blocked, or when integration can't be delegated.
- **Visual learning standard is now a permanent product requirement** (see DEC-009 below, elevated from a one-off decision to a standing requirement): every new lesson needs a hero illustration, supporting diagrams/graphics, short readable text blocks, at least one meaningful interaction where appropriate. No long text-heavy lessons. Illustrations must teach, never decorate.
- **Question Bank:** keep growing with every lesson; no separate Question Bank project (reaffirms DEC-007).
- **Frozen unless explicitly authorised:** Command Centre enhancements, orchestration redesign, workflow optimisation, infrastructure improvements.
- **Stop conditions (only these):** (1) a genuine architectural blocker, (2) a product decision that cannot reasonably be inferred, (3) four additional curriculum topics reach the Definition of Done, (4) a critical production issue. Otherwise continue autonomously — do not interrupt for routine approvals.
- **Reporting:** update the repository continuously; provide a concise Product Brief only at major milestones, not after every sprint.

### 2026-08-03 — Product Owner Decision: visual/content design standard (less uninterrupted text)

Based on user testing feedback. Effective immediately for all new topics; retrofitted into earlier topics incrementally, not urgently.

- Every lesson must begin with a hero illustration.
- Explanations broken into short sections with supporting graphics, not single long paragraphs.
- Prefer diagrams, SVG illustrations, and labelled educational graphics wherever they improve understanding.
- Reduce paragraph length generally.
- **No decorative images** — every visual must teach a concept (consistent with the project's existing hand-authored-SVG, no-stock-imagery convention).
- Apply to all new topics (Sprint 8 onward) immediately.
- Improve earlier topics (Matter, Atomic Structure, Periodic Table) incrementally as engineering capacity allows — not a blocking retrofit.

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
