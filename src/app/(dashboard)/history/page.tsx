"use client";

import HistoryHeader from "@/components/history/HistoryHeader";
import MoodPromptListSkeleton from "@/components/home/PromptRowSkeleton";
import FavouritePlaylistTable from "@/components/playlist/FavouritePlaylistTable";
import { usePlaylists } from "@/context/PlaylistContext";

export default function HistoryPage() {
  const { playlists, isLoading, refreshPlaylists } = usePlaylists();
  if (isLoading) {
    return <MoodPromptListSkeleton />;
  }

  return (
    <div className="mx-auto max-w-7xl">
      <HistoryHeader />

      <div className="mt-8">
        <FavouritePlaylistTable
          playlists={playlists}
          loading={isLoading}
          onPlay={(playlist) => {
            console.log("Play playlist:", playlist);
          }}
          onLikedClick={async (playlistId) => {
            // handle removing/adding favourite
            console.log("Toggle favourite:", playlistId);

            await refreshPlaylists();
          }}
        />
      </div>
    </div>
  );
}
