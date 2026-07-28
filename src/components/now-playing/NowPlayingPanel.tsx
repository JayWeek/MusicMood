"use client";

import EachTrackInPlaylist from "./EachTrackInPlaylist";

export type currentTrack = {
  title: string;
  artist: string;
  reason: string;
};

type Props = {
  playing: boolean;
  liked: boolean;
  setPlaying: (val: boolean) => void;
  setLiked: (val: boolean) => void;
  queue: currentTrack[];
  currentSongIndex: number;
  onSelectSong: (index: number) => void;
};

export default function NowPlayingPanel({
  liked,
  playing,
  queue,
  currentSongIndex,
  onSelectSong,
}: Props) {
  const safeQueue = queue ?? [];

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-5 shadow-2xl shadow-black/20">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Now Playing</h2>
      </div>

      <div className="mt-5 border-t border-zinc-800 pt-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-white">Up Next</h3>
          {queue && (
            <span className="text-xs text-zinc-500">{queue?.length}</span>
          )}
        </div>

        <ul className="space-y-2 text-sm text-zinc-400">
          {safeQueue.length > 0 ? (
            safeQueue.map((item, index) => (
              <EachTrackInPlaylist
                key={`${item.title}-${item.artist}`}
                title={item.title}
                artist={item.artist}
                playing={playing && currentSongIndex === index}
                liked={liked}
                onClick={() => onSelectSong(index)}
                isDefault={
                  safeQueue.length > 0 && item.title === "Midnight City"
                }
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
