# Assumptions

Assumptions made during Sprint 0 that should be revisited if they turn out wrong.

- **Single learner, single machine.** No multi-user auth, no multi-device sync. If Aarshiya needs to use more than one device, persistence and sync design will need revisiting (currently assumed local SQLite, single file).
- **Node.js and npm are available locally,** alongside Ollama running as a local service on the default port (`11434`) with at least one model pulled.
- **"NSW Years 7–10 Science curriculum"** refers to the current NSW syllabus at time of writing (2026); no specific syllabus version/year has been pinned in code — curriculum content will need to state its own syllabus version once real content arrives from the Product Owner.
- **The Product Owner (ChatGPT) is the source of truth for curriculum, gameplay, and content** — the engineering side (this repo) does not originate curriculum decisions, only structures and validates them.
- **"Local-first" is interpreted as "runs fully offline with no paid service required,"** not "never touches the network under any circumstance" — e.g. `npm install` and dev tooling still require network access; the running application does not.
