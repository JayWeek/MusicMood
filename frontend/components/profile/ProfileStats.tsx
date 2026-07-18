import {
  Heart,
  Music,
  Clock3,
  ListMusic,
} from "lucide-react";

const stats = [
  {
    icon: Music,
    value: "742",
    label: "Songs Played",
  },
  {
    icon: Heart,
    value: "138",
    label: "Favorites",
  },
  {
    icon: ListMusic,
    value: "26",
    label: "AI Playlists",
  },
  {
    icon: Clock3,
    value: "198 hrs",
    label: "Listening Time",
  },
];

export default function ProfileStats() {
  return (
    <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-xl bg-zinc-900 p-6"
        >
          <stat.icon
            className="mb-4 text-green-500"
            size={30}
          />

          <h2 className="text-3xl font-bold">
            {stat.value}
          </h2>

          <p className="mt-2 text-zinc-400">
            {stat.label}
          </p>

        </div>
      ))}

    </section>
  );
}