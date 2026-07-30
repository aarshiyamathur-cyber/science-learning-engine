# Architecture Decision Records

One file per significant technical decision, numbered sequentially. Never delete or renumber an ADR — if a decision is reversed, add a new ADR that supersedes it and mark the old one's status accordingly.

## Template

```markdown
# ADR NNNN — Title

- **Date:** YYYY-MM-DD
- **Status:** Proposed | Accepted | Superseded by ADR NNNN

## Decision

What was decided.

## Reason

Why — the constraint, goal, or trade-off that drove it.

## Alternatives considered

What else was on the table and why it was rejected.

## Impact

What this makes easier, harder, or forecloses.
```

## Index

| ADR                                                | Title                                         |
| -------------------------------------------------- | --------------------------------------------- |
| [0001](0001-initial-tech-stack.md)                 | Initial technology stack                      |
| [0002](0002-npm-workspaces-for-packages.md)        | npm workspaces for `/packages` and `/workers` |
| [0003](0003-curriculum-as-yaml-plus-zod.md)        | Curriculum as YAML data validated by Zod      |
| [0004](0004-defer-sqlite-persistence.md)           | Defer SQLite persistence to Sprint 1          |
| [0005](0005-local-ollama-as-default-ai-backend.md) | Local Ollama (llama3) as default AI backend   |
