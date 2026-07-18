"use client";

import Link from "next/link";
import {
  House,
  Sparkles,
  History,
  Heart,
  Settings,
  Library,
} from "lucide-react";

const menuItems = [
  {
    title: "Home",
    href: "/dashboard",
    icon: House,
  },
  {
    title: "Generate",
    href: "/dashboard",
    icon: Sparkles,
  },
  {
    title: "History",
    href: "/history",
    icon: History,
  },
  {
    title: "Favorites",
    href: "/favorites",
    icon: Heart,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  return (
    <aside className="hidden md:flex w-64 bg-black border-r border-zinc-800 flex-col">
      {/* Logo */}
      <div className="px-6 py-8">
        <h1 className="text-3xl font-bold text-green-500">
          MusicMood
        </h1>

        <p className="text-sm text-zinc-400 mt-1">
          AI Music Generator
        </p>
      </div>

      {/* Navigation */}
      <nav className="px-3 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.title}
              href={item.href}
              className="flex items-center gap-4 rounded-xl px-4 py-3 text-zinc-300 transition hover:bg-zinc-900 hover:text-white"
            >
              <Icon size={22} />

              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>

      {/* Library */}
      <div className="mt-10 px-6">
        <div className="flex items-center gap-3 text-zinc-400">
          <Library size={20} />
          <span className="font-medium">Your Library</span>
        </div>

        <div className="mt-5 space-y-3">
          <div className="rounded-lg bg-zinc-900 p-3">
            <p className="font-medium">Late Night Coding</p>
            <p className="text-xs text-zinc-500">
              Generated Playlist
            </p>
          </div>

          <div className="rounded-lg bg-zinc-900 p-3">
            <p className="font-medium">Rainy Evening</p>
            <p className="text-xs text-zinc-500">
              Generated Playlist
            </p>
          </div>

          <div className="rounded-lg bg-zinc-900 p-3">
            <p className="font-medium">Workout Mix</p>
            <p className="text-xs text-zinc-500">
              Generated Playlist
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}