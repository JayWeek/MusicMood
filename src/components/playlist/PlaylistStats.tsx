import {
  Clock3,
  Music4,
  Sparkles,
} from "lucide-react";

interface PlaylistStatsProps {
  totalSongs: number;
  duration: string;
  generatedBy: string;
}

export default function PlaylistStats({
  totalSongs,
  duration,
  generatedBy,
}: PlaylistStatsProps) {
  return (
    <div className="flex flex-wrap gap-8">

      <div className="flex items-center gap-3">
        <Music4 className="text-green-400" />

        <div>
          <p className="text-2xl font-bold">
            {totalSongs}
          </p>

          <p className="text-zinc-400">
            Songs
          </p>
        </div>
      </div>


      <div className="flex items-center gap-3">
        <Clock3 className="text-green-400" />

        <div>
          <p className="text-2xl font-bold">
            {duration}
          </p>

          <p className="text-zinc-400">
            Duration
          </p>
        </div>
      </div>


      <div className="flex items-center gap-3">
        <Sparkles className="text-green-400" />

        <div>
          <p className="text-2xl font-bold">
            {generatedBy}
          </p>

          <p className="text-zinc-400">
            Generated
          </p>
        </div>
      </div>

    </div>
  );
}