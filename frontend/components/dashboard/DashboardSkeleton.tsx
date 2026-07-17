import Skeleton from "../ui/Skeleton";

export default function DashboardSkeleton() {
  return (
    <div className="space-y-8">

      <Skeleton className="h-36 w-full rounded-xl" />

      <div className="flex gap-3 flex-wrap">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton
            key={i}
            className="h-10 w-24 rounded-full"
          />
        ))}
      </div>

      <Skeleton className="h-14 w-60 rounded-full" />

      <div className="space-y-4 pt-6">
        {Array.from({ length: 10 }).map((_, i) => (
          <Skeleton
            key={i}
            className="h-16 w-full"
          />
        ))}
      </div>

    </div>
  );
}