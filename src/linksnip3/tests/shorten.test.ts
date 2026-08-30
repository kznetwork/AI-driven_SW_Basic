import { describe, expect, it } from 'vitest';
import { makeCode } from '../src/lib/shorten';

describe('makeCode', () => {
  it('같은 URL에 항상 같은 6자리 코드를 만든다', () => {
    const url = 'https://example.com/a/long/path';

    expect(makeCode(url)).toBe(makeCode(url));
    expect(makeCode(url)).toMatch(/^[0-9a-z]{6}$/);
  });

  it('빈 문자열이면 EMPTY_URL 오류를 던진다', () => {
    expect(() => makeCode('')).toThrow(new Error('EMPTY_URL'));
  });
});
