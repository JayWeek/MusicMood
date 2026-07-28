import FavoriteHeader from "@/components/favorites/FavoriteHeader";
import FavoriteTable from "@/components/favorites/FavoriteTable";
import { createClient } from "@/lib/supabase/server";
import type FavoriteSong from "@/types/favorite";

export const dynamic = "force-dynamic";

export default async function FavoritesPage() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return (
        <div className="mx-auto max-w-7xl">
          <FavoriteHeader />
          <FavoriteTable songs={[]} />
        </div>
      );
    }

    const { data, error } = await supabase
      .from("favorite_songs")
      .select("id, title, artist, youtube_id, created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

    const songs: FavoriteSong[] = (data ?? []).map((song) => ({
      id: song.id,
      title: song.title,
      artist: song.artist,
      youtubeId: song.youtube_id,
      createdAt: song.created_at,
      // Fixes broken images by deriving the URL directly from the youtube_id field
      thumbnail: song.youtube_id
        ? `https://img.youtube.com/vi/${song.youtube_id}/mqdefault.jpg`
        : "https://picsum.photos/200",
    }));

    return (
      <div className="mx-auto max-w-7xl">
        <FavoriteHeader />
        <FavoriteTable songs={songs} />
      </div>
    );
  } catch (error) {
    console.error("Failed to load favorites", error);

    return (
      <div className="mx-auto max-w-7xl">
        <FavoriteHeader />
        <FavoriteTable songs={[]} />
      </div>
    );
  }
}
