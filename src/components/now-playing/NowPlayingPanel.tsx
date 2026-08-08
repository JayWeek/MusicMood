"use client";

import EachTrackInPlaylist from "./EachTrackInPlaylist";
import { useAudioStore } from "@/stores/audioStore";

export default function NowPlayingPanel() {
  const playlist = useAudioStore((state) => state.playlist);

  const currentSongIndex = useAudioStore((state) => state.currentSongIndex);

  const isPlaying = useAudioStore((state) => state.isPlaying);

  const play = useAudioStore((state) => state.play);

  const pause = useAudioStore((state) => state.pause);

  const selectSong = useAudioStore((state) => state.selectSong);

  const songs = playlist?.songs ?? [];

  const handleTrackClick = (index: number) => {
    const selectedSong = songs[index];

    if (!selectedSong) {
      return;
    }

    const isCurrentSong = index === currentSongIndex;

    if (isCurrentSong) {
      if (isPlaying) {
        pause();
      } else {
        play();
      }

      return;
    }

    selectSong(index);
  };

  return (
    <div>
      <div className="mt-5 pt-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-white capitalize">
            {playlist?.title}
          </h3>

          <span className="text-xs text-zinc-500">{songs.length}</span>
        </div>

        <div className="space-y-2 text-sm text-zinc-400">
          {songs.length > 0 ? (
            songs.map((song, index) => {
              const isActiveSong = index === currentSongIndex;

              return (
                <EachTrackInPlaylist
                  key={`${song.videoId}-${index}`}
                  song={song}
                  index={index}
                  playing={isActiveSong && isPlaying}
                  onClick={() => handleTrackClick(index)}
                />
              );
            })
          ) : (
            <div className="rounded-lg bg-zinc-950/50 px-3 py-3 text-sm text-zinc-500">
              No tracks available yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
