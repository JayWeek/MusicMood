import {
  BrainCircuit,
  Heart,
  Music4,
} from "lucide-react";

const features = [
  {
    icon: BrainCircuit,
    title: "AI Mood Detection",
    description:
      "Describe how you feel and let AI understand your mood to create the perfect soundtrack.",
  },
  {
    icon: Music4,
    title: "Instant Playlists",
    description:
      "Generate personalized playlists in seconds without searching through thousands of songs.",
  },
  {
    icon: Heart,
    title: "Save Your Favorites",
    description:
      "Keep every playlist and favorite track ready to enjoy anytime.",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="bg-[#121212] py-24"
    >
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold">
            Why MusicMood?
          </h2>

          <p className="mt-4 text-zinc-400">
            Built to make discovering music effortless.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-2xl border border-zinc-800 bg-zinc-900 p-8 transition duration-300 hover:-translate-y-2 hover:border-green-500"
            >
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/15">
                <feature.icon
                  className="text-green-500"
                  size={30}
                />
              </div>

              <h3 className="mb-4 text-2xl font-semibold">
                {feature.title}
              </h3>

              <p className="leading-7 text-zinc-400">
                {feature.description}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}