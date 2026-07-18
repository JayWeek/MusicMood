import PlaylistInfo from "./PlaylistInfo";
import PlaylistStats from "./PlaylistStats";
import PlaylistActions from "./PlaylistActions";

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

      <div className="flex flex-col gap-8 lg:flex-row lg:items-end">

        <PlaylistInfo 
          title={title} 
        />

        <div className="flex-1">

          <PlaylistStats
            totalSongs={totalSongs}
            duration={duration}
            generatedBy={generatedBy}
          />

          <div className="mt-8">
            <PlaylistActions />
          </div>

        </div>

      </div>

    </section>
  );
}