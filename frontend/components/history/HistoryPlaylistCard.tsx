"use client";

import Image from "next/image";
import { PlayCircle } from "lucide-react";

interface Props {
  playlist: {
    id: number;
    title: string;
    mood: string;
    createdAt: string;
    tracks: number;
    cover: string;
  };
}

export default function HistoryPlaylistCard({
  playlist,
}: Props) {
  return (
    <div className="group rounded-xl bg-zinc-900 p-4 transition hover:bg-zinc-800">

      <Image
        src={playlist.cover}
        alt={playlist.title}
        width={300}
        height={300}
        className="rounded-lg"
      />

      <h3 className="mt-4 text-xl font-semibold">
        {playlist.title}
      </h3>

      <p className="text-sm text-zinc-400">
        {playlist.mood}
      </p>

      <p className="mt-2 text-xs text-zinc-500">
        {playlist.tracks} Songs • {playlist.createdAt}
      </p>

      <button className="mt-5 flex items-center gap-2 rounded-full bg-green-500 px-5 py-2 font-semibold text-black hover:bg-green-400">
        <PlayCircle size={18} />
        Play Again
      </button>

    </div>
  );
}