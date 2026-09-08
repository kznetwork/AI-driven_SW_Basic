import assert from "node:assert/strict";
import test from "node:test";

import { makeCode } from "./shorten.ts";

test("URL을 입력하면 6자리 Base62 코드를 반환한다", () => {
  const code = makeCode("https://a.com");

  assert.match(code, /^[0-9A-Za-z]{6}$/);
});

test("빈 문자열을 입력하면 EMPTY_URL 예외를 던진다", () => {
  assert.throws(() => makeCode(""), {
    name: "Error",
    message: "EMPTY_URL",
  });
});

test("공백만 있는 문자열도 빈 URL로 처리한다", () => {
  assert.throws(() => makeCode("   "), {
    name: "Error",
    message: "EMPTY_URL",
  });
});
