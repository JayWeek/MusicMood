"use client";

import { Bell, Search, UserCircle2 } from "lucide-react";

export default function Topbar() {
  return (
    <header className="flex items-center justify-between border-b border-zinc-800 bg-[#121212] px-8 py-5">
      <div>
        <h2 className="text-2xl font-bold">
          Welcome 👋
        </h2>

        <p className="text-sm text-zinc-400">
          Describe your mood and let AI build your playlist.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <button className="rounded-full bg-zinc-900 p-3 hover:bg-zinc-800">
          <Search size={20} />
        </button>

        <button className="rounded-full bg-zinc-900 p-3 hover:bg-zinc-800">
          <Bell size={20} />
        </button>

        <button className="rounded-full bg-green-500 p-1">
          <UserCircle2 size={34} />
        </button>
      </div>
    </header>
  );
}