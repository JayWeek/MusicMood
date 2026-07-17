import Skeleton from "../ui/Skeleton";
import TrackTableSkeleton from "../track/TrackTableSkeleton";

export default function FavoritesSkeleton() {
  return (
    <div className="space-y-8">

      <div className="flex items-end gap-6">
        <Skeleton className="h-44 w-44 rounded-xl" />

        <div className="space-y-4">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-16 w-80" />
          <Skeleton className="h-4 w-52" />
        </div>
      </div>

      <TrackTableSkeleton />

    </div>
  );
}