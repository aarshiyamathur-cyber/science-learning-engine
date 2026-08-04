# AI Factory Dashboard

_Last updated: 2026-08-05 by Engineering Manager (Worktree 4)_

## Current Sprint

Sprint 15 — "Plate Tectonics" — **Definition of Done met 2026-08-05.** Sprint 14 (Genetics & Reproduction) also shipped the same session — both were the first two sprints run end-to-end by the new Engineering Manager orchestration loop (DEC-014), with Claude out of the routine dispatch/merge loop. **Sprint 16 (The Solar System & Universe) is next and is the last row in `management/ROADMAP.md`'s table** — once it closes, Phase 1 completion must be assessed against the charter's actual success criteria and reported to the Sponsor, not self-certified (see the playbook's "Phase 1 completion" section).

**Note (DEC-010):** the pre-existing "Aarshiya continuous dev cycle" cron job remains disabled (real git-lock collision risk with the active worktree pipeline). Reversible via `openclaw cron enable 7614c9e2-8de6-4dfd-9ea4-a235de7b9aeb`.

**DEC-012/013 (QA-worktree file deletion) — root-caused and mitigated (DEC-014):** the unregistered `openclaw/reviewer` worktree was the confirmed cause (invisible to OpenClaw's own worktree lifecycle management). Replaced with a properly-registered `openclaw/qa` worktree; no recurrence during Sprint 14 or 15.

**New (DEC-015):** the Engineering Manager's own first live dispatch (Sprint 14) backgrounded Worktree 1+2 and ended its turn instead of blocking on them — an orphaned-process risk, not a worker failure. Fixed in the playbook itself (shell-level `&`/`wait` inside one blocking tool call) before Sprint 15's dispatch; no recurrence since.

## Status

🟢 Four more topics delivered since the last briefing (Sprints 8-11): Body Systems, Ecosystems, Genetics & Reproduction, Plate Tectonics — all live. Sprint 15 was the first Earth and Space strand topic (mantle/crust/plate boundaries), following Sprint 14 rounding out the Living World strand (genetics/reproduction). Worktree allocation unchanged: Worktree 1 (curriculum), Worktree 2 (learner experience/illustrations), Worktree 3 (`openclaw/qa` — independently reviews, wires, and merges), Worktree 4 (`openclaw/engineering-manager` — runs the full sprint loop autonomously per DEC-014). The visual-learning standard (DEC-009) has been applied to every new lesson. See `management/ROADMAP.md` for full per-sprint detail and `docs/product-owner-briefing.md` for the consolidated brief.

## Sprints 12-15 (Body Systems, Ecosystems, Genetics & Reproduction, Plate Tectonics) — All Done

- [x] **Sprint 12 — Body Systems:** digestive/circulatory/respiratory systems, breathing vs. cellular respiration — re-verified live (see `management/ROADMAP.md`).
- [x] **Sprint 13 — Ecosystems:** BL-051 (lesson/assessment/`FoodChainExplorer` widget) + CE-007 (illustrations) — QA found and fixed 2 real bugs (undefined Tailwind token, decomposer model) before merge; see DEC-013 for the interrupted-session incident and its fix.
- [x] **Sprint 14 — Genetics & Reproduction:** BL-052 (lesson/assessment/`InheritanceExplorer` widget) + CE-008 (illustrations) — first sprint run end-to-end by the Engineering Manager (Worktree 4); no bugs found.
- [x] **Sprint 15 — Plate Tectonics:** BL-053 (lesson/assessment/`PlateBoundaryExplorer` widget) + CE-009 (illustrations) — first Earth and Space strand topic; no bugs found.

Every sprint: both misconceptions from the concept file directly and correctly targeted by assessment questions, full check suite + production build passing, live browser click-through, mobile (375px) confirmed, no placeholders/TODOs.

## Earlier sprints — Done

- [x] Sprint 5 (Matter), Sprint 6 (Atomic Structure), Sprint 7 (Periodic Table), Sprints 8-11 (Chemical Reactions, Forces, Energy, Cells) — see `management/ROADMAP.md` for detail.
- [x] Curriculum Enhancement CE-001 — grew question banks for all 3 Matter-topic lessons.

## OpenClaw

- [x] Working — gateway healthy, Telegram notifications live, SSH deploy key push confirmed.
- **Four worktrees active:** `openclaw/aarshiya-auto` (curriculum), `openclaw/command-centre` (learner experience), `openclaw/qa` (independent review + merge, replaces the retired unregistered `openclaw/reviewer` per DEC-014), `openclaw/engineering-manager` (orchestrates the full sprint loop per DEC-014). All idle and available for the next dispatch (Sprint 16).
- Recurring cron job "Aarshiya continuous dev cycle" disabled for the duration of this pipeline (DEC-010) — reversible.

## Blockers

None currently.

## Next Decision

**Sprint 16 (The Solar System & Universe)** is next — the last row in `management/ROADMAP.md`'s sprint table. Per the charter's own stop conditions, once it closes Phase 1 completion must be assessed against the actual success criteria and reported to the Sponsor as a milestone decision, not assumed automatically. See `docs/product-owner-briefing.md` for the concise brief.
