import { Loader2, Sparkles } from "lucide-react";

export default function LoadingAI() {
  return (
    <div className="mt-10 flex flex-col items-center gap-5 text-center">
      <Loader2
        className="animate-spin text-green-500"
        size={48}
      />

      <Sparkles
        className="text-green-500"
        size={28}
      />

      <h2 className="text-2xl font-bold">
        AI is creating your playlist...
      </h2>

      <p className="text-zinc-400">
        Analyzing mood, genre and recommendations.
      </p>
    </div>
  );
}