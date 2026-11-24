// src/lib/shorten.ts — 5.7 기법 실습용 시작 코드 (일부러 고칠 거리를 남겨 두었다)
const ALPHABET = "abcdefghijklmnopqrstuvwxyz0123456789";

// URL 을 6자리 코드로 바꾼다.
// 고칠 거리: ① 같은 URL 도 매번 다른 코드 ② 충돌 처리 없음 ③ 빈 문자열 검사 없음
export function makeCode(url: string): string {
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
  }
  return code;
}

export function shortUrl(url: string, base = "https://snip.example/"): string {
  return base + makeCode(url);
}
