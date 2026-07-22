import { z } from "zod";

export const playlistSchema = z.object({
  mood: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  tracks: z
    .array(
      z.object({
        title: z.string().min(1),
        artist: z.string().min(1),
        reason: z.string().min(1),
      }),
    )
    .min(5)
    .max(15),
});

export type GeneratedPlaylist = z.infer<typeof playlistSchema>;