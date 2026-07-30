import { afterEach, describe, expect, it, vi } from "vitest";
import { OllamaUnavailableError, chat, generate } from "./index";

describe("ollama-client", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("generate() defaults to the local llama3 model", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ response: "hello" }),
    });
    vi.stubGlobal("fetch", fetchMock);

    const result = await generate("say hi");

    expect(result).toBe("hello");
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("http://localhost:11434/api/generate");
    expect(JSON.parse(init.body).model).toBe("llama3:latest");
    expect(JSON.parse(init.body).stream).toBe(false);
  });

  it("chat() posts to /api/chat with provided messages", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ message: { content: "hi there" } }),
    });
    vi.stubGlobal("fetch", fetchMock);

    const result = await chat([{ role: "user", content: "hi" }]);

    expect(result).toBe("hi there");
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("http://localhost:11434/api/chat");
    expect(JSON.parse(init.body).messages).toEqual([{ role: "user", content: "hi" }]);
  });

  it("throws OllamaUnavailableError when the server cannot be reached", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("ECONNREFUSED")));

    await expect(generate("say hi")).rejects.toBeInstanceOf(OllamaUnavailableError);
  });
});
