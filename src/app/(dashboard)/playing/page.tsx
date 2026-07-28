import NowPlayingClient from "@/components/now-playing/NowPlayingClient";
import type { GeneratedPlaylist } from "@/lib/schema/playlist.schema";

type PlayingPageProps = {
  searchParams: Promise<{
    playlist?: string | string[];
  }>;
};

export default async function Playing({ searchParams }: PlayingPageProps) {
  const resolvedSearchParams = await searchParams;
  const playlistParam = resolvedSearchParams.playlist;

  const rawPlaylist = Array.isArray(playlistParam)
    ? playlistParam[0]
    : playlistParam;

  let playlist: GeneratedPlaylist | null = null;

  if (rawPlaylist) {
    try {
      playlist = JSON.parse(rawPlaylist) as GeneratedPlaylist;
    } catch (error) {
      console.error("Unable to parse playlist parameter:", error);
    }
  }

  return <NowPlayingClient playlist={playlist} />;
}
