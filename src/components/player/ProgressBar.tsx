"use client";

interface Props {
  current: string;
  duration: string;
}

export default function ProgressBar({
  current,
  duration,
}: Props) {
  return (
    <div className="flex items-center gap-3 w-full">

      <span className="text-xs text-zinc-400">
        {current}
      </span>

      <input
        type="range"
        min={0}
        max={100}
        value={30}
        readOnly
        className="w-full accent-green-500"
      />

      <span className="text-xs text-zinc-400">
        {duration}
      </span>

    </div>
  );
}