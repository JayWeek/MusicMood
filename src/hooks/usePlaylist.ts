import { useState } from "react";

import {
  saveFullGeneratedPlaylist,
  getSavedPlaylist,
} from "@/lib/services/save-playlist.service";

import { GeneratedPlaylist } from "@/lib/schema/playlist.schema";

export default function usePlaylist({
  playlistData,
  prompt,
}: {
  playlistData: GeneratedPlaylist;
  prompt: string;
}) {
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const savePlaylist = async () => {
    try {
      setIsSaving(true);
      setSuccessMessage(null);

      const result = await saveFullGeneratedPlaylist({
        data: playlistData,
        prompt,
      });

      setSuccessMessage(result.message);

      return result;
    } catch (error) {
      console.error("Error saving playlist:", error);
      throw error;
    } finally {
      setIsSaving(false);
    }
  };

  const fetchSavedPlaylist = async (userId: string) => {
    try {
      const result = await getSavedPlaylist(userId);

      return result;
    } catch (error) {
      console.error("Error fetching saved playlist:", error);
      throw error;
    }
  };

  return {
    isSaving,
    savePlaylist,
    successMessage,
    fetchSavedPlaylist,
  };
}
