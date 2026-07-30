# Curriculum Data

Structured curriculum data — the source of truth for what the app teaches. Nothing here is hardcoded into application code; everything is loaded and validated against the schemas in [packages/curriculum-schema](../packages/curriculum-schema).

- `concepts/` — one YAML file per concept (id, objectives, misconceptions, prerequisites, unlocks, mastery threshold, revision strategy).
- `lessons/` — lesson content, each referencing a concept id.
- `assessments/` — assessment questions, each referencing a concept id.
- `graph/` — the knowledge graph: which concepts exist and how they relate (prerequisite/unlocks/related-to edges).

Year levels (7–10) are not represented here — they are a _view_ over the graph, computed later by the learning engine, not a property baked into concept files.

Run `npm run validate:curriculum` to check every file against its schema and confirm the graph only references concepts that exist.

**The two concepts, one lesson, and one assessment currently in this folder are placeholder examples** to prove the schema and validation pipeline end-to-end. Real curriculum content is supplied by the Product Owner and will replace them.
