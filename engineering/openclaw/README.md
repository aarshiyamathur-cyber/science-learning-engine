# OpenClaw Orchestration

OpenClaw is an optional orchestration implementation. Its worker roles and recovery procedures are portable to any scheduler or human-led coordination.

## Worker roles

- **Orchestrator:** reads approved work, creates bounded assignments, tracks completion and recovery.
- **Implementer:** changes only the assigned paths and reports tests/results.
- **Reviewer/QA:** independently checks task acceptance and regression risk.
- **Release steward:** verifies CI/PR evidence; does not silently merge work.

## Worktree strategy

Use one registered Git worktree per active task and keep the task branch unique. Do not share a writable worktree between workers. Each worker records branch, task ID, allowed paths, commands run, and handoff status in GitHub. Remove a worktree only after its branch/PR state is preserved.

## Nightly execution

1. Select only roadmap items pre-authorized for unattended work.
2. Create task branches/worktrees and dispatch bounded implementer jobs.
3. Run `review.ps1`, collect outcomes, and open draft PRs.
4. Queue failures and ambiguities for the next human or Engineering Lead review.
5. Never auto-merge or expand scope overnight.

## Failure recovery

On timeout, failed validation, deleted workspace, or model outage: stop the affected worker; keep the branch; capture logs and changed files in the task/PR; recreate a clean registered worktree from the branch; then reassign using the same task contract. If scope is unclear, return it to Product Ownership or Engineering Lead rather than guessing.
