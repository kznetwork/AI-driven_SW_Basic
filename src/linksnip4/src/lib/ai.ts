const OPENROUTER_ENDPOINT = "https://openrouter.ai/api/v1/chat/completions";
const DEFAULT_MODEL = "openai/gpt-4o-mini";

interface ChatCompletionResponse {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
}

export async function suggestTitle(url: string): Promise<string> {
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    console.warn("OpenRouter title suggestion failed: OPENROUTER_API_KEY is missing");
    return "";
  }

  try {
    const response = await fetch(OPENROUTER_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.OPENROUTER_MODEL || DEFAULT_MODEL,
        messages: [
          {
            role: "system",
            content: "주어진 URL을 바탕으로 8단어 이내의 자연스러운 한국어 링크 제목을 한 줄로만 작성하세요.",
          },
          {
            role: "user",
            content: url,
          },
        ],
      }),
    });

    if (!response.ok) {
      console.warn(`OpenRouter title suggestion failed: HTTP ${response.status}`);
      return "";
    }

    const data = (await response.json()) as ChatCompletionResponse;
    return data.choices?.[0]?.message?.content?.trim().split(/\r?\n/, 1)[0] ?? "";
  } catch (error) {
    console.warn("OpenRouter title suggestion failed", error);
    return "";
  }
}
