"use client";

import { Heart } from "lucide-react";
import type { FavoriteSongInput } from "@/lib/services/favorites";

interface FavoriteButtonProps {
  song: FavoriteSongInput;
  liked: boolean;
  loading?: boolean;
  size?: number;
  onClick: () => void;
  className?: string;
}

export default function FavoriteButton({
  liked,
  loading = false,
  size = 18,
  onClick,
  className = "",
}: FavoriteButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
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
