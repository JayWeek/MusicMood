import Skeleton from "../ui/Skeleton";

export default function TopbarSkeleton() {
  return (
    <header className="flex items-center justify-between border-b border-zinc-800 p-6">
      <Skeleton className="h-10 w-96 rounded-full" />

      <div className="flex items-center gap-4">
        <Skeleton className="h-10 w-10 rounded-full" />
        <Skeleton className="h-10 w-10 rounded-full" />
        <Skeleton className="h-10 w-10 rounded-full" />
      </div>
    </header>
  );
}