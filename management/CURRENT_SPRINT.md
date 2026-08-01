# Sprint 4

_Sprint 3 status: Done and accepted — see `docs/backlog/backlog.md`._

## Goal

Theme: **Interactive Science.** Mission: replace reading with discovery. Build reusable interactive concept widgets, starting with Particle Theory, Atoms, and Forces. Every lesson should include at least one meaningful interaction.

## Feedback driving this sprint

- ✓ Liked the redesign.
- Wants more illustrations.
- Wants more interaction.

## Deliverables

1. **Interactive lesson step type** (BL-026) — schema capability for embedding a widget in a lesson.
2. **Particle State Explorer** (BL-027) — reusable widget, wired into the existing "Matter" lesson.
3. **Atom Builder** (BL-028) — reusable widget.
4. **Force Simulator** (BL-029) — reusable widget, drag-based.
5. Illustration library expansion using open-licensed assets where appropriate; custom graphics only where they improve learning; one consistent visual style (continuing Sprint 3's hand-authored SVG approach).

Constraints: no new curriculum, no infrastructure, no complex game mechanics.

Filter for every feature: "Can Aarshiya touch, drag, build, experiment with, or explore this concept?" If no, redesign it.

Continue committing frequently; update `docs/product-owner-briefing.md` after each milestone.

**Stop condition:** when there is a demonstrably more interactive lesson ready for Aarshiya to test.

## In Progress

- BL-029 (Force Simulator) — not started.

## Done

- BL-026 (interactive lesson step type) — merged to `master`.
- BL-027 (Particle State Explorer) — merged to `master`, verified live in the "Matter" lesson.
- BL-028 (Atom Builder) — delegated to OpenClaw, merged to `master` with zero conflicts.

**Stop condition reached (2026-08-01):** the "Matter" lesson now has a real, learner-driven interactive step (BL-027) between its Example and first Question, verified live against the production tunnel. Standing by for Product Owner review before BL-029 or Sprint 5.
