"use client";

import type { ReactNode } from "react";
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

      <RightPanel />
    </div>
  );
}
