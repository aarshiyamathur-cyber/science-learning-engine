# ADR 0004 — Defer SQLite persistence to Sprint 1

- **Date:** 2026-07-30
- **Status:** Accepted

## Decision

Do not wire up SQLite (or any persistence layer) in Sprint 0, despite the project brief naming SQLite as the initial persistence choice.

## Reason

Sprint 0 has no runtime state to persist — there is no gameplay, no attempts, no learner progress being generated yet. Adding a database, an ORM/query layer, and migrations now would mean designing tables against guesses rather than an actual first write-path (e.g. "record a quiz attempt"), which risks a schema that has to be reworked once real requirements (from the learning engine / game layer) show up. This is a direct application of "prevent overengineering, don't design for hypothetical future requirements."

## Alternatives considered

- **Stub out an empty SQLite file and schema now:** rejected — there's nothing concrete to put in it yet, and an empty stub would just be later deleted or rewritten wholesale.
- **Skip SQLite entirely in favour of flat files:** not rejected outright, just not decided — this ADR only defers the decision, it doesn't relitigate SQLite vs. an alternative. That choice should be made in Sprint 1 against a real first use case (e.g. quiz attempt history).

## Impact

BL-005 in the backlog picks this up in Sprint 1, once there's a first concrete piece of state to persist (see [docs/backlog/backlog.md](../backlog/backlog.md)). Until then, curriculum data (read-only, versioned in git) is the only "data layer" in the system.
