"use client";

import { Music2 } from "lucide-react";

interface AuthHeaderProps {
  isSignup: boolean;
}

export default function AuthHeader({
  isSignup,
}: AuthHeaderProps) {
  return (
    <div className="mb-8 text-center">
      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-500">
        <Music2 className="h-8 w-8 text-black" />
      </div>

      <h1 className="text-3xl font-bold text-white">
        {isSignup ? "Create your account" : "Welcome Back"}
      </h1>

      <p className="mt-2 text-zinc-400">
        {isSignup
          ? "Join MusicMood and generate playlists with AI."
          : "Sign in to continue listening."}
      </p>
    </div>
  );
}