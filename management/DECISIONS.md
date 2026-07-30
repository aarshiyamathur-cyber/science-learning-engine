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
