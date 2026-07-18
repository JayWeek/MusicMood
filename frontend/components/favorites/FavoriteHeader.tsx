import { Heart } from "lucide-react";

export default function FavoriteHeader() {
  return (
    <div className="mb-10 flex items-center gap-6">
      <div className="flex h-44 w-44 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 via-red-500 to-orange-500 shadow-2xl">
        <Heart size={70} className="fill-white text-white" />
      </div>

      <div>
        <p className="text-sm uppercase text-zinc-400">
          Collection
        </p>

        <h1 className="mt-3 text-6xl font-black">
          Favorites
        </h1>

        <p className="mt-4 text-zinc-400">
          Songs you liked
        </p>
      </div>
    </div>
  );
}