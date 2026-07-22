"use client";

import { Heart, Pause, Play } from "lucide-react";

interface EachTrackInPlaylistProps {
  title: string;
  artist: string;
  playing: boolean;
  liked: boolean;
  onClick?: () => void;
  isDefault?: boolean;
}

export default function EachTrackInPlaylist({
  title,
  artist,
  playing,
  liked,
  onClick,
  isDefault = false,
}: EachTrackInPlaylistProps) {
  return (
    <li
      onClick={onClick}
      className="flex cursor-pointer items-center justify-between rounded-lg bg-zinc-950/50 px-3 py-2 transition hover:bg-zinc-800"
    >
      <div>
        <p className="font-medium text-zinc-200">{title}</p>
        <p className="text-xs text-zinc-500">{artist}</p>
      </div>

      <div className="flex items-center justify-between gap-3">
        {isDefault ? (
          <span className="rounded-full bg-green-500/10 px-2 py-1 text-[8px] font-medium tracking-[0.2em] text-green-400">
            click to generate your own tracks based on your current mood
          </span>
        ) : null}

        <span className="text-xs tracking-[0.2em] text-zinc-600 uppercase">
          {playing ? (
            <Pause size={18} />
          ) : (
            <Play size={18} className="ml-0.5" />
          )}
        </span>

        <span className="text-xs tracking-[0.2em] text-zinc-600 uppercase">
          <Heart size={16} className={liked ? "fill-current" : ""} />
        </span>
      </div>
    </li>
  );
}
