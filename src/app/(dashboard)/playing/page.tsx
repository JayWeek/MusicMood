import NowPlayingClient from "@/components/now-playing/NowPlayingClient";
import type { GeneratedPlaylist } from "@/lib/schema/playlist.schema";

type PlayingPageProps = {
  searchParams?: Promise<{
    playlist?: string | string[];
  }>;
};

export default async function Playing({ searchParams }: PlayingPageProps) {
  const resolvedSearchParams = await searchParams;
  const playlistParam = resolvedSearchParams?.playlist;
  const rawPlaylist =
    typeof playlistParam === "string" ? playlistParam : playlistParam?.[0];

  let playlist: GeneratedPlaylist | null = null;

  if (typeof rawPlaylist === "string") {
    try {
      playlist = JSON.parse(decodeURIComponent(rawPlaylist)) as GeneratedPlaylist;
    } catch {
      playlist = null;
    }
  }

  return <NowPlayingClient playlist={playlist} />;
}
