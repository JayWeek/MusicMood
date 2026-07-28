"use client";

import Image from "next/image";
import { Music2, Pause, Play } from "lucide-react";

interface TrackArtworkProps {
  title: string;
  artwork?: string | null;
  videoId?: string | null;
  playing: boolean;
  onToggle: () => void;
}

function isValidImageSource(value: string | null | undefined): value is string {
  if (!value) {
    return false;
  }

  // Allow valid local images.
  if (value.startsWith("/")) {
    return true;
  }

  try {
    const url = new URL(value);

    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

function getArtworkSource({
  artwork,
  videoId,
}: {
  artwork?: string | null;
  videoId?: string | null;
}): string | null {
  if (isValidImageSource(artwork)) {
    return artwork;
  }

  const normalizedVideoId = videoId?.trim() ?? "";

  if (
    normalizedVideoId &&
    !normalizedVideoId.toLowerCase().startsWith("unknown")
  ) {
    return `https://i.ytimg.com/vi/${encodeURIComponent(
      normalizedVideoId
    )}/hqdefault.jpg`;
  }

  return null;
}

export default function TrackArtwork({
  title,
  artwork,
  videoId,
  playing,
  onToggle,
}: TrackArtworkProps) {
  const artworkSource = getArtworkSource({
    artwork,
    videoId,
  });

  return (
    <div className="group relative aspect-square overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/60">
      {artworkSource ? (
        <Image
          src={artworkSource}
          alt={`${title} artwork`}
          fill
          sizes="320px"
          priority
          className="object-cover"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#1ed760] to-[#063d1b]">
          <Music2 className="size-16 text-black" aria-hidden="true" />
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

      <button
        type="button"
        onClick={onToggle}
        className="absolute inset-0 flex items-center justify-center"
        aria-label={playing ? `Pause ${title}` : `Play ${title}`}
      >
        <span className="flex size-14 items-center justify-center rounded-full bg-[#1ed760] text-black shadow-xl transition-transform hover:scale-105">
          {playing ? (
            <Pause className="size-6 fill-current" aria-hidden="true" />
          ) : (
            <Play className="ml-1 size-6 fill-current" aria-hidden="true" />
          )}
        </span>
      </button>
    </div>
  );
}
