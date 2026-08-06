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
| CC-006 | Deploy Command Centre with its own public URL | Claude (deployment/infra, same pattern as the learning app's Cloudflare tunnel) | Done — `AarshiyaCommandCentreServer`/`AarshiyaCommandCentreTunnel` Scheduled Tasks, restart-on-failure, current URL in "Live URL" below |

CC-002 through CC-005 depend on CC-001 (framework/routing) landing first — dispatched sequentially within the `openclaw/command-centre` worktree once each prior task is reviewed and merged, same one-task-at-a-time constraint as the Matter-topic worktree.

## Automation Ratio (Command Centre only)

Tracked separately from the project-wide ratio in `management/WORKER_DASHBOARD.md`, since this initiative has its own explicit 80% target per the directive.

```
5 OpenClaw-delegated tasks (CC-001–CC-005) / 6 total tasks (CC-001–CC-006)
= ~83%
```

CC-006 (deployment/infra) was Claude's per the Engineering Operating Agreement's risk classification — deployment is always High Risk. Every content/UI task was delegated and merged with zero conflicts, comfortably clearing the 80% target.

## Status

**MVP complete.** All 6 tasks done and merged; live and deployed. Per the Engineering Operating Agreement (`management/OPERATING_AGREEMENT.md`), this completes step 1 of the agreed sequence. Continuing to step 3 (YAML task model).

## Live URL

https://cottage-toolbar-remedy-themes.trycloudflare.com (ephemeral Cloudflare quick tunnel, kept alive by a supervised Scheduled Task with restart-on-failure — see `scripts/deploy/start-command-centre-tunnel.ps1`. Stable as long as the underlying process doesn't crash or the machine doesn't restart; not a permanent address. A truly permanent URL needs a Cloudflare account + named tunnel on an owned domain, or a hosting platform account — both require the Sponsor to create an account, which this automation does not do.)
