# Product Owner Briefing

_Last updated: 2026-08-03 — Sprints 6 and 7 CLOSED (stop condition reached)_

This file is the standing handoff document between the Engineering Lead (Claude Code, working in this repo) and the Product Owner. It is updated at the end of every sprint/milestone so it can be read on its own, without repo access, to know where things stand. There is no direct technical link between Claude Code and the Product Owner — this file, plus `management/*.md`, is the coordination channel; the user relays between the two.

If you are the Product Owner reading this for the first time: the full project vision and non-negotiable principles are in [docs/architecture/overview.md](architecture/overview.md). This file only covers **current status, decisions since the last briefing, and what's needed from you next.**

---

## Sprints 6 + 7 Briefing: Atomic Structure and Periodic Table are both complete

**Directive (2026-08-03):** complete Atomic Structure to the existing Definition of Done, then proceed immediately into Periodic Table with no review stop in between, only stopping once both reach the same review point. **Both are done.**

**Live demo:** https://hughes-exercises-fourth-queens.trycloudflare.com — the app now covers four topics end-to-end: Matter, Atomic Structure, and The Periodic Table (Particle Model and States of Matter are the other two Matter-topic lessons).

### What was completed

**Sprint 6 — Atomic Structure** (`sci-y7-atomic-structure`): protons/neutrons/electrons and where each is found, atomic number vs. mass number, simplified electron-shell filling. One lesson (explanation → example (carbon) → interactive `atom-builder` widget (build sodium) → 5 questions → summary), an 8-question reusable question bank (grown from 5 during close-out), and a hand-authored topic illustration.

**Sprint 7 — Periodic Table** (`sci-y7-periodic-table`, gated behind completing Atomic Structure): elements ordered by atomic number (not alphabetically), groups vs. periods, metals vs. non-metals, reading properties from position. One lesson (explanation → example (sodium/potassium vs. chlorine) → interactive step → 5 questions → summary), a **new reusable widget** (`PeriodicTableExplorer`: the first 20 elements laid out in their real period/group grid, with transition-metal columns left as visible gaps; tapping a tile reveals name, atomic number, and metal/non-metal classification), and a matching topic illustration.

Both topics are fully wired into the same topic-navigation screen as Matter — locked until their prerequisite is complete, unlocking live with no reload, tracked in the same mastery/XP system.

### Two Product Owner decisions resolved mid-sprint (2026-08-03)

1. **AtomBuilder (button-based) accepted for Version 1.** The original Sprint 6 ask included "drag particles into place" / "place electrons into shells" as distinct interactions; the shipped `AtomBuilder` widget uses +/- buttons instead. You accepted this as-is for V1 — drag-and-drop is recorded as a future enhancement, not built now (DEC-006).
2. **No separate Question Bank project.** Reusable questions continue to be produced as a normal by-product of lesson authoring, not a dedicated initiative (DEC-007). Question Bank growth is now tracked as a secondary KPI alongside the primary "completed curriculum topics" KPI.

### What OpenClaw implemented (delegated, all merged with zero conflicts)

- **BL-040** — Atomic Structure lesson + assessment, written from scratch.
- **BL-041** — Atomic Structure illustration.
- **BL-042** — Grew the Atomic Structure question bank from 5 to 8 questions.
- **BL-044** — Periodic Table lesson, assessment, and the new `PeriodicTableExplorer` widget, written from scratch.
- **CE-001** (parallel worktree, repurposed from the now-superseded Command Centre initiative to "Curriculum Enhancement" per your 2026-08-03 worktree-allocation directive) — grew question banks for all three Matter-topic lessons (+2 questions each).

All were reviewed in full before merging — content read end-to-end for scientific accuracy (all 20 periodic-table element classifications independently checked), not just typecheck/lint/test passing.

### What Claude implemented directly

- **BL-045** — Registered the new `periodic-table-explorer` widget (shared registry file, kept off the delegation track per established practice) and its topic illustration.
- **BL-043 / final QA for both sprints** — Full live browser click-through of every lesson step in both topics (explanation, example, interactive widget, all questions including a deliberate wrong-answer/retry and a hint reveal, summary, finish), mobile viewport (375px, no overflow) and mastery/XP verification.

**Two real bugs were found only by actually running the app, neither caught by typecheck/lint/69 unit tests:**

1. **Hardcoded "Matter" labels.** The topic-list heading and "Back to Matter" navigation text were left over from before the list grew to span multiple topics. Fixed to topic-agnostic "Science Course" / "Back to topic list."
2. **A pre-existing, unrelated build failure.** A fresh `next build`/`next dev` failed repo-wide with "Unknown module type" for every internal workspace package — this predates this session's work and was unrelated to any curriculum content. It mattered because the live server's on-disk build had gone stale relative to source; without a fix, **no future code change could have been redeployed at all.** Fixed via Next.js's documented `transpilePackages` config (DEC-008), verified with a full rebuild and a live server restart.

