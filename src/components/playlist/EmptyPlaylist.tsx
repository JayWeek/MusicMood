import { ListMusic } from "lucide-react";

const EmptyPlaylist = () => {
  return (
    <div className="rounded-xl bg-zinc-900 p-5">
      <div className="mb-4 flex items-center gap-2">
        <ListMusic className="text-green-400" size={18} />
        <h2 className="text-lg font-semibold text-white">Playlist Insight</h2>
      </div>

      <p className="text-zinc-400">This playlist is empty.</p>
    </div>
  );
};

export default EmptyPlaylist;
