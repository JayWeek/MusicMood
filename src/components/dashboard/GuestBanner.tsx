"use client";

import { Sparkles } from "lucide-react";

export default function GuestBanner() {
  return (
    <div className="mb-8 rounded-2xl border border-green-500/30 bg-green-500/10 p-6">

      <div className="flex items-center gap-4">

        <Sparkles className="text-green-500" />

        <div>

          <h3 className="font-semibold">
            browsing as a Guest
          </h3>

          <p className="mt-1 text-zinc-400">
            Generate unlimited playlists. Sign in to save
            playlists, favorites and history.
          </p>

        </div>

      </div>

    </div>
  );
}
