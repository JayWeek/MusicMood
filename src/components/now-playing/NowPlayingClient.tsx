"use client";

import { useEffect } from "react";
import { useAudioStore } from "@/stores/audioStore";
import type { PlaylistData } from "@/stores/audioStore";
import NowPlayingPanel from "./NowPlayingPanel";

type NowPlayingClientProps = {
  initialPlaylist?: PlaylistData | null;
};

export default function NowPlayingClient({
  initialPlaylist,
}: NowPlayingClientProps) {
  const setStorePlaylist = useAudioStore((state) => state.setPlaylist);

  useEffect(() => {
    if (initialPlaylist && initialPlaylist.songs.length > 0) {
      setStorePlaylist(initialPlaylist);
    }
  }, [initialPlaylist, setStorePlaylist]);

  return <NowPlayingPanel />;
}

