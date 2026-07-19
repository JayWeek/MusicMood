import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import RightPanel from "@/components/layout/RightPanel";
import Player from "@/components/layout/Player";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const fullName = user?.user_metadata.full_name;
  const name = typeof fullName === "string" && fullName.trim()
    ? fullName
    : user?.email?.split("@")[0] || "User";

  return (
    <div className="flex h-screen overflow-hidden bg-[#121212] text-white">
      <Sidebar />

      <main className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Topbar name={name} />

        <section className="min-h-0 min-w-0 flex-1 overflow-y-auto p-6">
          {children}
        </section>

        <Player />
      </main>

      <RightPanel />
    </div>
  );
}
