# Model Profiles

These profiles are selection guidance, not workflow dependencies. Costs are indicative only and must be checked against current provider pricing before approval.

## Local

| Model / runtime  | Strengths                                                | Weaknesses                                                       | Estimated cost            | Best workload                                                 |
| ---------------- | -------------------------------------------------------- | ---------------------------------------------------------------- | ------------------------- | ------------------------------------------------------------- |
| Ollama           | Offline, private, consistent local API, no per-call fee  | Requires local hardware and model management                     | Hardware/electricity only | Routine drafting, local experimentation, private code context |
| llama3           | General reasoning and prose; broadly available in Ollama | Quality and context capacity vary by size; can be slower locally | Hardware/electricity only | Explanations, task drafts, straightforward changes            |
| qwen             | Strong coding and multilingual options across sizes      | Smaller variants can need close review                           | Hardware/electricity only | Code edits, structured extraction, lightweight workers        |
| DeepSeek (local) | Capable coding/reasoning variants                        | Hardware demand and local availability vary                      | Hardware/electricity only | Complex code analysis where hardware permits                  |

## Cloud

| Provider     | Strengths                                          | Weaknesses                                | Estimated cost                     | Best workload                                                 |
| ------------ | -------------------------------------------------- | ----------------------------------------- | ---------------------------------- | ------------------------------------------------------------- |
| Gemini       | Large-context and multimodal options               | Network, account, and pricing dependency  | Usage-priced; verify current rates | Large repository analysis and visual review                   |
| DeepSeek API | Cost-effective coding/reasoning options            | External service and policy availability  | Usage-priced; verify current rates | High-volume code drafting with independent review             |
| OpenAI       | Mature API ecosystem and broad capability range    | External service and variable token costs | Usage-priced; verify current rates | Complex reasoning, tool-enabled workflows, multimodal tasks   |
| Anthropic    | Strong long-form reasoning and code review options | External service and variable token costs | Usage-priced; verify current rates | Design review, careful implementation planning, code critique |

## Selection rules

- Choose the cheapest model that can safely complete the workload with mandatory checks.
- Use local models for privacy-sensitive or repeatable offline work when capable.
- Use cloud models only through configured credentials and explicit approval where required.
- Benchmark a model by task outcome, review defects, runtime, and total cost—not brand loyalty.
