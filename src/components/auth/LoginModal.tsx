"use client";

import Link from "next/link";
import { X, Music2 } from "lucide-react";

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

export default function LoginModal({
  open,
  onClose,
}: LoginModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">

      <div className="relative w-full max-w-md rounded-3xl bg-[#181818] p-8">

        <button
          onClick={onClose}
          className="absolute right-5 top-5 text-zinc-400 hover:text-white"
        >
          <X />
        </button>

        <div className="mb-8 flex justify-center">

          <div className="rounded-full bg-green-500 p-5">
            <Music2 className="text-black" size={36} />
          </div>

        </div>

        <h2 className="text-center text-3xl font-bold">
          Continue Your Journey
        </h2>

        <p className="mt-4 text-center text-zinc-400">
          Create a free account to unlock all MusicMood
          features.
        </p>

        <div className="mt-8 space-y-4">

          <div>✅ Save playlists</div>

          <div>✅ Favorite songs</div>

          <div>✅ Listening history</div>

          <div>✅ Sync across devices</div>

        </div>

        <div className="mt-10 space-y-4">

          <Link
            href="/auth"
            className="block rounded-full bg-green-500 py-3 text-center font-semibold text-black"
          >
            Sign In
          </Link>

          <button
            onClick={onClose}
            className="w-full rounded-full border border-zinc-700 py-3"
          >
            Continue as Guest
          </button>

        </div>

      </div>

    </div>
  );
}