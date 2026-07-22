import { Sparkles } from "lucide-react";

export default function GenerateHeader() {
  return (
    <div className="mb-10 flex items-center gap-6">

      <div className="flex h-44 w-44 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-700 shadow-2xl">

        <Sparkles size={70} className="text-white" />

      </div>

      <div>

        <p className="uppercase text-sm text-zinc-400">
 AI playlist prompt        </p>

        <h1 className="mt-3 text-3xl font-black">
              Describe the mood you want to hear
        </h1>

        <p className="mt-4 text-zinc-400">
          {" MusicMood"}
        </p>

      </div>

    </div>
  );
}