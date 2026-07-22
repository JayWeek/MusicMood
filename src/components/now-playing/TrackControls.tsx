"use client";

import {
  Heart,
  Pause,
  Play,
  Repeat2,
  SkipBack,
  SkipForward,
  Sparkles,
  Volume2,
} from "lucide-react";

interface TrackControlsProps {
  playing: boolean;
  liked: boolean;
  onToggle: () => void;
  onLike: () => void;
}

export default function TrackControls({
  playing,
  liked,
  onToggle,
  onLike,
}: TrackControlsProps) {
  return (
    <div className="mt-5 space-y-4">
      <div className="flex items-center justify-center gap-3">
        <button
          type="button"
          className="rounded-full p-2 text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
        >
          <SkipBack size={18} />
        </button>

        <button
          type="button"
          onClick={onToggle}
          className="rounded-full bg-white p-3 text-black transition hover:scale-105"
        >
          {playing ? (
            <Pause size={18} />
          ) : (
            <Play size={18} className="ml-0.5" />
          )}
        </button>

        <button
          type="button"
          className="rounded-full p-2 text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
        >
          <SkipForward size={18} />
        </button>
      </div>

      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-950/70 px-3 py-2 text-sm text-zinc-400">
          <Sparkles size={14} className="text-green-400" />
          AI Mix
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onLike}
            className={`rounded-full p-2 transition ${
              liked
                ? "bg-green-500/15 text-green-400"
                : "bg-zinc-800 text-zinc-400 hover:text-white"
            }`}
          >
            <Heart size={16} className={liked ? "fill-current" : ""} />
          </button>

          <button
            type="button"
            className="rounded-full bg-zinc-800 p-2 text-zinc-400 transition hover:text-white"
          >
            <Repeat2 size={16} />
          </button>

          <button
            type="button"
            className="rounded-full bg-zinc-800 p-2 text-zinc-400 transition hover:text-white"
          >
            <Volume2 size={16} />
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <div className="h-1.5 w-full rounded-full bg-zinc-800">
          <div className="h-1.5 w-[36%] rounded-full bg-green-500" />
        </div>
        <div className="flex items-center justify-between text-[11px] tracking-[0.2em] text-zinc-500 uppercase">
          <span>1:12</span>
          <span>3:24</span>
        </div>
      </div>
    </div>
  );
}
