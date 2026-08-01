# Outbox

Written at the end of every work cycle: what was completed, what's in progress, risks, questions for Product, and the recommended next action.

## 2026-08-01 — Sprint 4 implementation cycle (stop condition reached)

**Completed**

- BL-026 (interactive lesson step type) — `InteractiveStepSchema` added to the curriculum schema; `LessonPlayer` dispatches to a widget by id via a `WIDGET_REGISTRY` map, kept out of the schema package so adding widgets never requires a schema change.
- BL-027 (Particle State Explorer) — a tap Solid/Liquid/Gas widget with real CSS-animated particle motion, wired into the live "Matter" lesson as a genuine interactive step (not just a demo component).
- BL-028 (Atom Builder) — delegated to an OpenClaw headless worker, completed successfully and merged with **zero conflicts** — the second successful delegation this project has had (after BL-020). Standalone +/- proton/neutron/electron builder with a live SVG atom model; deliberately not wired into the Matter lesson since that lesson is about states of matter, not atomic structure (see DEC-004).
- Fixed two real bugs found during this work: a React warning from mixing the `animation` shorthand with `animationDelay` in inline styles, and a genuine test-isolation gap (`@testing-library/react`'s `cleanup()` was never being called between Vitest tests) — fixed globally via `vitest.setup.ts`, not patched around.
- Rebuilt and redeployed the production server behind the Cloudflare tunnel; verified BL-026/027 live via direct JS-driven interaction against the actual public URL (tapping "Liquid" correctly swaps the caption) and BL-028 via the delegated worker's own test pass plus code review.
- All 53 tests passing, typecheck/lint/build clean, merge commit pushed to `origin/master`.

**Currently being worked on**

- Nothing — stop condition reached. BL-029 (Force Simulator) has not been started; leaving it for the next work cycle or explicit Product direction, per the sprint's stop condition ("stop when there is a demonstrably more interactive lesson ready for Aarshiya to test") which is already met by BL-026/027.

**Risks**

- Automation Ratio is now ~9.5% cumulative (2/21) against the 70% target — trending up but still well under. The pattern holds from Sprint 3: delegation works cleanly for standalone tasks (BL-020, BL-028), not for tightly sequential same-sprint work (BL-026/027 depended on each other and on shared lesson content).
- BL-029 (Force Simulator) is the one Sprint 4 item not attempted. It's a good delegation candidate (standalone, drag-based, no shared-file dependency) if Product wants Sprint 4 fully closed out before moving on.

**Questions for Product Owner**

1. Is the current state (one interactive widget live in the lesson, one standalone widget ready for a future lesson) sufficient to call Sprint 4's stop condition met, or is BL-029 (Force Simulator) wanted before moving to Sprint 5?
2. Same open question as last briefing: what's the first slice of real curriculum content beyond the single "Matter" demo concept, and is there a scoring-model direction for the deferred mastery/progression engine?

**Recommended next action**

Product review of the live demo (same URL, now showing the interactive particle widget mid-lesson), then a decision on BL-029 vs. Sprint 5 scope.

## 2026-08-01 — Sprint 3 implementation cycle (stop condition reached)

**Completed**

- BL-020 (design tokens + `ui/` primitives) — delegated to and completed by an OpenClaw headless worker, reviewed and merged by Claude Code. First successful delegation this project has had.
- BL-021 (icon/illustration asset library) — 6 hand-authored SVGs, no external downloads.
- BL-022 (design system applied to both screens) — `LessonPlayer` migrated off its own ad hoc accent-class map onto the shared primitives.
- BL-023 (explicit voice-answer mode) — Web Speech API for short-answer questions, with a visible "listening" state and a visible fallback on unsupported browsers.
- BL-024 (immediate feedback + retry) — `explanation` field added to questions; correct/incorrect feedback with a working "Try again" that resets the question, plus a "Skip to next" so no one gets stuck.
- BL-025 — live demo rebuilt and redeployed with all of the above.
- Root-caused and resolved DEC-003 (the Sprint 2 27-hour hang): confirmed to be the TPG per-device network block, not a broken pipeline. Increased the cron's no-output timeout from 600s to 1500s since `--print` mode doesn't stream progress.
- Verified live against the actual public demo URL (not just locally): color/icon design system, the retry flow on a wrong answer, correct-answer feedback, the short-answer text box, and the voice-answer button all confirmed working via direct interaction, with no console errors.

**Currently being worked on**

- Nothing — stop condition reached per `management/CURRENT_SPRINT.md` ("when there is a significantly improved visual lesson experience ready for Aarshiya to test, stop"). Waiting for Product review before Sprint 4.

**Risks**

- Automation Ratio is still low (~6% cumulative) against the 70% target. BL-020's success shows the pipeline works for well-scoped, independent tasks; most of Sprint 3 after BL-020 had tight sequential dependencies on files each other step touched, which doesn't suit a multi-hour delegation turnaround mid-sprint. Not treated as a failure — see `management/WORKER_DASHBOARD.md` for the reasoning per task.
- Full interactive browser click-through (screenshots, visual layout confirmation) wasn't possible this session — the Browser pane wasn't compositing frames. Functional verification was still done via direct JS-driven interaction against the live URL (real clicks, real state transitions, real DOM assertions), which is real signal, but a visual/screenshot pass on an actual device (the point of the demo) would still be worth doing.

**Questions for Product Owner**

1. Sprint 4 priorities: continue polishing Sprint 3's loop (e.g. real curriculum content, more concepts) or address the automation-ratio gap directly (e.g. explicitly scope Sprint 4 tasks to be independently delegable)?
2. Now that DEC-003 is resolved and BL-020 proved the pipeline works, is there an appetite for a longer-running delegation (a whole feature, not just a design-system layer) as the next test of the 70% target?

**Recommended next action**

Product review of the live demo (ideally on Aarshiya's actual iPad, matching the original "highest priority" ask), then approval to begin Sprint 4.

## 2026-08-01 — Sprint 2 implementation cycle

**Completed**

- BL-015–BL-019 (Concept Engine `xpReward`, Lesson Engine step schema + generic renderer, Learner Progress model + SQLite persistence, minimal Continue-Learning screen, "Matter" sample content) — all implemented, tested (32 unit tests passing), and walked through end-to-end in a real browser against both the dev server and a production build.
- Two real bugs found only by actually running the app (not by typecheck/lint/unit tests) and fixed: a short-answer question could be skipped without recording an answer; the home page was being statically prerendered, which would have frozen learner progress at build time in production.
- `management/` restructured per the delegation-first directive: `INBOX.md`, `OUTBOX.md`, `LIVE_FACTORY.md`, `WORKER_DASHBOARD.md`, `TASK_LEDGER.md` created/updated.
- ADR 0006 recorded (`node:sqlite` over `better-sqlite3`, since this machine has no C++ build toolchain for native modules).
- DEC-002 and DEC-003 recorded (local-model orchestrator replaced with a deterministic script; a headless Claude Code delegation attempt hung for 27 hours on a network stall and is an open, unresolved reliability issue).

**Currently being worked on**

- None actively in progress — paused on the network outage before pushing Sprint 2 work and before attempting the public-URL deployment.

**Risks**

- **Network outage on the dev machine (open, unresolved).** DHCP/IPv4 failure since a restart; blocks `git push`, blocks OpenClaw delegation (a headless Claude Code worker needs internet same as any other), and blocks any public-URL exposure. All Sprint 2 work is committed locally but not yet on GitHub.
- **OpenClaw delegation reliability (open, unresolved — DEC-003).** The one real delegation attempt this project has made hung for 27 hours before an outer timeout killed it, well past the configured 30-minute limit. The 70% delegation target can't be met safely until this is root-caused — re-delegating blind risks repeating the same multi-hour stall.
- **Automation Ratio is 0%** against a 70% target. This reflects the two risks above, not a refusal to delegate — see `management/WORKER_DASHBOARD.md`.

**Questions for Product Owner — resolved**

1. Public URL approach: Product Owner initially chose cloud hosting, then revised to **trial locally first via a tunnel, move to real hosting later if needed**. Decision: use Cloudflare's anonymous "quick tunnel" (`cloudflared tunnel --url`) — no account needed, no architecture change, keeps the existing `node:sqlite` local-file persistence exactly as built. Revisit cloud hosting (libSQL/Turso + Vercel, previously scoped) only if the trial needs to be more permanent/reliable than an ad hoc tunnel.
2. Access control: unlisted URL is sufficient — no password layer.

**Recommended next action**

1. Get the dev machine's network working again (router/adapter issue — needs physical/local troubleshooting, not something fixable from this session). This blocks everything below.
2. Once network is back: download `cloudflared`, run it against the local dev/prod server, hand Product the resulting `*.trycloudflare.com` URL for Aarshiya's iPad.
3. Also once network is back: push all pending Sprint 2 commits, then investigate and fix the OpenClaw 27-hour-hang issue (DEC-003) before trusting it with unsupervised delegated work again.
