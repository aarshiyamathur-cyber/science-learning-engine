# Product Roadmap

_Frozen 2026-08-01 per Product Owner directive. Do not change without explicit Product Owner approval._
_Updated 2026-08-03: Sprint 5 formally accepted; Sprint 6 authorised to continue through Sprint 7 with no review stop between them — see `management/INBOX.md` 2026-08-03 directive and DEC-006/DEC-007._

**KPI: completed science topics Aarshiya can learn from — not engineering progress.**

| Sprint | Topic | Status |
| --- | --- | --- |
| Sprint 5 | Complete Matter | ✅ Done — accepted by Product Owner 2026-08-03 |
| Sprint 6 | Atomic Structure | 🔄 Continuing — see below |
| Sprint 7 | Periodic Table | 🔄 Authorised to begin immediately once Sprint 6 DoD is met, no review stop in between |

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

**Resolved 2026-08-03 (DEC-006):** Product Owner accepted the existing button-based `AtomBuilder` widget as the Version 1 interaction for atomic structure. Drag-and-drop particle/electron placement is not being built now — recorded as a future enhancement only.

**Resolved:** "Identify atoms from atomic number" is covered via assessment questions in BL-040 (e.g. `q-atomic-structure-02`/`03`), not a separate mechanic.

**Remaining before Sprint 6 is marked complete:** live QA against the full Definition of Done (interaction/navigation/mobile/XP/no-placeholders, same bar as Sprint 5) — in progress.

## Question Bank policy

Every lesson contributes reusable questions with concept, difficulty, correct answer, explanation, hint, and curriculum reference — already the standard for every question written since BL-030 (hint field became required). Not postponed; grows with each topic. Real counts visible on the Command Centre's Question Bank page (currently sample data — will move to reading real curriculum data in a later, explicitly-approved Command Centre task, not before). **No standalone Question Bank project is authorised (DEC-007, 2026-08-03)** — this remains a by-product of normal lesson authoring, not a dedicated initiative.

## Sprint 7 — Periodic Table (authorised to begin once Sprint 6 DoD is met)

**Scope:** elements as organised by atomic number; groups and periods; metals vs. non-metals; using the periodic table to predict basic properties — Year 7-10 appropriate, no advanced chemistry (no orbital notation, no ionisation energy trends beyond a simple mention if it fits naturally).

**Prerequisite:** `sci-y7-atomic-structure` (atomic number is the periodic table's ordering principle).

**Directive:** proceed immediately after Sprint 6's Definition of Done is met — no Product Review stop between Sprint 6 and Sprint 7. Only stop once Sprint 7 reaches the same review point.

## Engineering capacity

~80% curriculum delivery, ~20% infrastructure/QA/maintenance. Curriculum wins any conflict. OpenClaw is the primary implementer; Claude's role is architecture, delegation, integration, review, merge, and quality — not primary implementation, except where a task genuinely can't be delegated (schema/shared-file changes, final QA).

## Command Centre

MVP complete (CC-001 through CC-006), deployed, frozen. No further Command Centre work without explicit Product Owner approval — see `management/COMMAND_CENTRE.md`.
