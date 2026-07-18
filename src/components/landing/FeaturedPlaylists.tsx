import { Play } from "lucide-react";

const playlists = [
  {
    id: 1,
    title: "Late Night Coding",
    mood: "Focus",
    image: "https://picsum.photos/300?1",
  },
  {
    id: 2,
    title: "Morning Energy",
    mood: "Workout",
    image: "https://picsum.photos/300?2",
  },
  {
    id: 3,
    title: "Rainy Day",
    mood: "Relax",
    image: "https://picsum.photos/300?3",
  },
  {
    id: 4,
    title: "Weekend Party",
    mood: "Party",
    image: "https://picsum.photos/300?4",
  },
];

export default function FeaturedPlaylists() {
  return (
    <section className="bg-[#121212] py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-16">
          <h2 className="text-4xl font-bold">
            Featured AI Playlists
          </h2>

          <p className="mt-4 text-zinc-400">
            Discover playlists created for every mood.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

          {playlists.map((playlist) => (
            <div
              key={playlist.id}
              className="group rounded-2xl bg-zinc-900 p-5 transition hover:bg-zinc-800"
            >
              <div className="relative overflow-hidden rounded-xl">

                <img
                  src={playlist.image}
                  alt={playlist.title}
                  className="aspect-square w-full object-cover transition duration-500 group-hover:scale-105"
                />

                <button className="absolute bottom-4 right-4 rounded-full bg-green-500 p-4 opacity-0 shadow-xl transition group-hover:opacity-100">
                  <Play
                    fill="black"
                    className="text-black"
                    size={20}
                  />
                </button>

              </div>

              <h3 className="mt-5 text-xl font-semibold">
                {playlist.title}
              </h3>

              <p className="mt-2 text-zinc-400">
                {playlist.mood}
              </p>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}