# ADR 0007 — Semantic design tokens + a shared `ui` primitives library

- **Date:** 2026-08-01
- **Status:** Accepted

## Decision

For BL-020 (Sprint 3, visual design system foundation): add a semantic color-token layer in `app/globals.css` — roles (`brand`, `accent`, `success`, `warning`, `danger`, `info`, `neutral`) each aliasing an existing Tailwind color ramp via Tailwind v4's `@theme` — plus a small named typography scale (`text-display` … `text-caption`) aliasing Tailwind's existing type scale. Alongside it, `app/components/ui/` gets four primitives (`Card`, `Badge`, `Button`, `ProgressBar`) that only accept a `tone` from that role set, never a raw color name. `ContinueLearningScreen` now consumes these primitives as the first real usage.

Spacing was deliberately left alone: Tailwind's default numeric spacing scale (`p-6`, `gap-4`, …) is already token-based (multiples of a base unit, not one-off pixel values), so no new spacing tokens were introduced.

## Reason

The existing screens (`ContinueLearningScreen`, `LessonPlayer`) already used Tailwind's palette consistently — no one-off hex values — but each screen picked its hues independently (e.g. `teal` for the primary CTA in one place, `sky` in another). That works for one screen; it does not scale to "every screen draws from one consistent visual language," which is the explicit BL-020 ask ahead of BL-021 (assets) and BL-022 (full rework of both existing screens). Naming roles once means a future palette change (or a Product-requested rebrand) is a single-file edit instead of a grep-and-replace across every component.

## Alternatives considered

- **Leave colors as direct Tailwind hues, only add primitive components:** rejected — primitives would still hardcode `bg-teal-600` etc. internally, so the "single visual language" problem persists, just moved one file over.
- **A full custom color scale with new hex/oklch values:** rejected as unnecessary — the existing Tailwind hues already read well (per Aarshiya's Sprint 2 feedback asking for more color, not different colors); aliasing preserves that work instead of re-deriving a palette from scratch.
- **Semantic spacing tokens (e.g. `--spacing-card-padding`):** rejected — Tailwind's numeric spacing scale is already a token system, and naming a handful of aliases on top would just add a lookup step (`p-[--spacing-card-padding]` is an arbitrary-value class, not cleaner than `p-6`) without changing what's on screen.

## Impact

BL-022 (apply the design system to `ContinueLearningScreen` + `LessonPlayer`) and BL-024 (immediate feedback UI) can now reach for `<Card tone="danger">` / `<Badge tone="success">` instead of hand-rolling accent class maps per component — `LessonPlayer`'s existing `ACCENT_CLASSES`/`STEP_STYLE` pattern is the template this generalizes and should be migrated onto these primitives in BL-022 rather than kept as a parallel implementation.
