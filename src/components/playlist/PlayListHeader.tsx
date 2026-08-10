import PlaylistInfo from "./PlaylistInfo";
import PlaylistStats from "./PlaylistStats";

interface PlaylistHeaderProps {
  title: string;
  totalSongs: number;
  duration: string;
  generatedBy: string;
}

export default function PlaylistHeader({
  title,
  totalSongs,
  duration,
  generatedBy,
}: PlaylistHeaderProps) {
  return (
    <section className="rounded-2xl bg-gradient-to-b from-green-700 via-green-800 to-[#121212] p-8">
      <PlaylistInfo title={title} />
      <table className="flex flex-col gap-8 lg:flex-row lg:items-end">
        <div className="flex-1">
          <PlaylistStats
            totalSongs={totalSongs}
            duration={duration}
            generatedBy={generatedBy}
          />
        </div>
      </table>
    </section>
  );
}
