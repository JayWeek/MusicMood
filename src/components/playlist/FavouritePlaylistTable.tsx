import { PlaylistData } from "@/types/playlist";
import EachFavouritePlaylistRow from "@/components/playlist/EachPlaylist";
import EachFavouritePlaylistRowSkeleton from "./EachFavouritePlaylistRowSkeleton";
import FavouritePlaylistEmptyState from "./FavouritePlaylistEmptyState";

interface FavouritePlaylistTableProps {
  playlists: PlaylistData[];
  loading?: boolean;
  showPlayedAt?: boolean;
  onPlay?: (playlist: PlaylistData) => void;
  onLikedClick: (playlistId: string) => Promise<void>;
}

export default function FavouritePlaylistTable({
  playlists = [],
  loading = false,
  showPlayedAt = false,
  onPlay,
  onLikedClick,
}: FavouritePlaylistTableProps) {
  return (
    <table className="w-full">
      <thead>
        <tr className="border-b border-zinc-800 text-sm text-zinc-400">
          <th className="px-4 py-3 text-left font-medium">#</th>

          <th className="px-4 py-3 text-left font-medium">Title</th>

          <th className="px-4 py-3 text-left font-medium">Description</th>

          <th className="px-4 py-3 text-left font-medium">Moods</th>

          <th className="px-4 py-3 text-left font-medium">Prompts</th>

          <th className="px-4 py-3 text-right font-medium">
            {showPlayedAt ? "Last Played" : "Added At"}
          </th>
        </tr>
      </thead>

      <tbody>
        {loading ? (
          Array.from({ length: 5 }).map((_, index) => (
            <EachFavouritePlaylistRowSkeleton key={index} />
          ))
        ) : playlists.length === 0 ? (
          <tr>
            <td colSpan={6} className="px-0">
              <div className="flex w-full justify-center">
                <FavouritePlaylistEmptyState />
              </div>
            </td>
          </tr>
        ) : (
          playlists.map((playlist, index) => (
            <EachFavouritePlaylistRow
              key={playlist.playlistId}
              playlistData={playlist}
              index={index}
              showPlayedAt={showPlayedAt}
              onPlay={onPlay}
              onLikedClick={onLikedClick}
            />
          ))
        )}
      </tbody>
    </table>
  );
}
