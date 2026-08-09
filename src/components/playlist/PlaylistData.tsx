import { ListMusic } from "lucide-react";
import Image from "next/image";
import { type PlaylistData as PlaylistResponse } from "@/types/playlist";
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
        You dont have any saved playlists yet generate and save one to see it
        here.
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
}: PlaylistResponse) {
  return (
    <div className="overflow-hidden rounded-xl bg-zinc-900 transition hover:bg-zinc-800">
      <input type="hidden" value={playlistId} />

      {thumbnail ? (
        <Image
          src={thumbnail}
          alt={prompt}
          width={500}
          height={500}
          className="h-56 w-full object-cover"
        />
      ) : (
        <div className="h-56 w-full bg-zinc-800" />
      )}

      <div className="p-4">
        <div className="mb-2 flex items-center gap-2">
          <ListMusic size={18} className="text-green-400" />
          <h3 className="font-semibold text-white">{prompt}</h3>
        </div>

        <p className="line-clamp-3 text-sm text-zinc-400">{description}</p>
      </div>
    </div>
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
  data?: PlaylistResponse[];
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
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {data.map((playlist) => (
        <EachPlaylist key={playlist.playlistId} {...playlist} />
      ))}
    </div>
  );
}
