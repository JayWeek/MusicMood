import FavoriteRow from "./FavoriteRow";
import FavoriteSong from "@/types/favorite";

interface Props {
  songs: FavoriteSong[];
}

export default function FavoriteTable({ songs }: Props) {
  return (
    <div>
      <div className="mb-4 grid grid-cols-12 border-b border-zinc-800 pb-3 text-sm text-zinc-500">
        <div>#</div>

        <div className="col-span-5">Title</div>

        <div className="col-span-4">Album</div>

        <div></div>

        <div className="text-right">Time</div>
      </div>

      {songs.map((song, index) => (
        <FavoriteRow key={song.id} song={song} index={index} />
      ))}
    </div>
  );
}
