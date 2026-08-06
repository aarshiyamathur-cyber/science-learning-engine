# Agent Responsibilities

Roles are capabilities, not named tools. One person or system may perform multiple roles only when review independence is preserved.

| Role             | Responsibilities                                                                    | Not mandatory because                                                              |
| ---------------- | ----------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| Product Owner    | Owns charter, roadmap priority, acceptance criteria, and curriculum approval        | Any authorized product representative can supply this role                         |
| Engineering Lead | Owns technical direction, task boundaries, ADRs, and delivery quality               | Another qualified engineer can fulfil it                                           |
| OpenClaw         | Optional orchestration: dispatches bounded workers and records handoffs             | Work can run through any orchestrator or manually                                  |
| Aider            | Optional interactive editor for scoped branch changes                               | Any compatible editor/agent can modify code                                        |
| CI               | Runs deterministic automated checks on every PR                                     | The implementation may use any CI runner that executes the contract                |
| GitHub Actions   | Current preferred GitHub-native CI/CD implementation                                | Another GitHub-integrated runner may replace it without changing delivery workflow |
| QA               | Independently verifies acceptance, regressions, accessibility, and release evidence | Human or automated QA can execute the same evidence-based checklist                |

Agents receive the task, relevant repository context, a branch/worktree, and the portable execution contract in `AI_ENGINEERING_PLATFORM.md`. They return commits, command results, unresolved risks, and PR-ready summaries. They do not become hidden sources of truth.
