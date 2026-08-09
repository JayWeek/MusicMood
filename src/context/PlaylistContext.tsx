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
import { PlaylistData } from "@/types/playlist";
import { GeneratedPlaylist } from "@/lib/schema/playlist.schema";

interface PlaylistContextValue {
  playlists: PlaylistData[];
  isLoading: boolean;
  error: string | null;
  savePlaylist: (data: GeneratedPlaylist, prompt: string) => Promise<void>;
  refreshPlaylists: () => Promise<void>;
}

const PlaylistContext = createContext<PlaylistContextValue | null>(null);

interface PlaylistProviderProps {
  children: ReactNode;
  userId: string;
  initialPlaylists: PlaylistData[];
}

export function PlaylistProvider({
  children,
  userId,
  initialPlaylists,
}: PlaylistProviderProps) {
  const [playlists, setPlaylists] = useState<PlaylistData[]>(initialPlaylists);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshPlaylists = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await getSavedPlaylist(userId);

      setPlaylists(data);
    } catch (error) {
      console.error("Failed to fetch playlists:", error);
      setError("Failed to load playlists.");
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  const savePlaylist = useCallback(
    async (data: GeneratedPlaylist, prompt: string) => {
      try {
        setIsLoading(true);
        setError(null);
        await saveFullGeneratedPlaylist({ data, prompt });
        await refreshPlaylists();
      } catch (error) {
        console.error("Failed to save playlist:", error);
        setError("Failed to save playlist.");
      } finally {
        setIsLoading(false);
      }
    },
    [refreshPlaylists]
  );

  return (
    <PlaylistContext.Provider
      value={{
        playlists,
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
