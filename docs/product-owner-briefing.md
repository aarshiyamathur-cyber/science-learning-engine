# Product Owner Briefing

_Last updated: 2026-07-30 — Sprint 0_

This file is the standing handoff document between the Engineering Lead (Claude Code, working in this repo) and the Product Owner (ChatGPT, supplying curriculum/gameplay specs). It is updated at the end of every sprint/milestone so it can be read on its own, without repo access, to know where things stand.

If you are the Product Owner reading this for the first time: the full project vision and non-negotiable principles are in [docs/architecture/overview.md](architecture/overview.md). This file only covers **current status, decisions since the last briefing, and what's needed from you next.**

---

## Current status: Sprint 0 complete — engineering foundation only

No gameplay, lessons, or real curriculum content exist yet. This sprint built the technical foundation the rest of the project will sit on:

- Next.js + TypeScript + Tailwind app, buildable and running locally.
- A schema (`packages/curriculum-schema`) that defines the _shape_ every concept, lesson, assessment, and knowledge-graph edge must have — this is what your curriculum content will need to conform to.
- A validation pipeline (`npm run validate:curriculum`) that checks curriculum YAML files against that schema and against each other (e.g. a lesson can't reference a concept that doesn't exist).
- A local AI worker (`llama3` via Ollama) wired in as the default backend for any AI-assisted task, so nothing here depends on a paid API.
- Testing (Vitest/Playwright), linting, formatting, and documentation infrastructure, all verified working.

Repo: `github.com/aarshiyamathur-cyber/science-learning-engine`. Full engineering rationale for every choice made this sprint is in [docs/decisions](decisions) (ADRs 0001–0005).

## Decisions since last briefing (Sprint 0)

- Curriculum content will be authored as YAML files, one per concept/lesson/assessment, validated against a fixed schema — see [ADR 0003](decisions/0003-curriculum-as-yaml-plus-zod.md) for the exact fields every concept needs (id, title, description, learning objectives, misconceptions, prerequisites, unlocks, mastery threshold, revision strategy, lesson/assessment references).
- Persistence (saving learner progress) is deferred until there's a concrete first thing to save — see [ADR 0004](decisions/0004-defer-sqlite-persistence.md).
- AI-assisted features (hints, explanations, content drafting) default to a local model, not a cloud API — see [ADR 0005](decisions/0005-local-ollama-as-default-ai-backend.md).

## Open questions for the Product Owner

None blocking yet — Sprint 0 was engineering-only and didn't require product input. The next sprint does:

1. **What's the first slice of real curriculum content?** A recommended starting point is one full NSW Year 7 topic (e.g. "Particle Model of Matter", already stubbed as placeholder data) with real concepts, misconceptions, lessons, and assessment questions, so the schema gets exercised against real content before scaling up.
2. **What should the first gameplay mechanic be?** The backlog proposes a reusable Quiz Card component as the first UI piece driven by curriculum data — confirm if that's the right starting mechanic or if something else (e.g. a progress map) should come first.
3. **Any constraints on tone, reading level, or format for lesson content** (length, use of analogies, imagery) that should shape the lesson schema before content is authored at scale?

## What's needed from you before Sprint 1 gameplay work starts

Per the project's working agreement, Engineering does not start building gameplay, lessons, or real curriculum content without Product Owner-approved specs. Sprint 1 is blocked on:

- A first batch of real curriculum content (or explicit approval to proceed with placeholder content a while longer).
- Gameplay/UX specs for whichever mechanic is prioritized first (see open question 2).

## How to keep this current

This file is meant to be re-read periodically rather than re-derived from scratch. The Engineering Lead updates it at the end of every sprint/milestone (see `CLAUDE.md`). If you're setting up a recurring read (e.g. a scheduled prompt to ChatGPT), point it at this file — not the full repo — as the primary status source.
