import SidebarSkeleton from "./SidebarSkeleton";
import TopbarSkeleton from "./TopbarSkeleton";
import DashboardSkeleton from "../dashboard/DashboardSkeleton";
import PlayerSkeleton from "./PlayerSkeleton";

export default function PageSkeleton() {
  return (
    <div className="flex h-screen bg-black text-white">

      <SidebarSkeleton />

      <div className="flex flex-1 flex-col">

        <TopbarSkeleton />

        <main className="flex-1 overflow-y-auto p-8">
          <DashboardSkeleton />
        </main>

      </div>

      <PlayerSkeleton />

    </div>
  );
}