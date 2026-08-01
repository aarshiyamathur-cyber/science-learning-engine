# AI Handoff Protocol

This file is the single handoff point between Product, Claude Code and OpenClaw.

## Before starting any work session

Read, in order: `management/INBOX.md` (Product Owner directives), `management/CURRENT_SPRINT.md`, `management/DASHBOARD.md`, `management/DECISIONS.md`.

## Operating model (delegation-first)

Claude Code is Engineering Manager / Technical Lead, not sole implementer. OpenClaw is the engineering workforce. Target: **70% of implementation work delegated to OpenClaw** for implementation-heavy sprints (see `management/WORKER_DASHBOARD.md` for the Automation Ratio and why it may fall short — e.g. an unresolved delegation-reliability issue, or a network outage blocking delegation entirely).

## Claude Code Checklist

1. Read `management/INBOX.md`, then `CURRENT_SPRINT.md`.
2. Break work into engineering tasks; record each in `management/TASK_LEDGER.md`.
3. Delegate as much implementation as can reasonably and reliably go to OpenClaw workers. Implement directly only what can't be delegated (or where delegation is currently unreliable/unavailable — record why in `management/WORKER_DASHBOARD.md`, don't just silently do it yourself).
4. Review every OpenClaw contribution before integration.
5. Merge accepted work.
6. Update `management/DASHBOARD.md`, `management/LIVE_FACTORY.md`, and `management/WORKER_DASHBOARD.md` continuously — not just at sprint end.
7. Record architecture/product decisions in `management/DECISIONS.md`.
8. Write `management/OUTBOX.md` at the end of the work cycle (completed / in progress / risks / questions for Product / recommended next action).
9. Stop and wait for Product review.

## OpenClaw Checklist

- Execute assigned tasks only.
- Commit code.
- Write tests.
- Report failures back to Claude.
- Do not change sprint scope.
