import { Play } from "lucide-react";
import Track from "@/types/track";
import Image from "next/image";

interface TrackTableProps {
  tracks: Track[];
  onPlay?: (track: Track) => void;
  onLike?: (track: Track) => void;
}

export default function TrackTable({ tracks, onPlay, onLike }: TrackTableProps) {
  return (
    <table className="w-full table-fixed">
      <thead>
        <tr className="border-b border-zinc-800 text-left text-sm text-zinc-400">
          <th className="w-12 px-3 py-2 font-medium">#</th>
          <th className="px-3 py-2 font-medium">Title</th>
          <th className="px-3 py-2 font-medium">Artist</th>
          <th className="px-3 py-2 font-medium">Album</th>
          <th className="w-24 px-3 py-2 text-right font-medium">Duration</th>
          <th className="w-28 px-3 py-2 text-right font-medium">Actions</th>
        </tr>
      </thead>
      <tbody>
        {tracks.map((track, index) => (
          <tr
            key={track.id}
            className="group border-b border-zinc-800 transition hover:bg-zinc-900/50"
          >
            <td className="px-3 py-3 text-zinc-400">{index + 1}</td>
            <td className="px-3 py-3">
              <div className="flex items-center gap-3">
                {track.artwork && (
                  <Image
                    src={track.artwork}
                    alt={track.title}
                    width={48}
                    height={48}
                    loading="lazy"
                    className="h-12 w-12 rounded-md object-cover"
                  />
                )}
                <div className="min-w-0">
                  <p className="truncate font-medium">{track.title}</p>
                  <p className="truncate text-zinc-500">{track.album}</p>
                </div>
              </div>
            </td>
            <td className="px-3 py-3 text-zinc-400">{track.artist}</td>
            <td className="px-3 py-3 text-zinc-400">{track.album}</td>
            <td className="px-3 py-3 text-right text-zinc-400">{track.duration}</td>
            <td className="px-3 py-3 text-right">
              <div className="inline-flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onPlay?.(track)}
                  className="inline-flex items-center rounded-full border border-zinc-700 bg-zinc-950 px-3 py-1 text-xs font-medium text-white transition hover:border-zinc-500"
                >
                  <Play className="mr-2 h-3.5 w-3.5" />
                  Play
                </button>
                <button
                  type="button"
                  onClick={() => onLike?.(track)}
                  className="rounded-full border border-zinc-700 bg-zinc-950 px-3 py-1 text-xs font-medium text-zinc-300 transition hover:border-zinc-500 hover:text-white"
                >
                  Like
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
