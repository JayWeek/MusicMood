"use client";

import AIInsightsCard from "./AIInsightsCard";
import TrackPlayerPreview from "../now-playing/TrackPlayerPreview";
import { useAudioStore } from "@/stores/audioStore";

export default function RightPanel() {
  const currentSong = useAudioStore((state) => state.currentSong);
  const isPlaying = useAudioStore((state) => state.isPlaying);
  const toggle = useAudioStore((state) => state.toggle);

  return (
    <aside className="hidden w-80 flex-col gap-6 border-l border-zinc-800 bg-[#121212] p-6 xl:flex">
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-5 shadow-2xl shadow-black/20">
        <TrackPlayerPreview
          title={currentSong?.title ?? "Choose a playlist"}
          artist={currentSong?.artist ?? "Your next favorite song"}
          playing={isPlaying}
          liked={false}
          onToggle={toggle}
          onLike={() => {}}
          favoriteSong={currentSong ? {
            title: currentSong.title,
            artist: currentSong.artist,
            youtubeId: currentSong.videoId,
          } : undefined}
        />
      </div>

      <AIInsightsCard />
    </aside>
  );
}
