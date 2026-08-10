"use client";

// Use native <img> for playlist thumbnails in tables for faster rendering
import { Play } from "lucide-react";
import { SavedPlaylist } from "@/types/playlist";
import FavoriteButtonPlaylist from "./FavoriteButtonPlaylist";

interface TrackRowProps {
  playlistData: SavedPlaylist;
  showPlayedAt?: boolean;
  index?: number;
  onPlay?: (playlistData: SavedPlaylist) => void;
  onLikedClick: (playlistId: string) => Promise<void>;
}

export default function EachFavouritePlaylistRow({
  playlistData,
  showPlayedAt = false,
  index = 0,
  onPlay,
  onLikedClick,
}: TrackRowProps) {
  return (
    <tr className="group text-xs transition hover:bg-zinc-900/50">
      {/* Number / Play */}
      <td className="w-12 px-4">
        <div className="relative flex items-center justify-center">
          <span className="text-zinc-400 group-hover:hidden">{index + 1}</span>

          <button
            type="button"
            onClick={() => onPlay?.(playlistData)}
            className="hidden group-hover:block"
            aria-label={`Play ${playlistData.title}`}
          >
            <Play className="h-4 w-4 fill-current" />
          </button>
        </div>
      </td>

      {/* Playlist */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-4">
          {playlistData.thumbnail && (
            <img
              src={playlistData.thumbnail}
              alt={playlistData.title}
              width={50}
              height={50}
              loading="lazy"
              className="rounded-md object-cover"
            />
          )}

          <div className="min-w-0">
            <h3 className="truncate font-medium">{playlistData.title}</h3>

            <p className="truncate text-zinc-400">{playlistData.description}</p>
          </div>
        </div>
      </td>

      {/* Moods */}
      <td className="px-4">
        <td className="px-4 text-zinc-400">{playlistData.title}</td>
      </td>

      {/* Favourite Action */}
      <td className="px-4">
        <FavoriteButtonPlaylist
          liked={true}
          loading={false}
          onClick={() => onLikedClick(playlistData.playlistId)}
        />
      </td>

      {/* Date */}
      <td className="px-4 text-right text-zinc-400">
        {showPlayedAt
          ? new Date(playlistData.createdAt).toLocaleDateString()
          : new Date(playlistData.createdAt).toLocaleDateString()}
      </td>
    </tr>
  );
}
