import { ListMusic } from "lucide-react";
// Use native <img> for small playlist thumbnails in sidebar
import { SavedPlaylist } from "@/types/playlist";
import Link from "next/link";

export function PlaylistDataError() {
  return (
    <div className="rounded-xl bg-zinc-900 p-5">
      <div className="mb-4 flex items-center gap-2">
        <ListMusic className="text-red-400" size={18} />
        <h2 className="text-lg font-semibold text-white">Playlist Insight</h2>
      </div>
      <p className="text-red-400">Failed to load playlist data.</p>
    </div>
  );
}

export function FavouritePlaylistEmpty() {
  return (
    <div className="rounded-xl bg-zinc-900 p-2">
      <p className="text-xs text-zinc-400">
        You dont have any saved playlists yet generate and save one to see it here.
      </p>
      <Link
        href="/generate"
        className="text-xs font-semibold text-green-500 hover:underline"
      >
        Generate
      </Link>
    </div>
  );
}

export function EachPlaylist({
  playlistId,
  prompt,
  thumbnail,
  description,
}: SavedPlaylist) {
  return (
    <Link
      className="h-15 rounded-xl bg-zinc-900 p-0.5 transition hover:bg-zinc-800"
      href={`/playing?playlist=${playlistId}`}
    >
      <div className="flex">
        <div>
          {thumbnail ? (
            <img
              src={thumbnail}
              alt={prompt}
              loading="lazy"
              className="h-15 w-full object-cover"
            />
          ) : (
            <ListMusic
              size={18}
              className="h-15 w-full object-cover text-green-400"
            />
          )}
        </div>

        <div className="flex flex-col justify-center gap-1 px-2 py-1">
          <h3 className="text-xs font-semibold text-white">{prompt}</h3>
          <p className="text-[10px] text-zinc-400">
            {description.slice(0, 50)} {description.length > 50 ? "..." : ""}
          </p>
        </div>
      </div>
    </Link>
  );
}

export function FavouritePlaylistEmptySkeleton() {
  return (
    <div className="rounded-xl bg-zinc-900 p-2">
      <div className="h-3 w-full animate-pulse rounded bg-zinc-800" />
      <div className="mt-1 h-3 w-4/5 animate-pulse rounded bg-zinc-800" />
      <div className="mt-1 h-3 w-16 animate-pulse rounded bg-zinc-800" />
    </div>
  );
}

type RenderPlaylistViewProps = {
  data?: SavedPlaylist[];
  isLoading: boolean;
  isError: boolean;
};

export default function RenderPlaylistViewInSideBar({
  data,
  isLoading,
  isError,
}: RenderPlaylistViewProps) {
  if (isLoading) {
    return <FavouritePlaylistEmptySkeleton />;
  }
  if (isError) {
    return <PlaylistDataError />;
  }

  if (!data || data.length === 0) {
    return <FavouritePlaylistEmpty />;
  }

  return (
    <div className="grid-row-1 sm:grid-row-2 xl:grid-row-3 grid gap-6">
      {data.map((playlist) => (
        <EachPlaylist key={playlist.playlistId} {...playlist} />
      ))}
    </div>
  );
}
