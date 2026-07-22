"use client";

import { useState } from "react";

import type { GeneratedPlaylist } from "@/lib/schema/playlist.schema";
import NowPlayingPanel, { currentTrack } from "./NowPlayingPanel";

interface NowPlayingClientProps {
  playlist: GeneratedPlaylist | null;
}

const fallbackHistory: currentTrack[] = [
  { title: "Midnight City", artist: "M83", reason: "Recently played" },
  {
    title: "Holocene",
    artist: "Bon Iver",
    reason: "From your listening history",
  },
  { title: "Intro", artist: "The xx", reason: "Recently replayed" },
];

export default function NowPlayingClient({ playlist }: NowPlayingClientProps) {
  const [playing, setPlaying] = useState(true);
  const [liked, setLiked] = useState(true);

  const queue: currentTrack[] =
    playlist?.tracks?.map((track) => ({
      title: track.title,
      artist: track.artist,
      reason: track.reason,
    })) ?? fallbackHistory;

  return (
    <NowPlayingPanel
      playing={playing}
      setLiked={setLiked}
      liked={liked}
      setPlaying={setPlaying}
      queue={queue}
    />
  );
}
