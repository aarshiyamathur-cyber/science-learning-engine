# Sprint 5

_Sprint 4 status: superseded mid-flow by this directive. BL-026, BL-027, BL-028 (done and merged) carry forward as part of the finished "Matter" concept; BL-029 (Force Simulator) is explicitly dropped — it belongs to a future Forces topic, not Matter._

## Goal

**Mission: complete the "Matter" topic.** Not just the one polished lesson — all three concepts that make up "Matter" per the knowledge graph: Matter (done), Particle Model of Matter (currently thin placeholder content), and States of Matter and Changes of State (does not exist yet — no lesson, no assessment). Deliver one finished topic Aarshiya can comfortably complete tomorrow morning.

Constraints: do not begin another science topic. Do not add infrastructure. Do not redesign the learning engine.

## Definition of Done

- [ ] All Matter lessons complete (Matter, Particle Model, States of Matter)
- [ ] All questions complete
- [x] Every question has explanations and hints (schema + UI landed; content backfill in progress per lesson)
- [ ] Every screen has appropriate colour and visual hierarchy
- [ ] Appropriate illustrations added where they improve understanding
- [ ] Every interaction tested
- [ ] Navigation polished (multi-lesson topic flow — currently the app hardcodes a single lesson)
- [x] Progress tracking works (existing, per-concept mastery + per-lesson completion — needs re-verification across 3 lessons)
- [x] XP works (existing — needs re-verification across 3 lessons)
- [ ] Mobile/iPad experience polished
- [ ] No placeholders
- [ ] No TODOs

## Engineering strategy

Break remaining work into independent tasks. Delegate as much implementation as possible to OpenClaw (single worktree/agent — tasks run sequentially, not in parallel, despite the conceptual "Worker 1-5" framing). Claude's role: review, integrate, merge, maintain architecture and quality; implement directly only what carries real conflict/architecture risk if delegated.

## Task breakdown

| Task   | Description                                                                 | Owner            | Status |
| ------ | ---------------------------------------------------------------------------- | ---------------- | ------ |
| BL-030 | `hint` field on questions (schema + UI) + backfill hints on existing 7 questions + first LessonPlayer test coverage | Claude           | Done   |
| BL-031 | Complete the "Particle Model" lesson (currently placeholder) — real content, reuse `particle-state-explorer` widget, expand to 4-5 questions with hints | OpenClaw (delegated) | Dispatched |
| BL-032 | Write "States of Matter and Changes of State" lesson + assessment from scratch (melting/freezing/evaporation/condensation) | OpenClaw (delegated) | Not started |
| BL-033 | New illustrations supporting BL-031/032 (hand-authored SVG, matching existing style) | OpenClaw (delegated) | Not started |
| BL-034 | Multi-lesson topic navigation — replace the single hardcoded lesson in `app/page.tsx`/`ContinueLearningScreen` with a real flow across all 3 Matter lessons | Claude           | In progress |
| BL-035 | UI polish pass — visual hierarchy, colour, mobile/iPad responsive check across all screens | Claude           | Not started |
| BL-036 | Final QA — live click-through of every interaction across all 3 lessons, verify progress/XP end-to-end, confirm no placeholders/TODOs | Claude           | Not started |

**Stop condition:** stop only when the Matter topic is complete end-to-end and ready for Aarshiya to use. Produce a Product Owner Briefing covering what was completed, OpenClaw's contributions vs. Claude's, tests, known issues, and Sprint 6 recommendations.
