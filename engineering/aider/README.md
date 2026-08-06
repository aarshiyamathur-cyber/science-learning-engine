# Aider Integration

Aider is an optional code-editing surface. It operates under the platform contract; it does not own task selection, review, or merges.

## Recommended configuration

- Start Aider from a dedicated task branch or registered worktree.
- Select the provider and model through Aider's normal configuration/environment, not hardcoded prompts.
- Keep API keys in the OS secret store or environment; never commit them.
- Use the repository test command and the review script as the verification contract.
- Ask Aider to read the charter, roadmap task, ADRs, and applicable `AGENTS.md` before editing.

## Startup

```powershell
git switch agent/<task>
aider
```

Provide the task ID, acceptance criteria, allowed paths, and the command:

```powershell
.\engineering\scripts\review.ps1
```

## Repository conventions and best practices

- Make small, logically separable commits.
- Do not modify curriculum or learner UI unless the task authorizes it.
- Prefer existing packages and schemas over duplicate logic.
- Run tests after every meaningful edit; run the full review script before a PR.
- Never bypass GitHub review, CI, or protected-branch rules.
