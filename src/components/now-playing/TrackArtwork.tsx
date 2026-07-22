"use client";

import Image from "next/image";
import { Pause, Play } from "lucide-react";

interface TrackArtworkProps {
  title: string;
  artwork: string;
  playing?: boolean;
  onToggle?: () => void;
}

export default function TrackArtwork({
  title,
  artwork,
  playing = false,
  onToggle,
}: TrackArtworkProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/60">
      <Image
        src={artwork}
        alt={title}
        width={200}
        height={200}
        className="aspect-square w-full object-cover transition duration-300 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

      {onToggle ? (
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-3 bottom-3 rounded-full border border-white/20 bg-black/70 p-3 text-white backdrop-blur transition hover:scale-105"
        >
          {playing ? (
            <Pause size={18} />
          ) : (
            <Play size={18} className="ml-0.5" />
          )}
        </button>
      ) : null}
    </div>
  );
}
