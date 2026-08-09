"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";

import {
  getSavedPlaylist,
  saveFullGeneratedPlaylist,
} from "@/lib/services/save-playlist.service";

import { SavedPlaylist } from "@/types/playlist";
import { PlaylistData } from "@/stores/audioStore";

interface PlaylistContextValue {
  savedPlaylists: SavedPlaylist[];
  isLoading: boolean;
  error: string | null;
  savePlaylist: (playlist: PlaylistData) => Promise<void>;
  refreshPlaylists: () => Promise<void>;
}

const PlaylistContext = createContext<PlaylistContextValue | null>(null);

interface PlaylistProviderProps {
  children: ReactNode;
  userId: string;
  initialPlaylists: SavedPlaylist[];
}

export function PlaylistProvider({
  children,
  userId,
  initialPlaylists,
}: PlaylistProviderProps) {
  const [savedPlaylists, setSavedPlaylists] =
    useState<SavedPlaylist[]>(initialPlaylists);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshPlaylists = useCallback(async () => {
    if (!userId) {
      setSavedPlaylists([]);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const data = await getSavedPlaylist(userId);

      setSavedPlaylists(data);
    } catch (error) {
      console.error("Failed to fetch playlists:", error);
      setError("Failed to load playlists.");
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  const savePlaylist = useCallback(
    async (playlist: PlaylistData) => {
      try {
        setIsLoading(true);
        setError(null);

        await saveFullGeneratedPlaylist(playlist);

        // Get the latest playlists after saving
        const data = await getSavedPlaylist(userId);

        setSavedPlaylists(data);
      } catch (error) {
        console.error("Failed to save playlist:", error);
        setError("Failed to save playlist.");
      } finally {
        setIsLoading(false);
      }
    },
    [userId]
  );

  return (
    <PlaylistContext.Provider
      value={{
        savedPlaylists,
        isLoading,
        error,
        refreshPlaylists,
        savePlaylist,
      }}
    >
      {children}
    </PlaylistContext.Provider>
  );
}

export function usePlaylists() {
  const context = useContext(PlaylistContext);

  if (!context) {
    throw new Error("usePlaylists must be used inside PlaylistProvider");
  }

  return context;
}
