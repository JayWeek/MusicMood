export default function EachFavouritePlaylistRowSkeleton() {
  return (
    <tr className="border-b border-zinc-800">
      {/* Number / Play */}
      <td className="w-12 px-4">
        <div className="mx-auto h-4 w-4 animate-pulse rounded bg-zinc-800" />
      </td>

      {/* Playlist */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-4">
          {/* Thumbnail */}
          <div className="h-[50px] w-[50px] shrink-0 animate-pulse rounded-md bg-zinc-800" />

          {/* Title + Description */}
          <div className="min-w-0 flex-1 space-y-2">
            <div className="h-4 w-32 animate-pulse rounded bg-zinc-800" />

            <div className="h-3 w-48 animate-pulse rounded bg-zinc-800" />
          </div>
        </div>
      </td>

      {/* Description */}
      <td className="px-4">
        <div className="h-4 w-40 animate-pulse rounded bg-zinc-800" />
      </td>

      {/* Favorite */}
      <td className="px-4">
        <div className="h-8 w-8 animate-pulse rounded-full bg-zinc-800" />
      </td>

      {/* Date */}
      <td className="px-4">
        <div className="ml-auto h-4 w-20 animate-pulse rounded bg-zinc-800" />
      </td>
    </tr>
  );
}