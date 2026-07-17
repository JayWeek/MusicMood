"use client";

const moods = [
  "Happy",
  "Sad",
  "Focused",
  "Relax",
  "Workout",
  "Party",
  "Sleep",
  "Romantic",
];

interface Props {
  onSelect: (value: string) => void;
}

export default function MoodChips({
  onSelect,
}: Props) {
  return (
    <div className="mt-6 flex flex-wrap gap-3">
      {moods.map((mood) => (
        <button
          key={mood}
          onClick={() => onSelect(mood)}
          className="rounded-full bg-zinc-800 px-4 py-2 transition hover:bg-green-500 hover:text-black"
        >
          {mood}
        </button>
      ))}
    </div>
  );
}