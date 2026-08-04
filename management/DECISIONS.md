# Project Decisions

## DEC-001

**Decision**
The learning engine will be curriculum agnostic.

**Status**
Accepted

**Reason**
Curriculum content should be packaged separately from the learning engine so additional subjects and curricula can be added without changing core code.

## DEC-002

**Decision**
The OpenClaw continuous dev cron job shells out directly to a headless Claude Code worker (`claude --permission-mode bypassPermissions --print`) instead of routing the "check backlog, decide what to do" step through a local Ollama model.

**Status**
Accepted

**Reason**
Local models (llama3:latest, then qwen2.5:3b) were tested as the orchestrator: llama3:latest doesn't support tool-calling in OpenClaw and overflowed context on even trivial prompts; qwen2.5:3b avoided the overflow but was unreliable once given a full tool-calling environment (issued unprompted tool calls instead of following simple instructions) and too slow for this hardware. Since the actual coding intelligence was always delegated to Claude Code, the local-model decision step added risk without adding value — a deterministic script check is more reliable for the "is there pending backlog work" judgment.

## DEC-003

**Decision**
Known open reliability issue: a headless Claude Code worker (spawned by the OpenClaw cron job for BL-010) hung for over 27 hours before an outer "job execution timed out" safeguard killed it, well past the configured 30-minute `--timeout-seconds`. The partial work it produced (untested, uncommitted) was picked up and finished directly by Claude Code rather than re-running the same delegation and risking another multi-hour hang.

**Status**
Resolved — root cause confirmed network, not the pipeline itself

**Reason**
The worker's own log showed `API Error: Response stalled mid-stream` on an earlier, shorter failed attempt at the same task — the most likely explanation was a network-level stall (this machine also independently lost IPv4 connectivity around the same period, tracked in `management/DASHBOARD.md`) that the underlying Claude Code process didn't recover from or time out on cleanly.

**Resolution:** the network issue was later identified as TPG blocking this specific Windows device (likely MAC-level — a MacBook on the same network was unaffected). Once that cleared (confirmed via mobile hotspot as a workaround, then again once the block itself lifted), a subsequent delegation attempt (BL-020, Sprint 3) correctly enforced its `--no-output-timeout-seconds` and stopped cleanly after 10 minutes of genuine silence — the timeout mechanism itself was never broken, it just couldn't fire correctly while the network layer was hung. That same BL-020 run, once given a healthy network, completed successfully: a full design-token system + 4 tested UI primitives + an ADR, reviewed and merged by Claude Code. First successful OpenClaw delegation this project has had — see `management/WORKER_DASHBOARD.md` and `management/TASK_LEDGER.md`.

**Impact**
The OpenClaw delegation pipeline can now be trusted for real implementation work when the network is healthy. Still worth keeping an eye on: `--no-output-timeout-seconds` (600s) may be too tight for substantial tasks in `--print` mode, which doesn't stream intermediate progress — a legitimately time-consuming task can look identical to a hang until it either finishes or times out. Consider raising it (e.g. to 1200–1800s) rather than treating every no-output timeout as a real failure.

## DEC-004

**Decision**
BL-028 (Atom Builder widget) was built and shipped as a standalone, reusable component (`app/components/widgets/AtomBuilder.tsx`) without wiring it into the existing "Matter" lesson, and uses a simplified 2/8/remainder electron-shell model rather than real quantum mechanics.

**Status**
Accepted

**Reason**
The "Matter" lesson (BL-019) is about states of matter/particle behavior, not atomic structure — inserting an Atom Builder step there would be topically incoherent, not a genuine interactive enhancement of that content. BL-028's own acceptance criteria only require a standalone reusable component that works with no lesson-specific data; real lesson integration is BL-026's job (the interactive step type) plus whichever future atomic-structure lesson actually needs it. The 2/8/remainder shell model (rather than full quantum orbital theory) matches the Year 7-10 target audience and mirrors the same "simplify for pedagogy, not full physical accuracy" precedent already set by the Particle State Explorer (BL-027) and the existing states-of-matter illustration.

**Impact**
Future lessons can adopt Atom Builder via BL-026's interactive step type with zero component changes. If a "structure of the atom" concept/lesson is authored later, it should link to this widget rather than building a new one.

## DEC-005

**Decision**
Created a second OpenClaw managed worktree (`openclaw/command-centre`) so the new Product Command Centre initiative can be delegated in parallel with the still-in-flight Sprint 5 (Matter topic) delegations, instead of queuing behind them in the existing `openclaw/aarshiya-auto` worktree.

**Status**
Accepted

