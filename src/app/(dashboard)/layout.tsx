import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import RightPanel from "@/components/layout/RightPanel";
import Player from "@/components/layout/Player";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-[#121212] text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex flex-1 flex-col overflow-hidden">
        <Topbar />

        <div className="flex flex-1 overflow-hidden">
          <section className="flex-1 overflow-y-auto p-6">
            {children}
          </section>

          <RightPanel />
        </div>

        <Player />
      </main>
    </div>
  );
}