import assert from "node:assert/strict";
import { afterEach, beforeEach, test } from "node:test";

import { suggestTitle } from "../src/lib/ai.ts";

const originalFetch = globalThis.fetch;
const originalApiKey = process.env.OPENROUTER_API_KEY;
const originalModel = process.env.OPENROUTER_MODEL;
const originalWarn = console.warn;

beforeEach(() => {
  process.env.OPENROUTER_API_KEY = "test-key";
  delete process.env.OPENROUTER_MODEL;
  console.warn = () => {};
});

afterEach(() => {
  globalThis.fetch = originalFetch;
  console.warn = originalWarn;

  if (originalApiKey === undefined) delete process.env.OPENROUTER_API_KEY;
  else process.env.OPENROUTER_API_KEY = originalApiKey;

  if (originalModel === undefined) delete process.env.OPENROUTER_MODEL;
  else process.env.OPENROUTER_MODEL = originalModel;
});

test("OpenRouter에 URL을 보내고 한 줄 제목을 반환한다", async () => {
  let request: { input: RequestInfo | URL; init: RequestInit | undefined } | undefined;
  globalThis.fetch = async (input, init) => {
    request = { input, init };
    return new Response(JSON.stringify({
      choices: [{ message: { content: "  유용한 타입스크립트 입문 가이드\n설명" } }],
    }), { status: 200 });
  };

  const title = await suggestTitle("https://example.com/typescript");

  assert.equal(title, "유용한 타입스크립트 입문 가이드");
  assert.equal(request?.input, "https://openrouter.ai/api/v1/chat/completions");
  assert.equal(request?.init?.method, "POST");
  assert.equal((request?.init?.headers as Record<string, string>).Authorization, "Bearer test-key");

  const body = JSON.parse(request?.init?.body as string);
  assert.equal(body.model, "openai/gpt-4o-mini");
  assert.equal(body.messages[1].content, "https://example.com/typescript");
});

test("환경변수 모델을 사용한다", async () => {
  process.env.OPENROUTER_MODEL = "google/gemini-2.0-flash-001";
  let body: { model?: string } = {};
  globalThis.fetch = async (_input, init) => {
    body = JSON.parse(init?.body as string);
    return new Response(JSON.stringify({ choices: [] }), { status: 200 });
  };

  await suggestTitle("https://example.com");

  assert.equal(body.model, "google/gemini-2.0-flash-001");
});

test("API 키가 없으면 경고하고 빈 문자열을 반환한다", async () => {
  delete process.env.OPENROUTER_API_KEY;
  let warned = false;
  console.warn = () => { warned = true; };

  assert.equal(await suggestTitle("https://example.com"), "");
  assert.equal(warned, true);
});

test("네트워크 오류가 발생하면 경고하고 빈 문자열을 반환한다", async () => {
  globalThis.fetch = async () => { throw new Error("network unavailable"); };
  let warned = false;
  console.warn = () => { warned = true; };

  assert.equal(await suggestTitle("https://example.com"), "");
  assert.equal(warned, true);
});
