import { ListMusic } from "lucide-react";

type PlaylistInsightProps = {
  moods: string[];
  title: string;
  songsLength: number;
};

export function AboutPlaylistRightSide({
  moods,
  title,
  songsLength,
}: PlaylistInsightProps) {
  if (!title && moods.length === 0 && songsLength === 0) {
    return <AboutPlaylistSideSkeleton />;
  }
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

export function AboutPlaylistSideSkeleton() {
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
