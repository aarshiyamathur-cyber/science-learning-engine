# Product Command Centre

_Started 2026-08-01. This is a separate, ongoing initiative from the Matter-topic sprint (`management/CURRENT_SPRINT.md`) — tracked in its own file since it will become a permanent piece of infrastructure, not a one-off sprint deliverable._

## Directive

Product Owner directive (2026-08-01): build a "Product Command Centre" — an internal dashboard for the Product Owner and Engineering Lead — almost entirely via OpenClaw delegation. Claude's role is explicitly limited to architecture, task decomposition, delegation, code review, integration, QA, and merge management — not primary implementation. Target: 80%+ of implementation commits originate from OpenClaw.

## Architecture decisions

- **Location:** `apps/command-centre/`, a new member of the existing npm workspace (`workspaces` in root `package.json` now includes `"apps/*"`). Same repo, same git history, but a fully independent Next.js app — its own `package.json`, own port (3001, vs. the learning app's 3000), own deploy target.
- **Why same-repo over a new repo:** avoids re-doing deploy-key/tooling/CI setup from scratch; one git history keeps Command Centre commits visible alongside the work they're reporting on.
- **Parallel delegation:** OpenClaw only has one worktree/branch by default (`openclaw/aarshiya-auto`, used for the Matter-topic sprint). A second managed worktree was created — `openclaw/command-centre` — so Command Centre tasks can run genuinely in parallel with Matter-topic tasks instead of queuing behind them. Both are dispatched via the same mechanism (a one-off `openclaw cron add ... --command "cd <worktree> && claude --print ..."` job per task), just pointed at different worktree paths.

## Page inventory (from the directive)

| Page | Route | Owner (planned) |
| --- | --- | --- |
| Executive Dashboard | `/` | Worker 2 |
| Roadmap | `/roadmap` | Worker 2 |
| Progress cards | (part of Executive Dashboard) | Worker 2 |
| Sprint History | `/sprint-history` | Worker 3 |
| Release Centre | `/release-centre` | Worker 3 |
| Question Bank dashboard | `/question-bank` | Worker 3 |
| Engineering Dashboard | `/engineering` | Worker 4 |
| Repository readers / metrics / automation statistics | (data layer for Engineering Dashboard) | Worker 4 |
| Visual design, charts, responsive layout | (cross-cutting polish) | Worker 5 |

## Task tracker

| Task  | Description                              | Owner    | Status     |
| ----- | ----------------------------------------- | -------- | ---------- |
| CC-001 | Framework, navigation, routing scaffold  | OpenClaw (Worker 1) | Done — merged |
| CC-002 | Executive Dashboard + Roadmap + Progress cards | OpenClaw (Worker 2) | Done — merged (typed sample-data layer, "sample data" disclosure added by Claude on review) |
| CC-003 | Sprint History + Release Centre + Question Bank dashboard | OpenClaw (Worker 3) | Done — merged |
| CC-004 | Engineering Dashboard + repository readers + metrics/automation stats | OpenClaw (Worker 4) | Done — merged |
| CC-005 | Visual design, charts, responsive layout polish | OpenClaw (Worker 5) | Done — merged |
| CC-006 | Deploy Command Centre with its own public URL | Claude (deployment/infra, same pattern as the learning app's Cloudflare tunnel) | Not started |

CC-002 through CC-005 depend on CC-001 (framework/routing) landing first — dispatched sequentially within the `openclaw/command-centre` worktree once each prior task is reviewed and merged, same one-task-at-a-time constraint as the Matter-topic worktree.

## Automation Ratio (Command Centre only)

Tracked separately from the project-wide ratio in `management/WORKER_DASHBOARD.md`, since this initiative has its own explicit 80% target per the directive. Will be reported as `<OpenClaw-authored commits> / <total Command Centre commits>` once there's more than the initial scaffold to measure.

## Status

In progress — CC-001 dispatched, awaiting completion.
