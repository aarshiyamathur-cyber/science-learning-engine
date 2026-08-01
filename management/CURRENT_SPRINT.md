# Sprint 5 — CLOSED

_Sprint 4 status: superseded mid-flow by this directive. BL-026, BL-027, BL-028 (done and merged) carry forward as part of the finished "Matter" concept; BL-029 (Force Simulator) is explicitly dropped — it belongs to a future Forces topic, not Matter._

## Goal

**Mission: complete the "Matter" topic.** Not just the one polished lesson — all three concepts that make up "Matter" per the knowledge graph: Matter, Particle Model of Matter, and States of Matter and Changes of State. Deliver one finished topic Aarshiya can comfortably complete tomorrow morning.

Constraints: do not begin another science topic. Do not add infrastructure. Do not redesign the learning engine.

## Definition of Done

- [x] All Matter lessons complete (Matter, Particle Model, States of Matter)
- [x] All questions complete (5 questions per lesson, 15 total, all with hints + explanations)
- [x] Every question has explanations and hints
- [x] Every screen has appropriate colour and visual hierarchy (existing Sprint 3 design system + per-lesson illustrations from BL-033)
- [x] Appropriate illustrations added where they improve understanding (3 distinct illustrations, one per lesson)
- [x] Every interaction tested (live click-through of all 3 lessons end-to-end, both question types, hints, retry, mastery/XP; 64 automated tests)
- [x] Navigation polished (multi-lesson topic flow with lock/unlock/complete states, verified live)
- [x] Progress tracking works (verified live across all 3 lessons, including a real bug found and fixed — see BL-036 notes)
- [x] XP works (verified live: 50 + 50 = 100 XP accumulated correctly across two completed lessons)
- [x] Mobile/iPad experience polished (no horizontal overflow at 375px/768px, 48px tap targets, verified in both light and dark mode)
- [x] No placeholders (repo-wide grep confirms none)
- [x] No TODOs (repo-wide grep confirms none)

## Engineering strategy

Delegated the two real content gaps (finishing Particle Model, writing States of Matter from scratch) and the illustrations to OpenClaw — all three merged with zero conflicts. Claude handled schema/architecture (BL-030), multi-lesson navigation (BL-034), and final live QA (BL-035/036), including finding and fixing one real bug during QA that no automated check caught.

## Task breakdown — all Done

| Task   | Description                                                                 | Owner            | Status |
| ------ | ---------------------------------------------------------------------------- | ---------------- | ------ |
| BL-030 | `hint` field on questions (schema + UI) + backfill hints on existing 7 questions + first LessonPlayer test coverage | Claude           | Done   |
| BL-031 | Complete the "Particle Model" lesson — real content, reuse `particle-state-explorer` widget, expanded to 5 questions with hints | OpenClaw (delegated) | Done — merged, zero conflicts |
| BL-032 | Write "States of Matter and Changes of State" lesson + assessment from scratch (melting/freezing/evaporation/condensation) | OpenClaw (delegated) | Done — merged, zero conflicts |
| BL-033 | New illustrations supporting BL-031/032 (hand-authored SVG, matching existing style) | OpenClaw (delegated) | Done — merged, zero conflicts |
| BL-034 | Multi-lesson topic navigation — replaced the single hardcoded lesson with a real flow across all 3 Matter lessons, lock state derived from existing `prerequisites` data | Claude           | Done |
| BL-035 | UI polish + mobile/iPad check | Claude           | Done — verified via live browser walkthrough (topic list, hints, mobile/tablet viewport, dark mode); no additional visual changes needed beyond BL-033's illustrations |
| BL-036 | Final QA — live click-through of every interaction across all 3 lessons | Claude           | Done — found and fixed one real bug (see below) |

## BL-036 — bug found and fixed during live QA

**Newly-unlocked lesson stayed "Locked" until manual page reload.** After completing Particle Model (which unlocks States of Matter), the topic list kept showing States of Matter as Locked — the lock flags are computed server-side in `app/page.tsx` and the client never refetched them after a lesson completed. Fixed by calling `router.refresh()` in `handleComplete()`. Confirmed fixed live: completing Particle Model now shows States of Matter as "Ready" immediately, no reload needed.

A second, unrelated bug was found and fixed the same evening: the `AarshiyaAppServer` Scheduled Task was silently exiting seconds after every start (Task Scheduler reported a clean exit, but nothing was ever listening on port 3000) because `start-server.ps1` had `$ErrorActionPreference = "Stop"`, which under PowerShell 5.1 treats any stderr line from npm/next as fatal. Fixed by removing that setting and adding transcript logging.

**Stop condition reached.** The Matter topic is complete end-to-end and ready for Aarshiya to use. Learner progress database reset to a clean state (0 XP, no lessons completed) before handoff. See `docs/product-owner-briefing.md` for the full summary.
