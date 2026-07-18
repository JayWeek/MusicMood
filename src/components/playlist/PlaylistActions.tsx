import {
  Heart,
  Play,
  Share2,
} from "lucide-react";

export default function PlaylistActions() {
  return (
    <div className="flex flex-wrap gap-4">

      <button className="flex items-center gap-3 rounded-full bg-green-500 px-8 py-4 font-semibold text-black transition hover:bg-green-400">
        <Play
          size={20}
          fill="black"
        />

        Play
      </button>

      <button className="rounded-full border border-zinc-700 p-4 transition hover:border-white">
        <Heart size={20} />
      </button>

      <button className="rounded-full border border-zinc-700 p-4 transition hover:border-white">
        <Share2 size={20} />
      </button>

    </div>
  );
}