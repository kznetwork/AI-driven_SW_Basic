import { generateCode } from "./code.ts";
import type { CodeStore } from "./code-store.ts";

const DEFAULT_MAX_ATTEMPTS = 10;

export type CodeGenerator = () => string;

export async function saveShortLink(
  url: string,
  store: CodeStore,
  createCode: CodeGenerator = generateCode,
  maxAttempts = DEFAULT_MAX_ATTEMPTS,
): Promise<string> {
  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    const code = createCode();

    if (await store.get(code) === null) {
      await store.put(code, url);
      return code;
    }
  }

  throw new Error(`Failed to create a unique code after ${maxAttempts} attempts`);
}
