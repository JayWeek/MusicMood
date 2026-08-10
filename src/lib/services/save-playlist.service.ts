import { createClient } from "@/lib/supabase/client";
import { PlaylistData, PlaylistSong } from "@/stores/audioStore";
import { PlaylistDataType, SavedPlaylist } from "@/types/playlist";

/**
 * Save a complete generated playlist.
 *
 * Flow:
 * 1. Get the currently authenticated user
 * 2. Save the playlist
 * 3. Save all songs belonging to that playlist
 * 4. Return the playlist ID and redirect URL
 */
export const saveFullGeneratedPlaylist = async (playlist: PlaylistData) => {
  try {
    const supabase = createClient();

    // Get authenticated user
    const { data: userData, error: authError } = await supabase.auth.getUser();

    if (authError) {
      throw authError;
    }

    if (!userData.user) {
      throw new Error("Please sign in to save playlists.");
    }

    const userId = userData.user.id;

    // Save playlist
    const savedPlaylist = await saveGeneratedPlaylist(
      userId,
      playlist,
      supabase
    );

    if (!savedPlaylist.playlistId) {
      throw new Error("Failed to save playlist.");
    }

    // Save songs
    const savedSongs = await saveEachSongInPlaylist(
      savedPlaylist.playlistId,
      playlist.songs,
      supabase
    );

    if (savedSongs.status !== "success") {
      throw new Error("Failed to save songs.");
    }

    return {
      message: "Playlist and songs saved successfully.",
      playlistId: savedPlaylist.playlistId,
      redirectUrl: `/playing?playlist=${savedPlaylist.playlistId}`,
    };
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Something went wrong."
    );
  }
};

/**
 * Save the generated playlist to the playlists table.
 */
export const saveGeneratedPlaylist = async (
  userId: string,
  playlist: PlaylistData,
  supabase: ReturnType<typeof createClient>
): Promise<{
  message: string;
  playlistId: string;
}> => {
  try {
    const { data: savedPlaylist, error: insertError } = await supabase
      .from("playlists")
      .insert({
        user_id: userId,
        title: playlist.title,
        description: playlist.description,
        moods: playlist.mood,
        prompt: playlist.title,
      })
      .select("id")
      .single();

    if (insertError) {
      throw insertError;
    }

    if (!savedPlaylist) {
      throw new Error("Failed to save playlist.");
    }

    return {
      message: "Playlist saved successfully.",
      playlistId: savedPlaylist.id,
    };
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Something went wrong."
    );
  }
};

/**
 * Save all songs belonging to a playlist.
 */
export const saveEachSongInPlaylist = async (
  playlistId: string,
  songs: PlaylistSong[],
  supabase: ReturnType<typeof createClient>
) => {
  try {
    if (songs.length === 0) {
      return {
        status: "success",
        message: "No songs to save.",
      };
    }

    const songsToInsert = songs.map((song, index) => ({
      playlist_id: playlistId,
      title: song.title,
      artist: song.artist,
      youtube_id: song.videoId,
      position: index + 1,
    }));

    const { data: savedSongs, error: insertError } = await supabase
      .from("playlist_songs")
      .insert(songsToInsert)
      .select();

    if (insertError) {
      throw insertError;
    }

    if (!savedSongs) {
      throw new Error("Failed to save songs.");
    }

    return {
      status: "success",
      message: "Songs saved successfully.",
    };
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Something went wrong."
    );
  }
};

/**
 * Get all saved playlists belonging to a user.
 */
export const getSavedPlaylist = async (
  userId: string
): Promise<SavedPlaylist[]> => {
  const supabase = createClient();

  try {
    const { data: savedPlaylists, error: fetchError } = await supabase
      .from("playlists")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", {
        ascending: false,
      });

    if (fetchError) {
      throw fetchError;
    }

    // No playlists is a valid state, not an error.
    if (!savedPlaylists) {
      return [];
    }

    return savedPlaylists.map((playlist: PlaylistDataType) => ({
      playlistId: playlist.id,
      createdAt: playlist.created_at,
      title: playlist.title,
      moods: playlist.moods,
      prompt: playlist.prompt,
      description: playlist.description,
    }));
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Something went wrong."
    );
  }
};

export const getPlaylistById = async (
  playlistId: string
): Promise<PlaylistData | null> => {
  const supabase = await createClient();

  try {
    // Fetch playlist
    const { data: playlist, error: playlistError } = await supabase
      .from("playlists")
      .select("title, description, moods")
      .eq("id", playlistId)
      .single();

    if (playlistError) {
      throw playlistError;
    }

    if (!playlist) {
      return null;
    }

    // Fetch all songs belonging to the playlist
    const { data: songs, error: songsError } = await supabase
      .from("playlist_songs")
      .select("*")
      .eq("playlist_id", playlistId)
      .order("position", { ascending: true });

    if (songsError) {
      throw songsError;
    }

    //error here need to fix palylist songs table
    return {
      title: playlist.title,
      description: playlist.description ?? undefined,
      mood: playlist.moods ?? undefined,
      songs: (songs ?? []).map(
        (song): PlaylistSong => ({
          title: song.title,
          artist: song.artist,
          videoId: song.youtube_id,
          duration: song.youtube_id,
          thumbnail: song.youtube_id,
        })
      ),
    };
  } catch (error) {
    console.error("Failed to fetch playlist:", error);

    throw new Error(
      error instanceof Error ? error.message : "Something went wrong."
    );
  }
};
