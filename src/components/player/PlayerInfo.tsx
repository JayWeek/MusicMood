"use client";

import Image from "next/image";
import type { ReactNode } from "react";

interface PlayerInfoProps {
  title: string;
  artist: string;
  artwork: string;
  favoriteControl?: ReactNode;
}

export default function PlayerInfo({
  title,
  artist,
  artwork,
  favoriteControl,
}: PlayerInfoProps) {
  return (
    <div className="flex w-72 items-center gap-4">
      <Image
        src={artwork}
        alt={title}
        width={60}
        height={60}
        className="h-[60px] w-[60px] rounded-lg object-cover"
      />

      <div className="flex-1 overflow-hidden">
        <h3 className="truncate font-semibold">{title}</h3>

        <p className="truncate text-sm text-zinc-400">{artist}</p>
      </div>

      {favoriteControl}
    </div>
  );
}
