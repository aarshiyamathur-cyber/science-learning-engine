# Outbox

Written at the end of every work cycle: what was completed, what's in progress, risks, questions for Product, and the recommended next action.

## 2026-08-01 — Sprint 2 implementation cycle

**Completed**

- BL-015–BL-019 (Concept Engine `xpReward`, Lesson Engine step schema + generic renderer, Learner Progress model + SQLite persistence, minimal Continue-Learning screen, "Matter" sample content) — all implemented, tested (32 unit tests passing), and walked through end-to-end in a real browser against both the dev server and a production build.
- Two real bugs found only by actually running the app (not by typecheck/lint/unit tests) and fixed: a short-answer question could be skipped without recording an answer; the home page was being statically prerendered, which would have frozen learner progress at build time in production.
- `management/` restructured per the delegation-first directive: `INBOX.md`, `OUTBOX.md`, `LIVE_FACTORY.md`, `WORKER_DASHBOARD.md`, `TASK_LEDGER.md` created/updated.
- ADR 0006 recorded (`node:sqlite` over `better-sqlite3`, since this machine has no C++ build toolchain for native modules).
- DEC-002 and DEC-003 recorded (local-model orchestrator replaced with a deterministic script; a headless Claude Code delegation attempt hung for 27 hours on a network stall and is an open, unresolved reliability issue).

**Currently being worked on**

- None actively in progress — paused on the network outage before pushing Sprint 2 work and before attempting the public-URL deployment.

**Risks**

- **Network outage on the dev machine (open, unresolved).** DHCP/IPv4 failure since a restart; blocks `git push`, blocks OpenClaw delegation (a headless Claude Code worker needs internet same as any other), and blocks any public-URL exposure. All Sprint 2 work is committed locally but not yet on GitHub.
- **OpenClaw delegation reliability (open, unresolved — DEC-003).** The one real delegation attempt this project has made hung for 27 hours before an outer timeout killed it, well past the configured 30-minute limit. The 70% delegation target can't be met safely until this is root-caused — re-delegating blind risks repeating the same multi-hour stall.
- **Automation Ratio is 0%** against a 70% target. This reflects the two risks above, not a refusal to delegate — see `management/WORKER_DASHBOARD.md`.

**Questions for Product Owner — resolved**

1. Public URL approach: Product Owner initially chose cloud hosting, then revised to **trial locally first via a tunnel, move to real hosting later if needed**. Decision: use Cloudflare's anonymous "quick tunnel" (`cloudflared tunnel --url`) — no account needed, no architecture change, keeps the existing `node:sqlite` local-file persistence exactly as built. Revisit cloud hosting (libSQL/Turso + Vercel, previously scoped) only if the trial needs to be more permanent/reliable than an ad hoc tunnel.
2. Access control: unlisted URL is sufficient — no password layer.

**Recommended next action**

1. Get the dev machine's network working again (router/adapter issue — needs physical/local troubleshooting, not something fixable from this session). This blocks everything below.
2. Once network is back: download `cloudflared`, run it against the local dev/prod server, hand Product the resulting `*.trycloudflare.com` URL for Aarshiya's iPad.
3. Also once network is back: push all pending Sprint 2 commits, then investigate and fix the OpenClaw 27-hour-hang issue (DEC-003) before trusting it with unsupervised delegated work again.
