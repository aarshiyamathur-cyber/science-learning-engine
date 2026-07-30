# ADR 0003 — Curriculum as YAML data validated by Zod

- **Date:** 2026-07-30
- **Status:** Accepted

## Decision

Curriculum content (concepts, lessons, assessments, knowledge graph) is authored as YAML files under `/curriculum`. The authoritative shape lives as Zod schemas in `packages/curriculum-schema`, which double as TypeScript types via `z.infer`. A script (`npm run validate:curriculum`) walks every file and validates it against the schema, including cross-references between files (a lesson's `conceptId` must exist, a graph edge must point at real concepts).

## Reason

The brief's "curriculum is data" principle is only enforceable if invalid or hardcoded curriculum content fails loudly. Zod gives one schema definition that produces both runtime validation and compile-time types, so the schema can't drift from the types the app code relies on. Cross-reference validation catches the most likely real-world authoring mistake — a typo'd concept id — before it becomes a runtime bug in the app.

## Alternatives considered

- **JSON Schema:** language-agnostic and a reasonable choice if content authoring tools outside TypeScript are added later, but Zod gives TypeScript types for free, which JSON Schema doesn't without a codegen step.
- **TypeScript files exporting object literals instead of YAML:** would give types automatically, but content authors (including non-engineers, and the Product Owner's AI-generated content) would be writing/reviewing TypeScript to edit a science question, which is the wrong audience for that friction.
- **Storing curriculum directly in SQLite:** rejected for now since a database is harder to diff/review in a PR than a YAML file, and there is no runtime write-path to curriculum content yet (see ADR 0004) — content is authored, reviewed, and read, never written by the running app.

## Impact

Adding a new concept means adding a YAML file that must pass `npm run validate:curriculum`. If curriculum content ever needs a non-technical authoring UI, that UI would read/write these same YAML files (or a generated intermediate), not bypass the schema.
