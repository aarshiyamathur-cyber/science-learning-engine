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
Resolved — root cause confirmed network, not the pipeline itself

**Reason**
The worker's own log showed `API Error: Response stalled mid-stream` on an earlier, shorter failed attempt at the same task — the most likely explanation was a network-level stall (this machine also independently lost IPv4 connectivity around the same period, tracked in `management/DASHBOARD.md`) that the underlying Claude Code process didn't recover from or time out on cleanly.

**Resolution:** the network issue was later identified as TPG blocking this specific Windows device (likely MAC-level — a MacBook on the same network was unaffected). Once that cleared (confirmed via mobile hotspot as a workaround, then again once the block itself lifted), a subsequent delegation attempt (BL-020, Sprint 3) correctly enforced its `--no-output-timeout-seconds` and stopped cleanly after 10 minutes of genuine silence — the timeout mechanism itself was never broken, it just couldn't fire correctly while the network layer was hung. That same BL-020 run, once given a healthy network, completed successfully: a full design-token system + 4 tested UI primitives + an ADR, reviewed and merged by Claude Code. First successful OpenClaw delegation this project has had — see `management/WORKER_DASHBOARD.md` and `management/TASK_LEDGER.md`.

**Impact**
The OpenClaw delegation pipeline can now be trusted for real implementation work when the network is healthy. Still worth keeping an eye on: `--no-output-timeout-seconds` (600s) may be too tight for substantial tasks in `--print` mode, which doesn't stream intermediate progress — a legitimately time-consuming task can look identical to a hang until it either finishes or times out. Consider raising it (e.g. to 1200–1800s) rather than treating every no-output timeout as a real failure.
