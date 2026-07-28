import Groq from "groq-sdk";

import {
  generatedPromptsSchema,
  supportedMoodSchema,
  type RandomPromptsResponse,
} from "@/lib/schema/random-prompts";

const PROMPT_COUNT = 10;
const MODEL = "openai/gpt-oss-20b";
const INITIAL_TOKEN_LIMIT = 4096;
const RETRY_TOKEN_LIMIT = 6000;

function getPrompt(mood: string): string {
  return `
Generate exactly ${PROMPT_COUNT} unique music playlist ideas for "${mood}".

Return only this JSON structure:

{
  "randomPrompts": [
    {
      "prompt": "Playlist title",
      "description": "Short playlist description",
      "artistLike": ["Artist name"]
    }
  ]
}

Requirements:
- Exactly ${PROMPT_COUNT} items.
- Unique playlist titles.
- One or two real artists per item.
- Descriptions must be 10 to 120 characters.
- No markdown or extra properties.
- Return only valid JSON.
  `.trim();
}

function isJsonValidationError(error: unknown): boolean {
  if (typeof error !== "object" || error === null) {
    return false;
  }

  const groqError = error as {
    code?: string;
    error?: {
      code?: string;
      error?: {
        code?: string;
      };
    };
  };

  return [
    groqError.code,
    groqError.error?.code,
    groqError.error?.error?.code,
  ].includes("json_validate_failed");
}

function extractJson(content: string): unknown {
  const cleaned = content
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");

  if (start === -1 || end === -1 || end < start) {
    throw new Error("JSON_NOT_FOUND");
  }

  return JSON.parse(cleaned.slice(start, end + 1));
}

async function requestGeneration(
  client: Groq,
  mood: string,
  useJsonMode: boolean,
  maxCompletionTokens = INITIAL_TOKEN_LIMIT
) {
  return client.chat.completions.create({
    model: MODEL,
    stream: false,
    temperature: 0.2,
    max_completion_tokens: maxCompletionTokens,

    // GPT-OSS uses reasoning tokens from the completion-token budget.
    reasoning_effort: "low",
    include_reasoning: false,

    messages: [
      {
        role: "system",
        content:
          "You generate music playlist ideas. Return only one valid JSON object with no markdown or commentary.",
      },
      {
        role: "user",
        content: getPrompt(mood),
      },
    ],

    ...(useJsonMode
      ? {
          response_format: {
            type: "json_object" as const,
          },
        }
      : {}),
  });
}

export default async function generateRandomPromptsFromAi(
  client: Groq,
  options: {
    mood: unknown;
  }
): Promise<RandomPromptsResponse> {
  const moodResult = supportedMoodSchema.safeParse(
    typeof options.mood === "string"
      ? options.mood.trim().toLowerCase()
      : options.mood
  );

  if (!moodResult.success) {
    throw new Error("INVALID_MOOD");
  }

  const mood = moodResult.data;

  try {
    let completion;

    try {
      completion = await requestGeneration(client, mood, true);
    } catch (error) {
      if (!isJsonValidationError(error)) {
        throw error;
      }

      console.warn("Groq JSON mode failed. Using plain JSON fallback.");

      completion = await requestGeneration(client, mood, false);
    }

    let choice = completion.choices[0];
    let content = choice?.message?.content?.trim();

    if (!content) {
      console.warn(
        "Groq returned empty content. Retrying with a larger token budget.",
        {
          model: completion.model,
          finishReason: choice?.finish_reason,
          usage: completion.usage,
        }
      );

      completion = await requestGeneration(
        client,
        mood,
        false,
        RETRY_TOKEN_LIMIT
      );

      choice = completion.choices[0];
      content = choice?.message?.content?.trim();
    }

    if (!content) {
      console.error("Groq retry returned empty content.", {
        model: completion.model,
        finishReason: choice?.finish_reason,
        usage: completion.usage,
      });

      throw new Error(
        choice?.finish_reason === "length"
          ? "GROQ_OUTPUT_TOKEN_LIMIT"
          : "EMPTY_AI_RESPONSE"
      );
    }

    const parsed = extractJson(content);
    const validation = generatedPromptsSchema.safeParse(parsed);

    if (!validation.success) {
      console.error(
        "Generated prompt validation failed:",
        validation.error.flatten()
      );

      throw new Error("INVALID_GENERATED_DATA");
    }

    const normalizedTitles = validation.data.randomPrompts.map((item) =>
      item.prompt.trim().toLowerCase()
    );

    if (new Set(normalizedTitles).size !== normalizedTitles.length) {
      throw new Error("DUPLICATE_PROMPTS");
    }

    return {
      randomPrompts: validation.data.randomPrompts.map((item) => ({
        ...item,
        moods: [mood],
      })),
    };
  } catch (error) {
    console.error("Groq prompt generation failed:", error);

    throw new Error("PROMPT_GENERATION_FAILED", {
      cause: error,
    });
  }
}
