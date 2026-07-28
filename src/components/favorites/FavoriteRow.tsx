"use client";

import { Play } from "lucide-react";
import FavoriteButton from "./FavoriteButton";
import FavoriteSong from "@/types/favorite";

interface Props {
  song: FavoriteSong;
  index: number;
  onFavoriteChange: (liked: boolean) => void;
  onPlay?: (song: FavoriteSong) => void;
}

export default function FavoriteRow({ song, index, onFavoriteChange, onPlay }: Props) {
  const thumbnailUrl = song.thumbnail || "https://picsum.photos";

  return (
    <div 
      className="group grid grid-cols-[40px_4fr_3fr_auto_minmax(120px,auto)] items-center gap-4 rounded-md px-4 py-2 transition duration-150 hover:bg-zinc-800/40"
    >
      {/* Aligns track numbers cleanly beneath header sign '#' and displays play arrow on hover */}
      <div className="relative flex items-center justify-start text-zinc-400 font-normal text-base h-6 w-6 pl-1">
        <span className="group-hover:opacity-0 block transition-opacity duration-100">{index + 1}</span>
        <button
          type="button"
          onClick={() => onPlay?.(song)}
          className="absolute left-1 top-1/2 -translate-y-1/2 flex items-center justify-center opacity-0 group-hover:opacity-100 text-white transition-opacity duration-100"
        >
          <Play size={14} fill="currentColor" />
        </button>
      </div>

      {/* Track info containing the generated image thumbnail instead of music icon */}
      <div className="flex items-center gap-4 min-w-0">
        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded bg-zinc-800 shadow">
          <img
            src={thumbnailUrl}
            alt={song.title}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>

        <div className="truncate pr-4">
          <h3 className="truncate text-white text-base font-normal mb-0.5 leading-tight">{song.title}</h3>
          <p className="truncate text-sm text-zinc-400 font-normal">{song.artist}</p>
        </div>
      </div>

      {/* Collection Details */}
      <div className="truncate text-sm text-zinc-400 font-normal">Saved song</div>

      {/* Like Heart Trigger */}
      <div className="flex items-center justify-center px-2">
        <FavoriteButton
          song={{ title: song.title, artist: song.artist, youtubeId: song.youtubeId }}
          initialLiked
          onChange={onFavoriteChange}
        />
      </div>

      {/* Calendar Timestamp Alignment */}
      <div className="text-right text-sm text-zinc-400 font-normal pr-4">
        {new Date(song.createdAt).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </div>
    </div>
  );
}
