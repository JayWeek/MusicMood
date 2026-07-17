import Skeleton from "../ui/Skeleton";

export default function SidebarSkeleton() {
  return (
    <aside className="w-64 border-r border-zinc-800 bg-[#121212] p-6">
      <Skeleton className="mb-10 h-10 w-36" />

      <div className="space-y-5">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton
            key={i}
            className="h-10 w-full rounded-lg"
          />
        ))}
      </div>
    </aside>
  );
}