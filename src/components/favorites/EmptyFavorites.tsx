import { Heart } from "lucide-react";

export default function EmptyFavorites() {
  return (
    <div className="mt-24 text-center">

      <Heart
        size={80}
        className="mx-auto text-zinc-700"
      />

      <h2 className="mt-6 text-3xl font-bold">
        No Favorite Songs Yet
      </h2>

      <p className="mt-3 text-zinc-400">
        Tap the heart icon on any song to add it here.
      </p>

    </div>
  );
}