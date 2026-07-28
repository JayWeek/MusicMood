import { z } from "zod";
import { SUPPORTED_MOODS } from "@/lib/constants/supported-moods";

export const PROMPT_COUNT = 10;

export const supportedMoodSchema = z.enum(SUPPORTED_MOODS);

export const randomPromptItemSchema = z
  .object({
    prompt: z.string().trim().min(5).max(70),

    description: z.string().trim().min(20).max(120),

    moods: z
      .array(supportedMoodSchema)
      .min(1)
      .max(2)
      .refine(
        (moods) => new Set(moods).size === moods.length,
        "Mood values must be unique"
      ),

    artistLike: z
      .array(z.string().trim().min(1).max(40))
      .min(1)
      .max(2)
      .refine(
        (artists) =>
          new Set(artists.map((artist) => artist.toLowerCase())).size ===
          artists.length,
        "Artist names must be unique"
      ),
  })
  .strict();

export const generatedPromptSchema = z
  .object({
    prompt: z.string().trim().min(5).max(70),
    description: z.string().trim().min(10).max(120),

    artistLike: z.array(z.string().trim().min(1).max(40)).min(1).max(2),
  })
  .strict();

export const generatedPromptsSchema = z
  .object({
    randomPrompts: z.array(generatedPromptSchema).length(10),
  })
  .strict();

export const randomPromptsSchema = z
  .object({
    randomPrompts: z.array(randomPromptItemSchema).length(PROMPT_COUNT),
  })
  .strict();

export const randomPromptRequestSchema = z
  .object({
    mood: z.string().trim().toLowerCase().pipe(supportedMoodSchema),
  })
  .strict();

export type RandomPromptsResponse = z.infer<typeof randomPromptsSchema>;
