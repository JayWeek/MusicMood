"use client";

import TrackArtwork from "./TrackArtwork";
import TrackControls from "./TrackControls";
import TrackMeta from "./TrackMeta";

interface TrackPlayerPreviewProps {
  title: string;
  artist: string;
  playing: boolean;
  liked: boolean;
  onToggle: () => void;
  onLike: () => void;
}

export default function TrackPlayerPreview({
  title,
  artist,
  playing,
  liked,
  onToggle,
  onLike,
}: TrackPlayerPreviewProps) {
  return (
    <>
      <TrackArtwork
        title={title}
        artwork="https://picsum.photos/400"
        playing={playing}
        onToggle={onToggle}
      />

      <TrackMeta
        title={title}
        artist={artist}
        mood="Focus"
        currentTime="1:12"
        duration="3:24"
      />

      <TrackControls
        playing={playing}
        liked={liked}
        onToggle={onToggle}
        onLike={onLike}
      />
    </>
  );
}
