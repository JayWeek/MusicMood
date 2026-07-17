import Link from "next/link";
import { FaGithub, FaInstagram, FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-black py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-6 md:flex-row">
        <div>
          <h2 className="text-2xl font-bold">MusicMood</h2>
          <p className="mt-2 text-zinc-500">
            Discover your perfect soundtrack with AI-powered music

            recommendations tailored to your mood.
          </p>
        </div>

        <div className="flex gap-8 text-zinc-400">
          <Link href="/">Home</Link>
          <Link href="#features">Features</Link>
          <Link href="#how-it-works">How It Works</Link>
          <Link href="/auth">Login</Link>
        </div>

        <div className="flex gap-4">
          <FaGithub className="cursor-pointer text-zinc-400 hover:text-white" size={22} />
          <FaXTwitter className="cursor-pointer text-zinc-400 hover:text-white" size={22} />
          <FaInstagram className="cursor-pointer text-zinc-400 hover:text-white" size={22} />
        </div>
      </div>

      <p className="mt-10 text-center text-sm text-zinc-500">
        © {new Date().getFullYear()} MusicMood. All rights reserved.
      </p>
    </footer>
  );
}