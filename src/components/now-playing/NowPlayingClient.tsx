"use client";

import { useEffect } from "react";
import type { GeneratedPlaylist } from "@/lib/schema/playlist.schema";
import { useAudioStore } from "@/stores/audioStore";
import NowPlayingPanel, { currentTrack } from "./NowPlayingPanel";

interface NowPlayingClientProps {
  playlist: GeneratedPlaylist | null;
}

export default function NowPlayingClient({ playlist }: NowPlayingClientProps) {
  // Use store states instead of local useState
  const isPlaying = useAudioStore((state) => state.isPlaying);
  const togglePlay = useAudioStore((state) => state.toggle);
  const currentSongIndex = useAudioStore((state) => state.currentSongIndex);
  const selectSong = useAudioStore((state) => state.selectSong);
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

  const queue: currentTrack[] =
    playlist?.playlist?.songs?.map((song) => ({
      title: song.title,
      artist: song.artist,
      reason: "Queued from your generated playlist",
    })) ?? [];

  return (
    <NowPlayingPanel
      playing={isPlaying} // Now synced with footer
      setPlaying={togglePlay} // Now controls footer
      liked={true}
      setLiked={() => {}}
      queue={queue}
      currentSongIndex={currentSongIndex}
      onSelectSong={selectSong}
    />
  );
}