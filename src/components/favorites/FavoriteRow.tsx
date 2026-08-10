"use client";

// Use native <img> for small thumbnails to avoid Next image optimizer overhead
import { Heart, Pause, Play } from "lucide-react";

import { useAudioStore } from "@/stores/audioStore";
import FavoriteSong from "@/types/favorite";

interface Props {
  song: FavoriteSong;
  index: number;
  isPlaying?: boolean;
  onFavoriteChange?: (liked: boolean) => void;
  onPlay?: (song: FavoriteSong) => void;
}

function formatAddedDate(date: string | Date): string {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "";
  }

  const day = parsedDate.getUTCDate();

  const month = parsedDate.toLocaleString("en-US", {
    month: "short",
    timeZone: "UTC",
  });

  const year = parsedDate.getUTCFullYear();

  return `${month} ${day}, ${year}`;
}

export default function FavoriteRow({
  song,
  index,
  isPlaying = false,
  onFavoriteChange,
  onPlay,
}: Props) {
  const thumbnailUrl = song.thumbnail || "https://picsum.photos/40/40";

  /*
   * -------------------
   * FAVORITE STATE
   * -------------------
   */

  const isFavorite = useAudioStore(
    (state) => state.favoriteStatuses[song.youtubeId] ?? true
  );

  const isSaving = useAudioStore(
    (state) => state.favoriteSaving[song.youtubeId] ?? false
  );

  const toggleFavorite = useAudioStore((state) => state.toggleFavorite);

  /*
   * -------------------
   * FAVORITE DATA
   * -------------------
   */

  const favoriteSong = {
    title: song.title,
    artist: song.artist,
    youtubeId: song.youtubeId,
  };

  /*
   * -------------------
   * TOGGLE FAVORITE
   * -------------------
   */

  const handleFavorite = async () => {
    if (!song.youtubeId || isSaving) {
      return;
    }

    try {
      const liked = await toggleFavorite(favoriteSong);

      onFavoriteChange?.(liked);
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  return (
    <tr
      className={`group text-xs transition hover:bg-zinc-900/50 ${isPlaying ? "bg-zinc-900" : ""}`}
    >
      {/*
       * -------------------
      {/* Track number */}

      <td className="w-12 px-4">
        <span
          className={`tabular-nums ${
            isPlaying ? "text-[#1ed760]" : "text-zinc-400"
          }`}
        >
          {index + 1}
        </span>
      </td>

      {/* Track information */}

      <td className="px-4 py-3">
        <div className="flex min-w-0 items-center gap-4">
          {/* Thumbnail / Play button */}

          <button
            type="button"
            onClick={() => onPlay?.(song)}
            aria-label={
              isPlaying
                ? `Pause ${song.title} by ${song.artist}`
                : `Play ${song.title} by ${song.artist}`
            }
            className="group/thumbnail relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded bg-zinc-800 shadow focus-visible:ring-2 focus-visible:ring-[#1ed760] focus-visible:outline-none"
          >
            <img
              src={thumbnailUrl}
              alt={`${song.title} artwork`}
              width={40}
              height={40}
              loading="lazy"
              className="h-full w-full object-cover"
            />

            <div
              className={`absolute inset-0 flex items-center justify-center bg-black/50 transition-opacity ${
                isPlaying
                  ? "opacity-100"
                  : "opacity-0 group-hover/thumbnail:opacity-100"
              }`}
            >
              {isPlaying ? (
                <Pause
                  className="size-4 fill-white text-white"
                  aria-hidden="true"
                />
              ) : (
                <Play
                  className="size-4 fill-white text-white"
                  aria-hidden="true"
                />
              )}
            </div>
          </button>

          {/* Title / Artist */}

          <div className="min-w-0 truncate pr-4">
            <h3
              className={`mb-0.5 truncate text-xs leading-tight font-normal ${
                isPlaying ? "text-[#1ed760]" : "text-white"
              }`}
            >
              {song.title}
            </h3>

            <p className="truncate font-normal text-zinc-400">{song.artist}</p>
          </div>
        </div>
      </td>

      {/* Collection */}

      <td className="px-4">
        <div className="truncate font-normal text-zinc-400">Saved song</div>
      </td>

      {/* Status */}

      <td className="px-4">
        <div className="flex items-center justify-center">
          <button
            type="button"
            onClick={() => void handleFavorite()}
            disabled={isSaving}
            aria-label={
              isFavorite
                ? `Remove ${song.title} from favorites`
                : `Add ${song.title} to favorites`
            }
            aria-pressed={isFavorite}
            className="transition disabled:cursor-wait disabled:opacity-50"
          >
            <Heart
              size={18}
              className={
                isFavorite
                  ? "fill-green-500 text-green-500"
                  : "text-zinc-500 hover:text-white"
              }
            />
          </button>
        </div>
      </td>

      {/* Date added */}

      <td className="px-4 text-right">
        <div className="pr-4 text-right font-normal text-zinc-400">
          {formatAddedDate(song.createdAt)}
        </div>
      </td>
    </tr>
  );
}
