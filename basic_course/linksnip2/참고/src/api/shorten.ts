// src/api/shorten.ts — URL을 6자리 코드로 줄이는 최소 구현 (6.5 준비 단계의 예시)
export interface ShortenResult {
  code: string;
  shortUrl: string;
}

export function shorten(url: string): ShortenResult {
  if (!url) throw new Error("EMPTY_URL");   // 빈 입력 방어
  const code = Math.random().toString(36).slice(2, 8); // 6자리
  return { code, shortUrl: `https://snip.example/${code}` };
}
