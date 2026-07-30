# Aarshiya Science Learning System

A curriculum-driven Science Learning Operating System for one learner (Aarshiya), covering the NSW Years 7–10 Science curriculum. The game is the first interface; the curriculum, knowledge graph, and learning engine are the core product. Not a commercial product — every decision optimises for maintainability, adaptability, and learning effectiveness over feature velocity.

See [docs/architecture/overview.md](docs/architecture/overview.md) for the full vision, principles, and architecture, [docs/decisions](docs/decisions) for the reasoning behind each technical choice, and [docs/product-owner-briefing.md](docs/product-owner-briefing.md) for the current status handoff to the Product Owner.

## Status

**Sprint 0: engineering foundation.** No gameplay, lessons, or curriculum content have been built yet — see [docs/backlog/backlog.md](docs/backlog/backlog.md) for what's done and what's next.

## Stack

TypeScript, React, Next.js (App Router), Tailwind CSS, npm workspaces, Zod, Vitest, Playwright, ESLint, Prettier. Curriculum content is YAML, validated against schemas in [packages/curriculum-schema](packages/curriculum-schema). AI-assisted tasks default to a local model via [Ollama](workers/ollama-client) — no cloud dependency, no per-call cost.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Ollama must be running locally (`ollama serve`) with the `llama3` model pulled for any AI-assisted features that use [workers/ollama-client](workers/ollama-client).

## Scripts

| Script                            | Purpose                                     |
| --------------------------------- | ------------------------------------------- |
| `npm run dev`                     | Start the Next.js dev server                |
| `npm run build`                   | Production build                            |
| `npm run lint`                    | ESLint                                      |
| `npm run typecheck`               | `tsc --noEmit` across the whole repo        |
| `npm run format` / `format:check` | Prettier write / check                      |
| `npm test` / `test:watch`         | Vitest unit tests                           |
| `npm run test:e2e`                | Playwright end-to-end tests                 |
| `npm run validate:curriculum`     | Validate all curriculum YAML against schema |

## Repository layout

```text
/docs          engineering & product documentation (architecture, decisions, backlog, curriculum, game-design)
/curriculum    curriculum data as YAML — concepts, lessons, assessments, knowledge graph
/app           Next.js App Router UI
/packages      reusable, independently-testable TypeScript packages (e.g. curriculum-schema)
/workers       background/worker processes and local-model clients (e.g. ollama-client)
/assets        static art, audio, fonts
/tests         shared e2e specs and fixtures (unit tests live beside their source)
/prompts       versioned LLM prompt templates
/scripts       repo tooling (e.g. curriculum validation)
```

## Roles

- **Engineering Lead** (Claude Code): owns architecture, tooling, and implementation quality.
- **Product Owner** (ChatGPT): supplies curriculum content, gameplay specs, and acceptance criteria. Where implementation conflicts with product intent, the conflict is raised in [docs/decisions](docs/decisions) rather than silently resolved.
