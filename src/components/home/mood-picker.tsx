import { useState } from "react";

export interface MoodItem {
  id: string;
  label: string;
  emoji: string;
}

const MOODS: MoodItem[] = [
  { id: "euphoric", label: "Euphoric", emoji: "✨" },
  { id: "happy", label: "Happy", emoji: "😊" },
  { id: "party", label: "Party", emoji: "🥳" },
  { id: "romantic", label: "Romantic", emoji: "💕" },
  { id: "chill", label: "Chill", emoji: "😌" },
  { id: "dreamy", label: "Dreamy", emoji: "☁️" },
  { id: "sleepy", label: "Sleepy", emoji: "🌙" },
  { id: "focused", label: "Focused", emoji: "🎯" },
  { id: "motivated", label: "Motivated", emoji: "🚀" },
  { id: "nostalgic", label: "Nostalgic", emoji: "📼" },
  { id: "melancholy", label: "Melancholy", emoji: "🌧️" },
  { id: "heartbroken", label: "Heartbroken", emoji: "💔" },
  { id: "confident", label: "Confident", emoji: "😎" },
  { id: "workout", label: "Workout", emoji: "💪" },
  { id: "angry", label: "Angry", emoji: "🔥" },
];

interface MoodPickerProps {
  initialMood?: string | null;
  onMoodChange?: (mood: MoodItem | null) => void;
}

const MoodPicker = ({ initialMood = null, onMoodChange }: MoodPickerProps) => {
  const [selectedMoodId, setSelectedMoodId] = useState<string | null>(
    initialMood
  );

  const selectMood = (mood: MoodItem) => {
    const nextMood = mood.id === selectedMoodId ? null : mood;
    setSelectedMoodId(nextMood?.id ?? null);
    onMoodChange?.(nextMood);
  };

  return (
    <div
      className="scrollbar-none flex w-full snap-x snap-mandatory items-center gap-2 overflow-x-auto overscroll-x-contain py-2"
      role="group"
      aria-label="Choose a music mood"
    >
      {MOODS.map((mood) => {
        const isSelected = selectedMoodId === mood.id;

        return (
          <button
            key={mood.id}
            type="button"
            onClick={() => selectMood(mood)}
            aria-pressed={isSelected}
            className={`flex shrink-0 snap-start items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-colors outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
              isSelected
                ? "border-green-500 bg-green-500 text-slate-950"
                : "border-white/10 bg-white/5 text-slate-300 hover:border-white/20 hover:bg-white/10 hover:text-white"
            }`}
          >
            <span aria-hidden="true">{mood.emoji}</span>
            <span>{mood.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default MoodPicker;
