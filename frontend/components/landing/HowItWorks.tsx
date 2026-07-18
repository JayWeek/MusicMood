import {
  Brain,
  Music2,
  Sparkles,
  Headphones,
} from "lucide-react";

const steps = [
  {
    icon: Brain,
    title: "Describe Your Mood",
    description:
      "Tell MusicMood how you're feeling or what you're doing.",
  },
  {
    icon: Sparkles,
    title: "AI Understands You",
    description:
      "Our AI analyzes your mood, preferences, and context.",
  },
  {
    icon: Music2,
    title: "Playlist Generated",
    description:
      "Receive a personalized playlist tailored just for you.",
  },
  {
    icon: Headphones,
    title: "Enjoy the Music",
    description:
      "Listen, save favorites, and discover new artists.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="bg-black py-24"
    >
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-20 text-center">
          <h2 className="text-4xl font-bold">
            How It Works
          </h2>

          <p className="mt-4 text-zinc-400">
            From your mood to the perfect playlist in four simple steps.
          </p>
        </div>

        <div className="grid gap-12 md:grid-cols-2 xl:grid-cols-4">

          {steps.map((step, index) => (
            <div
              key={step.title}
              className="relative text-center"
            >
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-500">
                <step.icon
                  className="text-black"
                  size={36}
                />
              </div>

              <span className="mb-4 inline-block rounded-full bg-zinc-800 px-4 py-1 text-sm text-green-400">
                Step {index + 1}
              </span>

              <h3 className="mb-4 text-2xl font-semibold">
                {step.title}
              </h3>

              <p className="leading-7 text-zinc-400">
                {step.description}
              </p>

              {index !== steps.length - 1 && (
                <div className="absolute right-[-40px] top-10 hidden h-0.5 w-20 bg-zinc-700 xl:block" />
              )}
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}