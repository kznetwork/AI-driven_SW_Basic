import { describe, expect, it } from "vitest";
import { makeCode } from "../src/lib/shorten";

describe("makeCode", () => {
  it("6자리 영문 소문자 · 숫자 코드를 만든다", () => {
    expect(makeCode("https://a.com")).toMatch(/^[a-z0-9]{6}$/);
  });
});
