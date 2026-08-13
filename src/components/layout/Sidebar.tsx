"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  House,
  Sparkles,
  History,
  Heart,
  Settings,
  Music,
  ListMusic,
  X,
} from "lucide-react";

import LogOutBtn from "../auth/LogoutBtn";
import RenderPlaylistView from "@/components/playlist/PlaylistData";
import { usePlaylists } from "@/context/PlaylistContext";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  {
    title: "Home",
    href: "/dashboard",
    icon: House,
  },
  {
    title: "Generate",
    href: "/generate",
    icon: Sparkles,
  },
  {
    title: "Now Playing",
    href: "/playing",
    icon: Music,
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

const sidebarRoutes = [
  "/dashboard",
  "/generate",
  "/playing",
  "/history",
  "/favorites",
  "/settings",
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  const { savedPlaylists, isLoading, error } = usePlaylists();

  const shouldShowSidebar = sidebarRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  if (!shouldShowSidebar) {
    return null;
  }

  return (
    <>
      {/* Mobile Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 shrink-0 flex-col overflow-y-auto border-r border-zinc-800 bg-[#121212] transition-transform duration-300 ease-in-out md:static md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header / Logo */}
        <div className="relative px-6 py-8">
          {/* Mobile Close Button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close sidebar"
            className="absolute top-4 right-4 rounded-lg p-2 text-zinc-400 transition hover:bg-zinc-900 hover:text-white md:hidden"
          >
            <X className="h-5 w-5" />
          </button>

          <Link
            href="/"
            onClick={onClose}
            className="text-3xl font-bold text-green-500"
          >
            MusicMood
          </Link>

          <p className="mt-1 text-sm text-zinc-400">AI Music Generator</p>
        </div>

        {/* Navigation */}
        <nav className="space-y-2 px-3">
          {menuItems.map((item) => {
            const Icon = item.icon;

            const isActive =
              pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.title}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-4 rounded-xl px-4 py-3 text-sm transition ${
                  isActive
                    ? "bg-zinc-900 text-green-500"
                    : "text-zinc-300 hover:bg-zinc-900 hover:text-white"
                }`}
              >
                <Icon size={22} />
                <span>{item.title}</span>
              </Link>
            );
          })}
        </nav>

        {/* Library */}
        <div className="mt-10 flex-1 overflow-y-auto px-6 pb-6">
          <div className="my-3 flex items-center gap-3 text-zinc-400">
            <ListMusic size={20} />
            <span className="font-medium">Your Library</span>
          </div>

          <RenderPlaylistView
            data={savedPlaylists}
            isLoading={isLoading}
            isError={!!error}
          />
        </div>

        {/* Logout */}
        <div className="mt-auto w-full border-t border-zinc-800 p-4">
          <LogOutBtn />
        </div>
      </aside>
    </>
  );
}
