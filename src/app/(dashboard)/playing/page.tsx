// app/playing/page.tsx (Server Component)
import NowPlayingClient from "@/components/now-playing/NowPlayingClient";
import { createClient } from "@/lib/supabase/server";
import type { PlaylistData } from "@/stores/audioStore";

export const dynamic = "force-dynamic";

const isValidUuid = (value: string): boolean =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
    value
  );

const buildYouTubeThumbnailUrl = (youtubeId?: string | null): string => {
  const id = youtubeId?.trim();

  if (!id || !/^[A-Za-z0-9_-]{11}$/.test(id)) {
    return "";
  }

  return `https://img.youtube.com/vi/${id}/mqdefault.jpg`;
};

export default async function PlayingPage({
  searchParams,
}: {
  // `searchParams` is a Promise in Next.js App Router server components
  searchParams: Promise<{ playlist?: string | string[] }>;
}) {
  const resolved = await searchParams;
  const playlistId = Array.isArray(resolved.playlist)
    ? resolved.playlist[0]
    : resolved.playlist;

  let initialPlaylist: PlaylistData | null = null;

  if (playlistId && isValidUuid(playlistId)) {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("playlists")
      .select(
        `title, description, moods, playlist_songs ( title, artist, youtube_id, position )`
      )
      .eq("id", playlistId)
      .single();

    if (!error && data) {
      const songs = Array.isArray(data.playlist_songs)
        ? [...data.playlist_songs].sort(
            (left, right) => (left.position ?? 0) - (right.position ?? 0)
          )
        : [];

      initialPlaylist = {
        title: data.title,
        description: data.description ?? undefined,
        mood: Array.isArray(data.moods) ? data.moods : [],
        songs: songs.map((song) => ({
          title: song.title,
          artist: song.artist,
          videoId: song.youtube_id ?? "",
          duration: "3:30",
          thumbnail: buildYouTubeThumbnailUrl(song.youtube_id),
        })),
      };
    }
  }

  return <NowPlayingClient initialPlaylist={initialPlaylist} />;
}