**Reason**
Sprint 5 has an explicit "ready for Aarshiya tomorrow morning" deadline; Command Centre does not. The two initiatives touch entirely disjoint files (curriculum content + the existing app vs. a brand-new `apps/command-centre` app), so there's no technical reason to force them through one serial queue. A single worktree can only run one delegation at a time safely — see the project history of stale/divergent commits from overlapping worktree state — but two separate worktrees can run genuinely concurrently. See [ADR 0008](../docs/decisions/0008-parallel-openclaw-worktrees.md) for the full reasoning.

**Impact**
Both `openclaw/aarshiya-auto` and `openclaw/command-centre` are now active worktrees, each enforcing one-task-at-a-time internally. Future independent initiatives with no file overlap should follow the same pattern rather than assuming there's only one delegation lane.

## DEC-006

**Decision**
The button-based `AtomBuilder` widget (BL-028, reused as-is in BL-040's shipped Atomic Structure lesson) is accepted as the Version 1 interaction for atomic structure. It will not be replaced with a drag-and-drop particle-placement widget at this time.

**Status**
Accepted — Product Owner directive, 2026-08-03

**Reason**
The original Sprint 6 directive asked for "drag particles into place" / "place electrons into shells" as distinct interactions, which the +/- button model doesn't literally satisfy (flagged as an open question in `management/ROADMAP.md`). Product Owner reviewed the gap and accepted the existing widget rather than authorising a new reusable component of `ParticleStateExplorer`/`AtomBuilder` scope, prioritising curriculum throughput over building a second atom-interaction widget.

**Impact**
Drag-and-drop particle/electron placement is recorded as a future enhancement, not scheduled. Do not build it without explicit Product Owner approval. Sprint 6's interaction-mechanic open question in `management/ROADMAP.md` is now resolved.

## DEC-007

**Decision**
No separate "Question Bank" engineering project is authorised. Reusable questions (concept, difficulty, correct answer, explanation, hint, curriculum reference) continue to be produced as a normal by-product of each lesson's assessment authoring — the standing practice since BL-030 — rather than as a dedicated initiative.

**Status**
Accepted — Product Owner directive, 2026-08-03

**Reason**
Sprint 6 was not to be paused to redesign or formalise the Question Bank as its own workstream. The bank already grows correctly through ordinary lesson development; a separate project would be infrastructure work competing with the 80/20 curriculum-first capacity split for no additional benefit.

**Impact**
`management/ROADMAP.md`'s "Question Bank policy" section stands as previously documented (every question ships with concept/difficulty/correct answer/explanation/hint/curriculum reference). No new backlog items should be created for a standalone Question Bank initiative; the Command Centre's Question Bank page remains sample-data-backed per its existing scope freeze.

## DEC-008

**Decision**
Added explicit `transpilePackages: ["@aarshiya/curriculum-schema", "@aarshiya/learning-engine", "@aarshiya/ollama-client"]` to `next.config.ts`.

**Status**
Accepted

**Reason**
During Sprint 6 final QA (BL-043), a fresh `next build`/`next dev` failed for every route with "Unknown module type" errors on all three `@aarshiya/*` workspace packages, reproduced even on completely unmodified `npm install`-generated symlinks — a pre-existing environment issue, not caused by any curriculum content or code change this session. Per Next.js's own docs, Turbopack is supposed to auto-transpile workspace packages, but in practice (this Next 16.2.12 + Windows npm-workspace-symlink combination) it did not until `transpilePackages` was set explicitly. This was discovered because the live `AarshiyaAppServer`'s on-disk `.next` build had drifted stale relative to source; without this fix, no future code change (curriculum-data-only changes are unaffected since they're read at runtime, but any `.tsx`/`.ts` change) could have been redeployed at all — this is a real deployability blocker, not a discretionary infrastructure improvement, so it was fixed directly rather than deferred under the infrastructure freeze.

**Impact**
`next build`/`next dev` work again. Verified via a full production build, typecheck/lint/vitest (65/65), and a live restart of `AarshiyaAppServer` with a real browser click-through confirming the rebuilt server serves correctly. Future sessions should be aware this machine's actual project directory is `D:\Projects\...` (capital P) — a mismatched-case working directory (e.g. `d:\projects\...`) can independently cause spurious `tsc` "differs only in casing" errors on the same `@aarshiya/*` symlinks; always operate from the correctly-cased path.

## DEC-009

**Decision**
New standing content/design standard for all lessons, effective 2026-08-03: every lesson opens with a hero illustration; explanation text is broken into short sections with supporting graphics rather than long uninterrupted paragraphs; diagrams/SVG illustrations/labelled graphics are preferred wherever they improve understanding; no purely decorative visuals — every image must teach a concept.

**Status**
Accepted — Product Owner directive, 2026-08-03, based on user testing feedback (too much uninterrupted text in the current learning experience).

**Reason**
Direct feedback from Aarshiya's use of the app. Applies immediately to all new topics (Sprint 8 onward). Existing topics (Matter, Atomic Structure, Periodic Table) are retrofitted incrementally as engineering capacity allows — this is explicitly not an urgent blocking retrofit, so it must not compete with new-topic delivery under the 80/20 curriculum/infrastructure capacity split.

**Impact**
Affects lesson authoring going forward: `LessonStep`'s `explanation`/`example` step bodies should be written and reviewed against this bar (short sections, one hero illustration per lesson, graphics that teach rather than decorate), and any dispatch prompt for new lesson content should state these requirements explicitly. Does not require a schema change — `explanation`/`example` steps already carry free-form `body` text; "short sections with supporting graphics" is an authoring-quality bar, not a new step type, unless a future concept genuinely needs a new component to render inline diagrams within an explanation step.

## DEC-010

**Decision**
Disabled the pre-existing recurring cron job "Aarshiya continuous dev cycle" (id `7614c9e2-...`, every 2h, runs in the same physical directory as `openclaw/aarshiya-auto`'s worktree) for the duration of the active Sprint 8-12 multi-worktree pipeline.

**Status**
Accepted

**Reason**
This cron job predates the 2026-08-03 autonomous multi-sprint directive and independently runs `claude --permission-mode bypassPermissions --print` in `C:\Users\Lenovo\.openclaw\worktrees\...\aarshiya-auto` — the exact same directory now used for every Sprint 8+ content dispatch. During Sprint 10 it fired while a manually-dispatched BL-048 worker was still mid-run in that directory, and it correctly saw an untracked in-progress file before declining to act (per its own idle-cycle safety instructions, it never commits/pushes when nothing matches its expected `## Next`/`Not started` backlog format — a format this project's `backlog.md` hasn't used since around Sprint 3/4). No damage occurred this time, but two independent `git`-invoking processes sharing one working directory is a real risk of `.git/index.lock` contention or worse if a future run's timing lines up differently. The cron is also functionally redundant now: it never finds matching work under the current `backlog.md` convention, so disabling it costs nothing.

**Impact**
`openclaw cron disable 7614c9e2-8de6-4dfd-9ea4-a235de7b9aeb` was run directly (reversible via `openclaw cron enable`). Future sessions continuing the Sprint 8-12 pipeline should leave it disabled until the pipeline is no longer actively dispatching into that same worktree; re-enabling it earlier risks the same collision class recurring with worse timing.

## DEC-011

**Decision**
Added named, switchable learner profiles with a self-service reset, replacing the single hardcoded `DEMO_LEARNER_ID`. Anyone using the app can type a name into a "Testing as" control on the topic screen to get their own independent progress track (XP, mastery, completed lessons), switch back to any previously-used name via quick-switch chips, and reset the *currently active* name's progress at any time via a two-step confirm — without touching any other name's data.

**Status**
Accepted — direct Product Owner request: testers were completing lessons during QA and it was marking topics complete against the real student's progress.

**Reason**
The persistence layer (`learner_profiles`/`mastery_states`/`attempt_records`, all keyed by `learnerId`) already supported multiple learners — only the UI and both server actions (`submitAnswerAction`/`completeLessonAction`) hardcoded a single id. The fix is additive: a `learnerId` derived from a free-text name (slugified, e.g. "QA Tester" → `learner-qa-tester`) stored in a cookie, read by both server actions instead of the constant, with `getOrCreateProfile`/`resetProfile`/`listProfiles` added to `LearnerProgressStore`. `DEMO_LEARNER_ID`/"Aarshiya" remains the default when no cookie is set, so the real student's experience is unchanged.

A genuine bug surfaced during live verification and was fixed before shipping: switching learners via a same-route `redirect("/")` updates the Server Component's props correctly, but `ContinueLearningScreen`'s local `useState` (seeded once via lazy initializers) doesn't reset just because props changed — the UI kept showing the *previous* learner's XP/mastery/completed state after a switch. Fixed by adding a `resetAt` timestamp to `LearnerProfile` (set only by `resetProfile`, distinct from `lastCompletedAt` which normal lesson completion also touches) and keying `<ContinueLearningScreen key={`${learnerId}:${resetAt}`}>` in `page.tsx` — this forces a full remount exactly on switch or reset, and not on ordinary lesson completion (which still needs to keep its "done" screen state intact through the `router.refresh()` that follows).

**Impact**
`LearnerProfileSchema` gained a `resetAt` field; the SQLite schema migrates existing databases with `ALTER TABLE ... ADD COLUMN resetAt` at store-open time (deployed DBs pre-date this column). Verified live end-to-end: switching to a new name starts genuinely fresh (0 XP, all lessons "Ready"), completing a lesson under that name doesn't touch the real student's profile, and resetting only clears the active name's data. The test profile created during verification was deleted from the live database afterward so it doesn't linger in the quick-switch list.

## DEC-012

**Decision**
Flagging (not fixing at the system level — out of this project's scope) a recurring reliability risk: the machine's C: drive, which hosts all three OpenClaw worktrees (`C:\Users\Lenovo\.openclaw\worktrees\...`), is critically low on space (~21GB free of 238GB, ~91% used). The `openclaw/reviewer` (QA) worktree has had its working-tree files mass-deleted by something outside the dispatched worker's own commands **twice now** — once during Sprint 11's QA pass, once during Sprint 12's — both times self-recovered via `git restore .` + `npm install` since git history itself was never touched, but this is a real, recurring, unexplained data-loss pattern, not a one-off fluke.

**Status**
Accepted (as a flagged risk) — root cause not confirmed, but low disk space is the leading hypothesis (Windows Storage Sense, an antivirus low-disk sweep, or another automated cleanup tool reclaiming space from large recently-modified directories). The QA worktree does the heaviest disk I/O of the three (full `next build` + `next start` + Playwright + chromium), making it the most likely target if space-pressure cleanup is the cause.

**Reason**
Ran `npm cache clean --force` and cleared `.next/cache` in all three worktrees as a safe, fully-reclaimable, project-scoped cleanup (freed only ~1-2GB — not the underlying fix). Did not go further: deleting anything else on this drive requires knowing what else is on it and what's safe to remove, which isn't a call to make unilaterally on someone else's machine.

**Impact**
No data has been lost so far (git history is always intact; only working-tree/node_modules/build-output churn). But a worse-timed occurrence (e.g. mid-commit, before a worker's local changes are committed) could lose real in-progress work. Recommend to the Sponsor: free up general disk space on C:, or move the OpenClaw worktrees to D: (which has ~176GB free) if that's a supported reconfiguration in OpenClaw's own worktree/agent path config. Until addressed, treat this as an ongoing background risk on every QA-worktree dispatch, not something to keep silently re-explaining away.

## DEC-013

**Decision**
The DEC-012 pattern recurred a third time during Sprint 13's QA pass, this time more seriously: the QA worker's dispatched session ended (its last message was "still running in the background, will report back") before its own live-browser-test step and merge decision completed. Its local worktree had genuine, valuable committed work — a real bug fix (`FoodChainExplorer`'s decomposer model and an undefined `bg-warning-400` token) plus the merge and registry wiring — that existed ONLY in that one local worktree's `.git`, never pushed to `origin/openclaw/reviewer`. Unlike the first two occurrences (self-recovered harmlessly via `git restore .`), this time the interrupted session meant nothing would have protected that work if the same file-deletion issue struck the worktree again before a future dispatch happened to notice and push it.

**Status**
Accepted (mitigating action taken directly; root cause per DEC-012 still not fixed at the system level)

**Reason**
On noticing the QA worker's session had ended without a final report, Claude checked the worktree directly, found the local commits (`git log` showed real work; `git status` showed every tracked file deleted from the working tree — consistent with the DEC-012 pattern, not data loss in `.git` itself), and immediately ran `git push origin openclaw/reviewer` before doing anything else, to get the work off that one fragile local disk and onto the remote. Only after that push succeeded did Claude restore the working tree (`git checkout -- .`) and complete the interrupted verification manually: read the fix in full, ran the automated check suite, and did a live browser click-through (requiring direct SQLite manipulation of a test profile's `completedLessons` to skip a slow 10-lesson prerequisite chain, since the click-through-every-prior-lesson approach proved too slow and fragile for a from-scratch unlock) — confirming both the energy-bar rendering and the decomposer text fix work correctly before merging to master.

**Impact**
No work was ultimately lost, but this was closer to a real loss than DEC-012's first two instances. Establishes a concrete response pattern for future occurrences: if a dispatched worker's session ends without a clear "merged" or "did not merge, here's why" report, treat it as interrupted, check the worktree directly, and push any unpushed local commits immediately before investigating further or restoring the working tree — protecting the commits is strictly higher priority than diagnosing the cause in the moment. The underlying disk-space/cleanup-tool root cause from DEC-012 remains unresolved and increasingly urgent given the escalation.

## DEC-014

**Decision**
Root-caused DEC-012/013 (the recurring QA-worktree mass file deletion): `openclaw worktrees list` showed only 2 of the 3 active worktrees (`aarshiya-auto`, `command-centre`) were registered in OpenClaw's own managed-worktree system — the `openclaw/reviewer` (QA) worktree had been created manually via plain `git worktree add`, never through `openclaw worktrees create`, and was therefore invisible to whatever lifecycle/cleanup process OpenClaw runs against its own managed worktree directories. Fixed by creating a properly-registered replacement (`openclaw worktrees create ... --name qa --base-ref master`, now at `C:\Users\Lenovo\.openclaw\worktrees\874e3c6b018fa7d1\qa` on branch `openclaw/qa`) and confirming via `openclaw worktrees list` that all worktrees now show `active`.

Separately and at the same time: created a 4th managed worktree, `engineering-manager` (branch `openclaw/engineering-manager`), and a new operating document, `management/ENGINEERING_MANAGER_PLAYBOOK.md`, that lets an OpenClaw worker run the entire sprint orchestration loop autonomously — scoping, dispatching Worktree 1 + 2, dispatching QA, syncing, merging, and closing out docs — the work Claude had been doing by hand every sprint this session. Claude Code is now invoked only as a fallback: the Engineering Manager worker must never self-escalate to Claude — if it hits anything it can't resolve via the playbook's documented failure modes, it stops and sends the Sponsor a Telegram message describing the blocker and 1-2 concrete alternate approaches, and waits for the Sponsor to decide whether to redirect it or bring Claude in.

**Status**
Accepted — direct Sponsor request, 2026-08-05 ("I want a third worker to work as engineering manager in place of claude" — clarified as the full orchestration loop, with Claude used only when the new worker cannot operate and always at the Sponsor's discretion, never self-invoked).

**Reason**
Two separate problems converged in the same session: (1) the DEC-012/013 file-deletion pattern had a findable root cause once the Sponsor was at the machine to help investigate, rather than remaining an accepted background risk; (2) the Sponsor wants the routine, well-understood parts of the sprint cycle (which by this point had run identically 9 times — Sprints 5-13) running without Claude in the loop, reserving Claude's judgement for genuine architecture/curriculum/blocker decisions rather than mechanical dispatch-and-merge cycles.

**Impact**
`management/HANDOFF.md`'s Operating model section now points to the Engineering Manager as the default path for routine sprint work. All future sessions (Claude or otherwise) should check whether the Engineering Manager is already running the current sprint before duplicating its work. The old ad-hoc `openclaw/reviewer` worktree (`C:\Users\Lenovo\.openclaw\worktrees\reviewer`) is superseded by the newly-registered `qa` worktree and should be retired via `git worktree remove` once nothing is relying on it. First live proof-of-loop run: Sprint 14 (Genetics & Reproduction), dispatched immediately after this decision was recorded — see DEC-015 for a real bug the first run surfaced, and `management/ROADMAP.md` for both Sprint 14 and Sprint 15's outcome.

## DEC-015

**Decision**
The Engineering Manager playbook originally told the worker to dispatch Worktree 1/2 as a background process and simply "wait for both to genuinely finish" in a later turn. Its own first live run (Sprint 14) exposed why that instruction was wrong: the Engineering Manager is itself a single-shot `claude --print` process with no persistent session and no notification mechanism to wake it up later. Backgrounding the dispatch and ending its turn left both `claude` worker processes orphaned — nothing was tracking them, and the sprint would have silently stalled with no one aware. Fixed by rewriting the playbook to require a single blocking shell command (`( claude ... & claude ... & wait )`) so the Engineering Manager's own tool call does not return until both dispatched processes have actually exited.

**Status**
Accepted — fixed directly in `management/ENGINEERING_MANAGER_PLAYBOOK.md` (commit `ae0571e`) before Sprint 15's dispatch.

**Reason**
This is a mechanical process bug in the orchestration loop itself, not a curriculum or architecture decision — but it's exactly the kind of "first live run finds a real gap in the playbook" lesson that DEC-010/012/013 already established the pattern of recording, so future sessions don't rediscover it. The fix was safe and mechanical (a shell pattern change, no scope creep) and squarely within the Engineering Manager's own remit to self-correct, per the playbook's existing "known failure modes — handle these yourself" section.

**Impact**
Every dispatch since Sprint 15 (Worktree 1+2, then Worktree 3/QA) uses the blocking `&`/`wait` pattern; no recurrence. If any future dispatch prompt or tooling change reintroduces a "run in background and check back later" pattern, treat it as a regression of this same bug, not a new issue.
