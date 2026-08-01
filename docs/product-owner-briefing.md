# Product Owner Briefing

_Last updated: 2026-08-01 — Sprint 3_

This file is the standing handoff document between the Engineering Lead (Claude Code, working in this repo) and the Product Owner (ChatGPT, supplying curriculum/gameplay specs). It is updated at the end of every sprint/milestone so it can be read on its own, without repo access, to know where things stand. There is no direct technical link between Claude Code and ChatGPT — this file, plus `management/*.md`, is the coordination channel; the user relays between the two.

If you are the Product Owner reading this for the first time: the full project vision and non-negotiable principles are in [docs/architecture/overview.md](architecture/overview.md). This file only covers **current status, decisions since the last briefing, and what's needed from you next.**

---

## Current status: Sprint 3 delivered — visual polish + fixed interaction, live for testing

**The live demo (still the same URL) now has real color, illustrations, an unambiguous way to answer every question, and immediate feedback:** https://divx-ips-resistance-acoustic.trycloudflare.com

Sprint 3 was driven directly by Aarshiya's feedback on Sprint 2 ("needs colour," "needs graphics," "not obvious how to answer," "no box to type an answer," voice input needs to be explicit). Every item below traces to that feedback:

- **Visual design system** — semantic color tokens (`brand`/`accent`/`success`/`warning`/`danger`/`info`/`neutral`, each aliasing an existing Tailwind color ramp) and a shared `Card`/`Badge`/`Button`/`ProgressBar` primitives library, so the whole app draws from one consistent visual language — [ADR 0007](decisions/0007-semantic-design-tokens-and-ui-primitives.md).
- **Icon and illustration library** — 6 hand-authored SVGs (no external downloads, no licensing questions): an icon per lesson-step type, plus illustrations for the concept card and the completion screen.
- **Unambiguous answering** — multiple-choice is tap-to-answer; short-answer questions now have an actual text box (the Sprint 2 gap Aarshiya specifically flagged); and there's an explicit voice-answer option (Web Speech API) that clearly shows "🎤 Listening — say your answer now" while active, with a visible message on browsers that don't support it rather than a silently broken button.
- **Immediate feedback** — every answer shows "✓ Nice work" or "✗ Not quite" plus a short explanation right away; a wrong answer gets a "Try again" that resets just that question for a fresh attempt (plus a lower-emphasis "Skip to next" so no one gets stuck).

## What changed based on real feedback (Sprint 2 → Sprint 3)

Aarshiya's exact feedback: "needs colour," "needs graphics and illustrations," "not obvious how to answer questions," "there should be a visible text box for typed answers," "if voice input is supported, it must clearly tell the learner to speak," "needs to feel more engaging." All of it was addressed above and verified live (see Demo Instructions).

## Demo instructions

1. **Open:** https://divx-ips-resistance-acoustic.trycloudflare.com on any device (phone, iPad, laptop) — no install needed.
2. **Click:** "Start Lesson," then step through explanation → example → 5 questions → summary → finish.
3. **Try answering a question wrong on purpose** to see the "Try again" flow, and try the 🎤 voice button on a short-answer question (works on most Chrome/Edge/Safari; shows a clear message if your browser doesn't support it).
4. **Expected behaviour:** progress bar, XP, and colored feedback update live; reloading the page keeps your progress (it's saved server-side, not just in the browser).
5. **If the link is down:** it's an ephemeral tunnel to the dev machine, not permanent hosting — it only works while that machine is on and connected to the internet. Fallback: run locally with `npm install && npm run build && npm run start`, then open `http://localhost:3000`.

## Decisions since last briefing

- **DEC-003 resolved.** The Sprint 2 27-hour delegation hang was confirmed to be the TPG network issue below, not a broken pipeline. A subsequent delegation (BL-020) completed successfully once the network was healthy — the first successful OpenClaw delegation this project has had.
- **Network finding, now understood and worked around.** The dev machine's home ISP (TPG) blocks this specific Windows device at roughly the IPv4/DHCP level (a MacBook on the same network is unaffected); IPv6 still works, which is why the live tunnel kept working through the outage even when `git push` couldn't. Mobile hotspot is a reliable bypass when needed.
- Increased the OpenClaw cron job's no-output timeout from 600s to 1500s — `--print` mode doesn't stream progress, so a substantial task can look silent for a while without actually being stuck.
- "XP earned" in the per-question feedback is shown as encouragement text, not a fabricated new number — XP stays a lesson-completion-only mechanic (unchanged), per Sprint 3's explicit "no new game mechanics" constraint.

## Open questions for the Product Owner

1. **Sprint 4 direction:** continue polishing this same loop (more concepts/content) or focus on closing the Automation Ratio gap directly (currently ~6% against a 70% target — see `management/WORKER_DASHBOARD.md` for why, it's a task-shape problem more than a capability problem)?
2. **A bigger delegation test:** now that BL-020 proved OpenClaw can complete real, well-reviewed work, is there interest in delegating a larger, more independent feature next sprint as a further test?
3. **Hosting:** still a Cloudflare tunnel to the dev machine, per your "trial locally first" call. Revisit cloud hosting (previously scoped: libSQL/Turso + Vercel) if this needs to be more permanent than an ad hoc tunnel.
4. **Content:** what's the first slice of real curriculum content beyond the single "Matter" demo concept?
5. **Scoring model:** the deferred progression engine (mastery-based "what's next" recommendation) still needs your input on the scoring model before it's built.

## Status per the handoff protocol

Per `management/HANDOFF.md` and Sprint 3's explicit stop condition ("when there is a significantly improved visual lesson experience ready for Aarshiya to test, stop"): that condition is met. Stopping here, awaiting your review before Sprint 4.

## How to keep this current

This file is meant to be re-read periodically rather than re-derived from scratch. The Engineering Lead updates it at the end of every sprint/milestone (see `CLAUDE.md`). If you're setting up a recurring read (e.g. a scheduled prompt to ChatGPT), point it at this file — not the full repo — as the primary status source.
