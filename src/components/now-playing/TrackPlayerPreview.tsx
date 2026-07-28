"use client";

import TrackArtwork from "./TrackArtwork";
import TrackMeta from "./TrackMeta";
import type { FavoriteSongInput } from "@/lib/services/favorites";
import { PlaylistSong } from "@/stores/audioStore";
interface TrackPlayerPreviewProps {
  song: PlaylistSong;
  playlistMood: string;
  currentTime: string;
  durration: string;
  playing: boolean;
  liked: boolean;
  onToggle: () => void;
  favoriteSong?: FavoriteSongInput;
}

export default function TrackPlayerPreview({
  song,
  playing,
  onToggle,
  currentTime,
  playlistMood,
  durration,
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
        mood={playlistMood}
        currentTime={currentTime || ""}
        duration={durration}
      />
    </>
  );
}
