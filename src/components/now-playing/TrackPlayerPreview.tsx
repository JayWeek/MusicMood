"use client";

import type { GeneratedPlaylist } from "@/lib/schema/playlist.schema";

import TrackArtwork from "./TrackArtwork";
import TrackMeta from "./TrackMeta";
import type { FavoriteSongInput } from "@/lib/services/favorites";

type PlaylistSong = GeneratedPlaylist["playlist"]["songs"][number];

interface TrackPlayerPreviewProps {
  song: PlaylistSong;
  mood?: string;
  currentTime?: string;
  playing: boolean;
  liked: boolean;
  onToggle: () => void;
  onLike: () => void;
  favoriteSong?: FavoriteSongInput;
}

export default function TrackPlayerPreview({
  song,
  mood = "Focus",
  currentTime = "0:00",
  playing,
  onToggle,
  onLike,
  favoriteSong,
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
        title={title}
        artist={artist}
        mood="Focus"
        currentTime="1:12"
        duration="3:24"
      />

      <TrackControls
        playing={playing}
        liked={liked}
        onToggle={onToggle}
        onLike={onLike}
        favoriteSong={favoriteSong}
      />
    </>
  );
}
