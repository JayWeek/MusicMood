import Skeleton from "../ui/Skeleton";

export default function SettingsSkeleton() {
  return (
    <div className="space-y-8">

      <Skeleton className="h-14 w-52" />

      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="rounded-xl bg-zinc-900 p-6"
        >
          <Skeleton className="mb-6 h-6 w-40" />

          <div className="space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      ))}

    </div>
  );
}