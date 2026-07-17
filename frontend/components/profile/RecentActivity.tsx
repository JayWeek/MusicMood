const activities = [
  "Generated 'Coding Focus' playlist",
  "Liked 'Midnight City'",
  "Played 'Blinding Lights'",
  "Created 'Weekend Chill'",
  "Added 8 songs to Favorites",
];

export default function RecentActivity() {
  return (
    <section className="rounded-xl bg-zinc-900 p-6">

      <h2 className="mb-6 text-2xl font-bold">
        Recent Activity
      </h2>

      <div className="space-y-4">

        {activities.map((activity) => (
          <div
            key={activity}
            className="rounded-lg bg-zinc-800 p-4"
          >
            {activity}
          </div>
        ))}

      </div>

    </section>
  );
}