"use client";

import Image from "next/image";
import { Heart, Music2, Pause, Play } from "lucide-react";

export interface PlaylistSong {
  title: string;
  artist: string;
  videoId: string;
  thumbnail: string;
  duration: string;
}

interface EachTrackInPlaylistProps {
  song: PlaylistSong;
  index: number;
  playing: boolean;
  liked: boolean;
  onClick?: () => void;
  isDefault?: boolean;
}

function isAbsoluteImageUrl(value: string): boolean {
  try {
    const url = new URL(value);

    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

function getTrackArtwork(song: PlaylistSong): string | null {
  if (isAbsoluteImageUrl(song.thumbnail)) {
    return song.thumbnail;
  }

  const normalizedVideoId = song.videoId.trim();

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

export default function EachTrackInPlaylist({
  song,
  index,
  playing,
  liked,
  onClick,
  isDefault = false,
}: EachTrackInPlaylistProps) {
  const artwork = getTrackArtwork(song);

  return (
    <li className="list-none">
      <button
        type="button"
        onClick={onClick}
        className="group grid w-full grid-cols-[36px_minmax(0,1fr)_auto] items-center gap-3 rounded-md px-2 py-2 text-left transition-colors hover:bg-[#2a2a2a] focus-visible:ring-2 focus-visible:ring-[#1ed760] focus-visible:outline-none"
        aria-label={
          isDefault
            ? `Generate tracks based on ${song.title}`
            : playing
              ? `Pause ${song.title} by ${song.artist}`
              : `Play ${song.title} by ${song.artist}`
        }
      >
        <div className="relative flex size-9 items-center justify-center">
          {playing ? (
            <Pause
              className="size-4 fill-white text-white"
              aria-hidden="true"
            />
          ) : (
            <>
              <span className="text-sm text-[#b3b3b3] group-hover:hidden">
                {index + 1}
              </span>

              <Play
                className="hidden size-4 fill-white text-white group-hover:block"
                aria-hidden="true"
              />
            </>
          )}
        </div>

        <div className="flex min-w-0 items-center gap-3">
          <div className="relative flex size-12 shrink-0 items-center justify-center overflow-hidden rounded bg-gradient-to-br from-[#1ed760] to-[#063d1b]">
            {artwork ? (
              <Image
                src={artwork}
                alt={`${song.title} artwork`}
                width={48}
                height={48}
                className="size-full object-cover"
              />
            ) : (
              <Music2 className="size-5 text-black" aria-hidden="true" />
            )}

            {artwork && (
              <div className="absolute inset-0 hidden items-center justify-center bg-black/50 group-hover:flex">
                {playing ? (
                  <Pause
                    className="size-5 fill-white text-white"
                    aria-hidden="true"
                  />
                ) : (
                  <Play
                    className="size-5 fill-white text-white"
                    aria-hidden="true"
                  />
                )}
              </div>
            )}
          </div>

          <div className="min-w-0">
            <p
              className={`truncate text-sm font-medium ${
                playing ? "text-[#1ed760]" : "text-white"
              }`}
            >
              {song.title}
            </p>

            <p className="mt-0.5 truncate text-sm text-[#b3b3b3]">
              {song.artist}
            </p>

            {isDefault && (
              <p className="mt-1 truncate text-xs text-[#1ed760]">
                Click to generate tracks based on your current mood
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-xs text-[#b3b3b3] tabular-nums">
            {song.duration}
          </span>

          <Heart
            className={`size-4 transition-colors ${
              liked
                ? "fill-[#1ed760] text-[#1ed760]"
                : "text-[#b3b3b3] group-hover:text-white"
            }`}
            aria-label={liked ? "Liked" : "Not liked"}
          />
        </div>
      </button>
    </li>
  );
}
