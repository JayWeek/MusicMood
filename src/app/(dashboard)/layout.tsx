import { Suspense } from "react";

import DashboardClientLayout from "@/components/dashboard/DashboardClientLayout";
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

  const name =
    typeof fullName === "string" && fullName.trim()
      ? fullName
      : user?.email?.split("@")[0] || "User";

  return (
    <Suspense fallback={null}>
      <DashboardClientLayout name={name}>{children}</DashboardClientLayout>
    </Suspense>
  );
}
