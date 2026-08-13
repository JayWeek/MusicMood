"use client";

import Link from "next/link";
import { Menu, Music2, X } from "lucide-react";
import { useState } from "react";

export default function Navbar({
  isAuthentcated = false,
}: {
  isAuthentcated: boolean;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-500">
            <Music2 className="h-6 w-6 text-black" />
          </div>

          <span className="text-2xl font-bold">MusicMood</span>
        </Link>

        {/* Desktop Navigation */}
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

        {/* Desktop Actions */}
        <div className="hidden items-center gap-4 md:flex">
          {isAuthentcated ? (
            <>
              <Link
                href="/dashboard"
                className="text-zinc-300 transition hover:text-white"
              >
                Dashboard
              </Link>

              <Link
                href="/playlist"
                className="rounded-full bg-green-500 px-6 py-3 font-semibold text-black transition hover:bg-green-400"
              >
                Listen
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/auth"
                className="text-zinc-300 transition hover:text-white"
              >
                Login
              </Link>

              <Link
                href="/auth"
                className="rounded-full bg-green-500 px-6 py-3 font-semibold text-black transition hover:bg-green-400"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsMenuOpen(true)}
          className="rounded-lg p-2 text-zinc-300 hover:bg-white/10 hover:text-white md:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-7 w-7" />
        </button>
      </div>

      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 transition-opacity duration-300 md:hidden ${
          isMenuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onClick={closeMenu}
      />

      {/* Mobile Sidebar */}
      <aside
        className={`fixed top-0 right-0 h-screen w-[80%] max-w-sm border-l border-white/10 bg-zinc-950 p-6 shadow-2xl transition-transform duration-300 ease-in-out md:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            onClick={closeMenu}
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500">
              <Music2 className="h-5 w-5 text-black" />
            </div>

            <span className="text-xl font-bold">MusicMood</span>
          </Link>

          <button
            onClick={closeMenu}
            className="rounded-lg p-2 text-zinc-400 hover:bg-white/10 hover:text-white"
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Sidebar Navigation */}
        <nav className="mt-12 flex flex-col gap-6">
          <a
            href="#features"
            onClick={closeMenu}
            className="text-lg text-zinc-300 transition hover:text-white"
          >
            Features
          </a>

          <a
            href="#how-it-works"
            onClick={closeMenu}
            className="text-lg text-zinc-300 transition hover:text-white"
          >
            How It Works
          </a>

          <a
            href="#testimonials"
            onClick={closeMenu}
            className="text-lg text-zinc-300 transition hover:text-white"
          >
            Testimonials
          </a>

          <div className="my-2 border-t border-white/10" />

          {isAuthentcated ? (
            <>
              <Link
                href="/dashboard"
                onClick={closeMenu}
                className="text-lg text-zinc-300 transition hover:text-white"
              >
                Dashboard
              </Link>

              <Link
                href="/playlist"
                onClick={closeMenu}
                className="rounded-full bg-green-500 px-6 py-3 text-center font-semibold text-black transition hover:bg-green-400"
              >
                Listen
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/auth"
                onClick={closeMenu}
                className="rounded-full bg-green-500 px-6 py-3 text-center font-semibold text-black transition hover:bg-green-400"
              >
                Login
              </Link>

              <Link
                href="/auth"
                onClick={closeMenu}
                className="rounded-full bg-green-500 px-6 py-3 text-center font-semibold text-black transition hover:bg-green-400"
              >
                Get Started
              </Link>
            </>
          )}
        </nav>
      </aside>
    </header>
  );
}
