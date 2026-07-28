import { GeneratedMoodPrompt } from "./mood-prompt-list";

export interface ApiErrorResponse {
  error?: string;
  message?: string;
}

export interface RandomPromptsResponse {
  randomPrompts: GeneratedMoodPrompt[];
}

export interface MoodDiscoveryProps {
  defaultPrompts: GeneratedMoodPrompt[];
  isLoadingDefaultPrompts?: boolean;
  isDefaultError?: boolean;
}

export const DEFAULT_ERROR_MESSAGE =
  "Unable to generate mood prompts. Please try again.";

export function isGeneratedMoodPrompt(
  value: unknown
): value is GeneratedMoodPrompt {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const prompt = value as Record<string, unknown>;

  return (
    typeof prompt.prompt === "string" &&
    prompt.prompt.trim().length > 0 &&
    typeof prompt.description === "string" &&
    prompt.description.trim().length > 0 &&
    Array.isArray(prompt.moods) &&
    prompt.moods.every((mood) => typeof mood === "string") &&
    Array.isArray(prompt.artistLike) &&
    prompt.artistLike.every((artist) => typeof artist === "string")
  );
}

export function isRandomPromptsResponse(
  value: unknown
): value is RandomPromptsResponse {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const response = value as Record<string, unknown>;

  return (
    Array.isArray(response.randomPrompts) &&
    response.randomPrompts.every(isGeneratedMoodPrompt)
  );
}

export function getApiErrorMessage(value: unknown): string {
  if (typeof value !== "object" || value === null) {
    return DEFAULT_ERROR_MESSAGE;
  }

  const response = value as ApiErrorResponse;

  if (
    typeof response.message === "string" &&
    response.message.trim().length > 0
  ) {
    return response.message;
  }

  if (typeof response.error === "string" && response.error.trim().length > 0) {
    return response.error;
  }

  return DEFAULT_ERROR_MESSAGE;
}
