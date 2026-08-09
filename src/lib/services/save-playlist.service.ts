import { createClient } from "@/lib/supabase/client";
import {
  generatedPlaylistSchema,
  GeneratedPlaylist,
  savePlaylistRequestSchema,
  SavePlaylistData,
} from "../schema/playlist.schema";
import { PlaylistSong } from "@/stores/audioStore";
import { PlaylistDataType, PlaylistData } from "@/types/playlist";

export const saveFullGeneratedPlaylist = async ({
  data,
  prompt,
}: {
  data: GeneratedPlaylist;
  prompt: string;
}) => {
  //validate the data using the schema
  const parsedData = generatedPlaylistSchema.safeParse(data);
  if (!parsedData.success) {
    throw new Error("Invalid playlist data");
  }

  //get data from the parsed data
  const { title, description, mood, songs } = parsedData.data.playlist;
  //get user data from supabase auth
  try {
    const supabase = createClient();
    const { data: userData, error: authError } = await supabase.auth.getUser();
    if (authError) throw authError;
    if (!userData)
      throw new Error("Please sign in to save favorite playlists.");

    //get user id
    const userId = userData.user?.id;
    //saved generated playlist to supabase
    const savedPlaylist = await saveGeneratedPlaylist(
      userId,
      {
        title,
        description,
        moods: mood,
        prompt,
      },
      supabase
    );

    if (!savedPlaylist.playlistId) throw new Error("Failed to save playlist.");

    //save each song in the playlist to supabase
    const savedSongs = await saveEachSongInPlaylist(
      savedPlaylist.playlistId,
      songs
    );

    if (savedSongs.status !== "success") {
      throw new Error("Failed to save songs.");
    }

    return {
      message: "Playlist and songs saved successfully.",
      playlistId: savedPlaylist.playlistId,
      redirectUrl: `/playing?playlist/${savedPlaylist.playlistId}`,
    };
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Something went wrong."
    );
  }
};

export const saveGeneratedPlaylist = async (
  userId: string,
  data: SavePlaylistData,
  supabase: ReturnType<typeof createClient> = createClient()
): Promise<{ message: string; playlistId: string }> => {
  //validate the data using the schema
  const parsedData = savePlaylistRequestSchema.safeParse(data);
  if (!parsedData.success) {
    throw new Error("Invalid playlist data");
  }

  //get data from the parsed data
  const { title, description, moods, prompt } = parsedData.data;

  try {
    //since users always generate a random playlist, we can use the title and user id to generate a unique id for the playlist
    const { data: savedPlaylist, error: insertError } = await supabase
      .from("playlists")
      .insert({ user_id: userId, title, description, moods, prompt })
      .select("id")
      .single();

    //if the playlist was not saved, throw an error
    if (!savedPlaylist) throw new Error("Failed to save playlist.");
    if (insertError) throw insertError;

    //return a success message and redirect url to the client
    return {
      message: "Playlist saved successfully.",
      playlistId: savedPlaylist?.id,
    };
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Something went wrong."
    );
  }
};

export const saveEachSongInPlaylist = async (
  playlistId: string,
  songs: PlaylistSong[],
  supabase: ReturnType<typeof createClient> = createClient()
) => {
  try {
    const { data: savedSongs, error: insertError } = await supabase
      .from("playlist_songs")
      .insert(
        songs.map((song) => ({
          playlist_id: playlistId,
          title: song.title,
          artist: song.artist,
          youtube_id: song.videoId,
          position: songs.indexOf(song) + 1, // Position starts from 1
        }))
      );

    if (!savedSongs) throw new Error("Failed to save songs.");
    if (insertError) throw insertError;

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

export const getSavedPlaylist = async (
  userId: string
): Promise<PlaylistData[]> => {
  const supabase = createClient();

  try {
    const { data: savedPlaylist, error: fetchError } = await supabase
      .from("playlists")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (!savedPlaylist) throw new Error("No saved playlist found.");
    if (fetchError) throw fetchError;

    return savedPlaylist.map((playlist: PlaylistDataType) => ({
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
