"use client";

interface TrackMetaProps {
  title: string;
  artist: string;
  mood: string;
  currentTime: string;
  duration: string;
}

export default function TrackMeta({
  title,
  artist,
  mood,
  currentTime,
  duration,
}: TrackMetaProps) {
  return (
    <div className="mt-4 space-y-3">
      <div>
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        <p className="text-sm text-zinc-400">{artist}</p>
      </div>

      <div className="flex items-center justify-between gap-2 text-xs text-zinc-400">
        <span className="rounded-full bg-green-500/15 px-2.5 py-1 font-medium text-green-400">
          {mood}
        </span>
        <span>
          {currentTime} / {duration}
        </span>
      </div>
    </div>
  );
}
