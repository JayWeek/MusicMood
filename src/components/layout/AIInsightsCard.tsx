"use client";

import { Sparkles } from "lucide-react";

const insights = [
  { label: "Mood", value: "Focused" },
  { label: "Genre", value: "Lo-Fi Hip Hop" },
  { label: "Energy", value: "Medium" },
  { label: "Playlist Length", value: "15 Songs" },
];

export default function AIInsightsCard() {
  return (
    <div className="rounded-xl bg-zinc-900 p-5">
      <div className="mb-4 flex items-center gap-2">
        <Sparkles className="text-green-400" size={18} />
        <h2 className="text-lg font-semibold text-white">AI Insights</h2>
      </div>

      <div className="space-y-2 text-sm text-zinc-300">
        {insights.map((item) => (
          <p key={item.label}>
            <span className="text-zinc-400">{item.label}:</span> {item.value}
          </p>
        ))}
      </div>
    </div>
  );
}
