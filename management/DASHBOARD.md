# AI Factory Dashboard

_Last updated: 2026-07-31 by Claude Code_

## Current Sprint

Sprint 1 — curriculum & learning engine foundation

## Status

🟡 In Progress

## Product

- [x] Sprint defined (`management/CURRENT_SPRINT.md`)
- [ ] Review pending

## Engineering

- [x] In progress — backlog broken into BL-010..BL-014 (`docs/backlog/backlog.md`); BL-010 delegated to a headless Claude Code worker

## OpenClaw

- [x] Working — gateway healthy, Telegram notifications live, SSH deploy key push confirmed, continuous cron job running every 2h on branch `openclaw/aarshiya-auto`

## Blockers

None currently. Historical: local Ollama models (llama3/qwen2.5:3b) proved too small/unreliable for the orchestration role once given a full tool-calling environment — the cron job now shells out directly to Claude Code instead of routing through a local-model decision step.

## Next Decision

Scoring model for the progression engine (BL-014) needs Product Owner input before that item can be implemented — see `docs/backlog/backlog.md`.
