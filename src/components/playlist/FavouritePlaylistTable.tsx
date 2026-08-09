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
        <tr className="border-b border-zinc-800 text-left text-sm text-zinc-400">
          <th className="w-12 px-4 py-3">#</th>

          <th className="px-4 py-3">Title</th>

          <th className="px-4 py-3">Description</th>

          <th className="px-4 py-3">Favorite</th>

          <th className="px-4 py-3 text-right">
            {showPlayedAt ? "Last Played" : "Created"}
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
            <td colSpan={5}>
              <FavouritePlaylistEmptyState />
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
