const CODE_CHARACTERS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const CODE_LENGTH = 6;
const SHORT_URL_BASE = "https://sho.rt";

// 6자리 영숫자 단축 코드를 생성한다.
function createCode(): string {
  return Array.from({ length: CODE_LENGTH }, () => {
    const index = Math.floor(Math.random() * CODE_CHARACTERS.length);
    return CODE_CHARACTERS[index];
  }).join("");
}

// 원본 URL을 받아 단축 코드, 단축 URL과 생성 시각을 반환한다.
export function shorten(url: string): {
  code: string;
  shortUrl: string;
  createdAt: string;
} {
  if (!url.trim()) {
    throw new Error("EMPTY_URL");
  }

  const code = createCode();

  return {
    code,
    shortUrl: `${SHORT_URL_BASE}/${code}`,
    createdAt: new Date().toISOString(),
  };
}
