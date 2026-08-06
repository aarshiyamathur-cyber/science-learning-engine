# AI Engineering Platform Architecture

## Purpose

The platform delivers roadmap work through GitHub while allowing the AI model, agent runner, and code editor to change independently. A model is a replaceable compute provider, not an architectural dependency.

## Separation of responsibilities

| Layer                     | Owns                                                                   | Must not own                                              |
| ------------------------- | ---------------------------------------------------------------------- | --------------------------------------------------------- |
| Product Ownership         | Charter, roadmap priority, acceptance criteria, curriculum approval    | Implementation decisions or direct production changes     |
| Engineering Orchestration | Task decomposition, branch/worktree coordination, handoff and recovery | Product priority or vendor-specific workflow rules        |
| AI Model                  | Reasoning/generation requested by an agent                             | Source-of-truth state, credentials, merge authority       |
| Code Editing              | Constrained modifications in a task branch                             | Approval, QA sign-off, direct merge to protected branches |
| CI/CD                     | Repeatable checks, build artifacts, deployment policy                  | Interpreting product intent                               |
| QA                        | Independent acceptance, regression, accessibility and release evidence | Rewriting scope without a tracked task                    |

## Portable execution contract

Every agent implementation follows the same contract:

1. Read the charter, roadmap item, applicable ADRs, and local `AGENTS.md` files.
2. Work in an isolated task branch or registered worktree.
3. Keep changes scoped to the tracked task.
4. Run `engineering/scripts/review.ps1` and attach results to the pull request.
5. Create a draft pull request; a separate reviewer or CI supplies merge evidence.

Only configuration selects the model/provider. Prompts, task records, scripts, Git commands, checks, and pull-request workflow stay unchanged when a provider changes.

## Configuration boundary

Store non-secret defaults in checked-in configuration or documented environment variables; store API tokens only in local secret stores or GitHub Actions secrets. Provider selection must be expressed through variables such as `AI_PROVIDER`, `AI_MODEL`, and provider endpoint/profile settings. Workflows must never branch on a provider name.

```
Product charter / roadmap
          |
Engineering orchestrator ---- task branch / worktree ---- Code editor
          |                                               |
          +---- configured AI model                        v
                  (local or cloud)                     Git commits
                                                            |
QA <---------------- CI/CD <------------------------ Draft pull request
                                                            |
                                                       Human-approved merge
```

## GitHub as source of truth

GitHub holds canonical branches, commits, pull requests, reviews, Actions outcomes, releases, and issue/task links. Local management files may assist planning but never replace the GitHub record. No agent may merge its own work unless repository policy explicitly grants that authority.

## Guardrails

- Curriculum files and learner-facing changes require a task whose acceptance criteria explicitly authorize them.
- CI/CD and QA must be callable without a particular agent or model installed.
- AI output is untrusted until type checks, tests, review, and acceptance checks pass.
- A failed model, worker, or worktree is recoverable from the branch, task record, and PR—not conversational memory.
