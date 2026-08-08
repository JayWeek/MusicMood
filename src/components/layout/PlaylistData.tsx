import { ListMusic } from "lucide-react";
import Image from "next/image";
import { type PlaylistData as PlaylistDataType } from "@/types/playlist";
import Link from "next/link";

type PlaylistInsightProps = {
  moods: string[];
  title: string;
  songsLength: number;
};

export function PlaylistData({
  moods,
  title,
  songsLength,
}: PlaylistInsightProps) {
  return (
    <div className="rounded-xl bg-zinc-900 p-5">
      <div className="mb-4 flex items-center gap-2">
        <ListMusic className="text-green-400" size={18} />
        <h2 className="text-lg font-semibold text-white">Playlist Insight</h2>
      </div>

      <div className="space-y-2 text-sm text-zinc-300">
        <h3 className="text-lg font-semibold text-white">{title}</h3>

        <p className="text-zinc-400">
          {songsLength} {songsLength === 1 ? "song" : "songs"}
        </p>

        {moods.length > 0 ? (
          moods.map((mood, index) => (
            <p key={index} className="text-zinc-400">
              • {mood}
            </p>
          ))
        ) : (
          <p className="text-zinc-500">No moods available.</p>
        )}
      </div>

      <button className="mt-4 w-full rounded-lg bg-green-500 py-2 text-sm font-semibold text-black transition hover:bg-green-600">
        Save Playlist
      </button>
    </div>
  );
}

export function PlaylistDataSkeleton() {
  return (
    <div className="rounded-xl bg-zinc-900 p-5">
      <div className="mb-4 flex items-center gap-2">
        <ListMusic className="text-green-400" size={18} />
        <h2 className="text-lg font-semibold text-white">Playlist Insight</h2>
      </div>

      <div className="space-y-2">
        <div className="h-5 w-1/2 animate-pulse rounded bg-zinc-700" />
        <div className="h-4 w-1/3 animate-pulse rounded bg-zinc-700" />
        <div className="h-4 w-2/3 animate-pulse rounded bg-zinc-700" />
      </div>

      <div className="mt-4 h-10 w-full animate-pulse rounded-lg bg-zinc-700" />
    </div>
  );
}

export function PlaylistDataLoading() {
  return <PlaylistDataSkeleton />;
}

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

export function PlaylistDataEmpty() {
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

export function PlaylistDataNoSongs() {
  return (
    <div className="rounded-xl bg-zinc-900 p-5">
      <div className="mb-4 flex items-center gap-2">
        <ListMusic className="text-green-400" size={18} />
        <h2 className="text-lg font-semibold text-white">Playlist Insight</h2>
      </div>

      <p className="text-zinc-400">No songs in this playlist.</p>
    </div>
  );
}

export function PlaylistDataNoMoods() {
  return (
    <div className="rounded-xl bg-zinc-900 p-5">
      <div className="mb-4 flex items-center gap-2">
        <ListMusic className="text-green-400" size={18} />
        <h2 className="text-lg font-semibold text-white">Playlist Insight</h2>
      </div>

      <p className="text-zinc-400">No moods associated with this playlist.</p>
    </div>
  );
}

export function EachPlaylist({
  playlistId,
  prompt,
  thumbnail,
  description,
}: PlaylistDataType) {
  return (
    <div className="overflow-hidden rounded-xl bg-zinc-900 transition hover:bg-zinc-800">
      <input type="hidden" value={playlistId} />

      <Image
        src={thumbnail}
        alt={prompt}
        width={500}
        height={500}
        className="h-56 w-full object-cover"
      />

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

type RenderPlaylistViewProps = {
  data?: PlaylistDataType[];
  isLoading: boolean;
  isError: boolean;
};

export default function RenderPlaylistView({
  data,
  isLoading,
  isError,
}: RenderPlaylistViewProps) {
  if (isLoading) {
    return <PlaylistDataLoading />;
  }

  if (isError) {
    return <PlaylistDataError />;
  }

  if (!data || data.length === 0) {
    return <PlaylistDataEmpty />;
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {data.map((playlist) => (
        <EachPlaylist key={playlist.playlistId} {...playlist} />
      ))}
    </div>
  );
}
