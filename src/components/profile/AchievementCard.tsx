export default function AchievementCard() {
  return (
    <section className="rounded-2xl border border-zinc-800 bg-[#181818] p-6">
      <h2 className="mb-4 text-xl font-bold">
        Achievements
      </h2>

      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="mb-4 text-5xl">🏆</div>

        <h3 className="text-lg font-semibold">
          No achievements yet
        </h3>

        <p className="mt-2 max-w-sm text-sm text-zinc-400">
          Keep listening, generate more AI playlists, and favorite songs
          to unlock achievements.
        </p>
      </div>
    </section>
  );
}