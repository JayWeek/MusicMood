import Skeleton from "../ui/Skeleton";

export default function TrackTableSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className="grid grid-cols-12 items-center gap-4 rounded-lg bg-zinc-900 p-4"
        >
          <Skeleton className="h-6 w-6" />

          <div className="col-span-5 flex items-center gap-4">
            <Skeleton className="h-12 w-12 rounded" />

            <div className="space-y-2">
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-3 w-32" />
            </div>
          </div>

          <Skeleton className="col-span-4 h-4 w-40" />

          <Skeleton className="h-5 w-5 rounded-full" />

          <Skeleton className="h-4 w-10 justify-self-end" />
        </div>
      ))}
    </div>
  );
}