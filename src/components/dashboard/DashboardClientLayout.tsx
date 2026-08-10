"use client";

import type { ReactNode } from "react";

import type { SavedPlaylist } from "@/types/playlist";

import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import RightPanel from "@/components/layout/RightPanel";
import Player from "@/components/layout/Player";

import { PlaylistProvider, usePlaylists } from "@/context/PlaylistContext";

interface DashboardClientLayoutProps {
  children: ReactNode;

  userData: {
    name: string;
    id: string;
  };
  initialPlaylists?: SavedPlaylist[];
}

export default function DashboardClientLayout({
  children,
  userData,
  initialPlaylists = [],
}: DashboardClientLayoutProps) {
  return (
    <PlaylistProvider userId={userData.id} initialPlaylists={initialPlaylists}>
      <DashboardContent userData={userData}>{children}</DashboardContent>
    </PlaylistProvider>
  );
}

function DashboardContent({
  children,
  userData,
}: {
  children: ReactNode;

  userData: {
    name: string;
    id: string;
  };
}) {
  const { savedPlaylists } = usePlaylists();

  console.log("Dashboard saved playlists:", savedPlaylists);

  return (
    <div className="flex h-screen min-w-0 overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main dashboard column */}
      <main className="flex min-w-0 flex-1 flex-col overflow-hidden">
        {/* Topbar */}
        <Topbar name={userData.name} />

        {/* Scrollable content */}
        <section className="min-h-0 flex-1 overflow-y-auto p-6">
          {children}
        </section>

        {/* Player stays at bottom of MAIN column */}
        <div className="shrink-0">
          <Player />
        </div>
      </main>

      {/* Right panel */}
      <RightPanel />
    </div>
  );
}
