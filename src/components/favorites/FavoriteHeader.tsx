import { Heart } from "lucide-react";

export default function FavoriteHeader() {
  return (
    <div className="mb-8 flex items-center gap-4 sm:mb-10 sm:gap-6">
      {/* Cover */}
      <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 via-red-500 to-orange-500 shadow-2xl sm:h-32 sm:w-32 md:h-40 md:w-40 lg:h-44 lg:w-44">
        <Heart
          size={40}
          className="fill-white text-white sm:h-14 sm:w-14 md:h-16 md:w-16 lg:h-[70px] lg:w-[70px]"
        />
      </div>

      {/* Content */}
      <div className="min-w-0">
        <p className="text-xs text-zinc-400 uppercase sm:text-sm">Collection</p>

        <h1 className="mt-1 truncate text-3xl font-black sm:mt-2 sm:text-4xl md:text-5xl lg:mt-3 lg:text-6xl">
          Favorites
        </h1>

        <p className="mt-2 text-sm text-zinc-400 sm:mt-3 md:mt-4">
          Songs you liked
        </p>
      </div>
    </div>
  );
}
