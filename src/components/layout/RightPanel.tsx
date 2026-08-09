"use client";

import AIInsightsCard from "./AIInsightsCard";
import TrackPlayerPreview from "../now-playing/TrackPlayerPreview";
import { useAudioStore } from "@/stores/audioStore";
import { AboutPlaylistRightSide } from "../playlist/AboutPlaylistRightSide";

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds <= 0) {
    return "0:00";
  }

  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");

  return `${mins}:${secs}`;
}

export default function RightPanel() {
  const currentSong = useAudioStore((state) => state.currentSong);
  const isPlaying = useAudioStore((state) => state.isPlaying);
  const toggle = useAudioStore((state) => state.toggle);
  const mood = useAudioStore((state) => state.mood);
  const progress = useAudioStore((state) => state.progress);
  const duration = useAudioStore((state) => state.duration);
  const playlist = useAudioStore((state) => state.playlist);

  if (!currentSong) {
    return;
  }
  return (
    <aside className="hidden w-80 flex-col gap-6 border-l border-zinc-800 bg-[#121212] p-6 xl:flex">
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-5 shadow-2xl shadow-black/20">
        <TrackPlayerPreview
          playing={isPlaying}
          playlistMood={mood}
          song={currentSong}
          currentTime={formatTime(progress)}
          durration={formatTime(duration)}
          liked={false}
          onToggle={toggle}
          favoriteSong={
            currentSong
              ? {
                  title: currentSong.title,
                  artist: currentSong.artist,
                  youtubeId: currentSong.videoId,
                }
              : undefined
          }
        />
      </div>

      <AboutPlaylistRightSide
        moods={playlist?.mood || []}
        title={playlist?.title || ""}
        songsLength={playlist?.songs.length || 0}
      />

      <div className="h-1 rounded-full bg-zinc-800">
        <div
          className="h-1 rounded-full bg-green-500"
          style={{ width: `${(progress / duration) * 100}%` }}
        />
      </div>

      <AIInsightsCard
        moods={playlist?.mood || []}
        title={playlist?.title || ""}
      />
    </aside>
  );
}
