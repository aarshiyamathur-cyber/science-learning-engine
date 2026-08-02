# Product Roadmap

_Frozen 2026-08-01 per Product Owner directive. Do not change without explicit Product Owner approval._

**KPI: completed science topics Aarshiya can learn from — not engineering progress.**

| Sprint | Topic | Status |
| --- | --- | --- |
| Sprint 5 | Complete Matter | ✅ Done — 3 lessons (Matter, Particle Model, States of Matter), live and tested |
| Sprint 6 | Atomic Structure | 🔄 Underway — see below |
| Sprint 7 | Periodic Table | ⬜ Not started |

## Sprint 5 — Definition of Done (all met)

- [x] Every lesson complete
- [x] Every explanation complete
- [x] Every assessment complete
- [x] Every answer has meaningful feedback
- [x] Appropriate illustrations throughout
- [x] At least one meaningful interaction in the topic (particle-state-explorer, used in all 3 lessons)
- [x] Navigation polished
- [x] Mobile/iPad friendly
- [x] No placeholder content
- [x] QA completed (live click-through found and fixed 2 real bugs)

## Sprint 6 — Atomic Structure (underway)

**Scope:** structure of the atom, protons, neutrons, electrons, atomic number, mass number, electron shells, simple atomic models.

**In flight (dispatched to OpenClaw, not yet reviewed/merged):**
- BL-040 — Atomic Structure lesson + assessment, written from scratch
- BL-041 — Atomic Structure illustration

**Architecture already in place (Claude, since these touch shared files):**
- `atom-builder` widget (built Sprint 4, unused until now) registered in `LessonPlayer`'s widget registry
- New concept `sci-y7-atomic-structure` added to the knowledge graph and the app's topic sequence, gated behind completing Matter

**Open question for Product Review — interaction mechanic gap:** the directive asks for "drag particles into place" and "place electrons into shells" as distinct interactions. The existing `AtomBuilder` widget (Sprint 4) uses +/- buttons to add/remove particles and auto-fills electron shells (2, then 8, then remainder) rather than letting the learner drag individual particles or manually place electrons into a chosen shell. BL-040 reuses `AtomBuilder` as-is, which satisfies "build an atom" but not literal drag-and-drop placement. Building a true drag-based interaction would be a new reusable widget (similar scope to `ParticleStateExplorer`/`AtomBuilder`) — not yet started, flagged here for a Product Owner call on whether it's required before Sprint 6 is considered complete, or whether the button-based `AtomBuilder` satisfies "build an atom" for now.

**Not yet addressed:** "Identify atoms from atomic number" (a quiz-style interaction) is expected to be covered via assessment questions in BL-040 rather than a new mechanic — to be confirmed once BL-040 lands and is reviewed.

## Question Bank policy

Every lesson contributes reusable questions with concept, difficulty, correct answer, explanation, hint, and curriculum reference — already the standard for every question written since BL-030 (hint field became required). Not postponed; grows with each topic. Real counts visible on the Command Centre's Question Bank page (currently sample data — will move to reading real curriculum data in a later, explicitly-approved Command Centre task, not before).

## Engineering capacity

~80% curriculum delivery, ~20% infrastructure/QA/maintenance. Curriculum wins any conflict. OpenClaw is the primary implementer; Claude's role is architecture, delegation, integration, review, merge, and quality — not primary implementation, except where a task genuinely can't be delegated (schema/shared-file changes, final QA).

## Command Centre

MVP complete (CC-001 through CC-006), deployed, frozen. No further Command Centre work without explicit Product Owner approval — see `management/COMMAND_CENTRE.md`.
