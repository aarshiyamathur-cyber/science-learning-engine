# Architecture Overview

## Vision

We are not building a science app. We are building a Science Learning Operating System. The game is simply the first interface. The curriculum, knowledge graph, and learning engine are the core product — everything else (the game layer, the UI) is replaceable.

## Non-negotiable principles

1. **Learning comes before entertainment.** A feature that's fun but doesn't improve learning outcomes doesn't get built.
2. **Curriculum is data.** Concepts, lessons, and questions are never hardcoded — they exist as structured, schema-validated files under [/curriculum](../../curriculum).
3. **Everything is reusable.** Components (quiz card, boss battle, XP reward, dialogue box, lesson template, ...) are built as reusable systems, not one-off implementations.
4. **Local-first.** The project runs entirely on the user's machine — no cloud dependency, no paid service, no per-call API cost. AI-assisted tasks default to a local model via Ollama (see [ADR 0005](../decisions/0005-local-ollama-as-default-ai-backend.md)).
5. **Build for five years.** Assume hundreds of lessons, thousands of questions, hundreds of reusable components. Optimise for maintainability over short-term velocity.

## Layers

The system is split into independently-evolving layers:

```text
┌─────────────┐
│     UI       │  app/ — Next.js App Router, React, Tailwind
├─────────────┤
│  Game Engine │  future: packages/game-engine — XP, levels, quests, boss battles
├─────────────┤
│Learning Engine│ future: packages/learning-engine — adaptive difficulty, mastery,
│              │  revision scheduling, hint generation, weakness detection
├─────────────┤
│  Curriculum  │  curriculum/ — knowledge graph, concepts, lessons, assessments (data)
├─────────────┤
│ Persistence  │  future: SQLite — learner progress, mastery state, attempt history
├─────────────┤
│  Analytics   │  future: local event log — what a learner did, when, and how well
└─────────────┘
```

The **game consumes curriculum, not the other way around**: gameplay mechanics (XP, boss battles, quests) render and react to concept/mastery state, but curriculum content never references game mechanics. This keeps the curriculum reusable if the game layer is ever replaced.

Each layer is a separate concern and, where it has enough surface area to justify it, a separate package under [/packages](../../packages) or [/workers](../../workers) — see [ADR 0002](../decisions/0002-npm-workspaces-for-packages.md).

## Curriculum data model

The knowledge graph is the source of truth. Each concept has: a unique id, title, description, learning objectives, misconceptions, prerequisites, unlocks, a mastery threshold, a revision strategy, and references to its lessons and assessments. Year levels (7–10) are not a property of a concept — they are a _view_ computed over the graph later, so the same graph can be re-sliced without touching the data.

See [packages/curriculum-schema](../../packages/curriculum-schema) for the authoritative Zod schemas and [/curriculum](../../curriculum) for the (currently placeholder) data.

## What's deliberately not built yet

Sprint 0 is engineering foundation only. Deliberately out of scope until a later, product-approved sprint:

- Gameplay mechanics and UI (XP, boss battles, quests, dialogue, inventory).
- Real lesson/assessment content (the two example concepts in `/curriculum` exist only to exercise the schema and validation pipeline).
- SQLite persistence wiring — deferred because there is no runtime learner state to persist yet ([ADR 0004](../decisions/0004-defer-sqlite-persistence.md)).
- The learning engine's adaptive logic (difficulty adjustment, mastery tracking, revision scheduling) — the schema supports it (`masteryThreshold`, `revisionStrategy`), but the engine itself is future work.

## Local AI worker

[workers/ollama-client](../../workers/ollama-client) wraps a locally-running Ollama instance (default model: `llama3:latest`) as the default backend for AI-assisted tasks — hint drafting, misconception explanations, content scaffolding. This keeps the system free of cloud dependency and per-call cost, in line with the local-first principle. See [ADR 0005](../decisions/0005-local-ollama-as-default-ai-backend.md).
