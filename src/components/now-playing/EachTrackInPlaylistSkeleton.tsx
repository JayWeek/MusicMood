export function EachTrackInPlaylistSkeleton() {
  return (
    <div className="flex items-center gap-3">
      {/* Track number */}
      <div className="h-4 w-4 shrink-0 animate-pulse rounded bg-zinc-800" />

      {/* Track information */}
      <div className="flex min-w-0 items-center gap-3">
        {/* Thumbnail */}
        <div className="size-12 shrink-0 animate-pulse rounded bg-zinc-800" />

        {/* Title / Artist */}
        <div className="min-w-0">
          <div className="h-4 w-32 animate-pulse rounded bg-zinc-800" />
          <div className="mt-1.5 h-4 w-24 animate-pulse rounded bg-zinc-800" />
        </div>
      </div>

      {/* Favorite */}
      <div className="ml-auto shrink-0">
        <div className="size-4 animate-pulse rounded-full bg-zinc-800" />
      </div>
    </div>
  );
}
