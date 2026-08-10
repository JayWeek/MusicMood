"use client";

import { ChevronRight, Music2, Play, RefreshCw } from "lucide-react";
import MoodPromptListSkeleton from "./PromptRowSkeleton";

export interface GeneratedMoodPrompt {
  prompt: string;
  description: string;
  moods: string[];
  artistLike: string[];
}

interface MoodPromptListProps {
  prompts: GeneratedMoodPrompt[];
  selectedMood?: string;
  isLoading?: boolean;
  error?: string | null;
  onPromptClick: (prompt: GeneratedMoodPrompt) => void;
  onRegenerate?: () => void;
}

const MoodPromptList = ({
  prompts,
  selectedMood,
  isLoading = false,
  error = null,
  onPromptClick,
  onRegenerate,
}: MoodPromptListProps) => {
  if (isLoading) {
    return <MoodPromptListSkeleton />;
  }

  if (error) {
    return (
      <div className="rounded-lg bg-[#181818] p-5 text-center">
        <p className="font-medium text-white">
          We couldn&apos;t generate your prompts
        </p>

        <p className="mt-1 text-sm text-[#b3b3b3]">{error}</p>

        {onRegenerate && (
          <button
            type="button"
            onClick={onRegenerate}
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-bold text-black transition-transform hover:scale-105"
          >
            <RefreshCw className="size-4" />
            Try again
          </button>
        )}
      </div>
    );
  }

  if (!prompts.length) {
    return null;
  }

  return (
    <section className="overflow-hidden rounded-lg bg-[#121212]">
      <div className="flex items-end justify-between gap-4 px-4 pt-5 pb-3 sm:px-6">
        <div>
          <p className="text-xs font-semibold tracking-widest text-[#b3b3b3] uppercase">
            Made for your mood
          </p>

          <h2
            className={`mt-1 text-xl font-bold text-white sm:text-2xl ${selectedMood} ? capitalize`}
          >
            {`${selectedMood} Listening ideas`}
          </h2>
        </div>

        {onRegenerate && (
          <button
            type="button"
            onClick={onRegenerate}
            className="inline-flex shrink-0 items-center gap-2 text-sm font-bold text-[#b3b3b3] transition-colors hover:text-white"
          >
            <RefreshCw className="size-4" />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        )}
      </div>

      <div className="px-2 pb-3 sm:px-4">
        {prompts.map((item, index) => (
          <PromptRow
            key={`${item.prompt}-${index}`}
            index={index}
            item={item}
            onClick={() => onPromptClick(item)}
          />
        ))}
      </div>
    </section>
  );
};

interface PromptRowProps {
  item: GeneratedMoodPrompt;
  index: number;
  onClick: (item: GeneratedMoodPrompt) => void;
}

export const PromptRow = ({ item, index, onClick }: PromptRowProps) => {
  const visibleArtists = item.artistLike.slice(0, 3).join(", ");

  return (
    <button
      type="button"
      onClick={() => onClick(item)}
      className="group grid w-full grid-cols-[36px_minmax(0,1fr)_auto] items-center gap-3 rounded-md px-2 py-2 text-left transition-colors hover:bg-[#2a2a2a] focus-visible:ring-2 focus-visible:ring-[#1ed760] focus-visible:outline-none"
      aria-label={`Generate playlist from ${item.prompt}`}
    >
      <div className="relative flex size-9 items-center justify-center">
        <span className="text-sm text-[#b3b3b3] group-hover:hidden">
          {index + 1}
        </span>

        <Play
          className="hidden size-4 fill-white text-white group-hover:block"
          aria-hidden="true"
        />
      </div>

      <div className="flex min-w-0 items-center gap-3">
        <div className="flex size-12 shrink-0 items-center justify-center rounded bg-gradient-to-br from-[#1ed760] to-[#063d1b] text-black">
          <Music2 className="size-5" aria-hidden="true" />
        </div>

        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-white">
            {item.prompt}
          </p>

          <p className="mt-0.5 truncate text-sm text-[#b3b3b3]">
            {item.description}
          </p>

          {visibleArtists && (
            <p className="mt-1 truncate text-xs text-[#8f8f8f]">
              Inspired by {visibleArtists}
            </p>
          )}
        </div>
      </div>

      <ChevronRight
        className="size-5 text-[#b3b3b3] transition-colors group-hover:text-white"
        aria-hidden="true"
      />
    </button>
  );
};

export default MoodPromptList;
