import ProfileCard from "@/components/settings/ProfileCard";
import AppearanceCard from "@/components/settings/AppearanceCard";
import PlaybackCard from "@/components/settings/PlaybackCard";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
  const supabase = await  createClient()
  const {data} = await supabase.auth.getUser()
  if(!data){
    redirect("/auth")
  }
  return (
    <div className="mx-auto max-w-5xl">

      <h1 className="mb-10 text-5xl font-black">
        Settings
      </h1>

      <div className="space-y-6">

        <ProfileCard name={data.user?.user_metadata.full_name} email={data.user?.user_metadata.email}/>

        <AppearanceCard />

        <PlaybackCard />

      </div>

    </div>
  );
}