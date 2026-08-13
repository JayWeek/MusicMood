import { SavedPlaylist } from "@/types/playlist";
import EachFavouritePlaylistRow from "@/components/playlist/EachPlaylist";
import EachFavouritePlaylistRowSkeleton from "./EachFavouritePlaylistRowSkeleton";
import FavouritePlaylistEmptyState from "./FavouritePlaylistEmptyState";

interface FavouritePlaylistTableProps {
  playlists: SavedPlaylist[];
  loading?: boolean;
  showPlayedAt?: boolean;
  onPlay?: (playlist: SavedPlaylist) => void;
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
    <div className="w-full overflow-hidden">
      <table className="w-full table-fixed">
        <thead>
          <tr className="border-b border-zinc-800 text-sm text-zinc-400">
            {/* S/N */}
            <th className="w-10 px-1 py-2 text-left font-medium sm:w-12 sm:px-1.5">
              S/N
            </th>

            {/* Title */}
            <th className="px-1 py-2 text-left font-medium sm:px-1.5">Title</th>

            {/* Moods */}
            <th className="w-20 px-1 py-2 text-left font-medium sm:w-32 sm:px-4 md:w-40 md:px-6">
              Moods
            </th>

            {/* Actions */}
            <th className="w-14 px-1 py-2 text-left font-medium sm:w-16 sm:px-1.5">
              Actions
            </th>

            {/* Date */}
            <th className="w-24 px-1 py-2 text-right font-medium sm:w-32 sm:px-1.5">
              {showPlayedAt ? "Last Played" : "Added At"}
            </th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            Array.from({ length: 7 }).map((_, index) => (
              <EachFavouritePlaylistRowSkeleton key={index} />
            ))
          ) : playlists.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-0">
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
    </div>
  );
}
