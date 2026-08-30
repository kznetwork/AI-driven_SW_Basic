import assert from "node:assert/strict";
import { test } from "node:test";

import { CODE_ALPHABET, CODE_LENGTH, generateCode } from "../src/lib/code.ts";

test("항상 허용 문자로 된 6자리 코드를 생성한다", () => {
  for (let index = 0; index < 10_000; index += 1) {
    const code = generateCode();

    assert.equal(code.length, CODE_LENGTH);
    assert.match(code, /^[A-Za-z0-9]{6}$/);
  }
});

test("주입한 난수 생성기를 사용한다", () => {
  assert.equal(generateCode(() => 0), CODE_ALPHABET.charAt(0).repeat(CODE_LENGTH));
});
