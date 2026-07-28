"use client";

import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import type { GeneratedPlaylist } from "@/lib/schema/playlist.schema";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import RightPanel from "@/components/layout/RightPanel";
import Player from "@/components/layout/Player";

interface DashboardClientLayoutProps {
  children: ReactNode;
  name: string;
}

export default function DashboardClientLayout({
  children,
  name,
}: DashboardClientLayoutProps) {
  const searchParams = useSearchParams();

  const [pausedVideoId, setPausedVideoId] = useState<string | null>(null);

  const [likedVideoIds, setLikedVideoIds] = useState<Set<string>>(
    () => new Set()
  );

  const playlistParam = searchParams.get("playlist");

  const trackParam = searchParams.get("track");

  const playlist = useMemo<GeneratedPlaylist | null>(() => {
    if (!playlistParam) {
      return null;
    }

    try {
      // useSearchParams already URL-decodes the value.
      // Preserve the complete { playlist: {...} } wrapper.
      return JSON.parse(playlistParam) as GeneratedPlaylist;
    } catch (error) {
      console.error("Unable to parse playlist from URL:", error);

      return null;
    }
  }, [playlistParam]);

  const songs = playlist?.playlist?.songs ?? [];

  const requestedTrackIndex = Number(trackParam ?? "0");

  const currentTrackIndex =
    Number.isInteger(requestedTrackIndex) &&
    requestedTrackIndex >= 0 &&
    requestedTrackIndex < songs.length
      ? requestedTrackIndex
      : 0;

  const currentTrack = songs[currentTrackIndex] ?? null;

  const playing =
    currentTrack !== null && pausedVideoId !== currentTrack.videoId;

  const liked =
    currentTrack !== null && likedVideoIds.has(currentTrack.videoId);

  const handleTogglePlaying = () => {
    if (!currentTrack) {
      return;
    }

    setPausedVideoId((current) =>
      current === currentTrack.videoId ? null : currentTrack.videoId
    );
  };

  const handleToggleLiked = () => {
    if (!currentTrack) {
      return;
    }

    setLikedVideoIds((current) => {
      const next = new Set(current);

      if (next.has(currentTrack.videoId)) {
        next.delete(currentTrack.videoId);
      } else {
        next.add(currentTrack.videoId);
      }

      return next;
    });
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#121212] text-white">
      <Sidebar />

      <main className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Topbar name={name} />

        <section className="min-h-0 min-w-0 flex-1 overflow-y-auto p-6">
          {children}
        </section>

        <Player />
      </main>

      <RightPanel
        song={currentTrack}
        mood={playlist?.playlist?.mood?.at(0)}
        playing={playing}
        liked={liked}
        onToggle={handleTogglePlaying}
        onLike={handleToggleLiked}
      />
    </div>
  );
}
