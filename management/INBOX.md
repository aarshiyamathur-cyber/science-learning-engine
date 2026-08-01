# Inbox

Product Owner instructions land here. **Read this file before starting any work session.**

## Active directives (most recent first)

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
