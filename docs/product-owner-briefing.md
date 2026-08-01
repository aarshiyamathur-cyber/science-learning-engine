# Product Owner Briefing

_Last updated: 2026-08-01 — Sprint 2_

This file is the standing handoff document between the Engineering Lead (Claude Code, working in this repo) and the Product Owner (ChatGPT, supplying curriculum/gameplay specs). It is updated at the end of every sprint/milestone so it can be read on its own, without repo access, to know where things stand. There is no direct technical link between Claude Code and ChatGPT — this file, plus `management/*.md`, is the coordination channel; the user relays between the two.

If you are the Product Owner reading this for the first time: the full project vision and non-negotiable principles are in [docs/architecture/overview.md](architecture/overview.md). This file only covers **current status, decisions since the last briefing, and what's needed from you next.**

---

## Current status: Sprint 2 delivered — first playable lesson, live for testing

**The first playable learning loop exists and is live right now:** https://divx-ips-resistance-acoustic.trycloudflare.com

- `packages/curriculum-schema` — Concept (now with `xpReward`), Lesson (ordered typed steps: explanation/example/question/summary), AssessmentQuestion, KnowledgeGraph; a shared YAML loader used by both the app and the validation pipeline.
- `packages/learning-engine` — LearnerProfile (id, XP, score, completed lessons, last completed), MasteryState, AttemptRecord, backed by SQLite (`node:sqlite`, no native build toolchain required — ADR 0006).
- A real UI: one screen (Science → Continue Learning → concept → Start Lesson → step-by-step lesson player → completion), colorful and icon-coded per step type, with a working answer box for both multiple-choice and short-answer questions.
- Sample content: one concept ("Matter"), one lesson, five questions — demonstration content, not real curriculum.
- Full repo: `github.com/aarshiyamathur-cyber/science-learning-engine`, `master` branch. Rationale for every technical choice is in [docs/decisions](decisions) (ADRs 0001–0006).

### What changed based on real feedback

Aarshiya tried Sprint 2's first version and reported it was visually flat (no color) and short-answer questions had no way to actually type an answer. Both were fixed and re-verified in a real browser before being shipped to the live URL: short-answer questions now have a real text box (type → submit → compare against a reference answer → self-assess, since free-text auto-grading is out of scope for now), and the whole UI is color-coded and icon-driven instead of grayscale.

## Demo instructions

1. **Open:** https://divx-ips-resistance-acoustic.trycloudflare.com on any device (phone, iPad, laptop) — no install needed.
2. **Click:** "Start Lesson," then step through explanation → example → 5 questions → summary → finish.
3. **Expected behaviour:** progress bar and XP update live; reloading the page keeps your progress (it's saved server-side, not just in the browser).
4. **If the link is down:** it's an ephemeral tunnel to the dev machine, not permanent hosting — it only works while that machine is on and connected to the internet. Fallback: run locally with `npm install && npm run build && npm run start`, then open `http://localhost:3000`.

## Decisions since last briefing

- Sprint 1's original scope (knowledge graph traversal, general progression engine) was narrowed and partly superseded once Sprint 2 defined a concrete first playable loop — see the backlog's "Later / Deferred" section.
- Learner-progress persistence uses Node's built-in `node:sqlite`, not `better-sqlite3` as originally planned, since this dev machine has no C++ build toolchain — [ADR 0006](decisions/0006-node-sqlite-over-better-sqlite3.md).
- The OpenClaw autonomous coding pipeline's "decide what to do" step was moved from a local Ollama model to a deterministic script, after local models (llama3, then qwen2.5:3b) proved unreliable or incapable of tool-calling — `management/DECISIONS.md` DEC-002.
- **Open reliability issue (DEC-003):** the one real OpenClaw delegation attempt hung for 27 hours before an outer timeout killed it. Root cause traced to the dev machine's network (see below), not yet independently confirmed fixed.
- Adopted a delegation-first operating model: Claude Code as Engineering Manager, OpenClaw as the implementation workforce, tracked in `management/WORKER_DASHBOARD.md` (Automation Ratio) and `management/TASK_LEDGER.md`. Currently at 0% against a 70% target — see "Open questions" below for why.
- **Network finding:** the dev machine's home ISP (TPG) appears to block this specific Windows device (likely a MAC-level rule on the router — a MacBook on the same network is unaffected), causing IPv4 to fail while IPv6 still works. This explains the DEC-003 hang and repeated push failures. Mobile hotspot is a working bypass; the router-side cause hasn't been resolved.

## Open questions for the Product Owner

1. **Automation Ratio (70% target, currently 0%):** blocked by the network issue above (a delegated OpenClaw worker needs internet, same as a push) and by the unresolved DEC-003 reliability issue. Acceptable to keep building directly until both are resolved, or is there a preference for pausing feature work until delegation is reliable?
2. **Hosting:** the live demo is a Cloudflare tunnel to the dev machine (chosen for a quick trial, per your instruction) — data stays local (`node:sqlite`). Move to real cloud hosting (would need a persistence swap to a hosted database, e.g. Turso/libSQL, plus a Vercel deploy) if the trial goes well, or keep the tunnel approach?
3. **Content:** what's the first slice of real curriculum content beyond the single "Matter" demo concept? A recommended next step is one full NSW Year 7 topic authored for real.
4. **Scoring model:** the deferred progression engine (mastery-based "what's next" recommendation) needs your input on the scoring/mastery model before it's built.

## Status per the Sprint 2 handoff protocol

Per `management/HANDOFF.md`, engineering stops and waits for Product review after each sprint. Sprint 2 is complete and live — awaiting your review before Sprint 3 begins.

## How to keep this current

This file is meant to be re-read periodically rather than re-derived from scratch. The Engineering Lead updates it at the end of every sprint/milestone (see `CLAUDE.md`). If you're setting up a recurring read (e.g. a scheduled prompt to ChatGPT), point it at this file — not the full repo — as the primary status source.
