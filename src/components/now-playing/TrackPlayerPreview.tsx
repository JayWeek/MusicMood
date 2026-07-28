"use client";

import type { GeneratedPlaylist } from "@/lib/schema/playlist.schema";

import TrackArtwork from "./TrackArtwork";
import TrackMeta from "./TrackMeta";

type PlaylistSong = GeneratedPlaylist["playlist"]["songs"][number];

interface TrackPlayerPreviewProps {
  song: PlaylistSong;
  mood?: string;
  currentTime?: string;
  playing: boolean;
  liked: boolean;
  onToggle: () => void;
  onLike: () => void;
}

export default function TrackPlayerPreview({
  song,
  mood = "Focus",
  currentTime = "0:00",
  playing,
  onToggle,
}: TrackPlayerPreviewProps) {
  return (
    <>
      <TrackArtwork
        title={song.title}
        artwork={song.thumbnail}
        playing={playing}
        onToggle={onToggle}
      />

      <TrackMeta
        title={song.title}
        artist={song.artist}
        mood={mood}
        currentTime={currentTime}
        duration={song.duration}
      />
    </>
  );
}
