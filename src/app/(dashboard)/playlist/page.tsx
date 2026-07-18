"use client";

import PlaylistHeader from "@/components/playlist/PlayListHeader";
import TrackTable from "@/components/track/TrackTable";

import { mockTracks } from "@/lib/mockTracks";
import Track from "@/types/track";

export default function PlaylistPage() {
  function handlePlay(track: Track) {
    console.log("Play:", track);
  }

  function handleLike(track: Track) {
    console.log("Like:", track);
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <PlaylistHeader
        title="Late Night Coding"
        totalSongs={mockTracks.length}
        duration="2h 18m"
        generatedBy="AI"
      />

      <TrackTable tracks={mockTracks} onPlay={handlePlay} onLike={handleLike} />
    </div>
  );
}
