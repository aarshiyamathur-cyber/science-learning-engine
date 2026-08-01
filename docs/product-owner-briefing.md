# Product Owner Briefing

_Last updated: 2026-08-01 — Sprint 5 CLOSED (stop condition reached)_

This file is the standing handoff document between the Engineering Lead (Claude Code, working in this repo) and the Product Owner (ChatGPT, supplying curriculum/gameplay specs). It is updated at the end of every sprint/milestone so it can be read on its own, without repo access, to know where things stand. There is no direct technical link between Claude Code and ChatGPT — this file, plus `management/*.md`, is the coordination channel; the user relays between the two.

If you are the Product Owner reading this for the first time: the full project vision and non-negotiable principles are in [docs/architecture/overview.md](architecture/overview.md). This file only covers **current status, decisions since the last briefing, and what's needed from you next.**

---

## Sprint 5 Briefing: the "Matter" topic is complete

**Mission (per your directive):** finish the "Matter" topic end-to-end — all three concepts, not just the one polished lesson — and deliver something Aarshiya can comfortably complete tomorrow morning. **That mission is done.**

**Live demo:** https://fine-housewares-birmingham-dose.trycloudflare.com — learner progress has been reset to a clean starting state (0 XP, no lessons completed) ahead of handoff.

### What was completed

The Matter topic now has three finished lessons, in teaching order, each fully gated behind a topic-navigation screen with real progress/lock state:

1. **Matter** (`sci-y7-matter`) — what matter is, the three states, an interactive particle-state widget. (Already complete going into this sprint.)
2. **The Particle Model of Matter** (`sci-y7-particle-model`) — was a thin placeholder (2 questions, no interaction) at the start of this sprint. Now: a full explanation/example/interactive/5-question/summary lesson matching the Matter lesson's quality bar.
3. **States of Matter and Changes of State** (`sci-y7-states-of-matter`) — **had zero lesson content and zero questions at the start of this sprint.** Written entirely from scratch: melting, freezing, evaporation, and condensation, explained in terms of particle energy, with 5 questions that directly target the concept's listed misconception ("melting/freezing creates a new substance" — corrected explicitly).

Every question across all three lessons (15 total) now has both a **hint** (shown on request, before answering — new this sprint) and an **explanation** (shown after answering, as before). Each lesson has its own distinct hand-drawn illustration on the topic screen. The topic screen shows real lock/unlock state driven by each concept's existing prerequisite data — completing Particle Model unlocks States of Matter, live, without a page reload.

### What OpenClaw implemented (delegated, all merged with zero conflicts)

- **BL-031** — Completed the Particle Model lesson (explanation, example, interactive widget reuse, 5 questions with hints).
- **BL-032** — Wrote the States of Matter lesson and its 5-question assessment entirely from scratch.
- **BL-033** — Two new hand-authored SVG illustrations (Particle Model, Changes of State), wired per-lesson.

All three were reviewed in full before merging — content read end-to-end for scientific accuracy, not just typecheck/lint/test passing. Quality was consistently high; no corrections were needed to the content itself.

### What Claude implemented directly

- **BL-030** — Added the `hint` field to the question schema and its UI, and backfilled hints into every pre-existing question.
- **BL-034** — Replaced the single hardcoded lesson with a real multi-lesson topic screen (list view, lock/unlock/completion state, "Back to Matter" navigation) — this touches the shared app shell, so it stayed off the delegation track.
- **BL-035/BL-036** — UI/mobile polish and final QA: a full live click-through of all three lessons end-to-end (every question, both types, hints, retry, mastery, XP), plus mobile (375px) and tablet (768px) viewport checks and a dark-mode check.

### Tests

64 automated tests passing (up from 53 at the start of this sprint), across 10 test files — `typecheck`, `lint`, `build`, and `npm run validate:curriculum` all clean. The increase includes the first real test coverage `LessonPlayer` has ever had (8 tests) and extended illustration/schema tests.

**Two real bugs were found only by actually running the app, not by any of the above:**

1. **Stale lock state.** After completing a lesson that unlocks another (Particle Model → States of Matter), the newly-unlocked lesson kept showing "Locked" until a manual page reload — the topic list's lock flags are computed server-side and the client never refetched them. Fixed with a `router.refresh()` call after lesson completion. Confirmed fixed live.
2. **Silent server crash.** The Scheduled Task that keeps the production server running was exiting seconds after every start — Task Scheduler reported a clean exit, but nothing was ever listening on port 3000. Root cause: a PowerShell setting that treats routine npm/Next.js console warnings as fatal errors. Found live tonight when the public link briefly 502'd after a routine restart; fixed and verified.

