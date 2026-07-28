"use client";

import { useRouter } from "next/navigation";

import EachTrackInPlaylist, { type PlaylistSong } from "./EachTrackInPlaylist";

export type CurrentTrack = PlaylistSong & {
  reason?: string;
};

interface NowPlayingPanelProps {
  mood: string;
  playing: boolean;
  liked: boolean;
  queue: CurrentTrack[];
  activeVideoId?: string;
  isDefaultQueue?: boolean;
  onTrackSelect?: (track: CurrentTrack, index: number) => void;
}

export default function NowPlayingPanel({
  liked,
  playing,
  mood,
  queue,
  activeVideoId,
  isDefaultQueue = false,
  onTrackSelect,
}: NowPlayingPanelProps) {
  const router = useRouter();
  const safeQueue = queue ?? [];

  const handleTrackClick = (track: CurrentTrack, index: number) => {
    if (isDefaultQueue) {
      router.push("/generate");
      return;
    }

    onTrackSelect?.(track, index);
  };

  return (
    <div className="p-5 shadow-2xl">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Now Playing</h2>
      </div>

      <div className="mt-5 pt-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-white">
            {(mood && mood) || "Up Next"}
          </h3>

          <span className="text-xs text-zinc-500">{safeQueue.length}</span>
        </div>

        <ul className="space-y-2 text-sm text-zinc-400">
          {safeQueue.length > 0 ? (
            safeQueue.map((song, index) => (
              <EachTrackInPlaylist
                key={index}
                song={song}
                index={index}
                playing={playing && song.videoId === activeVideoId}
                liked={liked}
                isDefault={isDefaultQueue}
                onClick={() => handleTrackClick(song, index)}
              />
            ))
          ) : (
            <li className="rounded-lg bg-zinc-950/50 px-3 py-3 text-sm text-zinc-500">
              No tracks available yet.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
