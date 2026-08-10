import { ListMusic } from "lucide-react";
import { PlaylistData } from "@/stores/audioStore";
import { SavedPlaylist } from "@/types/playlist";

type PlaylistInsightProps = {
  moods: string[];
  title: string;
  isSaving: boolean;
  songsLength: number;
  error: string | null;
  playlist: PlaylistData | null;
  savedPlaylists: SavedPlaylist[];
  onplaylistSave: (playlist: PlaylistData) => Promise<void>;
};

export function AboutPlaylistRightSide({
  moods,
  title,
  error,
  isSaving = false,
  playlist,
  savedPlaylists,
  songsLength,
  onplaylistSave,
}: PlaylistInsightProps) {
  if (!title && moods.length === 0 && songsLength === 0) {
    return null;
  }

  const hideSaveButton = (savedPlaylists: SavedPlaylist[]): boolean => {
    const titleLower = title.toLowerCase().trim();

    const containsFav =
      titleLower.includes("favourite") || titleLower.includes("favorite");

    if (containsFav) return true;

    return savedPlaylists.some(
      (playlist) => playlist.title?.toLowerCase().trim() === titleLower
    );
  };

  return (
    <div className="rounded-xl bg-zinc-900 p-5">
      <div className="mb-4 flex items-center gap-2">
        <ListMusic className="size-5 text-green-500" />

        <h2 className="font-semibold text-white">Playlist Insight</h2>
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
      {playlist && !hideSaveButton(savedPlaylists) && (
        <button
          disabled={isSaving}
          className="mt-4 w-full rounded-lg bg-green-500 py-2 text-sm font-semibold text-black transition hover:bg-green-600"
          onClick={() => onplaylistSave(playlist)}
        >
          {isSaving ? "Saving..." : "Save Playlist"}
        </button>
      )}
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}{" "}
    </div>
  );
}

export function AboutPlaylistSideSkeleton() {
  return (
    <div className="rounded-xl bg-zinc-900 p-5">
      {/* Header */}
      <div className="mb-4 flex items-center gap-2">
        <div className="size-5 animate-pulse rounded bg-zinc-700" />

        <div className="h-5 w-32 animate-pulse rounded bg-zinc-700" />
      </div>

      {/* Playlist information */}
      <div className="space-y-2">
        {/* Title */}
        <div className="h-6 w-1/2 animate-pulse rounded bg-zinc-700" />

        {/* Songs count */}
        <div className="h-4 w-1/3 animate-pulse rounded bg-zinc-700" />

        {/* Mood */}
        <div className="h-4 w-2/3 animate-pulse rounded bg-zinc-700" />

        {/* Second mood */}
        <div className="h-4 w-1/2 animate-pulse rounded bg-zinc-700" />
      </div>

      {/* Save Playlist */}
      <div className="mt-4 h-10 w-full animate-pulse rounded-lg bg-zinc-700" />
    </div>
  );
}
