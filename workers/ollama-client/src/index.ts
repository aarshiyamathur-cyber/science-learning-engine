/**
 * Thin client for a locally-running Ollama instance.
 *
 * This is the default compute backend for AI-assisted tasks (hint drafting,
 * misconception explanations, content scaffolding) so the project can run
 * entirely offline and free of per-call API cost. A cloud model is an
 * explicit, separate choice for a specific task — never a silent fallback
 * here — see docs/decisions for the reasoning.
 */

const DEFAULT_BASE_URL = process.env.OLLAMA_BASE_URL ?? "http://localhost:11434";
const DEFAULT_MODEL = process.env.OLLAMA_MODEL ?? "llama3:latest";

export class OllamaUnavailableError extends Error {
  constructor(cause: unknown) {
    super("Could not reach the local Ollama server. Is it running? (ollama serve)");
    this.name = "OllamaUnavailableError";
    this.cause = cause;
  }
}

export interface GenerateOptions {
  model?: string;
  system?: string;
  baseUrl?: string;
}

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

async function post(baseUrl: string, path: string, body: unknown) {
  let response: Response;
  try {
    response = await fetch(`${baseUrl}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch (cause) {
    throw new OllamaUnavailableError(cause);
  }
  if (!response.ok) {
    throw new Error(`Ollama request failed: ${response.status} ${response.statusText}`);
  }
  return response.json();
}

/** One-shot text completion. Defaults to the local llama3:latest model. */
export async function generate(
  prompt: string,
  options: GenerateOptions = {},
): Promise<string> {
  const baseUrl = options.baseUrl ?? DEFAULT_BASE_URL;
  const data = (await post(baseUrl, "/api/generate", {
    model: options.model ?? DEFAULT_MODEL,
    prompt,
    system: options.system,
    stream: false,
  })) as { response: string };
  return data.response;
}

/** Multi-turn chat completion. Defaults to the local llama3:latest model. */
export async function chat(
  messages: ChatMessage[],
  options: GenerateOptions = {},
): Promise<string> {
  const baseUrl = options.baseUrl ?? DEFAULT_BASE_URL;
  const data = (await post(baseUrl, "/api/chat", {
    model: options.model ?? DEFAULT_MODEL,
    messages,
    stream: false,
  })) as { message: { content: string } };
  return data.message.content;
}
