"use client";

import Image from "next/image";
import { Heart } from "lucide-react";
import FavoriteSong from "@/types/favorite";

interface Props {
  song: FavoriteSong;
  index: number;
}

export default function FavoriteRow({ song, index }: Props) {
  return (
    <div className="grid grid-cols-12 items-center rounded-lg px-4 py-3 transition hover:bg-zinc-900">
      <div>{index + 1}</div>

      <div className="col-span-5 flex items-center gap-4">
        <Image
          src={song.artwork}
          alt={song.title}
          width={50}
          height={50}
          className="rounded"
        />

        <div>
          <h3>{song.title}</h3>

          <p className="text-sm text-zinc-400">{song.artist}</p>
        </div>
      </div>

      <div className="col-span-4 text-zinc-400">{song.album}</div>

      <Heart size={18} className="fill-green-500 text-green-500" />

      <div className="text-right">{song.duration}</div>
    </div>
  );
}
