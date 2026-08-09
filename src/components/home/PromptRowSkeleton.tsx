export function PromptRowSkeleton() {
  return (
    <div className="grid w-full grid-cols-[36px_minmax(0,1fr)_auto] items-center gap-3 rounded-md px-2 py-2">
      {/* Number */}
      <div className="h-4 w-5 animate-pulse rounded bg-zinc-700" />

      {/* Prompt content */}
      <div className="flex min-w-0 items-center gap-3">
        {/* Music artwork */}
        <div className="size-12 shrink-0 animate-pulse rounded bg-zinc-700" />

        {/* Text */}
        <div className="min-w-0 flex-1 space-y-2">
          {/* Prompt */}
          <div className="h-4 w-3/4 animate-pulse rounded bg-zinc-700" />

          {/* Description */}
          <div className="h-4 w-2/3 animate-pulse rounded bg-zinc-700" />

          {/* Artists */}
          <div className="h-3 w-1/2 animate-pulse rounded bg-zinc-700" />
        </div>
      </div>

      {/* Chevron */}
      <div className="size-5 animate-pulse rounded bg-zinc-700" />
    </div>
  );
}

export default function MoodPromptListSkeleton() {
  return (
    <div className="flex flex-col gap-1">
      {Array.from({ length: 10 }).map((_, index) => (
        <PromptRowSkeleton key={index} />
      ))}
    </div>
  );
}
