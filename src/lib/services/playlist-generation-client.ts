import type { GeneratedPlaylist } from "@/lib/schema/playlist.schema";

type GeneratePlaylistResponse = {
  success: boolean;
  playlist?: GeneratedPlaylist;
  message?: string;
};

export async function generatePlaylist(prompt: string): Promise<GeneratedPlaylist> {
  const response = await fetch("/api/playlists/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
  });

  const data = (await response.json()) as GeneratePlaylistResponse;

  if (!response.ok || !data.success || !data.playlist) {
    throw new Error(data.message ?? "The playlist could not be generated.");
  }

  return data.playlist;
}
