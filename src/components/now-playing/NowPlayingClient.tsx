"use client";

import { useEffect } from "react";
import type { GeneratedPlaylist } from "@/lib/schema/playlist.schema";
import { useAudioStore } from "@/stores/audioStore";
import NowPlayingPanel from "./NowPlayingPanel";

interface NowPlayingClientProps {
  playlist: GeneratedPlaylist | null;
}

export default function NowPlayingClient({ playlist }: NowPlayingClientProps) {
  // Use store states instead of local useState
  const setStorePlaylist = useAudioStore((state) => state.setPlaylist);
  const storedPlaylist = useAudioStore((state) => state.playlist);

  useEffect(() => {
    const incomingSongIds = playlist?.playlist.songs.map((song) => song.videoId);
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