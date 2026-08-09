"use client";

import { useState } from "react";
import { buildFavoritePlaylistSongs } from "@/lib/services/favorites";
import { useAudioStore } from "@/stores/audioStore";
import FavoriteSong from "@/types/favorite";
import FavoriteRow from "./FavoriteRow";
import EmptyFavorites from "./EmptyFavorites";

interface Props {
  songs: FavoriteSong[];
}

export default function FavoriteTable({ songs }: Props) {
  const [favoriteSongs, setFavoriteSongs] = useState(songs);
  const [playingSongId, setPlayingSongId] = useState<string | null>(null);

  const setPlaylist = useAudioStore((state) => state.setPlaylist);
  const selectSong = useAudioStore((state) => state.selectSong);
  const isPlaying = useAudioStore((state) => state.isPlaying);

  function handlePlay(song: FavoriteSong) {
    const index = favoriteSongs.findIndex((item) => item.id === song.id);

    if (index < 0) return;

    setPlaylist({
      title: "Favorites",
      description: "Your liked songs",
      mood: ["favorites"],
      songs: buildFavoritePlaylistSongs(favoriteSongs),
    });

    setPlayingSongId(song.id);
    selectSong(index);
  }

  if (favoriteSongs.length === 0) {
    return <EmptyFavorites />;
  }

  return (
    <table className="w-full table-fixed">
      {/* Table Header */}
      <thead>
        <tr className="border-b border-zinc-800 text-left text-sm text-zinc-400">
          {/* # */}
          <th className="w-12 px-4 py-3 font-normal">#</th>

          {/* Title */}
          <th className="px-4 py-3 font-normal">Title</th>

          {/* Collection */}
          <th className="w-[22%] px-4 py-3 font-normal">Collection</th>

          {/* Status */}
          <th className="w-20 px-4 py-3 text-center font-normal">Status</th>

          {/* Added */}
          <th className="w-32 px-4 py-3 pr-4 text-right font-normal">Added</th>
        </tr>
      </thead>

      {/* Favorite Songs */}
      <tbody>
        {favoriteSongs.map((song, index) => {
          const songIsPlaying = isPlaying && playingSongId === song.id;

          return (
            <FavoriteRow
              key={song.id}
              song={song}
              index={index}
              isPlaying={songIsPlaying}
              onPlay={handlePlay}
              onFavoriteChange={(liked) => {
                if (!liked) {
                  setFavoriteSongs((current) =>
                    current.filter((item) => item.id !== song.id)
                  );

                  if (playingSongId === song.id) {
                    setPlayingSongId(null);
                  }
                }
              }}
            />
          );
        })}
      </tbody>
    </table>
  );
}
