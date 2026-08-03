# Worker Dashboard

_Last updated: 2026-08-03 by Claude Code_

Tracking starts with Sprint 2 (the delegation-first directive was introduced mid-Sprint-2).

## Two worktrees, both dedicated to curriculum (as of 2026-08-03)

Per the 2026-08-03 Product Owner directive, both managed worktrees are now dedicated exclusively to the Science Learning Engine — no infrastructure/workflow/dashboard work in either without explicit approval:

- **Worktree 1 — `openclaw/aarshiya-auto` (agent `aarshiya-dev`) — Curriculum Development.** Sprint 6 (Atomic Structure) close-out, then Sprint 7 (Periodic Table).
- **Worktree 2 — `openclaw/command-centre` — Curriculum Enhancement** (repurposed from the now-superseded Product Command Centre initiative). Grows question banks and improves existing shipped lessons (Matter, Particle Model, States of Matter); supports Worktree 1 where required.

Dispatch mechanism for both: a task-specific prompt file under `~/.openclaw/`, run as a headless Claude Code worker (`claude --permission-mode bypassPermissions --print`) directly in the target worktree directory on its existing branch — the same mechanism established in DEC-002/DEC-003, proven reliable across BL-020, BL-028, BL-031–033, BL-040–041, and CC-001–004. Both worktrees are scoped to touch disjoint files (new topic files vs. existing assessment files) to avoid conflicts, per Claude's coordination responsibility.

## Former: two parallel initiatives (2026-08-01 to 2026-08-03, superseded)

A second Product Owner directive launched the **Product Command Centre** (see `management/COMMAND_CENTRE.md`) while Sprint 5 (Matter topic) was still in flight. Rather than queue it behind Sprint 5, a second OpenClaw managed worktree (`openclaw/command-centre`) was created so both initiatives' delegated tasks run in genuinely parallel worktrees — each worktree is still one-task-at-a-time internally, but the two worktrees don't block each other. **This worktree has since been repurposed to Curriculum Enhancement (2026-08-03) — see above.**

## Sprint 5 — CLOSED ("Complete the Matter topic")

| Metric                      | Value                                                            |
| ---------------------------- | ----------------------------------------------------------------- |
| Number of Tasks              | 7 (BL-030–BL-036)                                                  |
| Delegated Tasks              | 3 (BL-031, BL-032, BL-033) — all 3 succeeded                       |
| Tasks Completed by OpenClaw  | 3 (BL-031 Particle Model lesson, BL-032 States of Matter lesson written from scratch, BL-033 illustrations) |
| Tasks Completed by Claude    | 4 (BL-030 hint field/UI, BL-034 topic navigation, BL-035 UI/mobile polish, BL-036 final QA — found and fixed 2 real bugs) |
| Sprint Automation Ratio      | 3 / 7 ≈ 43% (by task count) — all 3 delegated tasks succeeded on the first attempt, zero conflicts each time |

Sprint 5 leaned harder into delegation than any previous sprint: the two real content gaps (finishing the Particle Model lesson, writing States of Matter from scratch) and new illustrations were all standalone, self-contained file additions — the exact shape that delegates cleanly, and all 3 merged with **zero conflicts**. Claude did the schema/architecture work (BL-030), the multi-lesson navigation (BL-034, touches the shared app shell), and final QA (BL-035/036) directly, per the directive's "Claude reviews/integrates/maintains architecture" instruction — and that QA pass earned its keep, catching a real stale-lock-state bug and a real silent-server-crash bug that no automated check surfaced.

## Product Command Centre (in progress — see `management/COMMAND_CENTRE.md`)

| Metric                      | Value                                                            |
| ---------------------------- | ----------------------------------------------------------------- |
| Number of Tasks              | 6 (CC-001–CC-006)                                                  |
| Delegated Tasks              | 5 planned (CC-001 through CC-005) — 4 dispatched so far            |
| Tasks Completed by OpenClaw  | 3 (CC-001 framework/nav/routing, CC-002 Executive Dashboard/Roadmap/Progress cards, CC-003 Sprint History/Release Centre/Question Bank) |
| Tasks Completed by Claude    | 0 direct implementation (CC-006 deployment not started yet); 1 integration fix applied during CC-002 review (sample-data disclosure banner) |
| Tasks In Progress            | 1 (CC-004 — Engineering Dashboard + real repository reader, dispatched to OpenClaw) |
| Current Automation Ratio     | 3 / 3 completed tasks so far = 100% OpenClaw-authored, all zero-conflict merges |

This is an explicit 80%-automation-target initiative per its directive — heavier delegation than Sprint 5 even, and tracking well ahead of that target so far. CC-004 (the one page reading real data instead of sample data) is in flight; CC-005 (visual polish) and CC-006 (deployment) remain.

