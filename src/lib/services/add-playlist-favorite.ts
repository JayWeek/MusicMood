import { createClient } from "../supabase/client";

export const addPlaylistFavorite = async (playlistId: string) => {
  const supabase = createClient();

  //get user data from supabase auth
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();
  if (authError) throw authError;
  if (!user) throw new Error("Please sign in to save favorite playlists.");

  //get user id
  const userId = user.id;

  // Check if the playlist is already favorited by the user
  const { data: existingFavorite, error: checkError } = await supabase
    .from("favorite_playlists")
    .select("id")
    .eq("user_id", userId)
    .eq("playlist_id", playlistId)
    .maybeSingle();

  if (checkError) throw checkError;

  if (existingFavorite) {
    // If it exists, remove it from favorites
    const { error: deleteError } = await supabase
      .from("favorite_playlists")
      .delete()
      .eq("id", existingFavorite.id);

    if (deleteError) throw deleteError;
    return { favorited: false };
  } else {
    // If it doesn't exist, add it to favorites
    const { error: insertError } = await supabase
      .from("favorite_playlists")
      .insert({
        user_id: userId,
        playlist_id: playlistId,
      });

    if (insertError) throw insertError;
    return { favorited: true };
  }
};

export const isPlaylistFavorited = async (
  playlistId: string,
  userId: string
) => {
  const supabase = createClient();

  const { data: existingFavorite, error } = await supabase
    .from("favorite_playlists")
    .select("id")
    .eq("user_id", userId)
    .eq("playlist_id", playlistId)
    .maybeSingle();

  if (error) throw error;

  return Boolean(existingFavorite);
};

export const getUserFavoritePlaylists = async (userId: string) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("favorite_playlists")
    .select("playlist_id")
    .eq("user_id", userId);

  if (error) throw error;

  return data.map((item) => item.playlist_id);
};
