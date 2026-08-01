# Live Factory

_This is the live status dashboard — updated after every meaningful milestone, not just at sprint end. Last updated: 2026-08-01 by Claude Code._

| Field                   | Value                                                                                                                                      |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Current Sprint          | Sprint 4 — "Interactive Science" (replace reading with discovery)                                                                          |
| Current Task            | **Stop condition reached** — a real interactive widget is live inside the Matter lesson, plus a second standalone widget ready for future lessons; waiting for Product review before BL-029 or Sprint 5 |
| Engineering Status      | BL-026, BL-027, BL-028 all Done and merged to `master`; BL-029 (Force Simulator) not started                                              |
| Build Status            | ✅ Passing (production build, serving via `next start`)                                                                                    |
| Tests                   | ✅ 53/53 passing (`npm test`)                                                                                                              |
| Coverage                | Not measured — no coverage tool configured yet                                                                                             |
| Last Commit             | `3fb5b2e` — "Merge BL-028: OpenClaw-delegated Atom Builder widget" (pushed)                                                                |
| Current Branch          | `master`                                                                                                                                   |
| Current Worker Activity | `aarshiya-dev` (OpenClaw): idle, available for next delegation. Claude Code: active                                                        |
| Blockers                | None current. TPG per-device network issue and OpenClaw's `--print`-mode no-output timeout are both understood and mitigated (see DEC-003) |
| Next Planned Task       | Waiting for Product review before starting BL-029 (Force Simulator) or Sprint 5                                                            |

## Live demo

**Public URL:** https://divx-ips-resistance-acoustic.trycloudflare.com

Rebuilt and redeployed with all of Sprint 4's merged changes (BL-026, BL-027, BL-028). Verified live via direct interaction against the production tunnel: the "What Is Matter?" lesson now includes a real "🧪 Try it yourself" interactive step (BL-026's new step type) between the Example and the first Question, showing the Particle State Explorer (BL-027) — tapping "Solid"/"Liquid"/"Gas" correctly swaps both the animation and the caption text (confirmed "Liquid" renders "Particles stay close together but slide and drift past each other."). The Atom Builder widget (BL-028, standalone, not yet wired into a lesson per DEC-004) was independently verified by its own delegated build.

Same caveats as before: ephemeral tunnel to this dev machine's own server, no cloud hosting, data stored on-device (`node:sqlite`).
