import { Sparkles } from "lucide-react";
import React from "react";

type GenerateProps = {
  handleGeneratePlaylist: (event: React.FormEvent<HTMLFormElement>) => void;
  moodText: string;
  setMoodText: (value: string) => void;
  isLoading: boolean;
  error: string;
};

export default function GeneratePromptForm({
  handleGeneratePlaylist,
  moodText,
  setMoodText,
  isLoading,
  error,
}: GenerateProps) {
  return (
    <section className="mx-auto w-full max-w-6xl">
      <div className="rounded-[2rem] border border-green-500/20 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 p-6 sm:p-8 lg:p-10">
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-full bg-green-500/15 p-3">
            <Sparkles className="text-green-400" size={22} />
          </div>
        </div>

        <form
          onSubmit={handleGeneratePlaylist}
          className="flex min-h-[60vh] flex-col gap-5"
        >
          <textarea
            value={moodText}
            onChange={(event) => setMoodText(event.target.value)}
            placeholder="For example: I feel stressed after a long day and need calm music."
            maxLength={500}
            className="flex-1 min-h-[320px] w-full resize-none rounded-[1.5rem] border border-green-500/20 bg-zinc-950/70 p-6 text-lg text-zinc-100 placeholder:text-zinc-500 outline-none transition focus:border-green-400 focus:ring-4 focus:ring-green-500/20"
          />

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-zinc-400">
              Try describing your energy, vibe, or the feeling you want to carry with you.
            </p>

            <button
              type="submit"
              disabled={isLoading || moodText.trim().length < 3}
              className="rounded-full bg-green-500 px-7 py-3 font-semibold text-black transition hover:bg-green-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? "Creating your playlist..." : "Generate playlist"}
            </button>
          </div>
        </form>

        {error && (
          <p className="mt-4 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-red-300">
            {error}
          </p>
        )}
      </div>
    </section>
  );
}