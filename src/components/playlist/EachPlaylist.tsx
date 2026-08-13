"use client";

import { Play } from "lucide-react";
import { SavedPlaylist } from "@/types/playlist";
import FavoriteButtonPlaylist from "./FavoriteButtonPlaylist";
import Image from "next/image";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  const handleRowClick = () => {
    router.push(`/playing?playlist=${playlistData.playlistId}`);
  };

  return (
    <tr
      className="group cursor-pointer text-xs transition hover:bg-zinc-900/50"
      onClick={handleRowClick}
    >
      {/* Number / Play */}
      <td className="w-12 px-4">
        <div className="relative flex items-center justify-center">
          <span className="text-zinc-400 group-hover:hidden">{index + 1}</span>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onPlay?.(playlistData);
            }}
            className="hidden group-hover:block"
            aria-label={`Play ${playlistData.title}`}
          >
            <Play className="h-4 w-4 fill-current" />
          </button>
        </div>
      </td>

      {/* Playlist */}
      <td className="max-w-0 px-4 py-3">
        <div className="flex min-w-0 items-center gap-4">
          {playlistData.thumbnail && (
            <Image
              src={playlistData.thumbnail}
              alt={playlistData.title}
              width={50}
              height={50}
              loading="lazy"
              className="h-[50px] w-[50px] shrink-0 rounded-md object-cover"
            />
          )}

          <div className="min-w-0 flex-1 overflow-hidden">
            <h3 className="mb-0.5 truncate text-xs leading-tight font-normal text-white">
              {playlistData.title}
            </h3>

            <p className="truncate text-xs font-normal text-zinc-400">
              {playlistData.description}
            </p>
          </div>
        </div>
      </td>

      {/* Moods */}
      <td className="w-32 px-4">
        <p className="truncate px-4 text-zinc-400">{playlistData.title}</p>
      </td>

      {/* Favourite Action */}
      <td className="w-16 px-4">
        <FavoriteButtonPlaylist
          liked={true}
          loading={false}
          onClick={() => onLikedClick(playlistData.playlistId)}
        />
      </td>

      {/* Date */}
      <td className="w-32 px-4 text-right text-zinc-400">
        {showPlayedAt
          ? new Date(playlistData.createdAt).toLocaleDateString()
          : new Date(playlistData.createdAt).toLocaleDateString()}
      </td>
    </tr>
  );
}
