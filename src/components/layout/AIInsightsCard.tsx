"use client";

import { Sparkles } from "lucide-react";

export default function AIInsightsCard({
  moods,
  title,
}: {
  moods: string[];
  title: string;
}) {
  return (
    <div className="rounded-xl bg-zinc-900 p-5">
      <div className="mb-4 flex items-center gap-2">
        <Sparkles className="text-green-400" size={18} />
        <h2 className="text-lg font-semibold text-white">AI Insights</h2>
      </div>

      <div className="space-y-2 text-sm text-zinc-300">
        <h2 className="text-lg font-semibold text-white">{title}</h2>
        {moods.map((item, index) => (
          <p key={index}>
            <span className="text-zinc-400">{item}</span>
          </p>
        ))}
      </div>
    </div>
  );
}
