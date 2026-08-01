# Sprint 2

_Sprint 1 status: BL-010 (core learner/attempt models) done; BL-011 and BL-014 deferred (not needed for a single-concept demo); BL-012 and BL-013 superseded by BL-016 and BL-017 below. See `docs/backlog/backlog.md`._

## Goal

Build the first playable learning loop — one complete, reusable learning experience, not a science game and not multiple systems.

## Deliverables

1. **Concept Engine** — concept data model: id, title, description, learningObjectives, prerequisites, masteryThreshold, xpReward.
2. **Lesson Engine** — generic, data-driven lesson renderer. Ordered steps; step types: explanation, example, question, summary. No hardcoded science content in the UI.
3. **Learner Progress** — persist completed lessons, XP, score, attempts, mastery, last completed. Model must support future adaptive learning.
4. **Minimal UI** — one screen only (Science / Continue Learning / Matter / Progress / Start Lesson). No animation, maps, avatars, coins, achievements, or polish.
5. **Sample Content** — one concept ("Matter"), one lesson, five questions. Demonstration content only.

Engineering rules: build incrementally, keep the architecture clean, write tests, keep everything reusable, don't anticipate future features beyond this sprint.

Approved by Product Owner. Do not begin Sprint 3 after this one — stop for Product review.

## In Progress

## Done
