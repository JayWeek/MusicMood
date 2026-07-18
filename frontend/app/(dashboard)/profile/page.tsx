import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileStats from "@/components/profile/ProfileStats";
import FavoriteGenres from "@/components/profile/FavoriteGenres";
import RecentActivity from "@/components/profile/RecentActivity";
import AchievementCard from "@/components/profile/AchievementCard";

export default function ProfilePage() {
  return (
    <div className="mx-auto max-w-7xl space-y-10">

      <ProfileHeader />

      <ProfileStats />

      <div className="grid gap-8 lg:grid-cols-2">

        <FavoriteGenres />

        <RecentActivity />

      </div>

      <AchievementCard />

    </div>
  );
}