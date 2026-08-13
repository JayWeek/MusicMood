"use client";

import Image from "next/image";

interface PlayerInfoProps {
  title: string;
  artist: string;
  artwork: string;
}

export default function PlayerInfo({
  title,
  artist,
  artwork,
}: PlayerInfoProps) {
  return (
    <div className="flex max-w-full min-w-0 items-center gap-2.5 sm:gap-3 lg:gap-4">
      <Image
        src={artwork}
        alt={title}
        width={60}
        height={60}
        loading="lazy"
        className="size-11 shrink-0 rounded-lg object-cover sm:size-12 lg:size-[60px]"
      />

      <div className="min-w-0 flex-1 overflow-hidden">
        <h3 className="truncate text-sm font-semibold sm:text-base">{title}</h3>

        <p className="truncate text-xs text-zinc-400 sm:text-sm">{artist}</p>
      </div>
    </div>
  );
}
