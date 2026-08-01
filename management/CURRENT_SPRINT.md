# Sprint 3

_Sprint 2 status: Done — BL-015 through BL-019 shipped and live. See `docs/backlog/backlog.md`._

## Goal

Improve the learner experience based on Aarshiya's direct feedback on Sprint 2: the app needs color, illustrations, an unambiguous way to answer questions (including an explicit voice option), and immediate feedback with explanations. No new curriculum, no new game mechanics, no new infrastructure.

## Feedback driving this sprint

- The app needs colour.
- It needs graphics and illustrations.
- It is not obvious how to answer questions.
- There should be a visible text box for typed answers.
- If voice input is supported, it must clearly tell the learner to speak.
- The overall experience needs to feel much more engaging.

## Deliverables

1. **Visual design system** — color palette, typography, card components, icons, progress components, lesson components (BL-020).
2. **Asset library** — `assets/{icons,illustrations,diagrams,animations,backgrounds}`, one consistent visual style (BL-021).
3. **Apply the design system** to the existing Continue Learning screen and Lesson Player (BL-022).
4. **Explicit answer interaction** — typed, multiple-choice, and an explicit voice mode; never leave the learner guessing how to answer (BL-023).
5. **Immediate feedback** — correct (✓ Nice work / XP earned / explanation) and incorrect (Not quite / short explanation / Try again) (BL-024).
6. **Keep the live demo current** after every meaningful milestone, not just at sprint end (BL-025).

Working rule for every feature: "Will this make Aarshiya more likely to complete another lesson?" If no, don't build it.

OpenClaw: continue delegating implementation work whenever practical (tracked in `management/WORKER_DASHBOARD.md`).

Reporting: update `management/OUTBOX.md`, `management/LIVE_FACTORY.md`, and `management/WORKER_DASHBOARD.md` after every meaningful milestone, not just at sprint end.

**Stop condition:** when there is a significantly improved visual lesson experience ready for Aarshiya to test, stop, commit, update the dashboards, and wait for Product review.

## In Progress

## Done

- **BL-020 — Visual design system foundation.** Semantic design tokens (`app/globals.css`) + `app/components/ui/` primitives (Card, Badge, Button, ProgressBar); `ContinueLearningScreen` reworked to use them. See [ADR 0007](../docs/decisions/0007-semantic-design-tokens-and-ui-primitives.md). Delegated to and completed by an OpenClaw worker — first successful delegation this project has had.
- **BL-021 — Icon and illustration asset library.** 6 hand-authored SVGs under `/assets` (4 step-type icons, 2 illustrations), consumed via `app/components/icons/`.
- **BL-022 — Design system applied to both screens.** `LessonPlayer` migrated off its own accent-class map onto the shared primitives.
- **BL-023 — Explicit voice-answer mode.** Web Speech API for short-answer questions, with a visible "listening" state and a visible fallback on unsupported browsers.
- **BL-024 — Immediate feedback + retry.** `explanation` field on questions; correct/incorrect feedback with a working "Try again."
- **BL-025 — Live demo kept current.** Rebuilt and redeployed; verified live via direct interaction (retry flow, feedback, voice button, no console errors).

**Stop condition reached.** A significantly improved visual lesson experience is live at https://divx-ips-resistance-acoustic.trycloudflare.com. Stopping here for Product review before Sprint 4.
