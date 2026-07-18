const genres = [
  "Lo-Fi",
  "Pop",
  "Hip Hop",
  "Afrobeats",
  "Jazz",
  "Classical",
  "EDM",
  "R&B",
];

export default function FavoriteGenres() {
  return (
    <section className="rounded-xl bg-zinc-900 p-6">

      <h2 className="mb-6 text-2xl font-bold">
        Favorite Genres
      </h2>

      <div className="flex flex-wrap gap-3">

        {genres.map((genre) => (
          <span
            key={genre}
            className="rounded-full bg-green-500 px-4 py-2 font-medium text-black"
          >
            {genre}
          </span>
        ))}

      </div>

    </section>
  );
}