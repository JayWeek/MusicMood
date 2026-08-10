import Skeleton from "../ui/Skeleton";

export default function FavoriteTableSkeleton() {
  return (
    <div className="w-full">
      {/* Table Header */}
      <div className="grid grid-cols-[48px_minmax(0,2fr)_minmax(0,1fr)_64px_minmax(100px,auto)] items-center border-b border-zinc-800 px-4 py-3 text-sm text-zinc-400">
        <span>#</span>
        <span>Title</span>
        <span>Collection</span>
        <span />
        <span className="pr-4 text-right">Added</span>
      </div>

      {/* Skeleton Rows */}
      <div className="my-5 flex flex-col gap-5">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="grid grid-cols-[48px_minmax(0,2fr)_minmax(0,1fr)_64px_minmax(100px,auto)] items-center px-4"
          >
            {/* Number */}
            <Skeleton className="h-4 w-4" />

            {/* Thumbnail + Title / Artist */}
            <div className="flex min-w-0 items-center gap-4">
              <Skeleton className="h-10 w-10 shrink-0 rounded" />

              <div className="min-w-0 space-y-2">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>

            {/* Collection */}
            <Skeleton className="h-4 w-24" />

            {/* Favorite */}
            <div className="flex items-center justify-center">
              <Skeleton className="h-[18px] w-[18px] rounded-full" />
            </div>

            {/* Date */}
            <div className="flex justify-end pr-4">
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
