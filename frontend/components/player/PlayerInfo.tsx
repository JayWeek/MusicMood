"use client";

import Image from "next/image";
import { Heart } from "lucide-react";

interface PlayerInfoProps {
  title: string;
  artist: string;
  artwork: string;
  liked?: boolean;
}

export default function PlayerInfo({
  title,
  artist,
  artwork,
  liked = false,
}: PlayerInfoProps) {
  return (
    <div className="flex items-center gap-4 w-72">

      <Image
        src={artwork}
        alt={title}
        width={60}
        height={60}
        className="rounded-lg"
      />

      <div className="flex-1 overflow-hidden">
        <h3 className="truncate font-semibold">{title}</h3>

        <p className="truncate text-sm text-zinc-400">
          {artist}
        </p>
      </div>

      <Heart
        size={18}
        className={
          liked
            ? "fill-green-500 text-green-500 cursor-pointer"
            : "cursor-pointer text-zinc-500 hover:text-white"
        }
      />

    </div>
  );
}