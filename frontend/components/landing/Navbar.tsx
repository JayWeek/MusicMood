"use client";

import Link from "next/link";
import { Music2 } from "lucide-react";

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-500">
            <Music2 className="h-6 w-6 text-black" />
          </div>

          <span className="text-2xl font-bold">
            MusicMood
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-10 text-zinc-300 md:flex">
          <a href="#features" className="transition hover:text-white">
            Features
          </a>

          <a href="#how-it-works" className="transition hover:text-white">
            How It Works
          </a>

          <a href="#testimonials" className="transition hover:text-white">
            Testimonials
          </a>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Link
            href="/auth"
            className="hidden text-zinc-300 transition hover:text-white sm:block"
          >
            Login
          </Link>

          <Link
            href="/auth"
            className="rounded-full bg-green-500 px-6 py-3 font-semibold text-black transition hover:bg-green-400"
          >
            Get Started
          </Link>
        </div>

      </div>
    </header>
  );
}