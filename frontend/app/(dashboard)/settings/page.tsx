import ProfileCard from "@/components/settings/ProfileCard";
import AppearanceCard from "@/components/settings/AppearanceCard";
import PlaybackCard from "@/components/settings/PlaybackCard";

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-5xl">

      <h1 className="mb-10 text-5xl font-black">
        Settings
      </h1>

      <div className="space-y-6">

        <ProfileCard />

        <AppearanceCard />

        <PlaybackCard />

      </div>

    </div>
  );
}