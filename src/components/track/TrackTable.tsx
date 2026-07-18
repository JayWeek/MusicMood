import Track from "@/types/track";
import TrackRow from "./TrackRow";

interface TrackTableProps {
  tracks: Track[];
  showPlayedAt?: boolean;
  onPlay?: (track: Track) => void;
  onLike?: (track: Track) => void;
}

export default function TrackTable({
  tracks,
  showPlayedAt = false,
  onPlay,
  onLike,
}: TrackTableProps) {
  return (
    <div>
      <div className="mb-4 grid grid-cols-12 border-b border-zinc-800 pb-3 text-sm text-zinc-500">
        <div>#</div>

        <div className="col-span-5">Title</div>

        <div className="col-span-4">Album</div>

        <div></div>

        {showPlayedAt ? (
          <div className="col-span-2 text-right">Last Played</div>
        ) : (
          <div className="text-right">Time</div>
        )}
      </div>

      {tracks.map((track, index) => (
        <TrackRow
          key={track.id}
          track={track}
          index={index}
          showPlayedAt={showPlayedAt}
          onPlay={onPlay}
          onLike={onLike}
        />
      ))}
    </div>
  );
}
