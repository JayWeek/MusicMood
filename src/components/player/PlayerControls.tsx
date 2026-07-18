"use client";

import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Repeat,
  Shuffle,
} from "lucide-react";

interface Props {
  playing: boolean;
  onToggle: () => void;
}

export default function PlayerControls({
  playing,
  onToggle,
}: Props) {
  return (
    <div className="flex items-center justify-center gap-5">

      <Shuffle
        size={18}
        className="cursor-pointer text-zinc-400 hover:text-white"
      />

      <SkipBack
        size={22}
        className="cursor-pointer"
      />

      <button
        onClick={onToggle}
        className="rounded-full bg-white p-3 text-black hover:scale-105 transition"
      >
        {playing ? (
          <Pause fill="black" />
        ) : (
          <Play fill="black" />
        )}
      </button>

      <SkipForward
        size={22}
        className="cursor-pointer"
      />

      <Repeat
        size={18}
        className="cursor-pointer text-zinc-400 hover:text-white"
      />

    </div>
  );
}