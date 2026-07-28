"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

import {
  isFavoriteSong,
  toggleFavoriteSong,
  type FavoriteSongInput,
} from "@/lib/services/favorites";

interface FavoriteButtonProps {
  song: FavoriteSongInput;
  initialLiked?: boolean;
  size?: number;
  onChange?: (liked: boolean) => void;
  className?: string;
}

export default function FavoriteButton({
  song,
  initialLiked = false,
  size = 18,
  onChange,
  className = "",
}: FavoriteButtonProps) {
  const [liked, setLiked] = useState(initialLiked);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    let isMounted = true;
    void isFavoriteSong(song.youtubeId)
      .then((value) => {
        if (isMounted) setLiked(value);
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, [song.youtubeId]);

  async function handleClick() {
    if (isSaving) return;
    const previousLiked = liked;
    setLiked(!previousLiked);
    setIsSaving(true);

    try {
      const result = await toggleFavoriteSong(song);
      setLiked(result.liked);
      onChange?.(result.liked);
    } catch {
      setLiked(previousLiked);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={liked ? "Remove from favorites" : "Add to favorites"}
      aria-pressed={liked}
      disabled={isSaving}
      className={"transition disabled:cursor-wait disabled:opacity-60 " + className}
    >
      <Heart
        size={size}
        className={liked ? "fill-green-500 text-green-500" : "text-zinc-500 hover:text-white"}
      />
    </button>
  );
}
