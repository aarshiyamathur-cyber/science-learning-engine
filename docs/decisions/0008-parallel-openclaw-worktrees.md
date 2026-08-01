# ADR 0008 — Multiple OpenClaw managed worktrees for parallel delegation streams

- **Date:** 2026-08-01
- **Status:** Accepted

## Decision

When a second, independent initiative (the Product Command Centre) needed OpenClaw delegation while the Matter-topic sprint's own delegations (BL-031/032/033) were still in flight, a second OpenClaw managed worktree was created (`openclaw worktrees create <repoRoot> --name command-centre --base-ref master`, branch `openclaw/command-centre`) rather than queuing the new work behind the existing one. Dispatch stays the same mechanism used throughout this project — a one-off `openclaw cron add ... --command "cd <worktree-path> && claude --permission-mode bypassPermissions --print <prompt>"` job — just pointed at whichever worktree path the task belongs to. The `aarshiya-dev` OpenClaw agent's own configured workspace is not what determines where a command-type job runs; the explicit `cd` in the shell command is, so no new agent had to be created.

## Reason

Each git worktree is a separate working directory with its own checked-out branch, so two headless Claude Code processes can run genuinely concurrently — one per worktree — without racing on the same files or git index. A single worktree only supports one delegation at a time (confirmed by the "Errors and fixes" history in this project: two overlapping attempts against one worktree previously produced stale, divergent commits that had to be reset away). Two independent initiatives (a curriculum-content sprint and a brand-new internal-tooling app) have zero file overlap by construction, so there's no reason to force them through the same serial queue.

## Alternatives considered

- **Queue Command Centre behind Sprint 5:** rejected for this situation specifically — Sprint 5 had an explicit "ready for Aarshiya tomorrow morning" deadline, and Command Centre is open-ended/no deadline, so serializing them would either delay the urgent one or stall the new one for no technical reason.
- **A second OpenClaw agent (`openclaw agents add`) instead of a second worktree:** rejected as unnecessary complexity — agents carry their own model/skills configuration, which matters when an agent is expected to reason interactively, but every delegation in this project already bypasses that entirely by shelling out straight to `claude --print` (see DEC-002). The thing that actually needs to be duplicated for parallelism is the working directory, not the agent identity.
- **One shared worktree, alternating tasks between the two initiatives:** rejected — this is just serial dispatch with extra bookkeeping; it doesn't achieve parallelism, only reordering.

## Impact

This pattern generalizes: any time two delegated initiatives have no file overlap and both want to make progress simultaneously, create another managed worktree (`openclaw worktrees create ... --name <slug>`) rather than assuming `openclaw/aarshiya-auto` is the only lane. Each worktree still enforces one-task-at-a-time internally (a task must land and be reviewed/merged before the next one starts in that worktree) — parallelism is across worktrees, not within one. Worktrees that are done with their initiative should eventually be cleaned up (`openclaw worktrees remove`) rather than left accumulating indefinitely.
