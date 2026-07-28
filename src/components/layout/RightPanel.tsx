"use client";

import type { GeneratedPlaylist } from "@/lib/schema/playlist.schema";

import AIInsightsCard from "./AIInsightsCard";
import TrackPlayerPreview from "../now-playing/TrackPlayerPreview";

type PlaylistSong = GeneratedPlaylist["playlist"]["songs"][number];

interface RightPanelProps {
  song: PlaylistSong | null;
  mood?: string;
  playing: boolean;
  liked: boolean;
  onToggle: () => void;
  onLike: () => void;
}

export default function RightPanel({
  song,
  mood,
  playing,
  liked,
  onToggle,
  onLike,
}: RightPanelProps) {
  return (
    <aside className="hidden w-80 flex-col gap-6 border-l border-zinc-800 bg-[#121212] p-6 xl:flex">
      {song && (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-5 shadow-2xl shadow-black/20">
          <TrackPlayerPreview
            song={song}
            mood={mood}
            currentTime="0:00"
            playing={playing}
            liked={liked}
            onToggle={onToggle}
            onLike={onLike}
          />
        </div>
      )}

      <AIInsightsCard />
    </aside>
  );
}
