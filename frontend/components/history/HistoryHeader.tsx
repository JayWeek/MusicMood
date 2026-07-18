import { History } from "lucide-react";

export default function HistoryHeader() {
  return (
    <div className="mb-10 flex items-center gap-6">

      <div className="flex h-44 w-44 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-700 shadow-2xl">

        <History size={70} className="text-white" />

      </div>

      <div>

        <p className="uppercase text-sm text-zinc-400">
          Library
        </p>

        <h1 className="mt-3 text-6xl font-black">
          History
        </h1>

        <p className="mt-4 text-zinc-400">
          Previously generated playlists
        </p>

      </div>

    </div>
  );
}