"use client";

import { useState } from "react";

import EmptyState from "@/components/track/EmptyState";
import { buildFavoritePlaylistSongs } from "@/lib/services/favorites";
import { useAudioStore } from "@/stores/audioStore";
import FavoriteSong from "@/types/favorite";
import FavoriteRow from "./FavoriteRow";

interface Props {
  songs: FavoriteSong[];
}

export default function FavoriteTable({ songs }: Props) {
  const [favoriteSongs, setFavoriteSongs] = useState(songs);
  const setPlaylist = useAudioStore((state) => state.setPlaylist);
  const selectSong = useAudioStore((state) => state.selectSong);

  function handlePlay(song: FavoriteSong) {
    const index = favoriteSongs.findIndex((item) => item.id === song.id);
    if (index < 0) return;

    setPlaylist({
      title: "Favorites",
      description: "Your liked songs",
      mood: ["favorites"],
      songs: buildFavoritePlaylistSongs(favoriteSongs),
    });
    selectSong(index);
  }

  if (favoriteSongs.length === 0) {
    return (
      <EmptyState
        title="No Favorite Songs Yet"
        description="Songs you like will appear here."
      />
    );
  }

  return (
    <div className="w-full select-none">
      {/* Table grid layout matching Spotify exactly */}
      <div className="mb-4 grid grid-cols-[40px_4fr_3fr_auto_minmax(120px,auto)] gap-4 border-b border-zinc-800 px-4 pb-3 text-sm font-medium text-zinc-500">
        <div className="pl-1">#</div>
        <div>Title</div>
        <div>Collection</div>
        <div />
        <div className="text-right pr-4">Added</div>
      </div>

      <div className="flex flex-col gap-1">
        {favoriteSongs.map((song, index) => (
          <FavoriteRow
            key={song.id}
            song={song}
            index={index}
            onPlay={handlePlay}
            onFavoriteChange={(liked) => {
              if (!liked) {
                setFavoriteSongs((current) => current.filter((item) => item.id !== song.id));
              }
            }}
          />
        ))}
      </div>
    </div>
  );
}
