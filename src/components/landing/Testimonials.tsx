import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    comment:
      "MusicMood always understands exactly what I want to hear.",
  },
  {
    name: "Michael Lee",
    comment:
      "The AI playlists feel like they were made just for me.",
  },
  {
    name: "Emma Wilson",
    comment:
      "I've discovered so many amazing artists through MusicMood.",
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="bg-black py-24"
    >
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold">
            Loved by Music Fans
          </h2>

          <p className="mt-4 text-zinc-400">
            Hear what our users are saying.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">

          {testimonials.map((item) => (
            <div
              key={item.name}
              className="rounded-2xl bg-zinc-900 p-8"
            >
              <div className="mb-6 flex gap-1 text-green-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    fill="currentColor"
                    size={18}
                  />
                ))}
              </div>

              <p className="leading-8 text-zinc-300">
                "{item.comment}"
              </p>

              <h4 className="mt-8 font-semibold">
                {item.name}
              </h4>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}