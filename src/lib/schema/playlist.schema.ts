import { z } from "zod";

export const generatePlaylistRequestSchema = z.object({
  prompt: z.string().trim().min(3),
});

export const generatedPlaylistDraftSchema = z.object({
  playlist: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    mood: z.array(z.string().min(1)).min(1),
    songs: z
      .array(
        z.object({
          title: z.string().min(1),
          artist: z.string().min(1),
        }),
      )
      .length(7),
  }),
});

export const generatedPlaylistSchema = z.object({
  playlist: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    mood: z.array(z.string().min(1)).min(1),
    songs: z
      .array(
        z.object({
          title: z.string().min(1),
          artist: z.string().min(1),
          videoId: z.string().min(1),
          thumbnail: z.string().min(1),
          duration: z.string().min(1),
        }),
      )
      .length(7),
  }),
});

export type GeneratePlaylistRequest = z.infer<typeof generatePlaylistRequestSchema>;
export type GeneratedPlaylistDraft = z.infer<typeof generatedPlaylistDraftSchema>;
export type GeneratedPlaylist = z.infer<typeof generatedPlaylistSchema>;