### Tests

69 automated tests passing (up from 64 at the last briefing), across 11 test files — `typecheck`, `lint`, `build`, and `npm run validate:curriculum` all clean.

### Known issues / not done

Nothing outstanding against either sprint's Definition of Done. The learner-progress database remains per-machine local storage (`node:sqlite`) — still a local trial, not permanent hosting (carried over from the last briefing, still unaddressed).

## New: content/design standard (DEC-009, 2026-08-03)

Based on your user-testing feedback, effective immediately for all new topics (retrofitted into Matter/Atomic Structure/Periodic Table incrementally, not urgently, per your explicit confirmation):

- Every lesson opens with a hero illustration.
- Explanations broken into short sections with supporting graphics, not long uninterrupted paragraphs.
- Diagrams/SVG illustrations/labelled graphics preferred wherever they improve understanding.
- No decorative visuals — every image must teach a concept.

This will shape how the next topic's lesson content is authored and reviewed.

## Recommendations for the next sprint

1. **Content:** no new topic has been approved beyond Periodic Table. The natural next NSW-syllabus topic (chemical reactions, or a Forces topic reusing the previously-dropped BL-029 Force Simulator concept) is a candidate, but needs your explicit direction before scoping.
2. **DEC-009 rollout:** the two OpenClaw worktrees are proven at handling parallel, disjoint-file curriculum work — one lane could start applying the new visual standard to a new topic while the other begins the incremental retrofit of earlier lessons, once you confirm priority between the two.
3. **Hosting:** still worth revisiting real hosting — the Cloudflare quick-tunnel URL changes on every restart and depends on this exact machine staying on, which is exactly the class of fragility DEC-008's build-failure discovery illustrates (a stale build silently blocking redeployment could just as easily have blocked a real hosting deploy).
4. **Scoring model:** the deferred mastery-based "what's next" recommendation engine still needs your input on the scoring model — carried over from earlier briefings, still unaddressed.

## Demo instructions

1. **Open:** https://hughes-exercises-fourth-queens.trycloudflare.com on any device — no install needed.
2. **You'll see five lessons:** Matter, The Particle Model of Matter, States of Matter and Changes of State, Atomic Structure, and The Periodic Table (each unlocks once its prerequisite is completed).
3. **Try the Periodic Table lesson specifically:** explanation → example (sodium/potassium vs. chlorine) → tap through the new periodic-table grid widget → 5 questions (try a wrong answer to see "Try again", and reveal a hint) → summary → finish.
4. **Watch the topic screen** after finishing — XP and mastery update, and the newly-unlocked lesson (if any) shows as "Ready" immediately, no reload needed.
5. **If the link is down:** it's an ephemeral tunnel to the dev machine, not permanent hosting — it only works while that machine is on and connected. Fallback: run locally with `npm install && npm run build && npm run start`, then open `http://localhost:3000`.

## Decisions since last briefing

- **DEC-006:** AtomBuilder (button-based) accepted for Version 1; drag-and-drop deferred as a future enhancement.
- **DEC-007:** No separate Question Bank project authorised; it remains a by-product of normal lesson authoring, now tracked as a secondary KPI.
- **DEC-008:** Fixed a pre-existing Turbopack/workspace-symlink build failure via `transpilePackages` — a real deployability blocker found during Sprint 6 QA, not a discretionary infrastructure change.
- **DEC-009:** New content/design standard — hero illustrations, short sections with supporting graphics, no decorative visuals. Applies to new topics immediately; earlier topics retrofitted incrementally.
- Both OpenClaw worktrees are now dedicated exclusively to curriculum work (one continuing new-topic development, one repurposed from the now-superseded Command Centre initiative to ongoing "Curriculum Enhancement" — question bank growth and improvements to already-shipped lessons).

## Open questions for the Product Owner

1. **What's the next topic** after Periodic Table, if any — no new topic has been approved yet.
2. **DEC-009 rollout priority:** new topics first, or start the incremental retrofit of Matter/Atomic Structure/Periodic Table now that both worktrees are free?
3. **Hosting:** ready to move off the Cloudflare-tunnel trial to something more permanent?
4. **Scoring model:** still need your input on the mastery-based progression engine before it can be built.

## Status per the handoff protocol

The 2026-08-03 directive's stop condition ("continue uninterrupted through Sprint 6 and Sprint 7... produce a consolidated Product Briefing only after both topics reach the Definition of Done") **is met.** Both topics are live, tested, and verified end-to-end via real browser walkthroughs. Stopping here per instruction, awaiting Product Review before starting any new topic.

## How to keep this current

This file is meant to be re-read periodically rather than re-derived from scratch. The Engineering Lead updates it at the end of every sprint/milestone (see `CLAUDE.md`). If you're setting up a recurring read, point it at this file — not the full repo — as the primary status source.
