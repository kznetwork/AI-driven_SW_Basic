const CODE_LENGTH = 6;
const CODE_SPACE = 36 ** CODE_LENGTH;

export function makeCode(url: string): string {
  if (url.length === 0) {
    throw new Error('EMPTY_URL');
  }

  let hash = 2166136261;

  for (let index = 0; index < url.length; index += 1) {
    hash ^= url.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return ((hash >>> 0) % CODE_SPACE)
    .toString(36)
    .padStart(CODE_LENGTH, '0');
}
