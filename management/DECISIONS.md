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

## DEC-004

**Decision**
BL-028 (Atom Builder widget) was built and shipped as a standalone, reusable component (`app/components/widgets/AtomBuilder.tsx`) without wiring it into the existing "Matter" lesson, and uses a simplified 2/8/remainder electron-shell model rather than real quantum mechanics.

**Status**
Accepted

**Reason**
The "Matter" lesson (BL-019) is about states of matter/particle behavior, not atomic structure — inserting an Atom Builder step there would be topically incoherent, not a genuine interactive enhancement of that content. BL-028's own acceptance criteria only require a standalone reusable component that works with no lesson-specific data; real lesson integration is BL-026's job (the interactive step type) plus whichever future atomic-structure lesson actually needs it. The 2/8/remainder shell model (rather than full quantum orbital theory) matches the Year 7-10 target audience and mirrors the same "simplify for pedagogy, not full physical accuracy" precedent already set by the Particle State Explorer (BL-027) and the existing states-of-matter illustration.

**Impact**
Future lessons can adopt Atom Builder via BL-026's interactive step type with zero component changes. If a "structure of the atom" concept/lesson is authored later, it should link to this widget rather than building a new one.

## DEC-005

**Decision**
Created a second OpenClaw managed worktree (`openclaw/command-centre`) so the new Product Command Centre initiative can be delegated in parallel with the still-in-flight Sprint 5 (Matter topic) delegations, instead of queuing behind them in the existing `openclaw/aarshiya-auto` worktree.

**Status**
Accepted

**Reason**
Sprint 5 has an explicit "ready for Aarshiya tomorrow morning" deadline; Command Centre does not. The two initiatives touch entirely disjoint files (curriculum content + the existing app vs. a brand-new `apps/command-centre` app), so there's no technical reason to force them through one serial queue. A single worktree can only run one delegation at a time safely — see the project history of stale/divergent commits from overlapping worktree state — but two separate worktrees can run genuinely concurrently. See [ADR 0008](../docs/decisions/0008-parallel-openclaw-worktrees.md) for the full reasoning.

**Impact**
Both `openclaw/aarshiya-auto` and `openclaw/command-centre` are now active worktrees, each enforcing one-task-at-a-time internally. Future independent initiatives with no file overlap should follow the same pattern rather than assuming there's only one delegation lane.

## DEC-006

**Decision**
The button-based `AtomBuilder` widget (BL-028, reused as-is in BL-040's shipped Atomic Structure lesson) is accepted as the Version 1 interaction for atomic structure. It will not be replaced with a drag-and-drop particle-placement widget at this time.

**Status**
Accepted — Product Owner directive, 2026-08-03

**Reason**
The original Sprint 6 directive asked for "drag particles into place" / "place electrons into shells" as distinct interactions, which the +/- button model doesn't literally satisfy (flagged as an open question in `management/ROADMAP.md`). Product Owner reviewed the gap and accepted the existing widget rather than authorising a new reusable component of `ParticleStateExplorer`/`AtomBuilder` scope, prioritising curriculum throughput over building a second atom-interaction widget.

**Impact**
Drag-and-drop particle/electron placement is recorded as a future enhancement, not scheduled. Do not build it without explicit Product Owner approval. Sprint 6's interaction-mechanic open question in `management/ROADMAP.md` is now resolved.

## DEC-007

**Decision**
No separate "Question Bank" engineering project is authorised. Reusable questions (concept, difficulty, correct answer, explanation, hint, curriculum reference) continue to be produced as a normal by-product of each lesson's assessment authoring — the standing practice since BL-030 — rather than as a dedicated initiative.

**Status**
Accepted — Product Owner directive, 2026-08-03

**Reason**
Sprint 6 was not to be paused to redesign or formalise the Question Bank as its own workstream. The bank already grows correctly through ordinary lesson development; a separate project would be infrastructure work competing with the 80/20 curriculum-first capacity split for no additional benefit.

**Impact**
`management/ROADMAP.md`'s "Question Bank policy" section stands as previously documented (every question ships with concept/difficulty/correct answer/explanation/hint/curriculum reference). No new backlog items should be created for a standalone Question Bank initiative; the Command Centre's Question Bank page remains sample-data-backed per its existing scope freeze.
