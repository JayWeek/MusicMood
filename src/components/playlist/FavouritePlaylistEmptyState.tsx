import { ListMusic, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function FavouritePlaylistEmptyState() {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center px-6 text-center">
      {/* Icon */}
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10 ring-1 ring-green-500/20">
        <ListMusic className="h-8 w-8 text-green-500" />
      </div>

      {/* Heading */}
      <h2 className="text-2xl font-bold text-white">
        No favourite playlists yet
      </h2>

      {/* Description */}
      <p className="mt-3 max-w-md text-sm leading-6 text-zinc-400">
        You haven&apos;t added any playlists to your favourites yet. Explore
        your playlists and save the ones you love.
      </p>

      {/* Action */}
      <Link
        href="/home"
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-green-500 px-6 py-3 text-sm font-semibold text-black transition-all duration-200 hover:bg-green-400 hover:shadow-lg hover:shadow-green-500/20"
      >
        Explore playlists
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
