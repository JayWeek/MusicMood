"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import type { GeneratedPlaylist } from "@/lib/schema/playlist.schema";
import NowPlayingPanel, { type CurrentTrack } from "./NowPlayingPanel";

interface NowPlayingClientProps {
  playlist: GeneratedPlaylist | null;
}

const fallbackHistory: CurrentTrack[] = [
  {
    title: "Midnight City",
    artist: "M83",
    videoId: "dX3k_QDnzHE",
    thumbnail: "https://i.ytimg.com/vi/dX3k_QDnzHE/hqdefault.jpg",
    duration: "4:04",
    reason: "A default track while you create your playlist.",
  },
];

export default function NowPlayingClient({ playlist }: NowPlayingClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [playing, setPlaying] = useState(true);
  const [liked] = useState(false);

  const generatedQueue = useMemo<CurrentTrack[]>(() => {
    const songs = playlist?.playlist?.songs;

    if (!songs?.length) {
      return [];
    }

    return songs.map((song) => ({
      title: song.title,
      artist: song.artist,
      videoId: song.videoId,
      thumbnail: song.thumbnail,
      duration: song.duration,
    }));
  }, [playlist]);

  const isDefaultQueue = generatedQueue.length === 0;

  const queue = isDefaultQueue ? fallbackHistory : generatedQueue;

  const requestedTrackIndex = Number(searchParams.get("track") ?? "0");

  const currentTrackIndex =
    Number.isInteger(requestedTrackIndex) &&
    requestedTrackIndex >= 0 &&
    requestedTrackIndex < queue.length
      ? requestedTrackIndex
      : 0;

  const currentTrack = queue[currentTrackIndex] ?? null;

  const handleTrackSelect = (_track: CurrentTrack, index: number) => {
    if (index === currentTrackIndex) {
      setPlaying((current) => !current);
      return;
    }

    const params = new URLSearchParams(searchParams.toString());

    params.set("track", String(index));

    router.replace(`/playing?${params.toString()}`, {
      scroll: false,
    });

    setPlaying(true);
  };

  return (
    <NowPlayingPanel
      queue={queue}
      mood={playlist?.playlist?.title ?? ""}
      playing={playing}
      liked={liked}
      activeVideoId={currentTrack?.videoId}
      isDefaultQueue={isDefaultQueue}
      onTrackSelect={handleTrackSelect}
    />
  );
}