## Sprint 4 (closed — superseded by Sprint 5 directive)

| Metric                      | Value                                             |
| ---------------------------- | -------------------------------------------------- |
| Number of Tasks              | 4 (BL-026–BL-029)                                  |
| Delegated Tasks              | 1 (BL-028 — succeeded, zero merge conflicts)       |
| Tasks Completed by OpenClaw  | 1 (BL-028 — Atom Builder)                          |
| Tasks Completed by Claude    | 2 (BL-026 — interactive step type, BL-027 — Particle State Explorer) |
| Tasks Not Started            | 1 (BL-029 — Force Simulator)                       |
| Tasks Waiting Review         | 0                                                  |
| Idle Workers                 | 1 (`aarshiya-dev`)                                 |
| Busy Workers                 | 0                                                  |

BL-026 and BL-027 were built directly rather than delegated because they were being developed in tight sequence with each other (the widget registry pattern in BL-026 had to exist before BL-027 could wire into it, and both landed in the same lesson content file) while BL-028 ran as a fully independent, standalone-scoped delegation in parallel — the same "independent and well-scoped vs. tightly sequential" split identified in Sprint 3. This is the second successful OpenClaw delegation the project has had, and it merged into `master` with **zero conflicts**, validating the conflict-avoidance strategy (loose string `widget` id instead of a shared enum, delegated worker kept out of `LessonPlayer.tsx`).

## Sprint 3 (closed — stop condition reached)

| Metric                      | Value                                      |
| --------------------------- | ------------------------------------------ |
| Number of Tasks             | 6 (BL-020–BL-025)                          |
| Delegated Tasks             | 1 (BL-020 — succeeded)                     |
| Tasks Completed by OpenClaw | 1 (BL-020)                                 |
| Tasks Completed by Claude   | 5 (BL-021, BL-022, BL-023, BL-024, BL-025) |
| Tasks Waiting Review        | 0                                          |
| Idle Workers                | 1 (`aarshiya-dev`)                         |
| Busy Workers                | 0                                          |

BL-021–BL-025 were built directly rather than delegated: BL-021 (assets) and BL-022–024 (interaction/voice/feedback logic touching the same files as each other in sequence) had real merge-conflict risk if split across a slow-turnaround delegation cycle while the sprint was actively moving; BL-025 (redeploy) is inherently a local action (rebuild + restart this machine's server). None of these were "delegation failed" — they were judgment calls about what's practical to hand off mid-flow versus what benefits from staying in one hand until the sprint's core loop (design system → assets → applying both → interaction/feedback) is coherent.

## Sprint 2 (closed)

| Metric                      | Value                                     |
| --------------------------- | ----------------------------------------- |
| Number of Tasks             | 6 (BL-010, BL-015–BL-019)                 |
| Delegated Tasks             | 1 (BL-010 — hung 27h, finished by Claude) |
| Tasks Completed by OpenClaw | 0                                         |
| Tasks Completed by Claude   | 6                                         |

## Automation Ratio (cumulative, project-wide, tracked from Sprint 2 onward)

```
Automation Ratio = Tasks completed by OpenClaw / Total implementation tasks
                  = 8 / 31
                  = ~25.8%
```

(Counts every completed BL-/CC- task project-wide, both initiatives, through the close of Sprint 5 and CC-003.)

Target per the engineering operating model: **70%** for implementation-heavy sprints (the Command Centre initiative has its own separate, higher 80% target, currently running at 100% — see above). Trending up consistently — eight successful delegations now (BL-020, BL-028, BL-031, BL-032, BL-033, CC-001, CC-002, CC-003), every single one a zero-conflict merge. The pattern holds: delegation succeeds cleanly when a task can be scoped to its own new file(s) with no shared central file touched; it's still impractical for tasks in a tight sequential chain with active work on the same files (BL-026/BL-027, BL-034 here). This is exactly why the Command Centre's page-content tasks (CC-002 through CC-005) are scoped as separate route/page additions rather than one big shared-file change — and why that initiative alone is running at 100% so far.

## Workers

| Worker                     | Type                                                               | State  | Notes                                                                                  |
| -------------------------- | ------------------------------------------------------------------ | ------ | -------------------------------------------------------------------------------------- |
| aarshiya-dev               | OpenClaw local agent (deterministic script → headless Claude Code) | Idle   | Available for the next well-scoped, independent task (e.g. BL-029 Force Simulator)     |
| Claude Code (this session) | Direct implementation + review                                     | Active | Sprint 4 BL-026/027/028 merged and verified live; BL-029 not started; stop condition reached, awaiting Product review |
