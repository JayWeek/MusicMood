"use client";

import { Bell, Menu, Search } from "lucide-react";

interface TopbarProps {
  name: string;
  onMenuClick: () => void;
}

export default function Topbar({ name, onMenuClick }: TopbarProps) {
  const nameParts = name.trim().split(/\s+/).filter(Boolean);

  const initials =
    nameParts.length > 1
      ? `${nameParts[0][0]}${nameParts.at(-1)?.[0]}`.toUpperCase()
      : nameParts[0]?.[0]?.toUpperCase() || "U";

  return (
    <header className="flex items-center justify-between border-b border-zinc-800 bg-[#121212] px-4 py-4 md:px-8 md:py-5">
      {/* Left side */}
      <div className="flex items-center gap-4">
        {/* Mobile menu */}
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open sidebar"
          className="rounded-full bg-zinc-900 p-3 text-zinc-300 transition hover:bg-zinc-800 hover:text-white md:hidden"
        >
          <Menu size={20} className="cursor-pointer" />
        </button>

        {/* Welcome */}
        <div className="hidden flex-col gap-1 md:flex">
          <h2 className="text-base font-bold md:text-xs xl:text-sm">
            Welcome {name}
          </h2>

          <p className="text-zinc-400 md:text-xs xl:text-sm">
            Describe your mood and let AI build your playlist.
          </p>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3 md:gap-4">
        {/* Search */}
        <button
          type="button"
          aria-label="Search"
          className="rounded-full bg-zinc-900 p-3 text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
        >
          <Search size={20} />
        </button>

        {/* Notifications */}
        <button
          type="button"
          aria-label="Notifications"
          className="rounded-full bg-zinc-900 p-3 text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
        >
          <Bell size={20} />
        </button>

        {/* Profile */}
        <button
          type="button"
          aria-label={`${name}'s profile`}
          className="flex size-10 items-center justify-center rounded-full bg-green-500 font-bold text-black transition hover:bg-green-400"
        >
          {initials}
        </button>
      </div>
    </header>
  );
}
