import Skeleton from "../ui/Skeleton";

export default function PlayerSkeleton() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 border-t border-zinc-800 bg-[#181818] p-4">

      <div className="grid grid-cols-3 items-center">

        <div className="flex items-center gap-4">
          <Skeleton className="h-16 w-16 rounded-lg" />

          <div className="space-y-2">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>

        <div className="space-y-4">
          <Skeleton className="mx-auto h-10 w-56 rounded-full" />
          <Skeleton className="h-2 w-full rounded-full" />
        </div>

        <div className="flex justify-end">
          <Skeleton className="h-8 w-40 rounded-full" />
        </div>

      </div>

    </footer>
  );
}