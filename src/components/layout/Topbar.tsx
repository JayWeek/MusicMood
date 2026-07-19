"use client";

import { Bell, Search } from "lucide-react";

export default function Topbar({ name }: { name: string }) {
  const nameParts = name.trim().split(/\s+/).filter(Boolean);
  const initials = nameParts.length > 1
    ? `${nameParts[0][0]}${nameParts.at(-1)?.[0]}`.toUpperCase()
    : nameParts[0]?.[0]?.toUpperCase() || "U";

  return (
    <header className="flex items-center justify-between border-b border-zinc-800 bg-[#121212] px-8 py-5">
      <div>
        <h2 className="text-2xl font-bold">
          {`Welcome ${name}`}
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

        <button
          aria-label={`${name}'s profile`}
          className="flex size-10 items-center justify-center rounded-full bg-green-500 font-bold text-black"
        >
          {initials}
        </button>
      </div>
    </header>
  );
}
