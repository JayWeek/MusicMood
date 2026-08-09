"use client";

import type { ReactNode } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import RightPanel from "@/components/layout/RightPanel";
import Player from "@/components/layout/Player";
import { PlaylistData } from "@/types/playlist";
import { PlaylistProvider } from "@/context/PlaylistContext";

interface DashboardClientLayoutProps {
  children: ReactNode;
  userData: {
    name: string;
    id: string;
  };
  initialPlaylists: PlaylistData[];
}

export default function DashboardClientLayout({
  children,
  userData,
  initialPlaylists,
}: DashboardClientLayoutProps) {
  return (
    <PlaylistProvider userId={userData.id} initialPlaylists={initialPlaylists}>
      <div className="flex h-screen overflow-hidden bg-[#121212] text-white">
        <Sidebar />

        <main className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <Topbar name={userData.name} />

          <section className="min-h-0 min-w-0 flex-1 overflow-y-auto p-6">
            {children}
          </section>

          <Player />
        </main>

        <RightPanel />
      </div>
    </PlaylistProvider>
  );
}
