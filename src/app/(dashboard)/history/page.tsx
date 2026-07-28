"use client";

import HistoryHeader from "@/components/history/HistoryHeader";
import TrackTable from "@/components/track/TrackTable";
import EmptyState from "@/components/track/EmptyState";

import { mockHistory } from "@/lib/mockHistory";
import { useAudioStore } from "@/stores/audioStore";

export default function HistoryPage() {
  const setPlaylist = useAudioStore((state) => state.setPlaylist);
  const play = useAudioStore((state) => state.play);

  const handlePlay = (track: (typeof mockHistory)[number]) => {
    setPlaylist({
      title: "Listening History",
      description: "Recently played tracks",
      mood: ["history"],
      songs: [
        {
          title: track.title,
          artist: track.artist,
          videoId: track.title.toLowerCase().replace(/\s+/g, "-"),
          thumbnail: track.artwork,
          duration: track.duration,
        },
      ],
    });
    play();
  };

  return (
    <div className="mx-auto max-w-7xl">
      <HistoryHeader />

      {mockHistory.length > 0 ? (
        <TrackTable tracks={mockHistory} onPlay={handlePlay} />
      ) : (
        <EmptyState
          title="No Listening History"
          description="Songs you've played will appear here."
        />
      )}
    </div>
  );
}
