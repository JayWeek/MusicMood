"use client";

import { Heart } from "lucide-react";

interface FavoriteButtonPlaylistProps {
  liked: boolean;
  loading?: boolean;
  size?: number;
  onClick: (playlistId: string) => Promise<void>;
  className?: string;
}

export default function FavoriteButtonPlaylist({
  liked,
  loading = false,
  size = 18,
  onClick,
  className = "",
}: FavoriteButtonPlaylistProps) {
  return (
    <button
      type="button"
      onClick={() => onClick}
      disabled={loading}
      aria-label={liked ? "Remove from favorites" : "Add to favorites"}
      aria-pressed={liked}
      className={`transition disabled:cursor-wait disabled:opacity-50 ${className}`}
    >
      <Heart
        size={size}
        className={
          liked
            ? "fill-green-500 text-green-500"
            : "text-zinc-500 hover:text-white"
        }
      />
    </button>
  );
}
