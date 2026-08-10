// Use native <img> for non-critical playlist cover to avoid optimizer overhead on many requests

interface PlaylistInfoProps {
  title: string;
}

export default function PlaylistInfo({
  title,
}: PlaylistInfoProps) {
  return (
    <div className="flex flex-col items-center lg:items-start">

      <img
        src="https://picsum.photos/300"
        alt="Playlist Cover"
        width={260}
        height={260}
        loading="lazy"
        className="rounded-xl shadow-2xl"
      />

      <span className="mt-6 text-xs uppercase tracking-[0.3em] text-green-300">
        AI Playlist
      </span>

      <h1 className="mt-3 text-5xl font-black">
        {title}
      </h1>

      <p className="mt-4 max-w-lg text-zinc-300">
        Created from your mood:
        <br />
        I need calm music while coding late tonight.
      </p>

    </div>
  );
}