Neither bug would have been caught by typecheck, lint, or the unit test suite — both were only found by actually clicking through the live app and actually restarting the live server, which continues to be the deciding factor for shipping confidence on this project.

### Known issues / not done

- Nothing outstanding against this sprint's Definition of Done — all items are checked off (see `management/CURRENT_SPRINT.md`).
- The learner-progress database is per-machine local storage (`node:sqlite`), same as every prior sprint — this is still a local trial, not permanent hosting (see Hosting, below).

## Recommendations for Sprint 6

1. **Content:** the Matter topic is done. The natural next step is either a second full topic (using the same three-lesson pattern: intro concept → mechanism → applied concept) or deepening Matter with a 4th lesson if there's more NSW syllabus content to cover before moving on.
2. **Delegation:** three consecutive successful OpenClaw delegations this sprint, all zero-conflict — the "standalone content/asset, no shared file" scoping pattern is now proven repeatedly. Sprint 6 should keep scoping delegated tasks this way rather than treating delegation as an afterthought.
3. **Hosting:** still worth revisiting cloud hosting (previously scoped: libSQL/Turso + Vercel) if a Cloudflare quick tunnel's need for this exact machine to stay on and connected keeps being inconvenient — tonight's server-crash bug is exactly the kind of failure mode that goes away with real hosting.
4. **Scoring model:** the deferred mastery-based "what's next" recommendation engine still needs Product input on the scoring model before it's built — carried over from earlier briefings, still unaddressed.
5. **A second, parallel initiative is now underway:** a Product Command Centre internal dashboard (separate from Aarshiya's learning app) is being built via a second, parallel OpenClaw delegation stream — see `management/COMMAND_CENTRE.md` for its own status. It doesn't compete with Sprint 6 content work since it runs in a separate worktree.

## Demo instructions

1. **Open:** https://fine-housewares-birmingham-dose.trycloudflare.com on any device (phone, iPad, laptop) — no install needed.
2. **You'll see three lessons:** Matter, The Particle Model of Matter, and States of Matter and Changes of State (the last one unlocks once Particle Model is completed).
3. **Try any lesson:** explanation → example → an interactive "🧪 Try it yourself" step → 5 questions (mixed multiple-choice/short-answer, each with an optional "💡 Need a hint?") → summary → finish.
4. **Answer a question wrong on purpose** to see the "Try again" flow, and try the 🎤 voice button on a short-answer question.
5. **Complete a lesson and watch the topic screen** — XP and mastery update, and completing Particle Model unlocks States of Matter immediately, no reload needed.
6. **If the link is down:** it's an ephemeral tunnel to the dev machine, not permanent hosting — it only works while that machine is on and connected to the internet. Fallback: run locally with `npm install && npm run build && npm run start`, then open `http://localhost:3000`.

## Decisions since last briefing

- **ADR 0008 / DEC-005:** a second OpenClaw managed worktree was created (`openclaw/command-centre`) so the new Command Centre initiative could run in parallel with Sprint 5's in-flight delegations instead of queuing behind them, since the two initiatives touch entirely disjoint files.
- **Sprint 5's `hint` field is required, not optional** — every question needs one, matching the sprint's explicit Definition of Done. All pre-existing content was backfilled in the same change that added the field, so the repo was never left in a state where some questions had hints and others didn't.

## Open questions for the Product Owner

1. **Sprint 6 direction:** a second full topic, or deepen Matter further? (See Recommendation 1 above.)
2. **Hosting:** ready to move off the Cloudflare-tunnel trial to something more permanent? (See Recommendation 3.)
3. **Scoring model:** still need your input on the mastery-based progression engine before it can be built.
4. **Command Centre scope:** the current build covers Executive Dashboard, Roadmap, Sprint History, Release Centre, Question Bank, and (in progress) a real Engineering Dashboard reading live task data. Is this the intended final page set, or are there more views wanted?

## Status per the handoff protocol

Sprint 5's stop condition ("stop only when the Matter topic is complete end-to-end and ready for Aarshiya to use") **is met.** All three lessons are live, tested, and verified end-to-end via a real browser walkthrough; the learner-progress database has been reset to a clean state for Aarshiya's actual first use. Stopping Sprint 5 here per instruction, awaiting Product review before Sprint 6. The Command Centre initiative continues in the background on its own track (see `management/COMMAND_CENTRE.md`) since it doesn't compete for the same review bandwidth as curriculum content.

## How to keep this current

This file is meant to be re-read periodically rather than re-derived from scratch. The Engineering Lead updates it at the end of every sprint/milestone (see `CLAUDE.md`). If you're setting up a recurring read (e.g. a scheduled prompt to ChatGPT), point it at this file — not the full repo — as the primary status source.
