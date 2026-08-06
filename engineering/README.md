# Engineering Platform

This directory is the vendor-neutral operating layer for the Science Learning Engine. It turns the Product Charter and roadmap into reviewable GitHub work without making any individual AI model, agent, or editor a dependency.

Start with [AI_ENGINEERING_PLATFORM.md](AI_ENGINEERING_PLATFORM.md) for architecture, then choose an execution surface:

- [aider/](aider/) for terminal-based code editing.
- [openclaw/](openclaw/) for delegated worker orchestration.
- [WORKFLOWS.md](WORKFLOWS.md) for the standard delivery paths.

The product charter, roadmap, ADRs, and approved curriculum remain authoritative. This platform does not replace them or own curriculum content.

## Quick start

```powershell
.\engineering\scripts\create-task.ps1 -TaskId "BL-123" -Title "short task title"
.\engineering\scripts\review.ps1
.\engineering\scripts\prepare-pr.ps1
```

Use a task branch and open a draft pull request. GitHub is the system of record for commits, review, CI results, and merge history.
