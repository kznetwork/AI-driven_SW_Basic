import { randomInt } from "node:crypto";

const BASE62 =
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const CODE_LENGTH = 6;

export function makeCode(url: string): string {
  if (url.trim().length === 0) {
    throw new Error("EMPTY_URL");
  }

  let code = "";

  for (let i = 0; i < CODE_LENGTH; i += 1) {
    const index = randomInt(BASE62.length);
    code += BASE62[index];
  }

  return code;
}
