"use client";

import Image from "next/image";
import { Heart, Play } from "lucide-react";
import Track from "@/types/track";

interface TrackRowProps {
  track: Track;
  index: number;
  showPlayedAt?: boolean;
  onPlay?: (track: Track) => void;
  onLike?: (track: Track) => void;
}
export default function TrackRow({
  track,
  index,
  showPlayedAt = false,
  onPlay,
  onLike,
  
}: TrackRowProps) {
  return (
    <div className="group grid grid-cols-12 items-center rounded-lg px-4 py-3 transition hover:bg-zinc-900">
      <div className="col-span-1 flex items-center gap-3">
        <button
          onClick={() => onPlay?.(track)}
          className="opacity-0 transition group-hover:opacity-100"
        >
          <Play size={16} />
        </button>

        <span>{index + 1}</span>
      </div>

      <div className="col-span-5 flex items-center gap-4">
        <Image
          src={track.artwork}
          alt={track.title}
          width={50}
          height={50}
          className="rounded-md"
        />

        <div>
          <h3>{track.title}</h3>

          <p className="text-sm text-zinc-400">{track.artist}</p>
        </div>
      </div>

      <div className="col-span-4 text-zinc-400">{track.album}</div>

      <div className="col-span-1">
        <button onClick={() => onLike?.(track)}>
          <Heart
            size={18}
            className={
              track.liked ? "fill-green-500 text-green-500" : "text-zinc-500"
            }
          />
        </button>
      </div>

      {showPlayedAt ? (
        <div className="col-span-2 text-right text-sm text-zinc-400">
          {track.playedAt}
        </div>
      ) : (
        <div className="col-span-1 text-right">{track.duration}</div>
      )}
    </div>
  );
}
