import FavoriteHeader from "@/components/favorites/FavoriteHeader";
import EmptyState from "@/components/track/EmptyState";
import TrackTable from "@/components/track/TrackTable";

import { mockFavorites } from "@/lib/mockFavorites";

export default function FavoritesPage() {
  return (
    <div className="mx-auto max-w-7xl">
      <FavoriteHeader />

      {mockFavorites.length > 0 ? (
        <TrackTable tracks={mockFavorites} />
      ) : (
        <EmptyState
          title="No Favorite Songs Yet"
          description="Songs you like will appear here."
          action={
            <button className="rounded-full bg-green-500 px-6 py-3 font-semibold text-black transition hover:bg-green-400">
              Browse Music
            </button>
          }
        />
      )}
    </div>
  );
}
