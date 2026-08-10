"use client";

import { useEffect } from "react";
import { useAudioStore } from "@/stores/audioStore";
import NowPlayingPanel from "./NowPlayingPanel";

export default function NowPlayingClient() {
  // Use store states instead of local useState
  const setStorePlaylist = useAudioStore((state) => state.setPlaylist);
  const playlist = useAudioStore((state) => state.playlist);
  const storedPlaylist = useAudioStore((state) => state.playlist);

  useEffect(() => {
    const incomingSongIds = playlist?.songs.map((song) => song.videoId);
    const storedSongIds = storedPlaylist?.songs.map((song) => song.videoId);

    if (
      playlist &&
      incomingSongIds &&
      incomingSongIds.join("|") !== storedSongIds?.join("|")
    ) {
      setStorePlaylist(playlist);
    }
  }, [playlist, setStorePlaylist, storedPlaylist]);

  return <NowPlayingPanel />;
}

