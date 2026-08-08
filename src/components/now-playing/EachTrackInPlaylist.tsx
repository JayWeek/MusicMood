"use client";

import Image from "next/image";
import { Music2, Pause, Play } from "lucide-react";

import { PlaylistSong, useAudioStore } from "@/stores/audioStore";
import FavoriteButton from "../favorites/FavoriteButton";

interface EachTrackInPlaylistProps {
  song: PlaylistSong;
  index: number;
  playing: boolean;
  onClick?: () => void;
  isDefault?: PlaylistSong;
}

function isAbsoluteImageUrl(value: string): boolean {
  try {
    const url = new URL(value);

    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

function getTrackArtwork(song: PlaylistSong): string | null {
  if (isAbsoluteImageUrl(song.thumbnail)) {
    return song.thumbnail;
  }

  const normalizedVideoId = song.videoId.trim();

  if (
    normalizedVideoId &&
    !normalizedVideoId.toLowerCase().startsWith("unknown")
  ) {
    return `https://i.ytimg.com/vi/${encodeURIComponent(
      normalizedVideoId
    )}/hqdefault.jpg`;
  }

  return null;
}

export default function EachTrackInPlaylist({
  song,
  index,
  playing,
  onClick,
}: EachTrackInPlaylistProps) {
  const artwork = getTrackArtwork(song);

  /*
   * Favorite state comes directly from Zustand.
   */
  const isFavorite = useAudioStore(
    (state) => state.favoriteStatuses[song.videoId] ?? false
  );

  /*
   * Saving state is also per song.
   *
   * Example:
   *
   * favoriteSaving = {
   *   "abc123": true,
   *   "xyz456": false
   * }
   */
  const isFavoriteSaving = useAudioStore(
    (state) => state.favoriteSaving[song.videoId] ?? false
  );

  const toggleFavorite = useAudioStore((state) => state.toggleFavorite);

  const favoriteSong = {
    title: song.title,
    artist: song.artist,
    youtubeId: song.videoId,
  };

  const handleFavorite = async () => {
    if (!song.videoId || isFavoriteSaving) {
      return;
    }

    try {
      await toggleFavorite(favoriteSong);
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  return (
    <div className="flex items-center gap-3 rounded p-2 px-2 py-2 hover:bg-zinc-800/50">
      {/* Track number */}
      <span
        className={`text-sm tabular-nums ${
          playing ? "text-[#1ed760]" : "text-zinc-400"
        }`}
      >
        {index + 1}
      </span>

      {/* Track information */}
      <div className="flex min-w-0 items-center gap-3">
        {/* Thumbnail / Play Button */}
        <button
          type="button"
          onClick={onClick}
          aria-label={
            playing
              ? `Pause ${song.title} by ${song.artist}`
              : `Play ${song.title} by ${song.artist}`
          }
          className="group/thumbnail relative flex size-12 shrink-0 items-center justify-center overflow-hidden rounded bg-gradient-to-br from-[#1ed760] to-[#063d1b] focus-visible:ring-2 focus-visible:ring-[#1ed760] focus-visible:outline-none"
        >
          {artwork ? (
            <Image
              src={artwork}
              alt={`${song.title} artwork`}
              width={48}
              height={48}
              className="size-full object-cover"
            />
          ) : (
            <Music2 className="size-5 text-black" aria-hidden="true" />
          )}

          {/* Hover / playing overlay */}
          <div
            className={`absolute inset-0 flex items-center justify-center bg-black/50 transition-opacity ${
              playing
                ? "opacity-100"
                : "opacity-0 group-hover/thumbnail:opacity-100"
            }`}
          >
            {playing ? (
              <Pause
                className="size-5 fill-white text-white"
                aria-hidden="true"
              />
            ) : (
              <Play
                className="size-5 fill-white text-white"
                aria-hidden="true"
              />
            )}
          </div>
        </button>

        {/* Title / Artist */}
        <div className="min-w-0">
          <p
            className={`truncate text-sm font-medium ${
              playing ? "text-[#1ed760]" : "text-white"
            }`}
          >
            {song.title}
          </p>

          <p className="mt-0.5 truncate text-sm text-[#b3b3b3]">
            {song.artist}
          </p>
        </div>
      </div>

      {/* Favorite */}
      <div className="ml-auto">
        <FavoriteButton
          song={favoriteSong}
          liked={isFavorite}
          loading={isFavoriteSaving}
          onClick={() => {
            void handleFavorite();
          }}
          size={16}
        />
      </div>
    </div>
  );
}
