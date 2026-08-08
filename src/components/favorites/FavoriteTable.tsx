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
    <div className="w-full">
      {/* Table Header */}
      <div className="grid grid-cols-[48px_minmax(0,1fr)_160px_60px_140px] items-center gap-4 border-b border-zinc-800 px-3 py-3 text-sm text-zinc-400">
        <span>#</span>

        <span>Title</span>

        <span>Collection</span>

        <span />

        <span className="pr-4 text-right">Added</span>
      </div>

      {/* Favorite Songs */}
      <div className="my-5 flex flex-col gap-5">
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
      </div>
    </div>
  );
}
