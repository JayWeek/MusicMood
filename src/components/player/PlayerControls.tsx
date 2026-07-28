"use client";

import type { RepeatMode } from "@/stores/audioStore";

import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Repeat,
  Repeat1,
  Shuffle,
} from "lucide-react";

interface Props {
  playing: boolean;
  onToggle: () => void;
  onNext: () => void;
  onPrevious: () => void;
  shuffleEnabled: boolean;
  repeatMode: RepeatMode;
  onToggleShuffle: () => void;
  onCycleRepeatMode: () => void;
}

export default function PlayerControls({
  playing,
  onToggle,
  onNext,
  onPrevious,
  shuffleEnabled,
  repeatMode,
  onToggleShuffle,
  onCycleRepeatMode,
}: Props) {
  return (
    <div className="flex items-center justify-center gap-5">

      <button
        type="button"
        onClick={onToggleShuffle}
        aria-pressed={shuffleEnabled}
        aria-label="Toggle shuffle"
        className={shuffleEnabled ? "text-green-400" : "text-zinc-400 hover:text-white"}
      >
        <Shuffle size={18} />
      </button>

      <button type="button" onClick={onPrevious}>
        <SkipBack size={22} className="cursor-pointer" />
      </button>

      <button
        type="button"
        onClick={onToggle}
        className="rounded-full bg-white p-3 text-black transition hover:scale-105"
      >
        {playing ? (
          <Pause fill="black" />
        ) : (
          <Play fill="black" />
        )}
      </button>

      <button type="button" onClick={onNext}>
        <SkipForward size={22} className="cursor-pointer" />
      </button>

      <button
        type="button"
        onClick={onCycleRepeatMode}
        aria-pressed={repeatMode !== "off"}
        aria-label={`Repeat mode: ${repeatMode}`}
        className={repeatMode === "off" ? "text-zinc-400 hover:text-white" : "text-green-400"}
      >
        {repeatMode === "one" ? <Repeat1 size={18} /> : <Repeat size={18} />}
      </button>

    </div>
  );
}