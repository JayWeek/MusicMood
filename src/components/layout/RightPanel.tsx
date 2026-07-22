"use client";

import AIInsightsCard from "./AIInsightsCard";
import TrackPlayerPreview from "../now-playing/TrackPlayerPreview";

export default function RightPanel() {
  return (
    <aside className="hidden w-80 flex-col gap-6 border-l border-zinc-800 bg-[#121212] p-6 xl:flex">
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-5 shadow-2xl shadow-black/20">
        <TrackPlayerPreview
          title="Midnight City"
          artist="M83"
          playing={false}
          liked={false}
          onToggle={() => {}}
          onLike={() => {}}
        />
      </div>

      <AIInsightsCard />
    </aside>
  );
}
