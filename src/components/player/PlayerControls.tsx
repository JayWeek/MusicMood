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
    <div className="flex items-center justify-center gap-2.5 sm:gap-4 lg:gap-5">
      {/* Shuffle */}
      <button
        type="button"
        onClick={onToggleShuffle}
        aria-pressed={shuffleEnabled}
        aria-label="Toggle shuffle"
        className={
          shuffleEnabled ? "text-green-400" : "text-zinc-400 hover:text-white"
        }
      >
        <Shuffle className="size-3.5 sm:size-4 lg:size-[18px]" />
      </button>

      {/* Previous */}
      <button
        type="button"
        onClick={onPrevious}
        aria-label="Previous track"
        className="text-zinc-300 transition hover:text-white"
      >
        <SkipBack className="size-4.5 sm:size-5 lg:size-[22px]" />
      </button>

      {/* Play / Pause */}
      <button
        type="button"
        onClick={onToggle}
        aria-label={playing ? "Pause" : "Play"}
        className="rounded-full bg-white p-2 text-black transition hover:scale-105 sm:p-2.5 lg:p-3"
      >
        {playing ? (
          <Pause fill="black" className="size-4 sm:size-5 lg:size-6" />
        ) : (
          <Play fill="black" className="size-4 sm:size-5 lg:size-6" />
        )}
      </button>

      {/* Next */}
      <button
        type="button"
        onClick={onNext}
        aria-label="Next track"
        className="text-zinc-300 transition hover:text-white"
      >
        <SkipForward className="size-4.5 sm:size-5 lg:size-[22px]" />
      </button>

      {/* Repeat */}
      <button
        type="button"
        onClick={onCycleRepeatMode}
        aria-pressed={repeatMode !== "off"}
        aria-label={`Repeat mode: ${repeatMode}`}
        className={
          repeatMode === "off"
            ? "text-zinc-400 hover:text-white"
            : "text-green-400"
        }
      >
        {repeatMode === "one" ? (
          <Repeat1 className="size-3.5 sm:size-4 lg:size-[18px]" />
        ) : (
          <Repeat className="size-3.5 sm:size-4 lg:size-[18px]" />
        )}
      </button>
    </div>
  );
}
