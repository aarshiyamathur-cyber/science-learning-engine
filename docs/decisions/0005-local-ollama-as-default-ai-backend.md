# ADR 0005 — Local Ollama (llama3) as default AI backend

- **Date:** 2026-07-30
- **Status:** Accepted

## Decision

`workers/ollama-client` (`@aarshiya/ollama-client`) wraps the local Ollama HTTP API (`http://localhost:11434` by default) and is the default backend for any AI-assisted task in the system (hint generation, misconception explanations, content drafting). It defaults to the `llama3:latest` model, both configurable via `OLLAMA_BASE_URL` / `OLLAMA_MODEL` env vars. When the local server is unreachable, the client throws a typed `OllamaUnavailableError` rather than silently failing or falling back to a cloud call.

## Reason

The project is explicitly local-first and non-commercial — there is no budget model that justifies per-call cloud LLM cost for a single learner, and the user already runs Ollama locally with `llama3` and `qwen2.5:3b` pulled. Making the local model the default (not just "an option") keeps the system's AI-assisted features free to run indefinitely and keeps them working fully offline. Throwing a typed error on unavailability (instead of an automatic cloud fallback) is a deliberate choice: a silent fallback to a paid service would violate "local-first" and "cost-effective" without anyone deciding it should.

## Alternatives considered

- **A cloud LLM (e.g. a hosted Claude/GPT API) as the default, with Ollama as a fallback:** rejected — inverts the actual priority. Cloud calls should be an explicit, opt-in choice for a specific task where local model quality is genuinely insufficient, not the default path.
- **`qwen2.5:3b` as the default model:** smaller and faster, and does support tool-calling, but the user specifically confirmed `llama3` (the larger, more capable model) as the default worker when asked; `qwen2.5:3b` remains available locally as a lighter-weight option a caller can opt into via `OLLAMA_MODEL`.
- **Building a provider-agnostic abstraction layer (supporting Ollama and cloud providers interchangeably) now:** rejected as premature abstraction — there is exactly one backend and one real caller so far; introduce the abstraction when a second backend actually needs to be supported.

## Impact

Any future feature that needs AI assistance (hint generation, adaptive difficulty explanations, content scaffolding for the Product Owner) should call `@aarshiya/ollama-client` first. Reaching for a cloud API for a specific task is allowed but should get its own ADR explaining why the local model wasn't sufficient for that case.
