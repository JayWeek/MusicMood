"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useAudioStore } from "@/stores/audioStore";
import FavoriteButton from "@/components/favorites/FavoriteButton";
import PlayerInfo from "../player/PlayerInfo";
import PlayerControls from "../player/PlayerControls";
import ProgressBar from "../player/ProgressBar";
import VolumeControl from "../player/VolumeControl";

const ReactPlayer = dynamic(() => import("react-player"), {
  ssr: false,
});

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds <= 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${mins}:${secs}`;
}

export default function Player() {
  const playerRef = useRef<HTMLVideoElement>(null);
  const [isReady, setIsReady] = useState(false);

  const {
    currentSong,
    isPlaying,
    volume,
    progress,
    duration,
    isMuted,
    seekTarget,
    play,
    pause,
    next,
    previous,
    seek,
    setVolume,
    setProgress,
    setDuration,
    setMuted,
    clearSeekTarget,
    isShuffleEnabled,
    repeatMode,
    toggleShuffle,
    cycleRepeatMode,
  } = useAudioStore();

  const playerUrl = useMemo(() => {
    return currentSong?.videoId ? `https://www.youtube.com/watch?v=${currentSong.videoId}` : "";
  }, [currentSong?.videoId]);

  useEffect(() => {
    setIsReady(false);
  }, [playerUrl]);

  useEffect(() => {
    if (seekTarget !== null && playerRef.current && isReady) {
      playerRef.current.currentTime = seekTarget;
      if (isPlaying) {
        void playerRef.current.play().catch(() => undefined);
      }
      clearSeekTarget();
    }
  }, [seekTarget, isReady, clearSeekTarget]);

  const isClient = typeof window !== "undefined";
  const playerConfig = {
    youtube: {
      playerVars: {
        autoplay: 1,
        controls: 0,
        modestbranding: 1,
        rel: 0,
        iv_load_policy: 3,
      },
    },
  } as any;

  return (
    <footer className="z-50 shrink-0 border-t border-zinc-800 bg-[#181818] px-6 py-4">
      <div className="pointer-events-none absolute -left-px -top-px size-px overflow-hidden opacity-0">
        {isClient && playerUrl && (
          <ReactPlayer
            key={playerUrl}
            ref={playerRef}
            src={playerUrl}
            playing={isPlaying}
            muted={isMuted}
            volume={isMuted ? 0 : volume / 100}
            onReady={() => {
              setIsReady(true);
              const playerDuration = playerRef.current?.duration;
              if (playerDuration && Number.isFinite(playerDuration)) {
                setDuration(playerDuration);
              }
            }}
            onEnded={next}
            onDurationChange={(event) => setDuration(event.currentTarget.duration)}
            onTimeUpdate={(event) => setProgress(event.currentTarget.currentTime)}
            config={playerConfig}
          />
        )}
      </div>

      <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-3">
        <PlayerInfo
          title={currentSong?.title ?? "Choose a playlist"}
          artist={currentSong?.artist ?? "Your next favorite song"}
          artwork={currentSong?.thumbnail || "https://picsum.photos/200"}
          favoriteControl={currentSong ? (
            <FavoriteButton
              song={{
                title: currentSong.title,
                artist: currentSong.artist,
                youtubeId: currentSong.videoId,
              }}
            />
          ) : null}
        />

        <div className="flex flex-col items-center gap-3">
          <PlayerControls
            playing={isPlaying}
            onToggle={() => (isPlaying ? pause() : play())}
            onNext={next}
            onPrevious={previous}
            shuffleEnabled={isShuffleEnabled}
            repeatMode={repeatMode}
            onToggleShuffle={toggleShuffle}
            onCycleRepeatMode={cycleRepeatMode}
          />

          <ProgressBar
            current={progress}
            duration={duration}
            onSeek={(value) => seek(value)}
          />
        </div>

        <div className="flex justify-end">
          <VolumeControl
            volume={volume}
            isMuted={isMuted}
            onVolumeChange={(value) => setVolume(value)}
            onToggleMute={() => setMuted(!isMuted)}
          />
        </div>
      </div>

      <div className="mt-3 text-center text-[11px] uppercase tracking-[0.3em] text-zinc-500">
        {currentSong ? `${formatTime(progress)} / ${formatTime(duration)}` : "No track selected"}
      </div>
    </footer>
  );
}