export const CODE_LENGTH = 6;
export const CODE_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export type RandomSource = () => number;

export function generateCode(random: RandomSource = Math.random): string {
  let code = "";

  for (let index = 0; index < CODE_LENGTH; index += 1) {
    const characterIndex = Math.floor(random() * CODE_ALPHABET.length);
    code += CODE_ALPHABET[characterIndex];
  }

  return code;
}
