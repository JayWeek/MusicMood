"use client";

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds <= 0) {
    return "0:00";
  }

  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");

  return `${mins}:${secs}`;
}

interface Props {
  current: number;
  duration: number;
  onSeek: (value: number) => void;
}

export default function ProgressBar({ current, duration, onSeek }: Props) {
  const progressValue = Math.min(Math.max(current, 0), duration || 0);

  return (
    <div className="flex w-full items-center gap-2">
      <span className="text-xs text-zinc-400">{formatTime(current)}</span>

      <input
        type="range"
        min={0}
        max={duration || 100}
        value={progressValue}
        onChange={(event) => onSeek(Number(event.target.value))}
        className="w-full accent-green-500"
      />

      <span className="text-xs text-zinc-400">{formatTime(duration)}</span>
    </div>
  );
}
