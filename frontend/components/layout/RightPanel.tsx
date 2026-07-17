"use client";

import Image from "next/image";
import { Sparkles } from "lucide-react";

export default function RightPanel() {
  return (
    <aside className="hidden xl:flex w-80 flex-col gap-6 border-l border-zinc-800 bg-[#121212] p-6">

      {/* Now Playing */}
      <div className="rounded-xl bg-zinc-900 p-5">
        <h2 className="mb-4 text-lg font-semibold">
          Now Playing
        </h2>

        <Image
          src="https://picsum.photos/400"
          alt="Album Cover"
          width={300}
          height={300}
          className="w-full rounded-lg"
        />

        <h3 className="mt-4 text-xl font-bold">
          Midnight City
        </h3>

        <p className="text-zinc-400">
          M83
        </p>

        <span className="mt-3 inline-block rounded-full bg-green-500/20 px-3 py-1 text-sm text-green-400">
          Focus Mood
        </span>
      </div>

      {/* Up Next */}
      <div className="rounded-xl bg-zinc-900 p-5">
        <h2 className="mb-4 text-lg font-semibold">
          Up Next
        </h2>

        <ul className="space-y-3 text-sm">
          <li>Holocene — Bon Iver</li>
          <li>Intro — The xx</li>
          <li>Sunset Lover — Petit Biscuit</li>
        </ul>
      </div>

      {/* AI Insights */}
      <div className="rounded-xl bg-zinc-900 p-5">
        <div className="mb-4 flex items-center gap-2">
          <Sparkles className="text-green-400" size={18} />
          <h2 className="text-lg font-semibold">
            AI Insights
          </h2>
        </div>

        <div className="space-y-2 text-sm">
          <p>
            <span className="text-zinc-400">Mood:</span> Focused
          </p>

          <p>
            <span className="text-zinc-400">Genre:</span> Lo-Fi Hip Hop
          </p>

          <p>
            <span className="text-zinc-400">Energy:</span> Medium
          </p>

          <p>
            <span className="text-zinc-400">Playlist Length:</span> 15 Songs
          </p>
        </div>
      </div>

    </aside>
  );
}