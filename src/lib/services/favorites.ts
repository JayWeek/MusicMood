import { createClient } from "@/lib/supabase/client";
import type FavoriteSong from "@/types/favorite";

export type FavoriteSongInput = {
  title: string;
  artist: string;
  youtubeId: string;
};

export function buildFavoritePlaylistSongs(
  songs: Array<
    // Updated Pick utility parameter contract to track thumbnail
    Pick<FavoriteSong, "title" | "artist" | "youtubeId" | "thumbnail" | "duration">
  >,
) {
  return songs.map((song) => ({
    title: song.title,
    artist: song.artist,
    videoId: song.youtubeId,
    thumbnail: song.thumbnail ?? "", // Changed from song.artwork to song.thumbnail
    duration: song.duration ?? "0:00",
  }));
}

export async function isFavoriteSong(youtubeId: string): Promise<boolean> {
  const supabase = createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError) throw authError;
  if (!user) return false;

  const { data, error } = await supabase
    .from("favorite_songs")
    .select("id")
    .eq("user_id", user.id)
    .eq("youtube_id", youtubeId)
    .maybeSingle();

  if (error) throw error;
  return Boolean(data);
}

export async function toggleFavoriteSong(song: FavoriteSongInput): Promise<{ liked: boolean }> {
  const supabase = createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError) throw authError;
  if (!user) throw new Error("Please sign in to save favorite songs.");

  const { data: existing, error: lookupError } = await supabase
    .from("favorite_songs")
    .select("id")
    .eq("user_id", user.id)
    .eq("youtube_id", song.youtubeId)
    .maybeSingle();

  if (lookupError) throw lookupError;

  if (existing) {
    const { error } = await supabase.from("favorite_songs").delete().eq("id", existing.id);
    if (error) throw error;
    return { liked: false };
  }

  const { error } = await supabase.from("favorite_songs").insert({
    user_id: user.id,
    title: song.title,
    artist: song.artist,
    youtube_id: song.youtubeId,
  });
  if (error) throw error;
  return { liked: true };
}
