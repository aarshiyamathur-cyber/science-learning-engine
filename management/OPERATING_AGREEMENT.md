# Engineering Operating Agreement

_Adopted 2026-08-01. Supersedes prior informal "delegation-first" guidance in `management/INBOX.md`'s earlier directives — this is now the standing model until formally revised._

## Why this exists

The project reached a point where continuous, open-ended Claude involvement was blocking the Sponsor's other work. The fix is **usage management, not role replacement** — OpenClaw's execution engine is headless Claude Code, so simply relabeling "Claude" as "OpenClaw" doesn't reduce Claude Code usage; it just hides where it's being spent. This agreement makes usage a first-class, budgeted, measured thing instead.

## Roles

| Role | Who |
| --- | --- |
| Sponsor | Sudeep |
| Product Owner | Alex (ChatGPT) |
| Engineering Lead | Claude |
| Engineering Execution | OpenClaw |
| End User | Aarshiya |

## Project goal

Deliver a complete, engaging NSW Year 9 Science learning experience for Aarshiya, one high-quality topic at a time. The roadmap is frozen — no startup-style scope expansion, no architecture rewrites for their own sake.

## Tiered execution model

- **Tier 0 — Deterministic scripts.** No model involved. Use wherever possible (builds, validation, dashboard generation, syncing).
- **Tier 1 — Local execution (Ollama / deterministic local tooling).** Only for well-defined, low-risk, mechanical work. Treated as an optimisation, not a dependency — this project already tried Ollama as a *decision-maker* (DEC-002) and it failed; Tier 1 is narrower than that: execution only, on fully-specified tasks, never judgment calls.
- **Tier 2 — Claude/OpenClaw engineering execution.** Feature implementation, content authoring. **Operates within a daily Execution Budget** set by the Sponsor. When exhausted, work queues for the next window rather than continuing to draw on it.
- **Tier 3 — Product Review.** No engineering work. Alex reviews completed work and approves progression to the next roadmap item.

**Claude's own review time counts toward the same daily Execution Budget as Tier 2 dispatch** — the budget measures total Claude Code footprint on this project, not just headless-worker time. This is deliberate: an unbudgeted review step could balloon into an open-ended session exactly like the one this agreement exists to prevent.

## Risk classification (review strategy)

Risk-based review, not review-every-change:

- **Low Risk** — illustrations, non-factual UI wording, documentation. May proceed automatically if automated checks pass.
- **Medium Risk** — lesson implementation, UI components, **and all curriculum content** (lessons, questions, hints, explanations). Queued for at least a spot-check review. Curriculum content is explicitly excluded from Low Risk regardless of how mechanical it looks: automated checks (`validate:curriculum`, typecheck, lint) verify schema shape, not scientific accuracy, reading level, or whether a hint accidentally gives away the answer — the one place static checks have a proven, unclosed gap in this project.
- **High Risk** — architecture, shared components, schemas, build system, deployment, infrastructure. Always requires Claude review, regardless of tier or whether checks pass.

## Execution Budget (not a "Claude Budget")

There is no programmatic access to real Claude Code usage/quota data from within this project — no API call can report "% of daily usage consumed." The Engineering Dashboard's budget panel therefore reports a **measurable proxy**, not fabricated precision:

- Tasks dispatched today (count)
- Cumulative wall-clock minutes of headless execution today
- Sponsor-set daily cap (dispatch count and/or minutes)
- Tasks currently queued
- Next scheduled review window

## Structured task model

Reuses the project's existing, proven pattern (Zod schema + YAML + a validation script — see `@aarshiya/curriculum-schema` and ADR 0003) rather than inventing new tooling:

- `management/tasks/*.yaml` — one task per file: `id`, `title`, `tier`, `risk`, `status`, `depends_on`, `files_touched`, `acceptance_criteria`, `notes` (free text for qualitative reasoning — not lost in the name of structure).
- A validation script in the same shape as `scripts/validate-curriculum.ts`.
- **Human-readable views (`TASK_LEDGER.md`, `backlog.md`) are generated from the YAML**, not hand-maintained in parallel. This closes the exact bug class found during CC-004's review: a hand-edited Markdown table silently lost its header row during an earlier merge and went undetected for a day.
- **Historical tasks (BL-001 through BL-036, CC-001 through CC-004) are not retroactively migrated.** Pure migration busywork has no product value; the existing Markdown record is frozen as the historical archive, and structured tracking starts fresh from the next task onward.

## Success metrics

Topics completed, curriculum coverage, Question Bank growth, Aarshiya's satisfaction, cycle time, Execution Budget utilisation. **Explicitly not** commit counts or who authored what — the Automation Ratio metric tracked in `management/WORKER_DASHBOARD.md` throughout this project is now a secondary/diagnostic figure, not a headline KPI.

## Current sequence (agreed 2026-08-01)

1. Complete the Product Command Centre MVP (CC-005 visual polish, CC-006 deployment).
2. Complete the Engineering Dashboard including the Execution Budget panel.
3. Introduce the YAML task model and validator.
4. Generate Markdown views from YAML.
5. Implement the risk-classification configuration.

**Stop after the MVP and wait for Product Review before beginning the next roadmap item** (i.e. before Sprint 6 / the next curriculum topic).
