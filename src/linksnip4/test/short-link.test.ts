import assert from "node:assert/strict";
import { test } from "node:test";

import { InMemoryCodeStore } from "../src/lib/code-store.ts";
import { saveShortLink } from "../src/lib/short-link.ts";

test("생성한 코드와 원본 URL을 저장한다", async () => {
  const store = new InMemoryCodeStore();

  const code = await saveShortLink("https://example.com/long", store, () => "aB3xY9");

  assert.equal(code, "aB3xY9");
  assert.equal(await store.get(code), "https://example.com/long");
});

test("충돌한 기존 값을 덮어쓰지 않고 새 코드로 저장한다", async () => {
  const store = new InMemoryCodeStore();
  await store.put("ABC123", "https://existing.example");
  const codes = ["ABC123", "NEW456"];

  const code = await saveShortLink("https://new.example", store, () => codes.shift()!);

  assert.equal(code, "NEW456");
  assert.equal(await store.get("ABC123"), "https://existing.example");
  assert.equal(await store.get("NEW456"), "https://new.example");
});

test("최대 재시도 횟수 동안 충돌하면 실패한다", async () => {
  const store = new InMemoryCodeStore();
  await store.put("ABC123", "https://existing.example");

  await assert.rejects(
    saveShortLink("https://new.example", store, () => "ABC123", 2),
    /after 2 attempts/,
  );
  assert.equal(await store.get("ABC123"), "https://existing.example");
});
