export interface CodeStore {
  get(code: string): Promise<string | null>;
  put(code: string, url: string): Promise<void>;
}

export class InMemoryCodeStore implements CodeStore {
  private readonly entries = new Map<string, string>();

  async get(code: string): Promise<string | null> {
    return this.entries.get(code) ?? null;
  }

  async put(code: string, url: string): Promise<void> {
    this.entries.set(code, url);
  }
}
