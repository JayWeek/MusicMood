"use client";

import { useEffect, useRef, useState } from "react";
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

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds <= 0) {
    return "0:00";
  }

  const minutes = Math.floor(seconds / 60);

  const secondsRemaining = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");

  return `${minutes}:${secondsRemaining}`;
}

function isValidHttpUrl(value: string | null | undefined): value is string {
  if (!value) {
    return false;
  }

  try {
    const url = new URL(value);

    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

function isValidVideoId(value: string | null | undefined): value is string {
  if (!value?.trim()) {
    return false;
  }

  return !value.trim().toLowerCase().startsWith("unknown");
}

function getArtworkUrl({
  thumbnail,
  videoId,
}: {
  thumbnail?: string | null;
  videoId?: string | null;
}): string {
  if (isValidHttpUrl(thumbnail)) {
    return thumbnail;
  }

  if (isValidVideoId(videoId)) {
    return `https://i.ytimg.com/vi/${encodeURIComponent(
      videoId.trim()
    )}/hqdefault.jpg`;
  }

  return "https://picsum.photos/200";
}

export default function Player() {
  const playerRef = useRef<HTMLVideoElement>(null);

  const [readyPlayerUrl, setReadyPlayerUrl] = useState<string | null>(null);

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

  const videoId = currentSong?.videoId;

  const playerUrl = isValidVideoId(videoId)
    ? `https://www.youtube.com/watch?v=${encodeURIComponent(videoId.trim())}`
    : "";

  const artworkUrl = getArtworkUrl({
    thumbnail: currentSong?.thumbnail,
    videoId,
  });

  const isReady = Boolean(playerUrl) && readyPlayerUrl === playerUrl;

  useEffect(() => {
    if (seekTarget === null || !playerRef.current || !isReady) {
      return;
    }

    playerRef.current.currentTime = seekTarget;

    if (isPlaying) {
      void playerRef.current.play().catch(() => undefined);
    }

    clearSeekTarget();
  }, [seekTarget, isReady, isPlaying, clearSeekTarget]);

  return (
    <footer className="relative z-50 shrink-0 border-t border-zinc-800 bg-[#181818] px-6 py-4">
      <div className="pointer-events-none absolute -top-px -left-px size-px overflow-hidden opacity-0">
        {playerUrl && (
          <ReactPlayer
            key={playerUrl}
            ref={playerRef}
            src={playerUrl}
            playing={isPlaying}
            controls={false}
            playsInline
            muted={isMuted}
            volume={isMuted ? 0 : volume / 100}
            onReady={() => {
              console.log("Player ready:", playerUrl);
              setReadyPlayerUrl(playerUrl);

              const playerDuration = playerRef.current?.duration;

              if (
                typeof playerDuration === "number" &&
                Number.isFinite(playerDuration) &&
                playerDuration > 0
              ) {
                setDuration(playerDuration);
              }
            }}
            onPlay={() => {
              console.log("Playback started");
            }}
            onPause={() => {
              console.log("Playback paused");
            }}
            onError={(error) => {
              console.error("React Player error:", error);
            }}
            onEnded={next}
            onDurationChange={(event) => {
              const nextDuration = event.currentTarget.duration;

              if (Number.isFinite(nextDuration)) {
                setDuration(nextDuration);
              }
            }}
            onTimeUpdate={(event) => {
              const nextProgress = event.currentTarget.currentTime;

              if (Number.isFinite(nextProgress)) {
                setProgress(nextProgress);
              }
            }}
          />
        )}
      </div>

      <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-3">
        <PlayerInfo
          title={currentSong?.title ?? "Choose a playlist"}
          artist={currentSong?.artist ?? "Your next favorite song"}
          artwork={artworkUrl}
          favoriteControl={
            currentSong && isValidVideoId(currentSong.videoId) ? (
              <FavoriteButton
                song={{
                  title: currentSong.title,
                  artist: currentSong.artist,
                  youtubeId: currentSong.videoId,
                }}
              />
            ) : null
          }
        />

        <div className="flex flex-col items-center gap-3">
          <PlayerControls
            playing={isPlaying}
            onToggle={() => {
              if (isPlaying) {
                pause();
              } else {
                play();
              }
            }}
            onNext={next}
            onPrevious={previous}
            shuffleEnabled={isShuffleEnabled}
            repeatMode={repeatMode}
            onToggleShuffle={toggleShuffle}
            onCycleRepeatMode={cycleRepeatMode}
          />

          <ProgressBar current={progress} duration={duration} onSeek={seek} />
        </div>

        <div className="flex justify-end">
          <VolumeControl
            volume={volume}
            isMuted={isMuted}
            onVolumeChange={setVolume}
            onToggleMute={() => {
              setMuted(!isMuted);
            }}
          />
        </div>
      </div>

      <div className="mt-3 text-center text-[11px] tracking-[0.3em] text-zinc-500 uppercase">
        {currentSong
          ? `${formatTime(progress)} / ${formatTime(duration)}`
          : "No track selected"}
      </div>
    </footer>
  );
}
