import { ListMusic } from "lucide-react";

export default function FavouritePlaylistEmptyState() {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center px-6 text-center">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-zinc-900 text-zinc-400">
        <ListMusic className="h-8 w-8" />
      </div>

      <h2 className="text-2xl font-bold text-white">
        No favourite playlists yet
      </h2>

      <p className="mt-3 max-w-md text-zinc-400">
        You haven&apos;t added any playlists to your favourites yet. Explore
        your playlists and save the ones you love.
      </p>
    </div>
  );
}