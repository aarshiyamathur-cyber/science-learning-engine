# Project Decisions

## DEC-001

**Decision**
The learning engine will be curriculum agnostic.

**Status**
Accepted

**Reason**
Curriculum content should be packaged separately from the learning engine so additional subjects and curricula can be added without changing core code.

## DEC-002

**Decision**
The OpenClaw continuous dev cron job shells out directly to a headless Claude Code worker (`claude --permission-mode bypassPermissions --print`) instead of routing the "check backlog, decide what to do" step through a local Ollama model.

**Status**
Accepted

**Reason**
Local models (llama3:latest, then qwen2.5:3b) were tested as the orchestrator: llama3:latest doesn't support tool-calling in OpenClaw and overflowed context on even trivial prompts; qwen2.5:3b avoided the overflow but was unreliable once given a full tool-calling environment (issued unprompted tool calls instead of following simple instructions) and too slow for this hardware. Since the actual coding intelligence was always delegated to Claude Code, the local-model decision step added risk without adding value — a deterministic script check is more reliable for the "is there pending backlog work" judgment.

## DEC-003

**Decision**
Known open reliability issue: a headless Claude Code worker (spawned by the OpenClaw cron job for BL-010) hung for over 27 hours before an outer "job execution timed out" safeguard killed it, well past the configured 30-minute `--timeout-seconds`. The partial work it produced (untested, uncommitted) was picked up and finished directly by Claude Code rather than re-running the same delegation and risking another multi-hour hang.

**Status**
Open — logged as a known issue, not yet root-caused

**Reason**
The worker's own log showed `API Error: Response stalled mid-stream` on an earlier, shorter failed attempt at the same task — the most likely explanation is a network-level stall (this machine also independently lost IPv4 connectivity around the same period, tracked separately in `management/DASHBOARD.md`) that the underlying Claude Code process didn't recover from or time out on cleanly. OpenClaw's own `--timeout-seconds` / `--no-output-timeout-seconds` cron options did not enforce the configured limit in this case.

**Impact**
Until root-caused, the OpenClaw delegation pipeline (`management/WORKER_DASHBOARD.md`) should be treated as unreliable for long-running implementation tasks — expect to finish or restart hung work manually rather than trust the configured timeouts to fire.
