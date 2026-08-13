import Link from "next/link";
import { FaGithub, FaInstagram, FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-black">
      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* Main Footer */}
        <div className="grid gap-10 md:grid-cols-3 md:items-start">
          {/* Brand */}
          <div>
            <Link href="/" className="text-2xl font-bold text-white">
              MusicMood
            </Link>

            <p className="mt-3 max-w-sm text-sm leading-6 text-zinc-500">
              Discover your perfect soundtrack with AI-powered music
              recommendations tailored to your mood.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="mb-4 text-sm font-semibold tracking-wider text-white uppercase">
              Explore
            </h3>

            <div className="flex flex-col gap-3 text-sm text-zinc-400">
              <Link href="/" className="transition hover:text-white">
                Home
              </Link>

              <Link href="#features" className="transition hover:text-white">
                Features
              </Link>

              <Link
                href="#how-it-works"
                className="transition hover:text-white"
              >
                How It Works
              </Link>

              <Link href="/auth" className="transition hover:text-white">
                Login
              </Link>
            </div>
          </div>

          {/* Socials */}
          <div className="md:text-right">
            <h3 className="mb-4 text-sm font-semibold tracking-wider text-white uppercase">
              Follow Us
            </h3>

            <div className="flex gap-4 md:justify-end">
              <a
                href="#"
                aria-label="GitHub"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-800 text-zinc-400 transition hover:border-zinc-600 hover:text-white"
              >
                <FaGithub size={20} />
              </a>

              <a
                href="#"
                aria-label="X"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-800 text-zinc-400 transition hover:border-zinc-600 hover:text-white"
              >
                <FaXTwitter size={18} />
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-800 text-zinc-400 transition hover:border-zinc-600 hover:text-white"
              >
                <FaInstagram size={19} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex flex-col items-center justify-between gap-4 text-center text-sm text-zinc-500 md:flex-row md:text-left">
          <p>© {new Date().getFullYear()} MusicMood. All rights reserved.</p>

          <div className="flex gap-6">
            <Link href="#" className="transition hover:text-white">
              Privacy Policy
            </Link>

            <Link href="#" className="transition hover:text-white">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
